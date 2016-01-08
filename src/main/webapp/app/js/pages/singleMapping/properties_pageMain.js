/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

var CLAZZ_PropertyPage;
var PropsPageType ={
    SubClass: "dashed",
    Triangle: "green",
    Normal: "normal"
};

function initPropertiesPage(CLAZZ){
    CLAZZ_PropertyPage = CLAZZ;
    $('#properties_page h1 span').text(CLAZZ.uri);
    appendTriangles(CLAZZ);
    createSubClassesGraph_PropertiesPage(CLAZZ);
}



$(document).ready(function () {
    
    $('#SubclassesPropertiesBTN').click(function () {
        createSubClassesGraph_PropertiesPage(CLAZZ_PropertyPage);
    });
    
    $('#OutgoingPropertiesBTN').click(function () {
        createOutgoingPropertiesGraph(CLAZZ_PropertyPage);
    });
    
    $('#IncomingPropertiesBTN').click(function () {
        createInComingPropertiesGraph(CLAZZ_PropertyPage);
    });
    
    $('#trianglesTable').on('click', '.drawTriangleBTN', function () {
        var A = CLAZZ_PropertyPage;
        var AB = $(this).attr('AB');
        var B = $(this).attr('B');
        var BC = $(this).attr('BC');
        var C = $(this).attr('C');
        var CA = $(this).attr('CA');
        createTriangleGraph(A, AB, B, BC, C, CA);
    });
});

function createSubClassesGraph_PropertiesPage(CLAZZ){
    
    function createClassNode(clas) {
        return {id: clas.uri, label: clas.label, data: clas};
    }
    
    function createProperty(source, target, label, lineType) {
        var sourceNode = graph.nodes.filter(function (n) {
            return n.id === source.uri;
        })[0],
                targetNode = graph.nodes.filter(function (n) {
                    return n.id === target.uri;
                })[0];
        if (sourceNode && targetNode) {
            graph.links.push({"source": sourceNode, "target": targetNode, "label": label, "type": lineType});
        }
    }
    
    var graph = {"nodes": [], "links": []};
    graph.nodes.push(createClassNode(CLAZZ));
    
        //Add direct Subclasses
    if(CLAZZ.subclasses){
        var subclasses = CLAZZ.subclasses === null ? [] : (CLAZZ.subclasses instanceof Array ? CLAZZ.subclasses : [CLAZZ.subclasses]); 
        $.each(subclasses, function (j, c) {
            var subCls = findClassfrom_ALL_TARGET_SCHEMATA(c);
            graph.nodes.push(createClassNode(subCls));
            createProperty(subCls, CLAZZ, "", PropsPageType.SubClass);
        });
    }
    
    DRAW_PropertiesGRAPH(graph);
}

function createInComingPropertiesGraph(CLAZZ){
    function createClassNode(clas) {
        return {id: clas.uri, label: clas.label, data: clas};
    }
    
    function createProperty(source, target, label, lineType) {
        var sourceNode = graph.nodes.filter(function (n) {
            return n.id === source.uri;
        })[0],
                targetNode = graph.nodes.filter(function (n) {
                    return n.id === target.uri;
                })[0];
        if (sourceNode && targetNode) {
            graph.links.push({"source": sourceNode, "target": targetNode, "label": label, "type": lineType});
        }
    }
    
    var graph = {"nodes": [], "links": []};
    graph.nodes.push(createClassNode(CLAZZ));
    
    var graph = {"nodes": [], "links": []};
    graph.nodes.push(createClassNode(CLAZZ));
    
    //Start Creating Properties
    // **Incoming Properties
    var domainProperties = findPropertyWithRangeClass_ALL_TARGET_SCHEMATA(CLAZZ.uri);
    
    $.each(domainProperties, function (j, dp) {
        //create domain classes
        var domain = dp.domain === null ? [] : (dp.domain instanceof Array ? dp.domain : [dp.domain]);
        $.each(domain, function (j, d) {
            var dc = findClassfrom_ALL_TARGET_SCHEMATA(d);
            if(dc){
                graph.nodes.push(createClassNode(dc));
                createProperty(dc, CLAZZ, dp.label, PropsPageType.Normal);
            }
        });
    });
    DRAW_PropertiesGRAPH(graph);
    
}

