/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */
var TargetSchemataPercentagePage;

function initTargetPercentagePage() {
    AjaxRequests.SingleMapping.GetCoveredElementsTargetSchema();
}

$(document).ready(function () {

    $('#target_percentage table.targetSchemataMetricsTable').on('click', 'tr.tschema', function () {
        $('#target_percentage table.targetSchemataMetricsTable tr.tschema').removeClass('active');
        $(this).addClass('active');
        var index = $(this).attr('index');
        var targetFile;
        if ($.isArray(TargetSchemataPercentagePage)) {
            targetFile = TargetSchemataPercentagePage[index];
        } else {
            targetFile = TargetSchemataPercentagePage;
        }

        DrawMetricsToChart(targetFile);

        try {
            setTimeout(function () {
                ManangeDrawGraphsCoveragePage();
            }, 500);
        } catch (er) {
            APPENDError('[Target Coverage] Cannot find target file, ' + er, ERRORSPriority.High);
        }
    });
});

function addMetricsToTargetPercentagePage(DATA) {

    var metrics;
    var tsMetricsOverview;

    if (!DATA) {
        metrics = $.parseJSON(sessionStorage.CoverageMetrics);
        tsMetricsOverview = metrics.overviewMetrics.tSMetrics;
    } else {
        metrics = DATA.metrics;
        tsMetricsOverview = metrics.overviewMetrics.tSMetrics;
    }
    //target_percentage page
    $('#target_percentage .direct_metrics .covClasses').val(tsMetricsOverview.directMetric.CoveredClasses);
    $('#target_percentage .direct_metrics .covProps').val(tsMetricsOverview.directMetric.CoveredProperties);
    $('#target_percentage .direct_metrics .covTS').val(tsMetricsOverview.directMetric.CoveredTargetSchema);

    //target_percentage page
    $('#target_percentage .leaves_metrics .covClasses').val(tsMetricsOverview.leavesMetric.CoveredClasses);
    $('#target_percentage .leaves_metrics .covProps').val(tsMetricsOverview.leavesMetric.CoveredProperties);
    $('#target_percentage .leaves_metrics .covTS').val(tsMetricsOverview.leavesMetric.CoveredTargetSchema);

    /* jQueryKnob */
    $("#target_percentage .knob").trigger('change');

    var targetSchemata = metrics.singleTSMetricsList;
    var tsList = targetSchemata === null ? [] : (targetSchemata instanceof Array ? targetSchemata : [targetSchemata]);

    //save singleTSMetricsList to local var
    TargetSchemataPercentagePage = targetSchemata;

    $('#target_percentage table.targetSchemataMetricsTable tr.tschema').remove();
    $.each(tsList, function (i, metric) {
        appendSingleTSMetric(i, metric);
    });
    $('#target_percentage table.targetSchemataMetricsTable tr.tschema').first().click();
}

function appendSingleTSMetric(count, schema) {
    var version = schema.Version;
    var schemaFile = schema.FileName;
    var type = schema.Type;
    var name = schema.Name;

    $('#target_percentage table.targetSchemataMetricsTable').append(
            '<tr index="' + count + '" class="tschema" file="' + schemaFile + '">\
                <td>' + ++count + '</td>\
                <td>' + name + '</td>\
                <td>' + type + '</td>\
                <td>' + version + '</td>\
                <td><a href="' + GlobalResources.Services.TargetSchemaService + schemaFile + '" target="blank">' + schemaFile + '</a></td>\
            </tr>');
}

