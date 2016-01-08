/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */
var title1TC;
var title2TC;

function initTextualCompPage(tit1,tit2){
    
    var mapping1 = sessionStorage.Mapping1_XML;
    var mapping2 = sessionStorage.Mapping2_XML;
    $("#xml_text1").val(mapping1);
    $("#xml_text2").val(mapping2);
    
    title1TC = tit1;
    title2TC = tit2;
    
    prettyFormatXML();
}


$( document ).ready(function() {
    
    
});

function prettyFormatXML(){
    $('#xml_text1').format({method: 'xml'});
    $('#xml_text2').format({method: 'xml'});
    
    var viewType = 'sidebyside';
    textComparison(viewType);
}

function textComparison(viewType) {
    "use strict";
    var byId = function (id) { return document.getElementById(id); },
            base = difflib.stringAsLines(byId("xml_text1").value),
            newtxt = difflib.stringAsLines(byId("xml_text2").value),
            sm = new difflib.SequenceMatcher(base, newtxt),
            opcodes = sm.get_opcodes(),
            diffoutputdiv = byId("textualdiffoutput"),
            contextSize = '';

    diffoutputdiv.innerHTML = "";
    contextSize = contextSize || null;

    diffoutputdiv.appendChild(diffview.buildView({
            baseTextLines: base,
            newTextLines: newtxt,
            opcodes: opcodes,
            baseTextName: "1st Mapping: "+title1TC,
            newTextName: "2nd Mapping: "+title2TC,
            contextSize: contextSize,
            viewType: viewType
    }));
}