/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

function initX3MLOverviewPage() {
    var x3mlData = $.parseJSON(sessionStorage.Mapping);
//    if($('.pt-page-current').attr('id')==='x3ml_overview'){
//        DrawX3MLOverviewGraph(x3mlData);
//    }
    DrawX3MLOverviewGraph(x3mlData); //uncomment this
    RenderX3MLOverviewDetails(x3mlData);
}

$(document).ready(function () {
    
    /////////////////////////BUTTONS FUNCTIONS///////////////////////////////////
    $('#x3ml_overview .filterTNBtn').click(function () {
        if ($(this).hasClass("selected")) {
            DrawX3MLOverviewGraph.filterDelete('target_node');
        }
        else {
            DrawX3MLOverviewGraph.renderTargetNodes();
        }
        $(this).toggleClass("selected");
    });

    $('#x3ml_overview .filterSNBtn').click(function () {
        if ($(this).hasClass("selected")) {
            DrawX3MLOverviewGraph.filterDelete('source_node');
        }
        else {
            DrawX3MLOverviewGraph.renderSourceNodes();
        }
        $(this).toggleClass("selected");
    });

    $('#x3ml_overview .filterLinksBtn').click(function () {
        if ($(this).hasClass("selected")) {
            DrawX3MLOverviewGraph.filterDelete('link');
        }
        else {
            DrawX3MLOverviewGraph.renderLinks();
        }
        $(this).toggleClass("selected");
        setTimeout(function(){
            DrawX3MLOverviewGraph.sys.stop();
        }, 15000);
    });

    $("#x3ml_overview .zoomInButton").click(function () {
            DrawX3MLOverviewGraph.zoomCanvas("in");
    });
    
    $("#x3ml_overview .zoomOutButton").click(function () {
            DrawX3MLOverviewGraph.zoomCanvas("out");
    });
    
    
    $("#X3MLOverviewGraph").click(function(e){
//          var pos = $(this).offset();
//        var p = {x:e.pageX-pos.left, y:e.pageY-pos.top}
//        selected = nearest = dragged = particleSystem.nearest(p);
//
//        if (selected.node !== null){
//        // dragged.node.tempMass = 10000
//            dragged.node.fixed = true;
//        }
        //stop graph after 10sec
        setTimeout(function(){
            DrawX3MLOverviewGraph.sys.stop();
        }, 10000);
        return false;
    });
    
    $( window ).resize(function() {
        try{
            DrawX3MLOverviewGraph.customizeCanvasWidth();
        }catch (err){}
    });
});

function RenderX3MLOverviewDetails(x3ml){
    
    var title = x3ml.info.title;
    var sourceType = x3ml.source_type;
    var version = x3ml.version;
    var decr = x3ml.info.general_description;
    
    $('#x3ml_overview .titleInfo').text(title);
    $('#x3ml_overview .sourceTypeInfo').text(sourceType);
    $('#x3ml_overview .versionInfo').text(version);
    $('#x3ml_overview .descrInfo').text(decr);
}

