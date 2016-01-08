/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

var ActiveTargetSchemaDropDownList = [];
var ActiveTargetSchemaDropDownListProps = [];
var ActiveTargetSchemaDropDownListALL = [];
var ALL_TARGET_SCHEMATA;

function initTargetSchemaPage() {
    AjaxRequests.SingleMapping.GetTargetSchemata();
}

$(document).ready(function () {

    $('#target_schema table.targetSchemataTable').on('click', 'tr.tschema', function () {
        $('#target_schema table.targetSchemataTable tr.tschema').removeClass('active');
        $(this).addClass('active');
        var index = $(this).attr('index');
        var targetSchemata = $.parseJSON(sessionStorage.TargetSchemata);
        ALL_TARGET_SCHEMATA = targetSchemata;
        var targetFile;
        if ($.isArray(targetSchemata.TargetSchemaFile)) {
            targetFile = targetSchemata.TargetSchemaFile[index];
        }
        else {
            targetFile = targetSchemata.TargetSchemaFile;
        }
        //DrawTargetGraph_D3(targetFile);
        //DrawTargetGraph_Sigma(targetFile);
        DrawTargetGraph_D3_2_Classes(targetFile);
        DrawTargetGraph_D3_2_Properties(targetFile);
        addClassesToSearchListTS(targetFile);
        addPropertiesToSearchListTS(targetFile);
    });
    
    $('#targetSelectionStatistics h5.subclasses').on('click', 'li a', function () {
        var index = $(this).attr('index');
        if(index && index>=0) DrawTargetGraph_D3_2_Classes.selectClass(index, true);
    });
    
    $('#target_schema_search_BTN').click(function () {
        var uri = $('#target_schema_search').val();
        var index = DrawTargetGraph_D3_2_Classes.findIndex(uri, DrawTargetGraph_D3_2_Classes.graph.nodes);
        if(index && index>=0) DrawTargetGraph_D3_2_Classes.selectClass(index, true);
    });
    
    $("#target_schema_search").keyup(function (e) {
        if (e.keyCode === 13) {
            setTimeout(function(){ 
                $('#target_schema_search_BTN').click();
            }, 200);
        }
    });
    
    $('#target_schema_search_properties_BTN').click(function () {
        var uri = $('#target_schema_search_properties').val();
        var index = DrawTargetGraph_D3_2_Properties.findIndex(uri, DrawTargetGraph_D3_2_Properties.graph.nodes);
        if(index && index>=0) DrawTargetGraph_D3_2_Properties.selectClass(index, true);
    });
    
    $("#target_schema_search_properties").keyup(function (e) {
        if (e.keyCode === 13) {
            setTimeout(function(){ 
                $('#target_schema_search_properties_BTN').click();
            }, 200);
        }
    });
    
    $('#loadDefaultCidocExcludeListBTN').click(function () {
        try{
            var exUris = EXCLUDE_CLASSES_CIDOC === null ? [] : (EXCLUDE_CLASSES_CIDOC instanceof Array ? EXCLUDE_CLASSES_CIDOC : [EXCLUDE_CLASSES_CIDOC]); 
            $.each(exUris, function (i, u) {
                appendExcludingURITS(u);
            });
        }
        catch (er){
            APPENDError('[Target Schema] Default List not found!, ' + er, ERRORSPriority.High);
            alert("Default List not found!");
        }
    });
    
    $('#excludeTableTS').on('click', '.excludeRowTS button.remove', function () {
        $(this).closest('tr.excludeRowTS').remove();
    });
    
    $('#addExcludeListTSBTN').click(function () {
        var uri = $('#target_schema_search_ALL').val();
        if(uri !== ""){
            appendExcludingURITS(uri);
        }
    });
    
    // Ajax Request
    //*******************
    $('#saveExcludingListTS').click(function () {
        var list = [];
        $('#excludeTableTS .excludeRowTS').each(function( index, row ) {
            var uri = $(this).attr("uri");
            list.push(uri);
        });
        if(list.length>0 && !GlobalResources.System.DebugMode){
            AjaxRequests.SingleMapping.GetMetricsWithExcludingListTS(list);
        }
    });
});

