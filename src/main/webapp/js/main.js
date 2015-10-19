var rootURL = "http://"+window.location.hostname+":8080/MappingAnalyzer/webresources";
var sys = arbor.ParticleSystem();
sys.parameters({stiffness:900, repulsion:2000, gravity:true, dt:0.015});
sys.renderer = Renderer("#viewport") ;

init();

function init(){
    
}



/////////////////////////REQUESTS///////////////////////////////////

function findDiffInit(){
    $.ajax({
        type: 'GET',
        url: rootURL + '/x3ml/getMap',
        dataType: "json",
        success: renderDataMappings
    });
}

function findSourceNodes(source_node){
    $.ajax({
        type: 'GET',
        url: rootURL + '/x3ml/sourceNode/'+source_node,
        dataType: "json",
        success: renderDataLinks
    });
}

/////////////////////////RENDER FUNCTIONS///////////////////////////////////

function renderDataMappings(data){
    var x3ml = 'source_node';
    renderCommonCorrelations(data.common, x3ml);
    renderFirstCorrelations(data.firstmapping, x3ml);
    renderSecondCorrelations(data.secondmapping, x3ml);
}

function renderDataLinks(data){
    var x3ml = 'link';
    renderCommonCorrelations(data.common, x3ml);
    renderFirstCorrelations(data.firstmapping, x3ml);
    renderSecondCorrelations(data.secondmapping, x3ml);
}



$('#viewport').dblclick(function(e) {
    var selected = null;
    var nearest = null;
    var dragged = null;
    var pos = $('#viewport').offset();
    var p = {x:e.pageX-pos.left, y:e.pageY-pos.top}
    nearest = dragged = sys.nearest(p);
    selected = (nearest.distance < 50) ? nearest : null;
    if (selected !== null && selected.node.data.x3ml=="source_node" && selected.node.data.expanded=="false"){
        console.log(selected.node.name+' type: '+selected.node.data.x3ml);
        selected.node.data.expanded="true";
        findSourceNodes(selected.node.name);
    }
    else if(selected !== null && selected.node.data.x3ml=="source_node" && selected.node.data.expanded=="true"){
        console.log(selected.node.name+' type: '+selected.node.data.x3ml);
        selected.data.expanded="false";
        deleteNode(selected.node);
    }
    else{
        console.log(selected.node.name+' type: '+selected.node.data.x3ml);
        
    }
    return false;
});

/////////////////////////HELPING FUNCTIONS///////////////////////////////////

function nodeExists(node){
    var existNode = sys.getNode(node);
    if(existNode===undefined){
        return false;
    }
    return true;
}

function deleteNode(node){
    var x3ml = findX3mlLevel(node);
    var edges = sys.getEdgesFrom(node);
    $.each(edges, function() {
        
        sys.pruneEdge(this);
    });
    sys.eachNode(function(node1, pt){
        if(node1.data.x3ml===x3ml){
            sys.pruneNode(node1);
        }
    });
    
}

function findX3mlLevel(node){
    var curx3ml  = node.data.x3ml;
    if(curx3ml==='source_node'){
        return 'link';
    }
} 


/////////////////////////DRAW FUNCTIONS///////////////////////////////////

function renderCommonCorrelations(data, x3ml){
    var listcommon = data == null ? [] : (data instanceof Array ? data : [data]);
    $.each(listcommon, function(index, map) {
        var startNode = map.startNode;
        var relation = map.relation;
        var endNode = map.endNode;
        if(!nodeExists(startNode)){
            sys.addNode(startNode,{ 'color':'green',
                                    'shape':'rectangle',
                                    'type':'node',
                                    'label':startNode,
                                    'x3ml':x3ml,
                                    'expanded':'true'});
        }
        sys.addNode(startNode+"_"+relation+"_"+endNode,{'color':'none',
                                                        'shape':'rectangle',
                                                        'type':'relation',
                                                        'label':relation,
                                                        'x3ml':x3ml,
                                                        'expanded':'true'});
        sys.addEdge(startNode, startNode+"_"+relation+"_"+endNode, {'color':'black','directed':'->'})
        if(!nodeExists(endNode)){
            sys.addNode(endNode,{   'color':'green',
                                    'shape':'rectangle',
                                    'type':'node',
                                    'label':endNode,
                                    'x3ml':x3ml,
                                    'expanded':'false'});
        }
        sys.addEdge(startNode+"_"+relation+"_"+endNode, map.endNode, {'color':'black','directed':'->'})
    });
}

function renderFirstCorrelations(data, x3ml){
    var list = data == null ? [] : (data instanceof Array ? data : [data]);
    $.each(list, function(index, map) {
        var startNode = map.startNode;
        var relation = map.relation;
        var endNode = map.endNode;
        if(!nodeExists(startNode)){
            sys.addNode(startNode,{ 'color':'orange',
                                    'shape':'rectangle',
                                    'type':'node',
                                    'label':startNode,
                                    'x3ml':x3ml,
                                    'expanded':'true'});
        }
        sys.addNode(startNode+"_"+relation+"_"+endNode,{'color':'none',
                                                        'shape':'rectangle',
                                                        'type':'relation',
                                                        'label':relation,
                                                        'x3ml':x3ml,
                                                        'expanded':'true'});
        sys.addEdge(startNode, startNode+"_"+relation+"_"+endNode, {'color':'black','directed':'->'})
        if(!nodeExists(endNode)){
            sys.addNode(endNode,{   'color':'orange',
                                    'shape':'rectangle',
                                    'type':'node',
                                    'label':endNode,
                                    'x3ml':x3ml,
                                    'expanded':'false'});
        }
        sys.addEdge(startNode+"_"+relation+"_"+endNode, map.endNode, {'color':'black','directed':'->'})
    });
}