function createOutgoingPropertiesGraph(CLAZZ){
    
    function createClassNode(clas) {
        return {id: clas.uri, label: clas.label, data: clas};
    }
    
    function createProperty(source, target, label, lineType) {
        var sourceNode = graph.nodes.filter(function (n) {
            return n.id === source.uri;
        })[0],
                targetNode = graph.nodes.filter(function (n) {
                    return n.id === target.uri;
                })[0];
        if (sourceNode && targetNode) {
            graph.links.push({"source": sourceNode, "target": targetNode, "label": label, "type": lineType});
        }
    }
    
    var graph = {"nodes": [], "links": []};
    graph.nodes.push(createClassNode(CLAZZ));
    
    //Start Creating Properties
    // **OutGoing Properties
    var domainProperties = findPropertyWithDomainClass_ALL_TARGET_SCHEMATA(CLAZZ.uri);
    
    $.each(domainProperties, function (j, dp) {
        //create domain classes
        var range = dp.range === null ? [] : (dp.range instanceof Array ? dp.range : [dp.range]);
        $.each(range, function (j, d) {
            var dc = findClassfrom_ALL_TARGET_SCHEMATA(d);
            if(dc){
                graph.nodes.push(createClassNode(dc));
                createProperty(CLAZZ, dc, dp.label, PropsPageType.Normal);
            }
        });
    });
    DRAW_PropertiesGRAPH(graph);
}

function createTriangleGraph(Aclass, AB, B, BC, C, CA){
    
    function createClassNode(clas) {
        return {id: clas.uri, label: clas.label, data: clas};
    }
    
    function createProperty(source, target, label, lineType) {
        var sourceNode = graph.nodes.filter(function (n) {
            return n.id === source.uri;
        })[0],
                targetNode = graph.nodes.filter(function (n) {
                    return n.id === target.uri;
                })[0];
        if (sourceNode && targetNode) {
            graph.links.push({"source": sourceNode, "target": targetNode, "label": label, "type": lineType});
        }
    }
    
    var graph = {"nodes": [], "links": []};
    
    var Bclass = findClassfrom_ALL_TARGET_SCHEMATA(B);
    var Cclass = findClassfrom_ALL_TARGET_SCHEMATA(C);
    var ABLabel = AB.substring(AB.lastIndexOf('/') + 1, AB.length);
    var BCLabel = BC.substring(BC.lastIndexOf('/') + 1, BC.length);
    var CALabel = CA.substring(CA.lastIndexOf('/') + 1, CA.length);
    
    graph.nodes.push(createClassNode(Aclass));
    graph.nodes.push(createClassNode(Bclass));
    graph.nodes.push(createClassNode(Cclass));
    
    createProperty(Aclass, Bclass, ABLabel, PropsPageType.Triangle);
    createProperty(Bclass, Cclass, BCLabel, PropsPageType.Triangle);
    createProperty(Cclass, Aclass, CALabel, PropsPageType.Triangle);
    
    DRAW_PropertiesGRAPH(graph);
}


