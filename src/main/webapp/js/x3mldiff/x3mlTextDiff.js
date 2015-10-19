var rootURL = "http://"+window.location.hostname+"/MappingAnalyzerServer/webresources";
var viewType = 'sidebyside';
//var viewType = 'inline';

var x3mlId1;
var x3mlId2;
var x3mlData1;
var x3mlData2;
var title1;
var title2;

init();

function init(){
    $('#xml_text1').hide();
    $('#xml_text2').hide();
    x3mlId1 = urlParam('id1');
    x3mlId1 = x3mlId1.replace(/[^0-9]/g, '');
    x3mlId2 = urlParam('id2');
    x3mlId2 = x3mlId2.replace(/[^0-9]/g, '');
    findSingleX3LM1(x3mlId1);
}

/////////////////////////REQUESTS///////////////////////////////////

function findSingleX3LM1(x3mlId){
    $.ajax({
        type: 'GET',
        url: rootURL + '/x3ml/single/'+x3mlId,
        dataType: "xml",
        success: function(data){
            title1 = $(data).find('title').text();
            x3mlData1=xmlToString(data);
            $("#xml_text1").val(x3mlData1);
            findSingleX3LM2(x3mlId2);
        }
    });
}
function findSingleX3LM2(x3mlId){
    $.ajax({
        type: 'GET',
        url: rootURL + '/x3ml/single/'+x3mlId,
        dataType: "xml",
        success: function(data){
            title2 = $(data).find('title').text();
            x3mlData2=xmlToString(data);
            $("#xml_text2").val(x3mlData2);
            manageFormat();
        }
    });
}

function manageFormat(){
    $('#xml_text1').format({method: 'xml'});
    $('#xml_text2').format({method: 'xml'});
    diffUsingJS(viewType);
}



/////////////////////////DRAW FUNCTIONS///////////////////////////////////

function diffUsingJS(viewType) {
    "use strict";
    var byId = function (id) { return document.getElementById(id); },
            base = difflib.stringAsLines(byId("xml_text1").value),
            newtxt = difflib.stringAsLines(byId("xml_text2").value),
            sm = new difflib.SequenceMatcher(base, newtxt),
            opcodes = sm.get_opcodes(),
            diffoutputdiv = byId("diffoutput"),
            contextSize = '';

    diffoutputdiv.innerHTML = "";
    contextSize = contextSize || null;

    diffoutputdiv.appendChild(diffview.buildView({
            baseTextLines: base,
            newTextLines: newtxt,
            opcodes: opcodes,
            baseTextName: "1st Mapping: "+title1,
            newTextName: "2nd Mapping: "+title2,
            contextSize: contextSize,
            viewType: viewType
    }));
}

/////////////////////////HELPING FUNCTIONS///////////////////////////////////

function urlParam(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function xmlToString(xmlData) { 

    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        if (typeof XMLSerializer !== "undefined"){
            return (new XMLSerializer()).serializeToString(xmlData);
        } else {
            return $(xmlData).html();
        }
    }
}