function DrawMetricsToChart(targetFile) {
    //-------------
    //- BAR CHART -
    //-------------
    var directMetrics = targetFile.tSMetrics.directMetric;
    var leavesMetrics = targetFile.tSMetrics.leavesMetric;

    var areaChartData = {
        labels: ["Covered Classes", "Covered Properties", "Average Coverage"],
        datasets: [
            {
                label: "Direct Metric",
                fillColor: "rgba(210, 214, 222, 1)",
                strokeColor: "rgba(210, 214, 222, 1)",
                pointColor: "rgba(210, 214, 222, 1)",
                pointStrokeColor: "#c1c7d1",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [directMetrics.CoveredClasses,
                    directMetrics.CoveredProperties,
                    directMetrics.CoveredTargetSchema]
            },
            {
                label: "Leaves Metric",
                fillColor: "rgba(60,141,188,0.9)",
                strokeColor: "rgba(60,141,188,0.8)",
                pointColor: "#3b8bba",
                pointStrokeColor: "rgba(60,141,188,1)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(60,141,188,1)",
                data: [leavesMetrics.CoveredClasses,
                    leavesMetrics.CoveredProperties,
                    leavesMetrics.CoveredTargetSchema]
            }
        ]
    };

    //remove previous chart and create it again
    $('#target_percentage .chart .barChart').remove();
    $('#target_percentage .chart').append('<canvas class="barChart" style="height:230px"></canvas>');


    var barChartCanvas = $("#target_percentage .chart .barChart").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas);
    var barChartData = areaChartData;
    barChartData.datasets[1].fillColor = "#00a65a";
    barChartData.datasets[1].strokeColor = "#00a65a";
    barChartData.datasets[1].pointColor = "#00a65a";
    var barChartOptions = {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,
        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth: 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - If there is a stroke on each bar
        barShowStroke: true,
        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,
        //Number - Spacing between each of the X value sets
        barValueSpacing: 100,
        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        //Boolean - whether to make the chart responsive
        responsive: true,
        maintainAspectRatio: true
    };

    barChartOptions.datasetFill = false;
    barChart.Bar(barChartData, barChartOptions);
}



// GRAW GRAPHS
//*********************
function ManangeDrawGraphsCoveragePage() {
    var currentFile = $('#target_percentage table.targetSchemataMetricsTable tr.tschema.active').attr('file');
    var targetSchemata = $.parseJSON(sessionStorage.TargetSchemata);

    var files = targetSchemata.TargetSchemaFile === null ? [] :
            (targetSchemata.TargetSchemaFile instanceof Array ? targetSchemata.TargetSchemaFile :
                    [targetSchemata.TargetSchemaFile]);

    var curTS;
    $.each(files, function (i, f) {
        if (f.FileName === currentFile)
            curTS = f;
    });

    if (curTS) {
        DrawTargetGraph_Classes_CoveragePage(curTS);
        DrawTargetGraph_Properties_CoveragePage(curTS);
    } else {
        APPENDError('[Target Coverage] No target schema data for graph', ERRORSPriority.Medium);
    }
}