function addClassesToSearchListTS(targetFile){
    ActiveTargetSchemaDropDownList = [];
    var classList = targetFile.classes === null ? [] : (targetFile.classes instanceof Array ? targetFile.classes : [targetFile.classes]);
    $.each(classList, function (i, c) {
        ActiveTargetSchemaDropDownList.push(c.uri);
        ActiveTargetSchemaDropDownListALL.push(c.uri);
    });
    
    //AUTOCOMPLETE text box
    $('#target_schema_search').autocomplete({
        source: ActiveTargetSchemaDropDownList
    });
    
    //Show details
    var details = targetFile.targetSchemaMetrics;
    var type = targetFile.Type;
    $('#target_schema .statistics .type').text(type);
    $('#target_schema .statistics .classes').text(details.classCount);
    $('#target_schema .statistics .properties').text(details.propertyCount);
}

function addPropertiesToSearchListTS(targetFile){
    ActiveTargetSchemaDropDownListProps = [];
    var classList = targetFile.properties === null ? [] : (targetFile.properties instanceof Array ? targetFile.properties : [targetFile.properties]);
    $.each(classList, function (i, c) {
        ActiveTargetSchemaDropDownListProps.push(c.uri);
        ActiveTargetSchemaDropDownListALL.push(c.uri);
    });
    
    //AUTOCOMPLETE text box
    $('#target_schema_search_properties').autocomplete({
        source: ActiveTargetSchemaDropDownListProps
    });
    
    $('#target_schema_search_ALL').autocomplete({
        source: ActiveTargetSchemaDropDownListALL
    });
}

function RenderTargetSchemata() {
    var targetSchemata = $.parseJSON(sessionStorage.TargetSchemata);
    var targetFile = targetSchemata.TargetSchemaFile;

    if (targetFile) {
        var tsList = targetFile === null ? [] : (targetFile instanceof Array ? targetFile : [targetFile]);
        $.each(tsList, function (index, ti) {
            appendTargetSchema_Line(index, ti);
        });
    }
    else {
        $('#target_schema table.targetSchemataTable').append(
                '<tr class="tschema">\
                <td>-</td>\
                <td>-</td>\
                <td>-</td>\
                <td>-</td>\
                <td>-</td>\
            </tr>');
    }
    $('#target_schema table.targetSchemataTable tr.tschema').first().click();
}

function appendTargetSchema_Line(count, schema) {
    var version = schema.Version;
    var schemaFile = schema.FileName;
    var type = schema.Type;
    var name = schema.Name;

    $('#target_schema table.targetSchemataTable').append(
            '<tr index="' + count + '" class="tschema">\
                <td>' + ++count + '</td>\
                <td>' + name + '</td>\
                <td>' + type + '</td>\
                <td>' + version + '</td>\
                <td><a href="' + GlobalResources.Services.TargetSchemaService + schemaFile + '" target="blank">' + schemaFile + '</a></td>\
            </tr>');
}

function appendExcludingURITS(uri){
    $('#excludeTableTS').append(
        '<tr class="excludeRowTS" uri="' + uri + '">\
            <td>' + uri + '</td>\
            <td>-</td>\
            <td><span class="label label-warning">Pending</span></td>\
            <td><button class="remove btn btn-danger btn-flat" type="button"><i class="fa fa-times"></i></button></td>\
        </tr>'
    );
}

// Respond from request
function appendExcludingResultsTS(data){
    //<p class="text-green">Text green to emphasize success</p>
    $('#target_schema .excludingResultsLabel').empty();
    $('#target_schema .excludingResultsLabel').append(
            '<p class="text-green page_navigator_mirror" goto="target_percentage">New Metrics are available!</p>'
    );
    
    setTimeout(function(){ 
        $('#target_schema .excludingResultsLabel').empty();
    }, 10000);
    
    $('#excludeTableTS .excludeRowTS').remove();
    var exludList = data.excludingEntities === null ? [] : (data.excludingEntities instanceof Array ? data.excludingEntities : [data.excludingEntities]); 
    $.each(exludList, function (i, entity) {
        $('#excludeTableTS').append(
            '<tr class="excludeRowTS" uri="' + entity.name + '">\
                <td>' + entity.name + '</td>\
                <td>' + entity.covered + '</td>\
                <td><span class="label label-success">Checked</span></td>\
                <td><button class="remove btn btn-danger btn-flat" type="button"><i class="fa fa-times"></i></button></td>\
            </tr>'
        );
    });
}



