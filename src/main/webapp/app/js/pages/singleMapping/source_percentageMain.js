/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */


function initSourcePercentagePage() {
    DrawTreeD3_Coverage();
}

$(document).ready(function () {
    
    $('#covered_ss_search_BTN').click(function () {
        var CoveredElements = $.parseJSON(sessionStorage.CoveredElementsSourceSchema);
        var curEl = $('#covered_ss_search').val();
        if(!CoveredElements){
            return false;
        }
        var elList = CoveredElements.coveredElementsList === null ? [] : 
                    (CoveredElements.coveredElementsList instanceof Array ? CoveredElements.coveredElementsList :
                    [CoveredElements.coveredElementsList]);
        var covered = false;
        $.each(elList, function (j, el) {
            if (el === curEl){
                covered = true;
            }
        });
        var coveredText = (covered===true) ? 'Covered' : 'Not Covered';
        $('#source_percentage .SStreeCoverage_name').text(curEl);
        $('#source_percentage .SStreeCoverage_covered').text(coveredText);
    });
    
    $("#covered_ss_search").keyup(function (e) {
        if (e.keyCode === 13) {
            $('#covered_ss_search_BTN').click();
        }
    });
});

function addMetricsToSourcePercentagePage() {
    
    var metrics = $.parseJSON(sessionStorage.CoverageMetrics);
    var sourceSchemaMetrics = metrics.overviewMetrics.sSMetrics.directMetric;
    
    //source_percentage page
    $('#source_percentage .direct_metrics .covTables').val(sourceSchemaMetrics.CoveredParentElements);
    $('#source_percentage .direct_metrics .covAttrs').val(sourceSchemaMetrics.CoveredChildElements);
    $('#source_percentage .direct_metrics .covSS').val(sourceSchemaMetrics.CoveredSourceSchema);

    /* jQueryKnob */
    $("#source_percentage .knob").trigger('change');
}

function addExcludingMetricsToSourcePercentagePage(DATA) {
    var sourceSchemaMetrics = DATA.metrics.overviewMetrics.sSMetrics.directMetric;
    //source_percentage page
    $('#source_percentage .direct_metrics .covTables').val(sourceSchemaMetrics.CoveredParentElements);
    $('#source_percentage .direct_metrics .covAttrs').val(sourceSchemaMetrics.CoveredChildElements);
    $('#source_percentage .direct_metrics .covSS').val(sourceSchemaMetrics.CoveredSourceSchema);

    /* jQueryKnob */
    $("#source_percentage .knob").trigger('change');
}


