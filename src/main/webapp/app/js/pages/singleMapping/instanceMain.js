/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */
var InstanceDropDownSearchList = [];
var InstanceDirectDropDownSearchList = [];
var INSTANCEData;
var prevSelectedUID = '';

var RESOURCEType = {
    Class : 'Class',
    Literal: 'Literal',
    Instance: 'Instance'
};
var LinkTypeInstancePage ={
    SubClass: "dashed",
    Green: "green",
    Normal: "normal"
};

function initInstancePage(){
    
    var mapping = $.parseJSON(sessionStorage.Mapping);
    
    try{
        var dataRecordsFile = mapping.info.example_data_info.example_data_target_record;
        if(dataRecordsFile){
            //make ajax request
            AjaxRequests.SingleMapping.GetInstanceData();
        }
        else{
            throw "No mapping data target record.";
        }
    }
    catch (er){
        //already evaluated errorsMain.js
        //APPENDError("[Instance] Mapping does not include data target record!", ERRORSPriority.High);
    }
}

$(document).ready(function () {
    
    $('#instanceSearchBTN').click(function () {
        var uri = $('#instanceSearch').val();
        var clazz = findResourceFromInstanceData(uri, RESOURCEType.Class);
        if(clazz) CreateGraphInstancePage(clazz, RESOURCEType.Class);
    });
    
    $("#instanceSearch").keyup(function (e) {
        if (e.keyCode === 13) {
            setTimeout(function(){ 
                $('#instanceSearchBTN').click();
            }, 200);
        }
    });
    
    $('#instanceDirectSearchBTN').click(function () {
        var uri = $('#instanceDirectSearch').val();
        var instance = findResourceFromInstanceData(uri, RESOURCEType.Instance);
        if(instance) CreateGraphInstancePage(instance, RESOURCEType.Instance);
    });
    
    $("#instanceDirectSearch").keyup(function (e) {
        if (e.keyCode === 13) {
            setTimeout(function(){ 
                $('#instanceDirectSearchBTN').click();
            }, 200);
        }
    });
});


function ManageInstanceData(DATA){
    //console.log(DATA);
    
    try{
        // save data
        INSTANCEData = DATA;

        //add classes to search
        var classList = DATA.classes === null ? [] : (DATA.classes instanceof Array ? DATA.classes : [DATA.classes]);
        $.each(classList, function (i, c) {
            InstanceDropDownSearchList.push(c.uri);
        }); 

        //AUTOCOMPLETE text box
        $('#instanceSearch').autocomplete({
            source: InstanceDropDownSearchList
        });

        //add instances to search
        var instancesList = DATA.instances === null ? [] : (DATA.instances instanceof Array ? DATA.instances : [DATA.instances]);
        $.each(instancesList, function (i, c) {
            InstanceDirectDropDownSearchList.push(c.uri);
        }); 

        //AUTOCOMPLETE text box
        $('#instanceDirectSearch').autocomplete({
            source: InstanceDirectDropDownSearchList
        });
    }
    catch (err){
        $('#noInstancesAlert').show();
        APPENDError('[Instances] No Instance data available yet!', ERRORSPriority.High);
    }
}

