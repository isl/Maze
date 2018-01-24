/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

function initMultMappingPage(){
    
    if(!GlobalResources.System.DebugMode){
        var mId1 = extractMappingID('id1');
        mId1 = mId1.replace(/[^0-9]/g, '');
        var mId2 = extractMappingID('id2');
        mId2 = mId2.replace(/[^0-9]/g, '');
        sessionStorage.MappingID1 = mId1;
        sessionStorage.MappingID2 = mId2;

        AjaxRequests.MultipleMappings.GetMappings(mId1, mId2);
        AjaxRequests.MultipleMappings.GetMappingsXML(mId1, mId2);
    }
}

$( document ).ready(function() {
    
    
});

function AreComparableMappings(mapping1, mapping2){
    var isComparable = false;
    var source1 = mapping1.info.example_data_info.example_data_source_record.xml_link;
    var source2 = mapping2.info.example_data_info.example_data_source_record.xml_link;
    
    if(source1 && source2 && source1!=="" && source2!==""){
        if(source1===source2) isComparable = true;
    }
    
    return isComparable;
}

function renderMappingDetailsHomePage(mapping1, mapping2){
    if(mapping1){
        var title = mapping1.info.title;
        var source = mapping1.info.source.source_info.source_schema.$;
        if(source==='') source = 'Not Available';
        var targetList = mapping1.info.target.target_info;
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
        var id = 'Mapping' + sessionStorage.MappingID1;
        
        $('#mappingsSelectionTable').append(
            '<tr>\
                <td>1</td>\
                <td>' + id + '</td>\
                <td>' + title + '</td>\\n\
                <td>' + source + '</td>\
                <td>' + target + '</td>\
            </tr>'      
        );

        //instance page
        $('#instance_comparison .title1').text(title);
    }
    if(mapping2){
        var title = mapping2.info.title;
        var source = mapping2.info.source.source_info.source_schema.$;
        if(source==='') source = 'Not Available';
        var targetList = mapping2.info.target.target_info;
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
        var id = 'Mapping' + sessionStorage.MappingID2;
        
        $('#mappingsSelectionTable').append(
            '<tr>\
                <td>2</td>\
                <td>' + id + '</td>\
                <td>' + title + '</td>\\n\
                <td>' + source + '</td>\
                <td>' + target + '</td>\
            </tr>'      
        );

        //instance page
        $('#instance_comparison .title2').text(title);
    }
}