function DrawTargetGraph_Classes_CoveragePage(targetFile) {

    //Empty graph
    $('#TSCoverageGraph > svg').remove();
    var coveredElements = $.parseJSON(sessionStorage.CoveredElementsTargetSchema);
    var coveredClasses = coveredElements.coveredClassesList === null ? [] :
            (coveredElements.coveredClassesList instanceof Array ? coveredElements.coveredClassesList :
                    [coveredElements.coveredClassesList]);
    $("#target_percentage .coveredClassesTextualList li").remove();
    $.each(coveredClasses, function (i, c) {
        if (c !== "" && c !== " ") {
            var cl = c.replace("noprefix", "");
            $("#target_percentage .coveredClassesTextualList").append('<li>' + cl + '</li>');
        }
    });


    function isCoveredClass(uri) {
        var covered = false;

        $.each(coveredClasses, function (i, c) {
            var tmp = c.split(":")[1];
            if (tmp === uri.data.label)
                covered = true;
        });
        return covered;
    }

    function createClassNode(i, clas) {
        return {id: clas.uri, label: clas.label, data: clas, index: i};
    }

    function createProperty(source, target, label) {
        var sourceNode = graph.nodes.filter(function (n) {
            return n.id === source;
        })[0],
                targetNode = graph.nodes.filter(function (n) {
                    return n.id === target;
                })[0];
        if (sourceNode && targetNode) {
            graph.links.push({"source": sourceNode, "target": targetNode, "bond": 1, "label": label});
        }
    }

    var graph = {"nodes": [], "links": []};
    var classList = targetFile.classes === null ? [] : (targetFile.classes instanceof Array ? targetFile.classes : [targetFile.classes]);
    $.each(classList, function (i, c) {
        //if (c.label && c.label !== "")
        graph.nodes.push(createClassNode(i, c));
    });

    //Find Subclasses
    $.each(classList, function (i, c) {
        if (c.subclasses) {
            var sblist = c.subclasses === null ? [] : (c.subclasses instanceof Array ? c.subclasses : [c.subclasses]);
            $.each(sblist, function (i, sc) {
                createProperty(c.uri, sc, "subClassOf");
            });
        }
    });


    // Some constants
    var WIDTH = 960,
            HEIGHT = 600,
            SHOW_THRESHOLD = 2;

    // Declare the variables pointing to the node & link arrays
    var nodeArray = graph.nodes;
    var linkArray = graph.links;

    // Variables keeping graph state
    var activeClass = undefined;
    var currentOffset = {x: 0, y: 0};
    var currentZoom = 1.0;

    // The D3.js scales
    var xScale = d3.scale.linear()
            .domain([0, WIDTH])
            .range([0, WIDTH]);
    var yScale = d3.scale.linear()
            .domain([0, 0])
            .range([0, 0]);
    var zoomScale = d3.scale.linear()
            .domain([1, 6])
            .range([1, 6])
            .clamp(true);

    /* .......................................................................... */

    // The D3.js force-directed layout
    var force = d3.layout.force()
            .charge(-100)
            .friction(0.8)
            .gravity(0.1)
            .size([WIDTH, HEIGHT])
            .linkStrength(1);

    // Add to the page the SVG element that will contain the graph
    var svg = d3.select("#TSCoverageGraph").append("svg:svg")
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .attr("viewBox", "0 0 " + WIDTH + " " + HEIGHT)
            .attr("preserveAspectRatio", "xMidYMid meet");



    /* ....................................................................... */

    // Get the current size & offset of the browser's viewport window
    function getViewportSize(w) {
        var w = w || window;
        if (w.innerWidth !== null)
            return {w: w.innerWidth,
                h: w.innerHeight,
                x: w.pageXOffset,
                y: w.pageYOffset};
        var d = w.document;
        if (document.compatMode === "CSS1Compat")
            return {w: d.documentElement.clientWidth,
                h: d.documentElement.clientHeight,
                x: d.documentElement.scrollLeft,
                y: d.documentElement.scrollTop};
        else
            return {w: d.body.clientWidth,
                h: d.body.clientHeight,
                x: d.body.scrollLeft,
                y: d.body.scrollTop};
    }


    /* Compose the content for the panel with class details.
     Parameters: the node data, and the array containing all nodes
     */
    function getClassInfo(n) {
        $('#target_percentage .selectionDetails .name').text(n.data.label);

        var covered = 'Covered';
        if (n.covered === false) {
            covered = 'Not Covered';
        }
        $('#target_percentage .selectionDetails .covered').text(covered);
    }

    minLinkWeight =
            Math.min.apply(null, linkArray.map(function (n) {
                return n.weight;
            }));
    maxLinkWeight =
            Math.max.apply(null, linkArray.map(function (n) {
                return n.weight;
            }));

    // Add the node & link arrays to the layout, and start it
    force
            .nodes(nodeArray)
            .links(linkArray)
            .start();

    // A couple of scales for node radius & edge width
    var node_size = d3.scale.linear()
            .domain([5, 10])	// we know score is in this domain
            .range([1, 16])
            .clamp(true);
    var edge_width = d3.scale.pow().exponent(8)
            .domain([minLinkWeight, maxLinkWeight])
            .range([1, 3])
            .clamp(true);

    /* Add drag & zoom behaviours */
    svg.call(d3.behavior.drag()
            .on("drag", dragmove));
    svg.call(d3.behavior.zoom()
            .x(xScale)
            .y(yScale)
            .scaleExtent([1, 10])
            .on("zoom", doZoomCov));

    // ------- Create the elements of the layout (links and nodes) ------

    var networkGraph = svg.append('svg:g').attr('class', 'grpParentCov');

    // links: simple lines
    var graphLinks = networkGraph.append('svg:g').attr('class', 'grp gLinks')
            .selectAll("line")
            .data(linkArray, function (d) {
                return d.source.id + '-' + d.target.id;
            })
            .enter().append("line")
            .style('stroke-width', function (d) {
                return edge_width(d.weight);
            })
            .attr("class", "link");

    // nodes: an SVG circle
    var graphNodes = networkGraph.append('svg:g').attr('class', 'grp gNodes')
            .selectAll("circle")
            .data(nodeArray, function (d) {
                return d.id;
            })
            .enter().append("svg:circle")
            .attr('id', function (d) {
                return "Cov_c" + d.index;
            })
            .attr('class', function (d) {
                var classes = 'node';
                var cidoc = findClassfrom_CIDOC_CRM(d.id); //Helper.js
                if (cidoc) {
                    classes = classes + " cidoc " + cidoc.color;
                }
                var isCovered = isCoveredClass(d);
                d.covered = isCovered;
                if (isCovered === true) {
                    classes += " level1";
                } else {
                    classes += " level3";
                }
                return classes;// + ++level;
            })
            .attr('r', function (d) {
                var size = parseFloat(d.data.size);
//                console.log(size);
                if (size < 6) {
                    size = 6;
                } else if (size >= 6 && size <= 10) {
                    size += 2;
                } else if (size > 15)
                    size = 15;
//                size+=5;
                return size;//node_size(d.data.size || 3);
            })
            .attr('pointer-events', 'all')
            .on("click", function (d) {
                //console.log(d.id);
                getClassInfo(d);
            })
            .on("mouseover", function (d) {
                highlightGraphNodeCov(d, true, this);
            })
            .on("mouseout", function (d) {
                highlightGraphNodeCov(d, false, this);
            });

    // labels: a group with two SVG text: a title and a shadow (as background)
    var graphLabels = networkGraph.append('svg:g').attr('class', 'grp gLabel')
            .selectAll("g.label")
            .data(nodeArray, function (d) {
                return d.label;
            })
            .enter().append("svg:g")
            .attr('id', function (d) {
                return "Cov_l" + d.index;
            })
            .attr('class', 'label');

    shadows = graphLabels.append('svg:text')
            .attr('x', '-2em')
            .attr('y', '-.3em')
            .attr('pointer-events', 'none') // they go to the circle beneath
            .attr('id', function (d) {
                return "lb" + d.index;
            })
            .attr('class', 'nshadow')
            .text(function (d) {
                return d.label;
            });

    labels = graphLabels.append('svg:text')
            .attr('x', '-2em')
            .attr('y', '-.3em')
            .attr('pointer-events', 'none') // they go to the circle beneath
            .attr('id', function (d) {
                return "lf" + d.index;
            })
            .attr('class', 'nlabel')
            .text(function (d) {
                return d.label;
            });


    /* --------------------------------------------------------------------- */
    /* Select/unselect a node in the network graph.
     Parameters are: 
     - node: data for the node to be changed,  
     - on: true/false to show/hide the node
     */
    function highlightGraphNodeCov(node, on) {
        //if( d3.event.shiftKey ) on = false; // for debugging

        // If we are to activate a class, and there's already one active,
        // first switch that one off
        if (on && activeClass !== undefined) {
            highlightGraphNodeCov(nodeArray[activeClass], false);
        }

        // locate the SVG nodes: circle & label group
        circle = d3.select('#Cov_c' + node.index);
        label = d3.select('#Cov_l' + node.index);

        // activate/deactivate the node itself
        circle
                .classed('main', on);
        label
                .classed('on', on || currentZoom >= SHOW_THRESHOLD);
        label.selectAll('text')
                .classed('main', on);

        // activate all siblings
        try {
            var subClazzes = node.data.subclasses === null ? [] :
                    (node.data.subclasses instanceof Array ? node.data.subclasses :
                            [node.data.subclasses]);
            Object(subClazzes).forEach(function (uri) {
                var index = findIndex(uri, graph.nodes);
                d3.select("#Cov_c" + index).classed('sibling', on);
                label = d3.select('#Cov_l' + index);
                label.classed('on', on || currentZoom >= SHOW_THRESHOLD);
                label.selectAll('text.nlabel')
                        .classed('sibling', on);
            });
        } catch (err) {
        }

        // set the value for the current active class
        activeClass = on ? node.index : undefined;
    }





    /* --------------------------------------------------------------------- */
    /* Move all graph elements to its new positions. Triggered:
     - on node repositioning (as result of a force-directed iteration)
     - on translations (user is panning)
     - on zoom changes (user is zooming)
     - on explicit node highlight (user clicks in a class panel link)
     Set also the values keeping track of current offset & zoom values
     */
    function repositionGraph(off, z, mode) {

        // do we want to do a transition?
        var doTr = (mode == 'move');

        // drag: translate to new offset
        if (off !== undefined &&
                (off.x != currentOffset.x || off.y != currentOffset.y)) {
            g = d3.select('g.grpParentCov')
            if (doTr)
                g = g.transition().duration(500);
            g.attr("transform", function (d) {
                return "translate(" +
                        off.x + "," + off.y + ")"
            });
            currentOffset.x = off.x;
            currentOffset.y = off.y;
        }

        // zoom: get new value of zoom
        if (z === undefined) {
            if (mode != 'tick')
                return;	// no zoom, no tick, we don't need to go further
            z = currentZoom;
        } else
            currentZoom = z;

        // move edges
        e = doTr ? graphLinks.transition().duration(500) : graphLinks;
        e
                .attr("x1", function (d) {
                    return z * (d.source.x);
                })
                .attr("y1", function (d) {
                    return z * (d.source.y);
                })
                .attr("x2", function (d) {
                    return z * (d.target.x);
                })
                .attr("y2", function (d) {
                    return z * (d.target.y);
                });

        // move nodes
        n = doTr ? graphNodes.transition().duration(500) : graphNodes;
        n
                .attr("transform", function (d) {
                    return "translate("
                            + z * d.x + "," + z * d.y + ")"
                });
        // move labels
        l = doTr ? graphLabels.transition().duration(500) : graphLabels;
        l
                .attr("transform", function (d) {
                    return "translate("
                            + z * d.x + "," + z * d.y + ")"
                });
    }


    /* --------------------------------------------------------------------- */
    /* Perform drag
     */
    function dragmove(d) {
        offset = {x: currentOffset.x + d3.event.dx,
            y: currentOffset.y + d3.event.dy};
        repositionGraph(offset, undefined, 'drag');
    }


    /* --------------------------------------------------------------------- */
    /* Perform zoom. We do "semantic zoom", not geometric zoom
     * (i.e. nodes do not change size, but get spread out or stretched
     * together as zoom changes)
     */
    function doZoomCov(increment) {
        newZoom = increment === undefined ? d3.event.scale
                : zoomScale(currentZoom + increment);
        if (currentZoom == newZoom)
            return;	// no zoom change

        // See if we cross the 'show' threshold in either direction
        if (currentZoom < SHOW_THRESHOLD && newZoom >= SHOW_THRESHOLD)
            svg.selectAll("g.label").classed('on', true);
        else if (currentZoom >= SHOW_THRESHOLD && newZoom < SHOW_THRESHOLD)
            svg.selectAll("g.label").classed('on', false);

        // See what is the current graph window size
        s = getViewportSize();
        width = s.w < WIDTH ? s.w : WIDTH;
        height = s.h < HEIGHT ? s.h : HEIGHT;

        // Compute the new offset, so that the graph center does not move
        zoomRatio = newZoom / currentZoom;
        newOffset = {x: currentOffset.x * zoomRatio + width / 2 * (1 - zoomRatio),
            y: currentOffset.y * zoomRatio + height / 2 * (1 - zoomRatio)};

        // Reposition the graph
        repositionGraph(newOffset, newZoom, "zoom");
    }

    //zoomCall = doZoom;	// unused, so far

    /* --------------------------------------------------------------------- */

    /* process events from the force-directed graph */
    force.on("tick", function () {
        repositionGraph(undefined, undefined, 'tick');
    });




    function findIndex(uri, list) {
        var index = -1;
        $.each(list, function (i, n) {
            if (n.data.uri === uri) {
                index = n.index;
            }
        });
        return index;
    }

    function selectClass(new_idx, doMoveTo) {
        // do we want to center the graph on the node?
        doMoveTo = doMoveTo || false;
        if (doMoveTo) {
            s = getViewportSize();
            width = s.w < WIDTH ? s.w : WIDTH;
            height = s.h < HEIGHT ? s.h : HEIGHT;
            offset = {x: s.x + width / 2 - nodeArray[new_idx].x * currentZoom,
                y: s.y + height / 2 - nodeArray[new_idx].y * currentZoom};
            repositionGraph(offset, undefined, 'move');
        }
        // Now highlight the graph node and show its class panel
        highlightGraphNodeCov(nodeArray[new_idx], true);
        getClassInfo(nodeArray[new_idx]);
    }
    ;


}

