/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */
var MAP1;
var MAP2;
var title1TC;
var title2TC;

function initEvolutionPage(){
    //get available versions
    AjaxRequests.SingleMapping.GetVersionsofMapping();
    
}


$(document).ready(function () {
    
    //For debug
    initEvolutionPage();
    
    $('#analyzeVersionsBTN').click(function () {
        if(MAP1 && MAP2){
            AjaxRequests.SingleMapping.GetMappingsFromVersions(MAP1, MAP2);
        }
    });
    
});

// In case which mapping does not have versions
function NoVersionsAvailable(){
    $("#evolution .availableVersionsDiv").hide();
    $("#noVersionsAlert").show();
}


function renderVersionsOfMapping(DATA){
    
    var versionsDate = [];
    versionsDate.push(DATA.MappingTitle);
    
    var versData = DATA.Versions === null ? [] : (DATA.Versions instanceof Array ? DATA.Versions : [DATA.Versions]);
    $.each(versData, function (i, v) {
        versionsDate.push(v.VersionDate);
    }); 
    
    var to = versionsDate.length-1;
    
    /* ION SLIDER */
    $("#versionsRange").ionRangeSlider({
        type: "double",
        grid: true,
        from: 0,
        to: to,
        values: versionsDate,
        onUpdate: function (data) {
            renderSelectedVersions(DATA, data);
        },
        onChange: function (data) {
            renderSelectedVersions(DATA, data);
        }
    });
    
    setTimeout(function(){
        var slider = $("#versionsRange").data("ionRangeSlider");
        slider.update({from: 0, to: to});
    }, 500);
}

function renderSelectedVersions(DATA, sliderData){
    var from_date = sliderData.from_value;
    var to_date = sliderData.to_value;
    
    $('#evolution table.showVersions .showVersionsTR').remove();
    if(from_date === DATA.MappingTitle){
        MAP1 = sessionStorage.MappingID;
        $('#evolution table.showVersions').append(
            '<tr class="showVersionsTR">\
                <td>1</td>\
                <td>' + DATA.MappingTitle + '</td>\
                <td>' + sessionStorage.MappingID + '</td>\
                <td>-</td>\
                <td>-</td>\
                <td>-</td>\
            </tr>'
        );
    }
    else{
        var versData = DATA.Versions === null ? [] : (DATA.Versions instanceof Array ? DATA.Versions : [DATA.Versions]);
        $.each(versData, function (i, v) {
            if(v.VersionDate === from_date){
                MAP1 = "version" + v.VersionId;
                $('#evolution table.showVersions').append(
                    '<tr class="showVersionsTR">\
                        <td>1</td>\
                        <td>' + DATA.MappingTitle + '</td>\
                        <td>' + v.VersionId + '</td>\
                        <td>' + v.VersionDate + '</td>\
                        <td>' + v.VersionUser + '</td>\
                        <td>' + v.Comment + '</td>\
                    </tr>'
                );
            }
        });
    }
    
    if(to_date === DATA.MappingTitle){
        MAP2 = sessionStorage.MappingID;
        $('#evolution table.showVersions').append(
            '<tr class="showVersionsTR">\
                <td>2</td>\
                <td>' + DATA.MappingTitle + '</td>\
                <td>' + sessionStorage.MappingID + '</td>\
                <td>-</td>\
                <td>-</td>\
                <td>-</td>\
            </tr>'
        );
    }
    else{
        var versData = DATA.Versions === null ? [] : (DATA.Versions instanceof Array ? DATA.Versions : [DATA.Versions]);
        $.each(versData, function (i, v) {
            if(v.VersionDate === to_date){
                MAP2 = "version" + v.VersionId;
                $('#evolution table.showVersions').append(
                    '<tr class="showVersionsTR">\
                        <td>2</td>\
                        <td>' + DATA.MappingTitle + '</td>\
                        <td>' + v.VersionId + '</td>\
                        <td>' + v.VersionDate + '</td>\
                        <td>' + v.VersionUser + '</td>\
                        <td>' + v.Comment + '</td>\
                    </tr>'
                );
            }
        });
    }
}





function textualComparisonVersions(tit1,tit2){
    
    var mapping1 = sessionStorage.EvolutionMapping1_XML;
    var mapping2 = sessionStorage.EvolutionMapping2_XML;
    $("#xml_text1_evolution").val(mapping1);
    $("#xml_text2_evolution").val(mapping2);
    
    title1TC = tit1;
    title2TC = tit2;
    
    prettyFormatXML_Evolution();
}


$( document ).ready(function() {
    
    
});

function prettyFormatXML_Evolution(){
    $('#xml_text1_evolution').format({method: 'xml'});
    $('#xml_text2_evolution').format({method: 'xml'});
    
    var viewType = 'sidebyside';
    textComparison_Evolution(viewType);
}

function textComparison_Evolution(viewType) {
    "use strict";
    var byId = function (id) { return document.getElementById(id); },
            base = difflib.stringAsLines(byId("xml_text1_evolution").value),
            newtxt = difflib.stringAsLines(byId("xml_text2_evolution").value),
            sm = new difflib.SequenceMatcher(base, newtxt),
            opcodes = sm.get_opcodes(),
            diffoutputdiv = byId("textualdiffoutput_evolution"),
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