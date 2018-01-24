/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

//Global Variables
var SSpaper;
var SSgraph;
var ActiveSourceSchemaDropDownList = []; //inited at source schema percentage

function initSourceSchemaPage() {
    //Demo for jointjs: DrawSourceSchemaGraphDemo();
    
    var mapping = $.parseJSON(sessionStorage.Mapping);
    var type = mapping.info.source.source_info.source_schema.type;
    if (type.toLowerCase() === 'er'){   
        AjaxRequests.SingleMapping.GetERSourceSchema(sessionStorage.MappingID);
    }
    else{
        DrawTreeD3(); //D3 makes the request
    }
    
    RenderSourceSchemaDetails();
}

$(document).ready(function () {
    //Init JointJS
    SSgraph = new joint.dia.Graph();
    SSpaper = new joint.dia.Paper({
        el: $('#source_schema_graph'),
        //width: 800,
        //height: 600,
        gridSize: 1,
        model: SSgraph,
        linkPinning: false
    });
    
    
    //  CLICK Events
    //****************************
    SSpaper.on('cell:pointerdown',function(cellView, evt, x, y) { 
        //console.log(cellView.model.id + ' table was clicked'); 
    });
    
    
    $('#excludeTableSS').on('click', '.excludeRowSS button.remove', function () {
        $(this).closest('tr.excludeRowSS').remove();
    });
    
    $('#addExcludeListSSBTN').click(function () {
        var uri = $('#source_schema_search_ALL').val();
        if(uri !== ""){
            appendExcludingElements(uri);
        }
    });
    
    // Ajax Request
    //*******************
    $('#saveExcludingListSS').click(function () {
        var list = [];
        $('#excludeTableSS .excludeRowSS').each(function( index, row ) {
            var uri = $(this).attr("element");
            list.push(uri);
        });
        if(list.length>0 && !GlobalResources.System.DebugMode){
            AjaxRequests.SingleMapping.GetMetricsWithExcludingListSS(list);
        }
    });
});

function appendExcludingElements(element){
    
    $('#excludeTableSS').append(
        '<tr class="excludeRowSS" element="' + element + '">\
            <td>' + element + '</td>\
            <td>-</td>\
            <td><span class="label label-warning">Pending</span></td>\
            <td><button class="remove btn btn-danger btn-flat" type="button"><i class="fa fa-times"></i></button></td>\
        </tr>'
    );
}

function appendExcludingResultsSS(data){
    $('#source_schema .excludingResultsLabel').empty();
    $('#source_schema .excludingResultsLabel').append(
            '<p class="text-green page_navigator_mirror" goto="source_percentage">New Metrics are available!</p>'
    );
    
    setTimeout(function(){ 
        $('#source_schema .excludingResultsLabel').empty();
    }, 10000);
    
    $('#excludeTableSS .excludeRowSS').remove();
    var exludList = data.excludingEntities === null ? [] : (data.excludingEntities instanceof Array ? data.excludingEntities : [data.excludingEntities]); 
    $.each(exludList, function (i, entity) {
        $('#excludeTableSS').append(
            '<tr class="excludeRowSS" element="' + entity.name + '">\
                <td>' + entity.name + '</td>\
                <td>' + entity.covered + '</td>\
                <td><span class="label label-success">Checked</span></td>\
                <td><button class="remove btn btn-danger btn-flat" type="button"><i class="fa fa-times"></i></button></td>\
            </tr>'
        );
    });
}

function RenderSourceSchemaDetails() {

    var mapping = $.parseJSON(sessionStorage.Mapping);
    var schema = mapping.info.source.source_info.source_schema.$;
    if (schema === '')   schema = 'Not Available';
    var type = mapping.info.source.source_info.source_schema.type;
    if (type === '')   type = 'Not Available';
    var version = mapping.info.source.source_info.source_schema.version;
    if (version === '') version = 'Not Available';
    var collection = mapping.info.source.source_info.source_collection;
    if (collection === '')  collection = 'Not Available';

    $('#source_schema .source_schema_info .schema').text(schema);
    $('#source_schema .source_schema_info .type').text(type);
    $('#source_schema .source_schema_info .version').text(version);
    $('#source_schema .source_schema_info .collection').text(collection);
}

function RenderSampleDataInfo_ER(){
    var ER = $.parseJSON(sessionStorage.ERSourceSchema);
    var totalTables = 0;
    var totalAttrs = 0;
    $.each(ER.tables, function(i, table) {
        if(table.type==="table"){
            totalTables++;
        }
        totalAttrs += table.attributes.length;
    });
    
    var mapping = $.parseJSON(sessionStorage.Mapping);
    var type = mapping.info.source_info.source_schema.type;
    $('#source_schema .typeSample').text(type);
    $('#source_schema .totalTablesSample').text(totalTables);
    $('#source_schema .totalAttrsSample').text(totalAttrs);
}