function DrawTreeD3_Coverage() {
    $("#SStreeCoverage > svg").remove();
    var margin = {top: 30, right: 20, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
            barHeight = 20,
            barWidth = width * .8;

    var i = 0,
            duration = 400,
            root;

    var tree = d3.layout.tree()
            .nodeSize([0, 20]);

    var diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.y, d.x];
            });

    var svg = d3.select("#SStreeCoverage").append("svg")
            .attr("width", width + margin.left + margin.right)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    d3.json(GlobalResources.Services.RestService + '/x3ml/source_schema/tree/' + sessionStorage.MappingID, function (error, doc) {
        //d3.json('flare.json', function (error, doc) {
        if (doc) {
            sessionStorage.TreeSourceSchema=JSON.stringify(doc);
            
            //add to search list source_shema page
            var pelemList = doc.allParentNames === null ? [] : (doc.allParentNames instanceof Array ? doc.allParentNames : [doc.allParentNames]);
            var celemList = doc.allLeavesNames === null ? [] : (doc.allLeavesNames instanceof Array ? doc.allLeavesNames : [doc.allLeavesNames]);
            $.each(pelemList, function (i, c) {
                ActiveSourceSchemaDropDownList.push(c);
            });
            $.each(celemList, function (i, c) {
                ActiveSourceSchemaDropDownList.push(c);
            });

            //AUTOCOMPLETE text box
            $('#source_schema_search_ALL').autocomplete({
                source: ActiveSourceSchemaDropDownList
            });
            
            
            //show details
            var mapping = $.parseJSON(sessionStorage.Mapping);
            var type = mapping.info.source_info.source_schema.type;
            var parents = '-';
            var children = '-';
            if (type === '')   type = 'Not Available';
            $('#source_percentage .typeSample').text(type);
            if(doc.allParentNames) parents = doc.allParentNames.length;
            if(doc.allLeavesNames) children = doc.allLeavesNames.length;
            $('#source_percentage .totalTablesSample').text(parents);
            $('#source_percentage .totalAttrsSample').text(children);
            
            var flare = doc.root;
            //console.log(doc.root);
            flare.x0 = 0;
            flare.y0 = 0;
            sessionStorage.TreeSourceSchemaD3=JSON.stringify(flare);
            root = flare;
            AjaxRequests.SingleMapping.GetCoveredElementsSourceSchema();
            addElementsToSearchListCoverageSS(doc);
        }
        else {
            console.error('Not available source schema for Mapping' + sessionStorage.MappingID);
        }
    });


    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        $('#source_percentage .SStreeCoverage_name').text(d.name);
        $('#source_percentage .SStreeCoverage_covered').text(d.covered);
        
        updateTreeD3_Coverage(d);
    }

    function color(d) {
        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }
    
    
    function updateTreeD3_Coverage(source) {
        var CoveredElements = $.parseJSON(sessionStorage.CoveredElementsSourceSchema);
        
        if(!source){
            source = root;
        }
        
        function isCovered(curEl) {
            var covered = false;
            var elList = CoveredElements.coveredElementsList === null ? [] : 
                    (CoveredElements.coveredElementsList instanceof Array ? CoveredElements.coveredElementsList :
                    [CoveredElements.coveredElementsList]);
            $.each(elList, function (j, el) {
                if (el === curEl)
                    covered = true;
            });
            return covered;
        }

        // Compute the flattened node list. TODO use d3.layout.hierarchy.
        var nodes = tree.nodes(root);

        var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);
        $('#SStreeCoverage > svg').height(height);

        d3.select("svg").transition()
                .duration(duration)
                .attr("height", height);

        d3.select(self.frameElement).transition()
                .duration(duration)
                .style("height", height + "px");

        // Compute the "layout".
        nodes.forEach(function (n, i) {
            n.x = i * barHeight;
        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
                .data(nodes, function (d) {
                    return d.id || (d.id = ++i);
                });

        var nodeEnter = node.enter().append("g")
                //.attr("class", "node")
                .attr("class", function (d) {
                    var c = 'node';
                    d.covered = 'Not covered';
                    if (isCovered(d.name)===true){
                        c = c + " covered";
                        d.covered = 'Covered';
                    }
                    if (d.name === "")
                        c = '';
                    return c;
                })
                .attr("transform", function (d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .style("opacity", 1e-6);

        // Enter any new nodes at the parent's previous position.
        nodeEnter.append("rect")
                .attr("y", -barHeight / 2)
                .attr("width", barWidth)
                .attr("height", function (d) {
                    var height = barHeight;
                    if (d.name === "")
                        height = 0;
                    return height;
                })
                .style("fill", color)
                .on("click", click);

        nodeEnter.append("text")
                .attr("dy", 3.5)
                .attr("dx", 5.5)
                .text(function (d) {
                    return d.name;
                });

        // Transition nodes to their new position.
        nodeEnter.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + d.y + "," + d.x + ")";
                })
                .style("opacity", 1);

        node.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + d.y + "," + d.x + ")";
                })
                .style("opacity", 1)
                .select("rect")
                .style("fill", color);

        // Transition exiting nodes to the parent's new position.
        node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .style("opacity", 1e-6)
                .remove();

        // Update the links…
        var link = svg.selectAll("path.link")
                .data(tree.links(nodes), function (d) {
                    return d.target.id;
                });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .transition()
                .duration(duration)
                .attr("d", diagonal);

        // Transition links to their new position.
        link.transition()
                .duration(duration)
                .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });


    }
    
    DrawTreeD3_Coverage.updateTreeD3_Coverage = updateTreeD3_Coverage;
}

var DropDownListCoverageSS = [];
function addElementsToSearchListCoverageSS(doc){
    DropDownListCoverageSS = [];
    var parentList = doc.allParentNames === null ? [] : (doc.allParentNames instanceof Array ? doc.allParentNames : [doc.allParentNames]);
    var leavesList = doc.allLeavesNames === null ? [] : (doc.allLeavesNames instanceof Array ? doc.allLeavesNames : [doc.allLeavesNames]);
    DropDownListCoverageSS = parentList.concat(leavesList);
    
    //AUTOCOMPLETE text box
    $('#covered_ss_search').autocomplete({
        source: DropDownListCoverageSS
    });
}