function renderSecondCorrelations(data, x3ml){
    var list = data == null ? [] : (data instanceof Array ? data : [data]);
    $.each(list, function(index, map) {
        var startNode = map.startNode;
        var relation = map.relation;
        var endNode = map.endNode;
        if(!nodeExists(startNode)){
            sys.addNode(startNode,{ 'color':'purple',
                                    'shape':'rectangle',
                                    'type':'node',
                                    'label':startNode,
                                    'x3ml':x3ml,
                                    'expanded':'true'});
        }
        sys.addNode(startNode+"_"+relation+"_"+endNode,{'color':'none',
                                                        'shape':'rectangle',
                                                        'type':'relation',
                                                        'label':relation,
                                                        'x3ml':x3ml,
                                                        'expanded':'true'});
        sys.addEdge(startNode, startNode+"_"+relation+"_"+endNode, {'color':'black','directed':'->'})
        if(!nodeExists(endNode)){
            sys.addNode(endNode,{   'color':'purple',
                                    'shape':'rectangle',
                                    'type':'node',
                                    'label':endNode,
                                    'x3ml':x3ml,
                                    'expanded':'false'});
        }
        sys.addEdge(startNode+"_"+relation+"_"+endNode, map.endNode, {'color':'black','directed':'->'})
    });
}
///////////////////////////////////////////////

$("#zoomInButton").click(
    function(){
    var canvas = document.getElementById("viewport");
    canvas.width = canvas.width + 50;
    canvas.height = canvas.height + 50;
    sys.renderer = Renderer("#viewport") ;
    }
);
$("#zoomOutButton").click(
    function(){
    var canvas = document.getElementById("viewport");
    canvas.width = canvas.width - 50;
    canvas.height = canvas.height - 50;
    sys.renderer = Renderer("#viewport") ;
    }
);






























function renderMappings1(data){
    var map = data.common;
    var listcommon = map == null ? [] : (map instanceof Array ? map : [map]);
    //var mapping = sys.addNode('mapping',{'color':'red','shape':'dot','label':'Mapping'});
    var id = 0;
    $.each(listcommon, function(index, map) {
        id = id+1;
        sys.addNode(map.startNode,{'color':'green','shape':'rectangle','label':map.startNode});
        sys.addNode(map.relation+"_"+id,{'color':'none','shape':'rectangle','label':map.relation});
        sys.addEdge(map.startNode, map.relation+"_"+id, {'color':'black','directed':'->'})
        sys.addNode(map.endNode,{'color':'green','shape':'rectangle','label':map.endNode});
        sys.addEdge(map.relation+"_"+id, map.endNode, {'color':'black','directed':'->'})
    });
    var map = data.different;
    var listdiff = map == null ? [] : (map instanceof Array ? map : [map]);
    //var mapping = sys.addNode('mapping',{'color':'red','shape':'dot','label':'Mapping'});
    $.each(listdiff, function(index, map) {
        id = id+1;
        if(!nodeExists(map.startNode)){
            sys.addNode(map.startNode,{'color':'red','shape':'rectangle','label':map.startNode});
        }
        sys.addNode(map.relation+"_"+id,{'color':'none','shape':'rectangle','label':map.relation});
        sys.addEdge(map.startNode, map.relation+"_"+id, {'color':'black','directed':'->'})
        if(!nodeExists(map.endNode)){
            sys.addNode(map.endNode,{'color':'red','shape':'rectangle','label':map.endNode});
        }
        sys.addEdge(map.relation+"_"+id, map.endNode, {'color':'black','directed':'->'})
    });
    
//    node1 = sys.addNode("one node")
//    node2 = sys.addNode("another")
//    edge = sys.addEdge(node1, node2, {'color':'blue','label':'cat'})
}




//$('#viewport').dblclick(function(e) {
//    var selected = null;
//    var nearest = null;
//    var dragged = null;
//    var pos = $('#viewport').offset();
//    var p = {x:e.pageX-pos.left, y:e.pageY-pos.top}
//    nearest = dragged = sys.nearest(p);
//    selected = (nearest.distance < 50) ? nearest : null;
//    if (selected !== null){
//        console.log(selected.node.name);
//        //sys.addNode('kati'+selected.node.name,{'color':'none','shape':'rectangle','label':'new'});
//        //sys.addEdge('kati'+selected.node.name, selected.node, {'color':'black','directed':'->'})
//    }
//    return false;
//});














////////////////////////////////////
function init1(){
    var data = {
       nodes:{
         animals:{'color':'red','shape':'dot','label':'Animals'},
         dog:{'color':'green','shape':'dot','label':'dog'},
         cat:{'color':'blue','shape':'dot','label':'cat'}
       }, 
       edges:{
         animals:{ 
             dog:{}, 
             cat:{} 
        }
       }
     };
     var theUI = {
        nodes:{A:{color:"red", shape:"dot", alpha:1}, 
            B:{color:"#b2b19d", shape:"dot", alpha:1}, 
            C:{color:"#b2b19d", shape:"dot", alpha:1}, 
            D:{color:"#b2b19d", shape:"dot", alpha:1},
        },
        edges:{
            A:{
                B:{length:.8, data:{label:"A->B"}},
                C:{length:.8, data:{label:"A->C"}},
                D:{length:.8, data:{label:"A->D"}}
                 }
        }
      }
      console.log(theUI.edges.A.B.data.label);
    sys.graft(theUI);
}