function RenderSampleDataInfo_XML(doc){
    var parents = '-';
    var children = '-';
    $('#source_schema .typeSample').text('XML');
    if(doc.allParentNames) parents = doc.allParentNames.length;
    if(doc.allLeavesNames) children = doc.allLeavesNames.length;
    $('#source_schema .totalTablesSample').text(parents);
    $('#source_schema .totalAttrsSample').text(children);
}

// Diagram
//***************************
function DrawSourceSchemaGraph_ER(){
    var ER = $.parseJSON(sessionStorage.ERSourceSchema);
    var rootElement;
    
    var elements = [];
    var relations = [];
    
    $.each(ER.tables, function(i, table) {
        if(table.type==="table"){
            elements.push(createTable(i, table));
            
            try{
                if(table.connections){
                    if($.isArray(table.connections)){
                        $.each(table.connections, function(index, relat) {
                            relations.push(createLink(table.tableName, relat));
                        });
                    }
                    else{
                        relations.push(createLink(table.tableName, table.connections));
                    }
                }
            }catch(err){ 
                APPENDWarning('[Source Schema] Error on create links: ' + table.tableName, WARNINGSPriority.Low);
            }
        }
        else{
            rootElement = table.tableName;
        }
    });
    
    _.each(elements, function (c) {
        SSgraph.addCell(c);
    });
    
    relations = clearLinkDublicates(relations);
    _.each(relations, function (r) {
        var sourceId = r.get('source').id;
        var targetId = r.get('target').id;
        if(sourceId!==rootElement && targetId!==rootElement){
            SSgraph.addCell(r);
        }
    });
}

function createTable(index, table){
    var uml = joint.shapes.uml;
    var height = 30 + (table.attributes.length * 15);
    
    return  new uml.Class({
            id: table.tableName,
            position: { x: index*70, y: index*50 },
            size: {width: 180, height: height},
            name: table.tableName,
            attributes: table.attributes,
            methods: [],
            attrs: {
                '.uml-class-name-rect': {
                    fill: '#ff8450',
                    stroke: '#fff',
                    'stroke-width': 0.5
                },
                '.uml-class-attrs-rect, .uml-class-methods-rect': {
                    fill: '#fe976a',
                    stroke: '#fff',
                    'stroke-width': 0.5
                }
            }
        });
}

function createLink(parentElementLabel, childElementLabel) {
    return new joint.dia.Link({
        source: { id: parentElementLabel }, 
        target: { id: childElementLabel },
        router: { name: 'manhattan' },
        connector: { name: 'rounded' },
        smooth: true
    });
}

function clearLinkDublicates(relations){
    var newRelationsList = [];
    //newRelationsList.push(relations[0]);
    
    $.each(relations, function(i, relat) {
        var uniqueRel = true;
        var sourceId = relat.get('source').id;
        var targetId = relat.get('target').id;
        $.each(newRelationsList, function(j, relat1) {
            var sourceId1 = relat1.get('source').id;
            var targetId1 = relat1.get('target').id;
            
            if((sourceId===targetId1 && targetId===sourceId1) && uniqueRel){
                uniqueRel = false;
            }
        });
        if(uniqueRel) newRelationsList.push(relat);
    });
    
    return newRelationsList;
}


function DrawTreeD3(){
    $("#source_schema_graph > svg").remove();
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

    var svg = d3.select("#source_schema_graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(GlobalResources.Services.RestService + '/x3ml/source_schema/tree/' + sessionStorage.MappingID, function (error, doc) {
    //d3.json('flare.json', function (error, doc) {
        if(doc){
            sessionStorage.TreeSourceSchema=JSON.stringify(doc);
            RenderSampleDataInfo_XML(doc);
            var flare = doc.root;
            //console.log(doc.root);
            flare.x0 = 0;
            flare.y0 = 0;
            sessionStorage.TreeSourceSchemaD3=JSON.stringify(flare);
            update(root = flare);
        }
        else{
            console.error('Not available source schema for Mapping'+sessionStorage.MappingID);
        }
            
    });

    function update(source) {

        // Compute the flattened node list. TODO use d3.layout.hierarchy.
        var nodes = tree.nodes(root);

        var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

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
                    if(d.name==="") c = '';
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
                    if(d.name==="") height = 0;
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

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }

    function color(d) {
        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }

   
}