function DrawTargetGraph_Properties_CoveragePage(targetFile) {
    //Empty graph
    $('#TSCoverageGraphProperties > svg').remove();

    var coveredElements = $.parseJSON(sessionStorage.CoveredElementsTargetSchema);
    var coveredProps = coveredElements.coveredPropertiesList === null ? [] :
            (coveredElements.coveredPropertiesList instanceof Array ? coveredElements.coveredPropertiesList :
                    [coveredElements.coveredPropertiesList]);
    $("#target_percentage .coveredPropertiesTextualList li").remove();
    $.each(coveredProps, function (i, c) {
        if (c !== "") {
            var cl = c.replace("noprefix", "");
            $("#target_percentage .coveredPropertiesTextualList").append('<li>' + cl + '</li>');
        }
    });

    function isCoveredProperty(uri) {
        var covered = false;
        $.each(coveredProps, function (i, c) {
            var tmp = c.split(":")[1];
            if (tmp === uri.data.label)
                covered = true;
        });
        return covered;
    }

    function createClassNode(i, clas) {
        return {id: clas.uri, label: clas.label, data: clas, index: i};
    }

    function createProperty(source, target, label) {
        var sourceNode = graph.nodes.filter(function (n) {
            return n.id === source;
        })[0],
                targetNode = graph.nodes.filter(function (n) {
                    return n.id === target;
                })[0];
        if (sourceNode && targetNode) {
            graph.links.push({"source": sourceNode, "target": targetNode, "bond": 1, "label": label});
        }
    }

    var graph = {"nodes": [], "links": []};
    var propertiesList = targetFile.properties === null ? [] : (targetFile.properties instanceof Array ? targetFile.properties : [targetFile.properties]);
    $.each(propertiesList, function (i, c) {
        //if (c.label && c.label !== "")
        graph.nodes.push(createClassNode(i, c));
    });
    //Find Subclasses
    $.each(propertiesList, function (i, c) {
        if (c.subproperties) {
            var sblist = c.subproperties === null ? [] : (c.subproperties instanceof Array ? c.subproperties : [c.subproperties]);
            $.each(sblist, function (i, sc) {
                createProperty(c.uri, sc, "subClassOf");
            });
        }
    });


    // Some constants
    var WIDTH = 960,
            HEIGHT = 600,
            SHOW_THRESHOLD = 2;

    // Declare the variables pointing to the node & link arrays
    var nodeArray = graph.nodes;
    var linkArray = graph.links;

    // Variables keeping graph state
    var activeClass = undefined;
    var currentOffset = {x: 0, y: 0};
    var currentZoom = 1.0;

    // The D3.js scales
    var xScale = d3.scale.linear()
            .domain([0, WIDTH])
            .range([0, WIDTH]);
    var yScale = d3.scale.linear()
            .domain([0, 0])
            .range([0, 0]);
    var zoomScale = d3.scale.linear()
            .domain([1, 6])
            .range([1, 6])
            .clamp(true);

    /* .......................................................................... */

    // The D3.js force-directed layout
    var force = d3.layout.force()
            .charge(-100)
            .friction(0.8)
            .gravity(0.3)
            .size([WIDTH, HEIGHT])
            .linkStrength(1);

    // Add to the page the SVG element that will contain the graph
    var svg = d3.select("#TSCoverageGraphProperties").append("svg:svg")
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .attr("viewBox", "0 0 " + WIDTH + " " + HEIGHT)
            .attr("preserveAspectRatio", "xMidYMid meet");



    /* ....................................................................... */

    // Get the current size & offset of the browser's viewport window
    function getViewportSize(w) {
        var w = w || window;
        if (w.innerWidth !== null)
            return {w: w.innerWidth,
                h: w.innerHeight,
                x: w.pageXOffset,
                y: w.pageYOffset};
        var d = w.document;
        if (document.compatMode === "CSS1Compat")
            return {w: d.documentElement.clientWidth,
                h: d.documentElement.clientHeight,
                x: d.documentElement.scrollLeft,
                y: d.documentElement.scrollTop};
        else
            return {w: d.body.clientWidth,
                h: d.body.clientHeight,
                x: d.body.scrollLeft,
                y: d.body.scrollTop};
    }


    /* Compose the content for the panel with class details.
     Parameters: the node data, and the array containing all nodes
     */
    function getClassInfo(n) {
        $('#target_percentage .selectionDetailsProps .name').text(n.data.label);

        var covered = 'Covered';
        if (n.covered === false) {
            covered = 'Not Covered';
        }
        $('#target_percentage .selectionDetailsProps .covered').text(covered);
    }

    minLinkWeight =
            Math.min.apply(null, linkArray.map(function (n) {
                return n.weight;
            }));
    maxLinkWeight =
            Math.max.apply(null, linkArray.map(function (n) {
                return n.weight;
            }));

    // Add the node & link arrays to the layout, and start it
    force
            .nodes(nodeArray)
            .links(linkArray)
            .start();

    // A couple of scales for node radius & edge width
    var node_size = d3.scale.linear()
            .domain([5, 10])	// we know score is in this domain
            .range([1, 16])
            .clamp(true);
    var edge_width = d3.scale.pow().exponent(8)
            .domain([minLinkWeight, maxLinkWeight])
            .range([1, 3])
            .clamp(true);

    /* Add drag & zoom behaviours */
    svg.call(d3.behavior.drag()
            .on("drag", dragmove));
    svg.call(d3.behavior.zoom()
            .x(xScale)
            .y(yScale)
            .scaleExtent([1, 10])
            .on("zoom", doZoomPropsCov));

    // ------- Create the elements of the layout (links and nodes) ------

    var networkGraph = svg.append('svg:g').attr('class', 'grpParentPropsCov');

    // links: simple lines
    var graphLinks = networkGraph.append('svg:g').attr('class', 'grp gLinks')
            .selectAll("line")
            .data(linkArray, function (d) {
                return d.source.id + '-' + d.target.id;
            })
            .enter().append("line")
            .style('stroke-width', function (d) {
                return edge_width(d.weight);
            })
            .attr("class", "link");

    // nodes: an SVG circle
    var graphNodes = networkGraph.append('svg:g').attr('class', 'grp gNodes')
            .selectAll("circle")
            .data(nodeArray, function (d) {
                return d.id;
            })
            .enter().append("svg:circle")
            .attr('id', function (d) {
                return "PropsCov_c" + d.index;
            })
            .attr('class', function (d) {
                var classes = 'node ';
                var isCovered = isCoveredProperty(d);
                d.covered = isCovered;
                if (isCovered === true) {
                    classes += "level1";
                } else {
                    classes += "level3";
                }
                return classes;
            })
            .attr('r', function (d) {
                var size = 5;
                return size;//node_size(d.data.size || 3);
            })
            .attr('pointer-events', 'all')
            .on("click", function (d) {
                //console.log(d.id);
                getClassInfo(d);
            })
            .on("mouseover", function (d) {
                highlightGraphNodePropsCov(d, true, this);
            })
            .on("mouseout", function (d) {
                highlightGraphNodePropsCov(d, false, this);
            });

    // labels: a group with two SVG text: a title and a shadow (as background)
    var graphLabels = networkGraph.append('svg:g').attr('class', 'grp gLabel')
            .selectAll("g.label")
            .data(nodeArray, function (d) {
                return d.label;
            })
            .enter().append("svg:g")
            .attr('id', function (d) {
                return "PropsCov_l" + d.index;
            })
            .attr('class', 'label');

    shadows = graphLabels.append('svg:text')
            .attr('x', '-2em')
            .attr('y', '-.3em')
            .attr('pointer-events', 'none') // they go to the circle beneath
            .attr('id', function (d) {
                return "lb" + d.index;
            })
            .attr('class', 'nshadow')
            .text(function (d) {
                return d.label;
            });

    labels = graphLabels.append('svg:text')
            .attr('x', '-2em')
            .attr('y', '-.3em')
            .attr('pointer-events', 'none') // they go to the circle beneath
            .attr('id', function (d) {
                return "lf" + d.index;
            })
            .attr('class', 'nlabel')
            .text(function (d) {
                return d.label;
            });


    /* --------------------------------------------------------------------- */
    /* Select/unselect a node in the network graph.
     Parameters are: 
     - node: data for the node to be changed,  
     - on: true/false to show/hide the node
     */
    function highlightGraphNodePropsCov(node, on) {

        //if( d3.event.shiftKey ) on = false; // for debugging

        // If we are to activate a class, and there's already one active,
        // first switch that one off
        if (on && activeClass !== undefined) {
            highlightGraphNodePropsCov(nodeArray[activeClass], false);
        }

        // locate the SVG nodes: circle & label group
        circle = d3.select('#PropsCov_c' + node.index);
        label = d3.select('#PropsCov_l' + node.index);

        // activate/deactivate the node itself
        circle
                .classed('main', on);
        label
                .classed('on', on || currentZoom >= SHOW_THRESHOLD);
        label.selectAll('text')
                .classed('main', on);

        // activate all siblings
        try {
            var subClazzes = node.data.subproperties === null ? [] :
                    (node.data.subproperties instanceof Array ? node.data.subproperties :
                            [node.data.subproperties]);
            Object(subClazzes).forEach(function (uri) {
                var index = findIndex(uri, graph.nodes);
                d3.select("#PropsCov_c" + index).classed('sibling', on);
                label = d3.select('#PropsCov_l' + index);
                label.classed('on', on || currentZoom >= SHOW_THRESHOLD);
                label.selectAll('text.nlabel')
                        .classed('sibling', on);
            });
        } catch (err) {
        }

        // set the value for the current active class
        activeClass = on ? node.index : undefined;
    }





    /* --------------------------------------------------------------------- */
    /* Move all graph elements to its new positions. Triggered:
     - on node repositioning (as result of a force-directed iteration)
     - on translations (user is panning)
     - on zoom changes (user is zooming)
     - on explicit node highlight (user clicks in a class panel link)
     Set also the values keeping track of current offset & zoom values
     */
    function repositionGraph(off, z, mode) {

        // do we want to do a transition?
        var doTr = (mode == 'move');

        // drag: translate to new offset
        if (off !== undefined &&
                (off.x != currentOffset.x || off.y != currentOffset.y)) {
            g = d3.select('g.grpParentPropsCov')
            if (doTr)
                g = g.transition().duration(500);
            g.attr("transform", function (d) {
                return "translate(" +
                        off.x + "," + off.y + ")"
            });
            currentOffset.x = off.x;
            currentOffset.y = off.y;
        }

        // zoom: get new value of zoom
        if (z === undefined) {
            if (mode != 'tick')
                return;	// no zoom, no tick, we don't need to go further
            z = currentZoom;
        } else
            currentZoom = z;

        // move edges
        e = doTr ? graphLinks.transition().duration(500) : graphLinks;
        e
                .attr("x1", function (d) {
                    return z * (d.source.x);
                })
                .attr("y1", function (d) {
                    return z * (d.source.y);
                })
                .attr("x2", function (d) {
                    return z * (d.target.x);
                })
                .attr("y2", function (d) {
                    return z * (d.target.y);
                });

        // move nodes
        n = doTr ? graphNodes.transition().duration(500) : graphNodes;
        n
                .attr("transform", function (d) {
                    return "translate("
                            + z * d.x + "," + z * d.y + ")"
                });
        // move labels
        l = doTr ? graphLabels.transition().duration(500) : graphLabels;
        l
                .attr("transform", function (d) {
                    return "translate("
                            + z * d.x + "," + z * d.y + ")"
                });
    }


    /* --------------------------------------------------------------------- */
    /* Perform drag
     */
    function dragmove(d) {
        offset = {x: currentOffset.x + d3.event.dx,
            y: currentOffset.y + d3.event.dy};
        repositionGraph(offset, undefined, 'drag');
    }


    /* --------------------------------------------------------------------- */
    /* Perform zoom. We do "semantic zoom", not geometric zoom
     * (i.e. nodes do not change size, but get spread out or stretched
     * together as zoom changes)
     */
    function doZoomPropsCov(increment) {
        newZoom = increment === undefined ? d3.event.scale
                : zoomScale(currentZoom + increment);
        if (currentZoom == newZoom)
            return;	// no zoom change

        // See if we cross the 'show' threshold in either direction
        if (currentZoom < SHOW_THRESHOLD && newZoom >= SHOW_THRESHOLD)
            svg.selectAll("g.label").classed('on', true);
        else if (currentZoom >= SHOW_THRESHOLD && newZoom < SHOW_THRESHOLD)
            svg.selectAll("g.label").classed('on', false);

        // See what is the current graph window size
        s = getViewportSize();
        width = s.w < WIDTH ? s.w : WIDTH;
        height = s.h < HEIGHT ? s.h : HEIGHT;

        // Compute the new offset, so that the graph center does not move
        zoomRatio = newZoom / currentZoom;
        newOffset = {x: currentOffset.x * zoomRatio + width / 2 * (1 - zoomRatio),
            y: currentOffset.y * zoomRatio + height / 2 * (1 - zoomRatio)};

        // Reposition the graph
        repositionGraph(newOffset, newZoom, "zoom");
    }


    /* --------------------------------------------------------------------- */

    /* process events from the force-directed graph */
    force.on("tick", function () {
        repositionGraph(undefined, undefined, 'tick');
    });




    function findIndex(uri, list) {
        var index = -1;
        $.each(list, function (i, n) {
            if (n.data.uri === uri) {
                index = n.index;
            }
        });
        return index;
    }

    function selectClass(new_idx, doMoveTo) {
        // do we want to center the graph on the node?
        doMoveTo = doMoveTo || false;
        if (doMoveTo) {
            s = getViewportSize();
            width = s.w < WIDTH ? s.w : WIDTH;
            height = s.h < HEIGHT ? s.h : HEIGHT;
            offset = {x: s.x + width / 2 - nodeArray[new_idx].x * currentZoom,
                y: s.y + height / 2 - nodeArray[new_idx].y * currentZoom};
            repositionGraph(offset, undefined, 'move');
        }
        // Now highlight the graph node and show its class panel
        highlightGraphNodePropsCov(nodeArray[new_idx], true);
        getClassInfo(nodeArray[new_idx]);
    }
    ;


}

