/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

var ERRORSPriority = {
    Low : "Low Priority",
    Medium : "Medium Priority",
    High : "High Priority"
};

var WARNINGSPriority = {
    Low : "Low Priority",
    Medium : "Medium Priority",
    High : "High Priority"
};

function initErrorsCompPage(){
    
    try{
        var mapping1 = $.parseJSON(sessionStorage.Mapping1_JSON);
        var mapping2 = $.parseJSON(sessionStorage.Mapping2_JSON);
        evaluateMapping(sessionStorage.MappingID1, mapping1);
        evaluateMapping(sessionStorage.MappingID2, mapping2);
    }
    catch (er){
        APPENDError(er, ERRORSPriority.High);
    }
    
    
}

$( document ).ready(function() {
    
    $('#errorsLIST').on('click', 'i.fa-trash-o', function () {
        $(this).closest( "li" ).remove();
        var count = $("#errorsLIST li").size();
        $("#errorsCount").text(count);
    });
    
    $('#warningsLIST').on('click', 'i.fa-trash-o', function () {
        $(this).closest( "li" ).remove();
        var count = $("#warningsLIST li").size();
        $("#warningsCount").text(count);
    });
});



function APPENDError(message, priority){
    var label = "";
    if(priority === ERRORSPriority.Low){
        label = "label-default";
    }
    else if(priority === ERRORSPriority.Medium){
        label = "label-warning";
    }
    else{
        label = "label-danger";
    }
    
    $("#errorsLIST").append(
        '<li>\
            <span>\
                <i class="fa fa-ellipsis-v"></i>\
                <i class="fa fa-ellipsis-v"></i>\
            </span>\
            <span class="text">' + message + '</span>\
            <small class="label ' + label + '">' + priority + '</small>\
            <div class="tools">\
                <i class="fa fa-trash-o"></i>\
            </div>\
        </li>'
    );
    var count = $("#errorsLIST li").size();
    $("#errorsCount").text(count);
    
    //setTimeout(function(){
    //    $.notify({ message: message, icon: 'glyphicon glyphicon-warning-sign' },{ type: 'danger' });
    //}, 1000);
}

function APPENDWarning(message, priority){
    var label = "";
    if(priority === WARNINGSPriority.Low){
        label = "label-default";
    }
    else if(priority === WARNINGSPriority.Medium){
        label = "label-warning";
    }
    else{
        label = "label-danger";
    }
    
    $("#warningsLIST").append(
        '<li>\
            <span>\
                <i class="fa fa-ellipsis-v"></i>\
                <i class="fa fa-ellipsis-v"></i>\
            </span>\
            <span class="text">' + message + '</span>\
            <small class="label ' + label + '">' + priority + '</small>\
            <div class="tools">\
                <i class="fa fa-trash-o"></i>\
            </div>\
        </li>'
    );
    var count = $("#warningsLIST li").size();
    $("#warningsCount").text(count);
    
    //setTimeout(function(){
    //    $.notify({ message: message, icon: 'glyphicon glyphicon-warning-sign' },{ type: 'warning' });
    //}, 1000);
}


function evaluateMapping(mapId, mapping){
    var mappId = 'Mapping'+mapId;
    //evaluate source schema
    try{
        var source_schema = mapping.info.source_info.source_schema;
        var example_data_info = mapping.info.example_data_info;
        
        var version = source_schema.version;
        if(!version || version===''){
            APPENDWarning('['+ mappId +' - Source schema] No source schema version.', WARNINGSPriority.Low);
        }
        var type = source_schema.type;
        if(!type || type===''){
            APPENDWarning('['+ mappId +' - Source schema] No source schema type.', WARNINGSPriority.Medium);
        }
        var example_data_source_record = example_data_info.example_data_source_record.xml_link;
        if(!example_data_source_record || example_data_source_record===''){
            APPENDError('['+ mappId +' - Source schema] No source schema type.', ERRORSPriority.High);
        }
    }catch (er){
        APPENDError('['+ mappId +' - Source Schema] '+ er, ERRORSPriority.High);
    }
    
    
    //evaluate target schema
    try{
        var target_info = mapping.info.target_info;
        
        var tiList = target_info === null ? [] : (target_info instanceof Array ? target_info : [target_info]); 
        if(tiList.length === 0){
            APPENDError('['+ mappId +' - Target Schema] No target schemas available.' , ERRORSPriority.Medium);
        }
        else{
            $.each(tiList, function (i, f) {
                var file = f.target_schema.schema_file;
                if(!file || file===''){
                    APPENDError('['+ mappId +' - Target Schema] No target schema file for '+f.target_schema.$ , ERRORSPriority.High);
                }
            });
        }
        
    }catch (er){
        APPENDError('['+ mappId +' - Target Schema] '+ er, ERRORSPriority.High);
    }
    
    //evaluate mappings
    try{
        var mappings = mapping.mappings.mapping === null ? [] : 
                (mapping.mappings.mapping instanceof Array ? mapping.mappings.mapping : [mapping.mappings.mapping]);
        if(mappings.length === 0){
            APPENDWarning('['+ mappId +' - Mappings] No mappings yet.', WARNINGSPriority.Medium);
        }
        else{
            $.each(mappings, function (i, m) {
                var source_node = m.domain.source_node;
                if(!source_node || source_node===''){
                    APPENDWarning('['+ mappId +' - Mappings] No mappings yet.', WARNINGSPriority.Medium);
                }
            });
        }
    }catch (er){
        APPENDWarning('['+ mappId +' - Mappings] No mappings yet.'+ er, WARNINGSPriority.Medium);
    }
    
    //evaluate instance
    try{
        var dataRecordsFile = mapping.info.example_data_info.example_data_target_record;
        if(!dataRecordsFile){
            throw "No mapping data target record.";
        }
    }
    catch (er){
        APPENDError("["+ mappId +" - Instance] Mapping does not include data target record!", ERRORSPriority.High);
    }
    
    
}