// GRAW GRAPHS
//*********************
function DrawTargetGraph_D3_2_Classes(targetFile) {
    //Empty graph
    $('#TSGraphDisplay > svg').remove();

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
    var svg = d3.select("#TSGraphDisplay").append("svg:svg")
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
        $('#targetSelectionStatistics .name').text(n.data.label);
        $('#targetSelectionStatistics .type').text('Class');
        $('#targetSelectionStatistics .uri').text(n.data.uri);
        if(n.data.comment){
            $('#targetSelectionStatistics .commentInfo').text(n.data.comment);
        }

        var info = '';
        if (n.data.subclasses) {
            info += '<ul>';
            if ($.isArray(n.data.subclasses)) {
                $.each(n.data.subclasses, function (i, uri) {
                    var index = findIndex(uri, graph.nodes);
                    info += '<li><a href="javascript:void(0);" index="'+index+'">' + uri + '</a></li>';
                });
            } else {
                var index = findIndex(n.data.subclasses, graph.nodes);
                info += '<li><a href="javascript:void(0);" index="'+index+'">' + n.data.subclasses + '</a></li>';
            }
            info += '</ul>';
        }
        $('#targetSelectionStatistics .subclasses').html(info);
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
            .on("zoom", doZoom));

    // ------- Create the elements of the layout (links and nodes) ------

    var networkGraph = svg.append('svg:g').attr('class', 'grpParent');

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
                return "c" + d.index;
            })
            .attr('class', function (d) {
                var classes = 'node level2';
                var cidoc = findClassfrom_CIDOC_CRM(d.id); //Helper.js
                if(cidoc){
                    classes = classes + " cidoc " + cidoc.color;
                }
                return classes;// + ++level;
            })
            .attr('r', function (d) {
                var size = parseFloat(d.data.size);
//                console.log(size);
                if(size < 6) {size = 6;}
                else if(size>=6 && size<=10) {size+=2;}
                else if( size > 15) size = 15;
//                size+=5;
                return size;//node_size(d.data.size || 3);
            })
            .attr('pointer-events', 'all')
            //.on("click", function(d) { highlightGraphNode(d,true,this); } )    
            .on("click", function (d) {
                //console.log(d.id);
                getClassInfo(d);
            })
            .on("mouseover", function (d) {
                highlightGraphNode(d, true, this);
            })
            .on("mouseout", function (d) {
                highlightGraphNode(d, false, this);
            });

    // labels: a group with two SVG text: a title and a shadow (as background)
    var graphLabels = networkGraph.append('svg:g').attr('class', 'grp gLabel')
            .selectAll("g.label")
            .data(nodeArray, function (d) {
                return d.label;
            })
            .enter().append("svg:g")
            .attr('id', function (d) {
                return "l" + d.index;
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
    function highlightGraphNode(node, on) {
        //if( d3.event.shiftKey ) on = false; // for debugging

        // If we are to activate a class, and there's already one active,
        // first switch that one off
        if (on && activeClass !== undefined) {
            highlightGraphNode(nodeArray[activeClass], false);
        }

        // locate the SVG nodes: circle & label group
        circle = d3.select('#c' + node.index);
        label = d3.select('#l' + node.index);

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
                d3.select("#c" + index).classed('sibling', on);
                label = d3.select('#l' + index);
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
            g = d3.select('g.grpParent')
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
        }
        else
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
    function doZoom(increment) {
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
        highlightGraphNode(nodeArray[new_idx], true);
        getClassInfo(nodeArray[new_idx]);
    };

    //Public functions
    DrawTargetGraph_D3_2_Classes.selectClass = selectClass;
    DrawTargetGraph_D3_2_Classes.findIndex = findIndex;
    DrawTargetGraph_D3_2_Classes.graph = graph;
}

function DrawTargetGraph_D3_2_Properties(targetFile) {
    //Empty graph
    $('#TSGraphDisplay_properties > svg').remove();

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
    var svg = d3.select("#TSGraphDisplay_properties").append("svg:svg")
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
        $('#targetSelectionStatistics_properties .name').text(n.data.label);
        $('#targetSelectionStatistics_properties .type').text('Property');
        $('#targetSelectionStatistics_properties .uri').text(n.data.uri);
        if(n.data.comment){
            $('#targetSelectionStatistics_properties .commentInfo').text(n.data.comment);
        }

        var infodomain = '';
        if (n.data.domain) {
            infodomain += '<ul>';
            if ($.isArray(n.data.domain)) {
                $.each(n.data.domain, function (i, uri) {
                    var index = findIndex(uri, graph.nodes);
                    infodomain += '<li  index="'+index+'">' + uri + '</li>';
                });
            } else {
                var index = findIndex(n.data.domain, graph.nodes);
                infodomain += '<li index="'+index+'">' + n.data.domain + '</li>';
            }
            infodomain += '</ul>';
        }
        $('#targetSelectionStatistics_properties .domain').html(infodomain);
        
        var inforange = '';
        if (n.data.range) {
            inforange += '<ul>';
            if ($.isArray(n.data.range)) {
                $.each(n.data.range, function (i, uri) {
                    var index = findIndex(uri, graph.nodes);
                    inforange += '<li  index="'+index+'">' + uri + '</li>';
                });
            } else {
                var index = findIndex(n.data.range, graph.nodes);
                inforange += '<li index="'+index+'">' + n.data.range + '</li>';
            }
            inforange += '</ul>';
        }
        $('#targetSelectionStatistics_properties .range').html(inforange);
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
            .on("zoom", doZoomProps));

    // ------- Create the elements of the layout (links and nodes) ------

    var networkGraph = svg.append('svg:g').attr('class', 'grpParentProps');

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
                return "Props_c" + d.index;
            })
            .attr('class', function (d) {
                var classes = 'node level2';
                return classes;// + ++level;
            })
            .attr('r', function (d) {
                var size = 5;
                return size;//node_size(d.data.size || 3);
            })
            .attr('pointer-events', 'all')
            //.on("click", function(d) { highlightGraphNodeProps(d,true,this); } )    
            .on("click", function (d) {
                //console.log(d.id);
                getClassInfo(d);
            })
            .on("mouseover", function (d) {
                highlightGraphNodeProps(d, true, this);
            })
            .on("mouseout", function (d) {
                highlightGraphNodeProps(d, false, this);
            });

    // labels: a group with two SVG text: a title and a shadow (as background)
    var graphLabels = networkGraph.append('svg:g').attr('class', 'grp gLabel')
            .selectAll("g.label")
            .data(nodeArray, function (d) {
                return d.label;
            })
            .enter().append("svg:g")
            .attr('id', function (d) {
                return "Props_l" + d.index;
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
    function highlightGraphNodeProps(node, on) {
        
        //if( d3.event.shiftKey ) on = false; // for debugging

        // If we are to activate a class, and there's already one active,
        // first switch that one off
        if (on && activeClass !== undefined) {
            highlightGraphNodeProps(nodeArray[activeClass], false);
        }

        // locate the SVG nodes: circle & label group
        circle = d3.select('#Props_c' + node.index);
        label = d3.select('#Props_l' + node.index);

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
                d3.select("#Props_c" + index).classed('sibling', on);
                label = d3.select('#Props_l' + index);
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
            g = d3.select('g.grpParentProps')
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
        }
        else
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
    function doZoomProps(increment) {
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

    //zoomCall = doZoomProps;	// unused, so far

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
        highlightGraphNodeProps(nodeArray[new_idx], true);
        getClassInfo(nodeArray[new_idx]);
    };

    //Public functions
    DrawTargetGraph_D3_2_Properties.selectClass = selectClass;
    DrawTargetGraph_D3_2_Properties.findIndex = findIndex;
    DrawTargetGraph_D3_2_Properties.graph = graph;
}







