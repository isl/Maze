var rootURL = "http://"+window.location.hostname+":8080/MappingAnalyzerServer/webresources";

init();

function init(){
    findX3LMFiles();
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

/////////////////////////RENDER FUNCTIONS///////////////////////////////////

function renderX3mlFiles(data){
    $("#lblNumOfX3ML").text(data.filesNum + ' Files');
}

/////////////////////////BUTTONS FUNCTIONS///////////////////////////////////


/////////////////////////DRAW FUNCTIONS///////////////////////////////////


/////////////////////////HELPING FUNCTIONS///////////////////////////////////