function CreateGraphInstancePage(NODE, type){
    if(type === RESOURCEType.Class){
        var curInstanceList = findInstancesOfClass(NODE.uri);
        if(curInstanceList.length <= 0){
            alert('No instances of class: ' + NODE.label);
            return false; //do nothing
        }
        else{
            NODE = curInstanceList[0];
        }
    }
    
    var graph = {"nodes": [], "links": []};
    
    function createResourceNode(res, type) {
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
        }
        if(type === RESOURCEType.Class){ 
            return {id: guid(), fullLabel: res.uri, label: res.label, data: res, type: "circle", score: 0.5};
        }
        else{
            var label = res.label;
            if(!res.label) label = res.uri;
            return {id: guid(), fullLabel: res.uri, label: label, data: res, type: "triangle-up"};
        }
    }
    
    function createLiteralNode(literal) {
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
        }
        return {id: guid(), fullLabel: literal, label: literal, data: literal, type: "square", score: 0.2};
    }
    
    function createProperty(source, target, property) {
        var lineType = LinkTypeInstancePage.Normal;
        if(property.uri === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'){
            lineType = LinkTypeInstancePage.SubClass;
        }
        graph.links.push({"source": source, "target": target, fullLabel: property.uri, "label": property.label, "type": lineType});
    }
    
    var NODENode = createResourceNode(NODE);
    graph.nodes.push(NODENode);
    
    //Add outgoingProperties
    if(NODE.outgoingProperties){
        var outproperties = NODE.outgoingProperties === null ? [] : 
                (NODE.outgoingProperties instanceof Array ? NODE.outgoingProperties : [NODE.outgoingProperties]); 
        $.each(outproperties, function (j, p) {
            var resNode;
            if(p.type === "resource"){
                var res = findResourceFromInstanceData(p.resource, RESOURCEType.Class);
                var type = RESOURCEType.Class;
                if(!res){ 
                    res = findResourceFromInstanceData(p.resource, RESOURCEType.Instance);
                    type = RESOURCEType.Instance;
                }
                if(res){
                    resNode = createResourceNode(res, type);
                    graph.nodes.push(resNode);
                }
                if(resNode) createProperty(NODENode, resNode, p);
            }
            else{
                var literNode = createLiteralNode(p.resource);
                graph.nodes.push(literNode);
                createProperty(NODENode, literNode, p);
            }
        });
    }
    
    //Add incomingProperties
    if(NODE.incomingProperties){
        var inproperties = NODE.incomingProperties === null ? [] : 
                (NODE.incomingProperties instanceof Array ? NODE.incomingProperties : [NODE.incomingProperties]); 
        $.each(inproperties, function (j, p) {
            var resNode;
            if(p.type === "resource"){
                var res = findResourceFromInstanceData(p.resource, RESOURCEType.Class);
                var type = RESOURCEType.Class;
                if(!res){ 
                    res = findResourceFromInstanceData(p.resource, RESOURCEType.Instance);
                    type = RESOURCEType.Instance;
                }
                if(res){
                    resNode = createResourceNode(res, type);
                    graph.nodes.push(resNode);
                }
                if(resNode) createProperty(resNode, NODENode, p);
            }
            else{
                var literNode = createLiteralNode(p.resource);
                graph.nodes.push(literNode);
                createProperty(literNode, NODENode, p);
            }
        });
    }

    
    //console.log(NODE);
    DRAWGraph_InstancePage(graph, NODENode);
}