function DRAW_PropertiesGRAPH(graph){
    
    function findLinksWithSameSourceAndTarget(link){
        var linkList = [];
        $.each(graph.links, function (j, l) {
            if( l.source.id === link.source.id && l.target.id === link.target.id){
                linkList.push(l);
            }
        });
        return linkList;
    }
    
    //seperate mulitple links to same source and target nodes
    $.each(graph.links, function (j, l) {
        var sameLinks = findLinksWithSameSourceAndTarget(l);
        if(sameLinks.length > 1){
            $.each(sameLinks, function (k, sl) {
               if(!sl.sameLinkIndex) sl.sameLinkIndex = k; 
            });
        }
    });
    
    
    var width = 1000,
        height = 500;
        
    var xScale = d3.scale.linear()
            .domain([0, width])
            .range([0, width]);
    var yScale = d3.scale.linear()
            .domain([0, 0])
            .range([0, 0]);

    var force = d3.layout.force()
            .nodes(graph.nodes)
            .links(graph.links)
            .size([width, height])
            .linkDistance(200)
            .charge(-300)
            .on("tick", tick)
            .start();

    $("#PropertiesGraph > svg").remove();
    var svgMaster = d3.select("#PropertiesGraph").append("svg")
            .attr("width", width)
            .attr("height", height);
    
    var svg = svgMaster.append("g");

// Per-type markers, as they don't inherit styles.
    svg.append("defs").selectAll("marker")
            .data([PropsPageType.SubClass, PropsPageType.Triangle, PropsPageType.Normal])
            .enter().append("marker")
            .attr("id", function (d) {
                return d;
            })
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", -1.5)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
    
    svgMaster.call(d3.behavior.zoom()
            .x(xScale)
            .y(yScale)
            .scaleExtent([1, 10])
            .on("zoom", doZoom));

    var path = svg.append("g").selectAll("path")
            .data(force.links())
            .enter().append("path")
            .attr("class", function (d) {
                return "link " + d.type;
            })
            .attr("marker-end", function (d) {
                return "url(#" + d.type + ")";
            });

    var circle = svg.append("g").selectAll("circle")
            .data(force.nodes())
            .enter().append("circle")
            .attr("r", 8)
            .call(force.drag)
            .on("click", function (d) {
                //console.log(d);
            })
            .attr("class", function (d) {
                if(d.id === CLAZZ_PropertyPage.uri){
                    return "currentClass";
                }
            });

    var text = svg.append("g")
            .attr("class", "clabels")
            .selectAll("text")
            .data(force.nodes())
            .enter().append("text")
            .attr("x", 8)
            .attr("y", ".31em")
            .text(function (d) {
                return d.label;
            });
            
    var props = svg.append("g")
            .attr("class", "props")
            .selectAll(".link")
            .data(force.links())
            .enter().append("text")
            .attr("x", function (d) {
                if (d.target.y === d.source.y && d.target.x === d.source.x) {//same target and source
                    return d.source.x + 10;
                }
                else if (d.target.x > d.source.x) {
                    return ((d.source.x + (d.target.x - d.source.x) / 2) - (d.label.length * 2));
                }
                else {
                    return ((d.target.x + (d.source.x - d.target.x) / 2) - (d.label.length * 2));
                }
            })
            .attr("y", function (d) {
                if (d.target.y === d.source.y && d.target.x === d.source.x) {//same target and source
                    return d.source.y - 30;
                }
                else if (d.target.y > d.source.y) {
                    return (d.source.y + (d.target.y - d.source.y) / 2);
                }
                else {
                    return (d.target.y + (d.source.y - d.target.y) / 2);
                }
            })
            .text(function (d) {
                return d.label;
            });
    
    //add weight for each node to dom to delete them with jquery
    svg.selectAll("circle")
            .data(force.nodes())
            .attr("weight", function (d) {
                return d.weight;
            });
            
    svg.selectAll("g.clabels text")
            .data(force.nodes())
            .attr("weight", function (d) {
                return d.weight;
            });
    
    //remove lonely nodes
    $('#PropertiesGraph > svg circle').each(function( index, d ) {
        var weight = $(this).attr("weight");
        if(weight==='0') $(this).remove();
    });
    $('#PropertiesGraph > svg g.clabels text').each(function( index, d ) {
        var weight = $(this).attr("weight");
        if(weight==='0') $(this).remove();
    });
    
    

// Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
        path.attr("d", linkArc);
        circle.attr("transform", transform);
        text.attr("transform", transform);
        props.attr("x", function (d) {
                if (d.target.y === d.source.y && d.target.x === d.source.x) {//same target and source
                    var value = 10;
                    if(d.sameLinkIndex) value += d.sameLinkIndex*10;
                    return (d.source.x + value);
                }
                else if (d.target.x > d.source.x) {
                    var value = 0;
                    if(d.sameLinkIndex) value = d.sameLinkIndex*10;
                    return (((d.source.x + (d.target.x - d.source.x) / 2) - (d.label.length * 2)) + value);
                }
                else {
                    var value = 0;
                    if(d.sameLinkIndex) value = d.sameLinkIndex*10;
                    return (((d.target.x + (d.source.x - d.target.x) / 2) - (d.label.length * 2)) + value);
                }
            })
            .attr("y", function (d) {
                if (d.target.y === d.source.y && d.target.x === d.source.x) {//same target and source
                    var value = 10;
                    if(d.sameLinkIndex) value += d.sameLinkIndex*10;
                    return ((d.source.y - 40) + value);
                }
                else if (d.target.y > d.source.y) {
                    var value = 0;
                    if(d.sameLinkIndex) value += d.sameLinkIndex*10;
                    return ((d.source.y + (d.target.y - d.source.y) / 2) + value);
                }
                else {
                    var value = 0;
                    if(d.sameLinkIndex) value += d.sameLinkIndex*10;
                    return ((d.target.y + (d.source.y - d.target.y) / 2) + value);
                }
            });
        
    }

    function linkArc(d) {
        var x1 = d.source.x,
                y1 = d.source.y,
                x2 = d.target.x,
                y2 = d.target.y,
                dx = x2 - x1,
                dy = y2 - y1,
                dr = Math.sqrt(dx * dx + dy * dy),
                // Defaults for normal edge.
                drx = dr,
                dry = dr,
                xRotation = 0, // degrees
                largeArc = 0, // 1 or 0
                sweep = 1; // 1 or 0

        // Self edge.
        if (x1 === x2 && y1 === y2) {
            // Fiddle with this angle to get loop oriented.
            xRotation = -45;

            // Needs to be 1.
            largeArc = 1;

            // Change sweep to change orientation of loop. 
            //sweep = 0;

            // Make drx and dry different to get an ellipse
            // instead of a circle.
            drx = 30;
            dry = 20;

            // For whatever reason the arc collapses to a point if the beginning
            // and ending points of the arc are the same, so kludge it.
            x2 = x2 + 1;
            y2 = y2 + 1;
        }

        return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
     
//        //Default links
//        
//            var dx = d.target.x - d.source.x,
//                    dy = d.target.y - d.source.y,
//                    dr = Math.sqrt(dx * dx + dy * dy);
//            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
//        
    }

    function transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }
    
    var prevScale = 1;
    function doZoom() {
        if(d3.event.scale !== prevScale){//prevent drag on entire graph
            svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            prevScale = d3.event.scale;
        }
    }
}