function DrawX3MLOverviewGraph(x3mlData) {

    var sys = arbor.ParticleSystem();
    sys.parameters({stiffness: 800, repulsion: 2000, gravity: true, dt: 0.015});
    sys.renderer = Renderer("#X3MLOverviewGraph");
    var canvas = document.getElementById("X3MLOverviewGraph");
    initGrapgh();

    function initGrapgh() {
        emptyViewport();
        renderMappings();
        renderSourceNodes();
        renderTargetNodes();
        customizeCanvasWidth();
        
        //stop graph after 10sec
        setTimeout(function(){
            sys.stop();
        }, 10000);
    }

    function emptyViewport() {
        sys.eachNode(function (node1, pt) {
            sys.pruneNode(node1);
        });
    }

    function renderMappings() {
        var title = x3mlData.info.title;
        drawNode(title, title, 'title');
        var mappings = x3mlData.mappings.mapping;
        var mappingslist = mappings === null ? [] : (mappings instanceof Array ? mappings : [mappings]);
        $.each(mappingslist, function (index, mapping) {
            drawRelation('mapping_' + index, 'mapping');
            drawEdge(title, 'mapping_' + index);
        });
    }

    function renderSourceNodes() {
        var mappings = x3mlData.mappings.mapping;
        var mappingslist = mappings === null ? [] : (mappings instanceof Array ? mappings : [mappings]);
        $.each(mappingslist, function (index, mapping) {
            var source_node = mapping.domain.source_node;
            if(source_node!==""){
                drawRelation('source_node_' + index, 'source_node');
                drawEdge('mapping_' + index, 'source_node_' + index);
                drawNode(source_node + '_' + index, source_node, 'source_node');
                drawEdge('source_node_' + index, source_node + '_' + index);
            }
        });
    }

    function renderTargetNodes() {
        var mappings = x3mlData.mappings.mapping;
        var mappingslist = mappings === null ? [] : (mappings instanceof Array ? mappings : [mappings]);
        $.each(mappingslist, function (index, mapping) {
            var target_node = mapping.domain.target_node.entity.type;
            if(target_node!==""){
                drawRelation('target_node_' + index, 'target_node');
                drawEdge('mapping_' + index, 'target_node_' + index);
                drawNode(target_node + '_' + index, target_node, 'target_node');
                drawEdge('target_node_' + index, target_node + '_' + index);
            }
        });
    }

    function renderLinks() {
        var mappings = x3mlData.mappings.mapping;
        var mappingslist = mappings === null ? [] : (mappings instanceof Array ? mappings : [mappings]);
        $.each(mappingslist, function (index, mapping) {
            var links = mapping.link;
            var linklist = links === null ? [] : (links instanceof Array ? links : [links]);
            $.each(linklist, function (index1, link) {
                var relation = link.path.source_relation.relation;
                if(relation!==""){
                    drawRelation('link_' + index, 'link');
                    drawEdge('mapping_' + index, 'link_' + index);
                    drawNode(relation + '_' + index, relation, 'link');
                    drawEdge('link_' + index, relation + '_' + index);
                }
            });
        });
    }

    /////////////////////////DRAW FUNCTIONS///////////////////////////////////

    function drawNode(node, label, x3ml) {
        var color = NodeColor(x3ml);
        sys.addNode(node, {'color': color,
            'shape': 'rectangle',
            'type': 'node',
            'label': label,
            'x3ml': x3ml,
            'expanded': 'true'});
    }

    function drawRelation(relationNode, label, x3ml) {
        sys.addNode(relationNode, {
            'color': 'none',
            'shape': 'rectangle',
            'type': 'relation',
            'label': label,
            'x3ml': x3ml,
            'expanded': 'true'});
    }

    function drawEdge(startNode, endNode) {
        sys.addEdge(startNode,
                    endNode,
                    {'color': 'black', 'directed': '->'});
    }

    function NodeColor(type){
        var color;
        if(type==="source_node"){
            color = "#66afe9";
        }
        else if(type==="target_node"){
            color = "#00a65a";
        }
        else if(type==="link"){
            color = "#f39c12";
        }
        else{
            color = "red";
        }
        return color;
    }

    function customizeCanvasWidth() {
        canvas.width = $("#X3MLOverviewGraph").parent().width();
        sys.renderer = Renderer("#X3MLOverviewGraph");
    }

    /////////////////////////HELPING FUNCTIONS///////////////////////////////////

    function nodeExists(node) {
        var existNode = sys.getNode(node);
        if (existNode === undefined) {
            return false;
        }
        return true;
    }

    function filterDelete(x3ml) {
        sys.eachNode(function (node1, pt) {
            if (node1.data.x3ml === x3ml || node1.data.label === x3ml) {
                sys.pruneNode(node1);
            }
        });
    }

    function zoomCanvas(zoom){
        if(zoom==="in"){
            canvas.height = canvas.height + 50;
            sys.renderer = Renderer("#X3MLOverviewGraph") ;
        }
        else if(zoom==="out"){
            var height = canvas.height - 50;
            if(height < 200) height = 200;
            canvas.height = height;
            sys.renderer = Renderer("#X3MLOverviewGraph") ;
        }
                
        //stop graph after 10sec
//        setTimeout(function(){
//            sys.stop();
//        }, 10000);
    }
    
    function DestroyGraph(){
        //TODO (implemented in function emptyViewport)
        sys.eachNode(function (node1, pt) {
            sys.pruneNode(node1);
        });
    }

    // Nested Methods
    DrawX3MLOverviewGraph.canvas = canvas;
    DrawX3MLOverviewGraph.sys = sys;
    DrawX3MLOverviewGraph.filterDelete = filterDelete;
    DrawX3MLOverviewGraph.renderSourceNodes = renderSourceNodes;
    DrawX3MLOverviewGraph.renderTargetNodes = renderTargetNodes;
    DrawX3MLOverviewGraph.renderLinks = renderLinks;
    DrawX3MLOverviewGraph.zoomCanvas = zoomCanvas;
    DrawX3MLOverviewGraph.customizeCanvasWidth = customizeCanvasWidth;
    //DrawX3MLOverviewGraph.DestroyGraph = DestroyGraph;
}


