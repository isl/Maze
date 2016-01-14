/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

/*
	Ajax Requests for MAZE 
        
*/
 
var AjaxRequests = 
{
    // Single Mapping
    //*******************************
    SingleMapping : 
        {
            GetMapping:function(id)
            {
                var requestType = 'GetMapping';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/singlemapping/' + id,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(!data){
                            location.href = GlobalResources.Services.ServerURL +'/Maze/errorpage.html';
                            return false;
                        }
                        
                        var mapping = JSON.stringify(data).replace(/\@/g, '');
                        sessionStorage.Mapping = mapping;
                        RenderMappingDetails(); //for home page

                        //init indepedent pages!!
                        initErrorsPage();
                        initWarningPage();
                        initSourceSchemaPage();
                        initTargetSchemaPage();
                        initX3MLOverviewPage();
                        initOntologyOverviewPage();
                        initSourcePercentagePage();
                        initInstancePage();
                    },
                    error: function (jqXHR, textStatus) {
                        console.log( "Request failed for mapping structure: " + textStatus );
                        location.href = GlobalResources.Services.ServerURL +'/Maze/errorpage.html';
                    }
                });
            },
            GetCoverageMetrics:function(id)
            {
                var requestType = 'GetCoverageMetrics';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/singlemapping/coveragemetrics/' + id,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            sessionStorage.CoverageMetrics=JSON.stringify(data);
                            RenderMappingCoverageMetricsOverview();
                            addMetricsToTargetPercentagePage();
                            addMetricsToSourcePercentagePage();
                        }
                        else{
                            APPENDError('['+ requestType +'] No metrics available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No metrics available, ' + textStatus, ERRORSPriority.High);
                        console.log( "Request failed for mapping GetCoverageMetrics: " + textStatus );
                    }
                });
                
            },
            GetERSourceSchema:function(id)
            {
                var requestType = 'GetERSourceSchema';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/source_schema/er/' + id,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            try{
                                sessionStorage.ERSourceSchema=JSON.stringify(data);
                                RenderSampleDataInfo_ER();
                                DrawSourceSchemaGraph_ER();
                            }
                            catch (e){ 
                                console.error("TOO big file for: " + requestType); 
                                APPENDError('['+ requestType +'] TOO big file for cache', ERRORSPriority.High);
                            }
                        }
                        else{
                            APPENDError('['+ requestType +'] No source schema available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No source schema available, ' + textStatus, ERRORSPriority.High);
                        console.log( "Request failed for ER Source Schema: " + textStatus );
                    }
                });
            },
            GetTreeSourceSchema:function(id)
            {
                //NOT USED, used directly from D3.js and stored in cache
                // page source_percentageMain.js
                var requestType = 'GetTreeSourceSchema';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/source_schema/tree/' + id,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            try{
                                sessionStorage.TreeSourceSchema=JSON.stringify(data);
                            }
                            catch (e){ 
                                console.error("TOO big file for: " + requestType); 
                                APPENDError('['+ requestType +'] TOO big file for cache', ERRORSPriority.High);
                            }
                        }
                        else{
                            APPENDError('['+ requestType +'] No source schema available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No source schema available, '+textStatus, ERRORSPriority.High);
                        console.log( "Request failed for Tree Source Schema: " + textStatus );
                    }
                });
            },
            GetTargetSchemata:function()
            {
                var requestType = 'GetTargetSchemata';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/target_schema/all/' + sessionStorage.MappingID,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            sessionStorage.TargetSchemata=JSON.stringify(data);
                            RenderTargetSchemata();
                            initTargetPercentagePage();
                        }
                        else{
                            APPENDError('['+ requestType +'] No target schema available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No target schema available, ' + textStatus, ERRORSPriority.High);
                        console.log( "Request failed for ER Source Schema: " + textStatus );
                    }
                });
            },
            GetERMappingRules:function()
            {
                var requestType = 'GetERMappingRules';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/mappingrules/er/' + sessionStorage.MappingID,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            try{
                                sessionStorage.ERMappingRules=JSON.stringify(data);
                                //Ontology overview Page
                                addTargetSchematoScene_ER();
                            }
                            catch (e){ 
                                APPENDError('['+ requestType +'] TOO big file for cache', ERRORSPriority.High);
                                console.error("TOO big file for: " + requestType); 
                            }
                        }
                        else{
                            APPENDError('['+ requestType +'] No mapping rules available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No mapping rules available, '+textStatus, ERRORSPriority.High);
                        console.log( "Request failed for ER Source Schema: " + textStatus );
                    }
                });
            },
            GetTreeMappingRules:function()
            {
                var requestType = 'GetTreeMappingRules';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/mappingrules/tree/' + sessionStorage.MappingID,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            try{
                                sessionStorage.TreeMappingRules=JSON.stringify(data);
                                //Ontology overview Page
                                addTargetSchematoScene_Tree();
                            }
                            catch (e){ 
                                console.error("TOO big file for cashe about: " + requestType); 
                                APPENDError('['+ requestType +'] TOO big file for cache', ERRORSPriority.High);
                                addTargetSchematoScene_Tree(data);
                            }
                        }
                        else{
                            APPENDError('['+ requestType +'] No mapping rules available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No mapping rules available, '+textStatus, ERRORSPriority.High);
                        console.log( "Request failed for XML Source Schema: " + textStatus );
                    }
                });
            },
            GetCoveredElementsSourceSchema:function()
            {
                var requestType = 'GetCoveredElementsSourceSchema';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/source_schema/coveredelements/' + sessionStorage.MappingID,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            sessionStorage.CoveredElementsSourceSchema=JSON.stringify(data);
                            DrawTreeD3_Coverage.updateTreeD3_Coverage();
                        }
                        else{
                            APPENDError('['+ requestType +'] No covered elements available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No covered elements available, '+textStatus, ERRORSPriority.High);
                        console.log( "Request failed for ER Source Schema: " + textStatus );
                    }
                });
            },
            GetCoveredElementsTargetSchema:function()
            {
                var requestType = 'GetCoveredElementsTargetSchema';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/target_schema/coveredelements/' + sessionStorage.MappingID,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            sessionStorage.CoveredElementsTargetSchema=JSON.stringify(data);
                            ManangeDrawGraphsCoveragePage();
                        }
                        else{
                            APPENDError('['+ requestType +'] No covered elements available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No covered elements available, '+textStatus, ERRORSPriority.High);
                        console.log( "Request failed for Target Schema: " + textStatus );
                    }
                });
            },
            GetMetricsWithExcludingListTS:function(list)
            {
                var requestType = 'GetMetricsWithExcludingListTS';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/target_schema/metrics/excludinglist/' + sessionStorage.MappingID,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'text/plain',
                    data: JSON.stringify(list),
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            console.log(data);
                            appendExcludingResultsTS(data);
                            addMetricsToTargetPercentagePage(data);
                        }
                        else{
                            APPENDError('['+ requestType +'] No metrics available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No metrics available, '+textStatus, ERRORSPriority.High);
                        console.log( "Request failed for Post Request: " + textStatus );
                    }
                });
            },
            GetMetricsWithExcludingListSS:function(list)
            {
                var requestType = 'GetMetricsWithExcludingListSS';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/source_schema/metrics/excludinglist/' + sessionStorage.MappingID,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'text/plain',
                    data: JSON.stringify(list),
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            console.log(data);
                            appendExcludingResultsSS(data);
                            addExcludingMetricsToSourcePercentagePage(data);
                        }
                        else{
                            APPENDError('['+ requestType +'] No metrics available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No metrics available, '+textStatus, ERRORSPriority.High);
                        console.log( "Request failed for Post Request: " + textStatus );
                    }
                });
            },
            GetInstanceData:function()
            {
                var requestType = 'GetInstanceData';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/instances/' + sessionStorage.MappingID,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            try{
                                sessionStorage.InstanceData=JSON.stringify(data);
                            }
                            catch (er){
                                APPENDError('['+ requestType +'] Instance data too big for cache, '+ er, ERRORSPriority.Medium);
                            }
                            ManageInstanceData(data);
                        }
                        else{
                            APPENDError('['+ requestType +'] No Instance data available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No Instance data available, '+textStatus, ERRORSPriority.High);
                        console.log( "Request failed for Instance data : " + textStatus );
                    }
                });
            }
        },
    
    
    
    
    // Multiple Mappings
    //*******************************
    MultipleMappings : 
        {
            GetMappings:function(id1,id2)
            {
                var requestType = 'GetMappings';
                createLoadingFlag(requestType);
                var req1 = $.ajax({
                            type: 'GET',
                            url: GlobalResources.Services.RestService + '/x3ml/singlemapping/' + id1,
                            dataType: 'json',
                            success: function (res1) {
                                
                            },
                            error: function (jqXHR, textStatus) {
                                APPENDError('['+ requestType +'] Request failed for mapping, '+textStatus, ERRORSPriority.High);
                                console.log( "Request failed for mapping structure: " + textStatus );
                            }
                        });

                var req2 = $.ajax({
                            url: GlobalResources.Services.RestService + '/x3ml/singlemapping/' + id2,
                            dataType: 'json',
                            success: function (res2) {
                                
                            },
                            error: function (jqXHR, textStatus) {
                                APPENDError('['+ requestType +'] Request failed for mapping, '+textStatus, ERRORSPriority.High);
                                console.log( "Request failed for mapping structure: " + textStatus );
                            }
                        });
		
		$.when(req1, req2).done(function(res1,res2){
                        removeLoadingFlag(requestType);
                        
                        sessionStorage.Mapping1_JSON = JSON.stringify(res1[0]).replace(/\@/g, '');
                        sessionStorage.Mapping2_JSON = JSON.stringify(res2[0]).replace(/\@/g, '');
                        
                        var mapping1 = $.parseJSON(sessionStorage.Mapping1_JSON);
                        var mapping2 = $.parseJSON(sessionStorage.Mapping2_JSON);
                        renderMappingDetailsHomePage(mapping1, mapping2); //multMain.js
                        //if can be compared(same source schema)
                        var comparable = AreComparableMappings(mapping1, mapping2); //multMain.js
                        if(comparable){//Init all pages
                            initGraphicalCompPage();
                        }
                        else{
                            $('#compareAlert').show();
                        }
                        initErrorsCompPage();
                        initInstanceCompPage();
                });
            },
            GetMappingsXML:function(id1,id2)
            {
                var requestType = 'GetMappingsXML';
                createLoadingFlag(requestType);
                var req1 = $.ajax({
                            type: 'GET',
                            url: GlobalResources.Services.RestService + '/x3ml/singlemapping/plain/' + id1,
                            dataType: 'xml',
                            success: function (res1) {
                                
                            },
                            error: function (jqXHR, textStatus) {
                                APPENDError('['+ requestType +'] Request failed for mapping, '+textStatus, ERRORSPriority.High);
                                console.log( "Request failed for mapping structure: " + textStatus );
                            }
                        });

                var req2 = $.ajax({
                            url: GlobalResources.Services.RestService + '/x3ml/singlemapping/plain/' + id2,
                            dataType: 'xml',
                            success: function (res2) {
                                
                            },
                            error: function (jqXHR, textStatus) {
                                APPENDError('['+ requestType +'] Request failed for mapping, '+textStatus, ERRORSPriority.High);
                                console.log( "Request failed for mapping structure: " + textStatus );
                            }
                        });
		
		$.when(req1, req2).done(function(res1,res2){
                        removeLoadingFlag(requestType);
                        
                        var title1 = $(res1).find('title').text();
                        var mapping1 = xmlToString(res1[0]);
                        sessionStorage.Mapping1_XML = mapping1;
                        var title2 = $(res2).find('title').text();
                        var mapping2 = xmlToString(res2[0]);
                        sessionStorage.Mapping2_XML = mapping2;
                        
                        initTextualCompPage(title1,title2);
		});
            },
            GetInstanceDataComparison:function()
            {
                var requestType = 'GetInstanceDataComparison';
                createLoadingFlag(requestType);
                var req1 = $.ajax({
                            type: 'GET',
                            url: GlobalResources.Services.RestService + '/x3ml/instances/' + sessionStorage.MappingID1,
                            dataType: 'json',
                            success: function (res1) {
                                
                            },
                            error: function (jqXHR, textStatus) {
                                APPENDError('['+ requestType +'] Request failed for mapping, '+textStatus, ERRORSPriority.High);
                            }
                        });

                var req2 = $.ajax({
                            url: GlobalResources.Services.RestService + '/x3ml/instances/' + sessionStorage.MappingID2,
                            dataType: 'json',
                            success: function (res2) {
                                
                            },
                            error: function (jqXHR, textStatus) {
                                APPENDError('['+ requestType +'] Request failed for mapping, '+textStatus, ERRORSPriority.High);
                            }
                        });
		
		$.when(req1, req2).done(function(res1,res2){
                        removeLoadingFlag(requestType);
                        try{
                            sessionStorage.InstanceData1 = JSON.stringify(res1[0]);
                            sessionStorage.InstanceData2 = JSON.stringify(res2[0]);
                        }catch (er){
                            APPENDError('['+ requestType +'] Instance data too big for cache, '+ er, ERRORSPriority.Medium);
                        }
                        ManageInstanceDataComparison(res1[0], res2[0]);
		});
            },
            GetTreeMappingRulesComparison:function()
            {
                var requestType = 'GetTreeMappingRulesComparison';
                createLoadingFlag(requestType);
                $.ajax({
                    url: GlobalResources.Services.RestService + '/x3ml/graphical_comparison/' + sessionStorage.MappingID1 + '/' + sessionStorage.MappingID2,
                    dataType: 'json',
                    success: function (data) {
                        removeLoadingFlag(requestType);
                        if(data){
                            try{
                                sessionStorage.TreeMappingRules=JSON.stringify(data);
                                //graphical comparison Page
                                addTargetSchematoScene_TreeComparison();
                            }
                            catch (e){ 
                                console.error("TOO big file for cashe about: " + requestType); 
                                APPENDError('['+ requestType +'] TOO big file for cache', ERRORSPriority.High);
                                addTargetSchematoScene_TreeComparison(data);
                            }
                        }
                        else{
                            APPENDError('['+ requestType +'] No mapping rules available', ERRORSPriority.High);
                        }
                    },
                    error: function (jqXHR, textStatus) {
                        removeLoadingFlag(requestType);
                        APPENDError('['+ requestType +'] No mapping rules available, '+textStatus, ERRORSPriority.High);
                        console.log( "Request failed for XML Source Schema: " + textStatus );
                    }
                });
            }
        }
    
    
};

//Creates flag of loading
function createLoadingFlag(requestType){
    var loadingHtml =   '<div class="loadingMessage">\
                            <span>Analyzing...</span>\
                            <i class="fa fa-refresh fa-spin"></i>\
                        </div>';
    
    if(!$('.loadingFromServer .loadingMessage').length>0 ){
        $('.loadingFromServer').append(loadingHtml);
    }
    
    $('.loadingFromServer .requestList').append('<li>'+requestType+'</li>');
}

//Removes flag of loading
function removeLoadingFlag(requestType){
    var requestList = $('.loadingFromServer .requestList li');
    
    $.each(requestList, function(i, r) {
        if($(this).text()===requestType) $(this).remove();
    });
    
    if($('.loadingFromServer .requestList li').length<=0){
        $('.loadingFromServer .loadingMessage').remove();
    }
}