// HELPERS
//**********************

function findClassfrom_ALL_TARGET_SCHEMATA(uri){
    try{
        var schemas = ALL_TARGET_SCHEMATA.TargetSchemaFile === null ? [] :
                (ALL_TARGET_SCHEMATA.TargetSchemaFile instanceof Array ? ALL_TARGET_SCHEMATA.TargetSchemaFile :
                [ALL_TARGET_SCHEMATA.TargetSchemaFile]);
        var clazz;
        $.each(schemas, function (i, s) {
            if(!clazz){
                var classes = s.classes === null ? [] : (s.classes instanceof Array ? s.classes : [s.classes]);
                $.each(classes, function (j, c) {
                    if(c.uri === uri) clazz = c;
                });
            }
        });
        return clazz;
    }
    catch (err){
        APPENDError("[Properties] Cannot find class with uri: " + uri, ERRORSPriority.High);
    }
    
}

function findPropertyWithDomainClass_ALL_TARGET_SCHEMATA(uri){
    try{
        var propList = [];
        function propExists(puri){
            var exist = false;
            $.each(propList, function (i, p) {
                if(p.uri === puri) exist = true;
            });
            return exist;
        }
        
        var schemas = ALL_TARGET_SCHEMATA.TargetSchemaFile === null ? [] :
                (ALL_TARGET_SCHEMATA.TargetSchemaFile instanceof Array ? ALL_TARGET_SCHEMATA.TargetSchemaFile :
                [ALL_TARGET_SCHEMATA.TargetSchemaFile]);
        
        $.each(schemas, function (i, s) {
            if(s.properties){
                var properties = s.properties === null ? [] : (s.properties instanceof Array ? s.properties : [s.properties]);
                $.each(properties, function (j, p) {
                    var domain = p.domain === null ? [] : (p.domain instanceof Array ? p.domain : [p.domain]);
                    $.each(domain, function (j, d) {
                        if(d === uri){ 
                            if(propExists(p.uri) === false ){
                                propList.push(p);
                            }
                        }
                    });
                });
            }
        });
        return propList;
    }
    catch (err){
        APPENDError("[Properties] Cannot find outgoing property with uri: " + uri, ERRORSPriority.High);
    }
}

