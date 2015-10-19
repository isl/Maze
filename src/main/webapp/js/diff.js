var rootURL = "http://"+window.location.hostname+":8080/MappingAnalyzerServer/webresources";
var sys = arbor.ParticleSystem();
sys.parameters({stiffness:900, repulsion:2000, gravity:true, dt:0.015});
sys.renderer = Renderer("#viewport") ;

var file1;
var file2;

init();

function init(){
    findX3LMFiles();
    $('#sectionX3MLlist').show();
    $('#sectionX3MLview').hide();
}

/////////////////////////REQUESTS///////////////////////////////////

function findX3LMFiles(){
    $.ajax({
        type: 'GET',
        url: rootURL + '/x3ml/all',
        dataType: "json",
        success: renderX3mlFiles
    });
}

function compareFiles(){
    $.ajax({
        type: 'GET',
        url: rootURL + '/x3ml/findDiff/'+file1+'/'+file2,
        dataType: "json",
        success: renderDataMappings
    });
}

function findSourceNodes(source_node){
    $.ajax({
        type: 'GET',
        url: rootURL + '/x3ml/sourceNode/'+file1+'/'+file2+'/'+source_node,
        dataType: "json",
        success: renderDataLinks
    });
}

/////////////////////////RENDER FUNCTIONS///////////////////////////////////

function renderX3mlFiles(data){
    $("#lblNumOfX3ML").text(data.filesNum + ' Files');
    renderX3mlFileDetails(data.X3mlFileDetails);
}

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

/////////////////////////CLICK FUNCTIONS///////////////////////////////////

$('#backBtn').click(function() {
    emptyViewport();
    $('#sectionX3MLlist').show();
    $('#sectionX3MLview').hide();
});

//$('#filterTNBtn').click(function() {
//    if ($(this).hasClass("filterBtn_selected")) {
//        filterDelete('target_node');
//    }
//    else{
//        //renderTargetNodes();
//    }
//    $(this).toggleClass("filterBtn_selected");
//});
//
//$('#filterSNBtn').click(function() {
//    if ($(this).hasClass("filterBtn_selected")) {
//        filterDelete('source_node');
//    }
//    else{
//        //renderSourceNodes();
//    }
//    $(this).toggleClass("filterBtn_selected");
//});
//
//$('#filterLinksBtn').click(function() {
//    if ($(this).hasClass("filterBtn_selected")) {
//        filterDelete('link');
//    }
//    else{
//        //renderLinks();
//    }
//    $(this).toggleClass("filterBtn_selected");
//});

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

$('#listSingleX3MLFiles').on('click', 'input', function(){
    //num of selected checkbox
    var li = $(this).closest("li");
    var n = $( "input:checked" ).length;
    if(n>2){
        $(this).attr('checked', false);
        alert("You have to select only 2 files!");
    }
    else{
        var title = $(this).attr('title');
        var x3mlId = $(this).attr('x3mlId');
        if($(this).is(':checked')){
            if($('#firstFileList li').length === 0){
                $('#firstFileList').append(
                        '<li class="ui-state-default" x3mlId="'+x3mlId+'">'+
                            '<span class="text">'+title+'</span>'+
                        '</li>');
                li.append('<small class="label bg-yellow-active">File 1</small>');
            }
            else if($('#secondFileList li').length === 0){
                $('#secondFileList').append(
                        '<li class="ui-state-default" x3mlId="'+x3mlId+'">'+
                            '<span class="text">'+title+'</span>'+
                        '</li>');
                li.append('<small class="label bg-purple-active">File 2</small>');
            }
        }
        else{
            var listItems1 = $("#firstFileList li");
            $.each(listItems1, function(index, li1) {
                var liText = $(this).text();
                if (liText===title) {
                    $(this).remove();
                    li.children('small').remove();
                }
            });
            var listItems2 = $("#secondFileList li");
            $.each(listItems2, function(index, li2) {
                var liText = $(this).text();
                if (liText===title) {
                    $(this).remove();
                    li.children('small').remove();
                }
            });
        }
    }
});

$('#compareBtn').click(function() {
    var boxes = $( "input:checked" );
    if(boxes.length===2){
        file1=$("#firstFileList li").first().attr('x3mlId');
        file2=$("#secondFileList li").first().attr('x3mlId');
        //console.log(file1+" "+file2);
        emptyViewport();
        $('#sectionX3MLlist').hide();
        $('#sectionX3MLview').show();
        compareFiles(file1,file2);
    }
});