function DRAWGraph_InstancePage(graph, CURRENTNODE) {
    
    var w = 1000;
    var h = 600;

    //var keyc = true, keys = true, keyt = true, keyr = true, keyx = true, keyd = true, keyl = true, keym = true, keyh = true, key1 = true, key2 = true, key3 = true, key0 = true

    var focus_node = null, highlight_node = null;
    var text_center = false;
    var outline = false;
    var min_score = 0;
    var max_score = 1;

    var color = d3.scale.linear()
            .domain([min_score, (min_score + max_score) / 2, max_score])
            .range(["lime", "yellow", "red"]);

    var highlight_color = "blue";
    var highlight_trans = 0.1;

    var size = d3.scale.pow().exponent(1)
            .domain([1, 100])
            .range([8, 24]);

    var force = d3.layout.force()
            .linkDistance(250)
            .charge(-300)
            .size([w, h]);

    var default_node_color = "#808080";
    var default_link_color = "#888";
    var nominal_base_node_size = 8;
    var nominal_text_size = 10;
    var max_text_size = 24;
    var nominal_stroke = 1.5;
    var max_stroke = 4.5;
    var max_base_node_size = 36;
    var min_zoom = 0.1;
    var max_zoom = 7;
    
    $("#instanceGraph > svg").remove();
    var svg = d3.select("#instanceGraph").append("svg");
    var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])
    var g = svg.append("g");
    svg.style("cursor", "move");


    function isConnected(a, b) {
        var con = false;
        graph.links.forEach(function (d) {
            if(
                    ((d.source.id === a.id) && (d.target.id === b.id)) ||
                    ((d.source.id === b.id) && (d.target.id === a.id)) ||
                    a.index === b.index 
            ){
                con = true;
            }
        });
        return con;
    }


    force.nodes(graph.nodes)
        .links(graph.links)
        .start();

    svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("refX", 15) /*must be smarter way to calculate shift*/
            .attr("refY", 2)
            .attr("markerWidth", 6)
            .attr("markerHeight", 4)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0,0 V 4 L6,2 Z");

    var link = g.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", nominal_stroke)
            .attr("marker-end", "url(#arrowhead)")
            .style("stroke", function (d) {
                if (isNumber(d.score) && d.score >= 0)
                    return color(d.score);
                else
                    return default_link_color;
            });
    
    var linktext = g.selectAll("g.linklabelholder").data(graph.links);
    
    linktext.enter().append("g").attr("class", "linklabelholder")
            .append("text")
            .attr("class", "linklabel")
            .attr("dx", 1)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function(d) { 
                return d.label; 
            });

    var node = g.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);

    var tocolor = "fill";
    var towhite = "stroke";
    if (outline) {
        tocolor = "stroke";
        towhite = "fill";
    }

    var circle = node.append("path")
            .attr("d", d3.svg.symbol()
            .size(function (d) {
                return Math.PI * Math.pow(size(d.size) || nominal_base_node_size, 2);
            })
            .type(function (d) {
                return d.type;
            }))
            .style(tocolor, function (d) {
                if (isNumber(d.score) && d.score >= 0)
                    return color(d.score);
                else
                    return default_node_color;
            })
            //.attr("r", function(d) { return size(d.size)||nominal_base_node_size; })
            .style("stroke-width", nominal_stroke)
            .style(towhite, "white")
            .attr("class", function (d) {
                if(d.id === CURRENTNODE.id){
                    return "currentSelected";
                }
                if(d.fullLabel === prevSelectedUID){
                    return "previousSelected";
                }
                else {
                    return "";
                }
            });


    var text = g.selectAll(".text")
            .data(graph.nodes)
            .enter().append("text")
            .attr("dy", ".35em")
            .style("font-size", nominal_text_size + "px")
            .on("click", function (d) {
                    drawNewGraph(d);
            })
            if (text_center)
                text.text(function (d) {
                    return d.label;
                })
                .style("text-anchor", "middle");
            else
                text.attr("dx", function (d) {
                    return (size(d.size) || nominal_base_node_size);
                })
                .text(function (d) {
                    return '\u2002' + d.label;
                });

    node.on("mouseover", function (d) {
                set_highlight(d);
            })
            .on("mousedown", function (d) {
                d3.event.stopPropagation();
                focus_node = d;
                set_focus(d)
                if (highlight_node === null)
                    set_highlight(d)

            }).on("mouseout", function (d) {
        exit_highlight();
    });
    
       
    d3.select(window).on("mouseup", function () {
        if (focus_node !== null)
        {
            focus_node = null;
            if (highlight_trans < 1)
            {

                circle.style("opacity", 1);
                text.style("opacity", 1);
                link.style("opacity", 1);
            }
        }

        if (highlight_node === null)
            exit_highlight();
    });

    function exit_highlight()
    {
        highlight_node = null;
        if (focus_node === null)
        {
            svg.style("cursor", "move");
            if (highlight_color != "white")
            {
                circle.style(towhite, "white");
                text.style("font-weight", "normal")
                    .text(function (d) {
                        return '\u2002' + d.label;
                    });
                link.style("stroke", function (o) {
                    return (isNumber(o.score) && o.score >= 0) ? color(o.score) : default_link_color
                });
                linktext.selectAll("text").text(function (o) {
                    return o.label;
                });
            }

        }
    }

    function set_focus(d)
    {
        if (highlight_trans < 1) {
            circle.style("opacity", function (o) {
                return isConnected(d, o) ? 1 : highlight_trans;
            });

            text.style("opacity", function (o) {
                return isConnected(d, o) ? 1 : highlight_trans;
            });

            link.style("opacity", function (o) {
                return o.source.index == d.index || o.target.index == d.index ? 1 : highlight_trans;
            });
            
            linktext.style("opacity", function (o) {
                return o.source.index == d.index || o.target.index == d.index ? 1 : highlight_trans;
            });
        }
    }


    function set_highlight(d)
    {
        svg.style("cursor", "pointer");
        if (focus_node !== null)
            d = focus_node;
        highlight_node = d;

        if (highlight_color != "white")
        {
            circle.style(towhite, function (o) {
                return isConnected(d, o) ? highlight_color : "white";
            });
            text.style("font-weight", function (o) {
                    return isConnected(d, o) ? "bold" : "normal";
                })
                .text(function (o) {
                    return isConnected(d, o) ? '\u2002' + o.fullLabel : '\u2002' + o.label;
                });
            link.style("stroke", function (o) {
                return o.source.index == d.index || o.target.index == d.index ? highlight_color : ((isNumber(o.score) && o.score >= 0) ? color(o.score) : default_link_color);
            });
            linktext.selectAll("text").text(function (o) {
                return o.source.index == d.index || o.target.index == d.index ? o.fullLabel : o.label;
            });
            
        }
    }


    zoom.on("zoom", function () {

        var stroke = nominal_stroke;
        if (nominal_stroke * zoom.scale() > max_stroke)
            stroke = max_stroke / zoom.scale();
        link.style("stroke-width", stroke);
        circle.style("stroke-width", stroke);

        var base_radius = nominal_base_node_size;
        if (nominal_base_node_size * zoom.scale() > max_base_node_size)
            base_radius = max_base_node_size / zoom.scale();
        circle.attr("d", d3.svg.symbol()
                .size(function (d) {
                    return Math.PI * Math.pow(size(d.size) * base_radius / nominal_base_node_size || base_radius, 2);
                })
                .type(function (d) {
                    return d.type;
                }))

        //circle.attr("r", function(d) { return (size(d.size)*base_radius/nominal_base_node_size||base_radius); })
        if (!text_center)
            text.attr("dx", function (d) {
                return (size(d.size) * base_radius / nominal_base_node_size || base_radius);
            });

        var text_size = nominal_text_size;
        if (nominal_text_size * zoom.scale() > max_text_size)
            text_size = max_text_size / zoom.scale();
        text.style("font-size", text_size + "px");
        linktext.selectAll("text").style("font-size", text_size*0.7 + "px");

        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    });

    svg.call(zoom);

    resize();
    
    force.on("tick", function () {

        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        text.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        
        linktext.attr("transform", function(d) {
            return "translate(" + (d.source.x + d.target.x) / 2 + "," 
            + (d.source.y + d.target.y) / 2 + ")"; });

        link.attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

        node.attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
    });

    function resize() {
        var width = w, height = h;
        svg.attr("width", width).attr("height", height);

        force.size([force.size()[0] + (width - w) / zoom.scale(), force.size()[1] + (height - h) / zoom.scale()]).resume();
        w = width;
        h = height;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    function drawNewGraph(d){
        if(CURRENTNODE.fullLabel === d.fullLabel){
            return false; //do nothing
        }
        
        var uri = d.fullLabel;
        var clazz = findResourceFromInstanceData(uri, RESOURCEType.Class);
        if(clazz) {
            prevSelectedUID = uri;
            CreateGraphInstancePage(clazz, RESOURCEType.Class);
        }
        else{
            var instance = findResourceFromInstanceData(uri, RESOURCEType.Instance);
            if(instance) {
                prevSelectedUID = CURRENTNODE.fullLabel;
                CreateGraphInstancePage(instance, RESOURCEType.Instance);
            }
        }
    }
}

// Helepers
//*******************8
function findResourceFromInstanceData(uri, listType){
    var curList;
    if(listType === RESOURCEType.Class){
        curList = INSTANCEData.classes === null ? [] : (INSTANCEData.classes instanceof Array ? INSTANCEData.classes : [INSTANCEData.classes]);
    }
    else if(listType === RESOURCEType.Instance){
        curList = INSTANCEData.instances === null ? [] : (INSTANCEData.instances instanceof Array ? INSTANCEData.instances : [INSTANCEData.instances]);
    }
    else{
        curList = [];
    }
    
    var curResource;
    $.each(curList, function (i, r) {
        if(r.uri === uri) curResource = r;
    });
    return curResource;
}

function findInstancesOfClass(clazzUri){
    var instList = [];
    
    var curList = INSTANCEData.instances === null ? [] :
            (INSTANCEData.instances instanceof Array ? INSTANCEData.instances :
            [INSTANCEData.instances]);
    
    $.each(curList, function (i, r) {
        var classTypeList = r.typeClass === null ? [] :
            (r.typeClass instanceof Array ? r.typeClass :
            [r.typeClass]);
        $.each(classTypeList, function (j, t) {
            if(t === clazzUri) instList.push(r);
        });
    });
    
    return instList;
}
