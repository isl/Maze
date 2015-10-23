var rootURL = "http://"+window.location.hostname+"/MappingAnalyzerServer/webresources";
var sys = arbor.ParticleSystem();
sys.parameters({stiffness:900, repulsion:2000, gravity:true, dt:0.015});
sys.renderer = Renderer("#viewport") ;
var canvas = document.getElementById("viewport");

window.addEventListener('resize', resizeCanvas, false);
 
init();

function init(){
   var x3mlId = urlParam('id');
   x3mlId = x3mlId.replace(/[^0-9]/g, '');
   findSingleX3LMGraph(x3mlId);
   resizeCanvas();
}

/////////////////////////REQUESTS///////////////////////////////////

function findSingleX3LMGraph(x3mlId){
    $.ajax({
        type: 'GET',
        url: rootURL + '/x3ml/single/'+x3mlId,
        dataType: "json",
        success: renderSingleX3ML
    });
}

/////////////////////////RENDER FUNCTIONS///////////////////////////////////

function renderX3mlFiles(data){
    $("#lblNumOfX3ML").text(data.filesNum + ' Files');
    renderX3mlFileDetails(data.X3mlFileDetails);
}

var x3mlData;
function renderSingleX3ML(x3ml){
    x3mlData = x3ml;
    emptyViewport();
    renderMappings();
    renderSourceNodes();
    renderTargetNodes();
    //renderLinks();
}

function renderMappings(){
    var title = x3mlData.info.title;
    drawNode(title, title, 'title');
    var mappings = x3mlData.mappings.mapping;
    var mappingslist = mappings === null ? [] : (mappings instanceof Array ? mappings : [mappings]);
    $.each(mappingslist, function(index, mapping) {
        drawRelation('mapping_'+index, 'mapping');
        drawEdge(title,'mapping_'+index);
    });
}

function renderSourceNodes(){
    var mappings = x3mlData.mappings.mapping;
    var mappingslist = mappings === null ? [] : (mappings instanceof Array ? mappings : [mappings]);
    $.each(mappingslist, function(index, mapping) {
        var source_node = mapping.domain.source_node;
        drawRelation('source_node_'+index, 'source_node');
        drawEdge('mapping_'+index, 'source_node_'+index);
        drawNode(source_node+'_'+index, source_node, 'source_node');
        drawEdge('source_node_'+index, source_node+'_'+index);
    });
}

function renderTargetNodes(){
    var mappings = x3mlData.mappings.mapping;
    var mappingslist = mappings === null ? [] : (mappings instanceof Array ? mappings : [mappings]);
    $.each(mappingslist, function(index, mapping) {
        var target_node = mapping.domain.target_node.entity.type;
        drawRelation('target_node_'+index, 'target_node');
        drawEdge('mapping_'+index, 'target_node_'+index);
        drawNode(target_node+'_'+index, target_node, 'target_node');
        drawEdge('target_node_'+index, target_node+'_'+index);
    });
}

function renderLinks(){
    var mappings = x3mlData.mappings.mapping;
    var mappingslist = mappings === null ? [] : (mappings instanceof Array ? mappings : [mappings]);
    $.each(mappingslist, function(index, mapping) {
        var links = mapping.link;
        var linklist = links === null ? [] : (links instanceof Array ? links : [links]);
        $.each(linklist, function(index1, link) {
            var relation = link.path.source_relation.relation;
            drawRelation('link_'+index, 'link');
            drawEdge('mapping_'+index, 'link_'+index);
            drawNode(relation+'_'+index, relation, 'link');
            drawEdge('link_'+index, relation+'_'+index);
            
            //not render yet
            //var relationship = link.path.target_relation.relationship;
        });
    });
}

/////////////////////////BUTTONS FUNCTIONS///////////////////////////////////

$('#listSingleX3MLFiles').on('click', '#viewBtn', function(){
    var title = $(this).attr("title");
    var x3mlId = $(this).attr("x3mlId");
    $('#sectionX3MLlist').hide();
    $('#sectionX3MLview').show();
    initfiltersBtns();
    findSingleX3LMGraph(x3mlId);
});

$('#backBtn').click(function() {
    emptyViewport();
    $('#sectionX3MLlist').show();
    $('#sectionX3MLview').hide();
});

$('#filterTNBtn').click(function() {
    if ($(this).hasClass("filterBtn_selected")) {
        filterDelete('target_node');
    }
    else{
        renderTargetNodes();
    }
    $(this).toggleClass("filterBtn_selected");
});

$('#filterSNBtn').click(function() {
    if ($(this).hasClass("filterBtn_selected")) {
        filterDelete('source_node');
    }
    else{
        renderSourceNodes();
    }
    $(this).toggleClass("filterBtn_selected");
});

$('#filterLinksBtn').click(function() {
    if ($(this).hasClass("filterBtn_selected")) {
        filterDelete('link');
    }
    else{
        renderLinks();
    }
    $(this).toggleClass("filterBtn_selected");
});

$("#zoomInButton").click(
    function(){
        canvas.width = canvas.width + 50;
        canvas.height = canvas.height + 50;
        sys.renderer = Renderer("#viewport") ;
    }
);
$("#zoomOutButton").click(
    function(){
        canvas.width = canvas.width - 50;
        canvas.height = canvas.height - 50;
        sys.renderer = Renderer("#viewport") ;
    }
);


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
        var list = data == null ? [] : (data instanceof Array ? data : [data]);
        $('#listSingleX3MLFiles li').remove();
        $.each(list, function(index, file) {
            $('#listSingleX3MLFiles').append(
                    '<li>'+
                        '<span>'+
                            '<i class="fa fa-ellipsis-v"></i>'+
                        '</span>'+
                        '<span class="text">'+file.title+'</span>'+
                        '<div class="tools">'+
                        '<div id="viewBtn" title="'+file.title+'" x3mlId="'+file.x3mlId+'">'+
                            '<i class="fa fa-eye"></i>'+
                        '</div></div>'+
                    '</li>');
        });
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth-50;
    sys.renderer = Renderer("#viewport");
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

function urlParam(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