$('#viewport').dblclick(function(e) {
    var selected = null;
    var nearest = null;
    var dragged = null;
    var pos = $('#viewport').offset();
    var p = {x:e.pageX-pos.left, y:e.pageY-pos.top};
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

/////////////////////////DRAW FUNCTIONS///////////////////////////////////

function drawNode(node, label, x3ml){
    sys.addNode(node,{ 'color':'green',
                        'shape':'rectangle',
                        'type':'node',
                        'label':label,
                        'x3ml':x3ml,
                        'expanded':'true'});
}

function drawRelation(relationNode, label, x3ml){
    sys.addNode(relationNode,{   
                'color':'none',
                'shape':'rectangle',
                'type':'relation',
                'label':label,
                'x3ml':x3ml,
                'expanded':'true'});
}

function drawEdge(startNode, endNode){
    sys.addEdge(    startNode, 
                    endNode, 
                    {'color':'black','directed':'->'});
}

function renderX3mlFileDetails(data){
    $('#loading').hide();
    if (data === undefined || data === null || JSON.stringify(data)==='{}') {
        $('#listSingleX3MLFiles li').remove();
        $('#listSingleX3MLFiles').append('<li>No X3ML Files found!</li>');
    }
    else{
        var list = data === null ? [] : (data instanceof Array ? data : [data]);
        $('#listSingleX3MLFiles li').remove();
        $.each(list, function(index, file) {
            $('#listSingleX3MLFiles').append(
                    '<li class="ui-state-default">'+
                        '<span>'+
                            '<i class="fa fa-ellipsis-v"></i>'+
                        '</span>'+
                        '<input type="checkbox" value="" name="file" title="'+file.title+'" x3mlId="'+file.x3mlId+'">'+
                        '<span class="text">'+file.title+'</span>'+
                    '</li>');
        });
    }
}

/////////////////////////HELPING FUNCTIONS///////////////////////////////////

function nodeExists(node){
    var existNode = sys.getNode(node);
    if(existNode===undefined){
        return false;
    }
    return true;
}

function emptyViewport(){
    sys.eachNode(function(node1, pt){
        sys.pruneNode(node1);
    });
}

function filterDelete(x3ml){
    sys.eachNode(function(node1, pt){
        if(node1.data.x3ml===x3ml || node1.data.label===x3ml){
            sys.pruneNode(node1);
        }
    });
}

function initfiltersBtns(){
    $('#filterTNBtn').addClass('filterBtn_selected');
    $('#filterSNBtn').addClass('filterBtn_selected');
    $('#filterLinksBtn').removeClass('filterBtn_selected');
}

function filterSearch(element) {
    var value = $(element).val();
    value = value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    var listItems = $("#listSingleX3MLFiles li");
    $.each(listItems, function(index, li) {
        var liText = $(this).text();
        liText = liText.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        if (liText.indexOf(value) >= 0) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
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
    var listcommon = data === null ? [] : (data instanceof Array ? data : [data]);
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
        sys.addEdge(startNode, startNode+"_"+relation+"_"+endNode, {'color':'black','directed':'->'});
        if(!nodeExists(endNode)){
            sys.addNode(endNode,{   'color':'green',
                                    'shape':'rectangle',
                                    'type':'node',
                                    'label':endNode,
                                    'x3ml':x3ml,
                                    'expanded':'false'});
        }
        sys.addEdge(startNode+"_"+relation+"_"+endNode, map.endNode, {'color':'black','directed':'->'});
    });
}

function renderFirstCorrelations(data, x3ml){
    var list = data === null ? [] : (data instanceof Array ? data : [data]);
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
        sys.addEdge(startNode, startNode+"_"+relation+"_"+endNode, {'color':'black','directed':'->'});
        if(!nodeExists(endNode)){
            sys.addNode(endNode,{   'color':'orange',
                                    'shape':'rectangle',
                                    'type':'node',
                                    'label':endNode,
                                    'x3ml':x3ml,
                                    'expanded':'false'});
        }
        sys.addEdge(startNode+"_"+relation+"_"+endNode, map.endNode, {'color':'black','directed':'->'});
    });
}

function renderSecondCorrelations(data, x3ml){
    var list = data === null ? [] : (data instanceof Array ? data : [data]);
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
        sys.addEdge(startNode, startNode+"_"+relation+"_"+endNode, {'color':'black','directed':'->'});
        if(!nodeExists(endNode)){
            sys.addNode(endNode,{   'color':'purple',
                                    'shape':'rectangle',
                                    'type':'node',
                                    'label':endNode,
                                    'x3ml':x3ml,
                                    'expanded':'false'});
        }
        sys.addEdge(startNode+"_"+relation+"_"+endNode, map.endNode, {'color':'black','directed':'->'});
    });
}






