/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

function initSingleMappingPage(){
    if(!GlobalResources.System.DebugMode){
        var mId = extractMappingID('id');
        mId = mId.replace(/[^0-9]/g, '');
        sessionStorage.MappingID = mId;
        
        AjaxRequests.SingleMapping.GetMapping(mId);
        AjaxRequests.SingleMapping.GetCoverageMetrics(mId);
    }
}

$( document ).ready(function() {
    
});

function RenderMappingDetails(){
    var mapping = $.parseJSON(sessionStorage.Mapping);
    
    var title = mapping.info.title;
    
    var source = mapping.info.source_info.source_schema.$;
    if(source==='') source = 'Not Available';
    
    var targetList = mapping.info.target_info;
    var target = '';
    try{
        $.each(targetList, function( index, schema ){
            target += schema.target_schema.$;
            if(index!==(targetList.length-1)) target += ', ';
        });
    }catch (err){
        target = targetList.target_schema.$;
    }
    if(target==='') target = 'Not Available';
    
    $('section.content-header h1 small').text(title);
    $('.source_name').text(source);
    $('.target_name').text(target);
}


function RenderMappingCoverageMetricsOverview(){
    var metrics = $.parseJSON(sessionStorage.CoverageMetrics);
    
    var sourceSchemaMetrics = metrics.overviewMetrics.sSMetrics;
    var targetSchemaMetrics = metrics.overviewMetrics.tSMetrics;
    //home page
    $('#percOverview .covTables').val(sourceSchemaMetrics.directMetric.CoveredParentElements);
    $('#percOverview .covAttrs').val(sourceSchemaMetrics.directMetric.CoveredChildElements);
    $('#percOverview .covSS').val(sourceSchemaMetrics.directMetric.CoveredSourceSchema);
    $('#percOverview .covClasses').val(targetSchemaMetrics.directMetric.CoveredClasses);
    $('#percOverview .covProps').val(targetSchemaMetrics.directMetric.CoveredProperties);
    $('#percOverview .covTS').val(targetSchemaMetrics.directMetric.CoveredTargetSchema);
    
    /* jQueryKnob */
    $("#percOverview .knob").trigger('change');
}