function findPropertyWithRangeClass_ALL_TARGET_SCHEMATA(uri){
    try{
        var propList = [];
        function propExists(puri){
            var exist = false;
            $.each(propList, function (i, p) {
                if(p.uri === puri) exist = true;
            });
            return exist;
        }
        
        var schemas = ALL_TARGET_SCHEMATA.TargetSchemaFile === null ? [] :
                (ALL_TARGET_SCHEMATA.TargetSchemaFile instanceof Array ? ALL_TARGET_SCHEMATA.TargetSchemaFile :
                [ALL_TARGET_SCHEMATA.TargetSchemaFile]);
        
        $.each(schemas, function (i, s) {
            if(s.properties){
                var properties = s.properties === null ? [] : (s.properties instanceof Array ? s.properties : [s.properties]);
                $.each(properties, function (j, p) {
                    var range = p.range === null ? [] : (p.range instanceof Array ? p.range : [p.range]);
                    $.each(range, function (j, d) {
                        if(d === uri){ 
                            if(propExists(p.uri) === false ){
                                propList.push(p);
                            }
                        }
                    });
                });
            }
        });
        return propList;
    }
    catch (err){
        APPENDError("[Properties] Cannot find outgoing incoming with uri: " + uri, ERRORSPriority.High);
    }
}

function appendTriangles(CLAZZ){
    $("#trianglesTable .triangle_row").remove();
    if(CLAZZ.triangles){
        var triangles = CLAZZ.triangles === null ? [] : (CLAZZ.triangles instanceof Array ? CLAZZ.triangles : [CLAZZ.triangles]);
        $.each(triangles, function (i, tr) {
            $("#trianglesTable").append(
                '<tr class="triangle_row">\
                    <td>' + tr.AB + '</td>\
                    <td>' + tr.B + '</td>\
                    <td>' + tr.BC + '</td>\
                    <td>' + tr.C + '</td>\
                    <td>' + tr.CA + '</td>\
                    <td><button class="drawTriangleBTN btn btn-default"\
                        AB="' + tr.AB + '" B="' + tr.B + '" BC="' + tr.BC + '" C="' + tr.C + '" CA="' + tr.CA + '">Draw</button></td>\
                </tr>'
            );
        });
    }
    else{
        $("#trianglesTable").append(
            '<tr class="triangle_row">\
                <td>-</td>\
                <td>-</td>\
                <td>-</td>\
                <td>-</td>\
                <td>-</td>\
                <td>-</td>\
            </tr>'
        );
    }
}

