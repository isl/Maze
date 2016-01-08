/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */


$( document ).ready(function() {
    var url = document.URL;
    if (url.indexOf("singlemapping") >= 0){
        initSingleMappingPage();
    }
    else if (url.indexOf("multmapping") >= 0){
        initMultMappingPage();
    }
    else{
        //console.log('ERROR PAGE');
    }
    
    //  Buttons Events
    //****************************
    
    $(".page_navigator").click(function(){
        var gotopage = $(this).attr("goto");
        if(gotopage){
            if(gotopage==='home'){
                PageTransitions.goToPage(10, gotopage);
                sessionStorage.CurrentPage = gotopage;
            }
            else if(gotopage==="properties_page"){
                var uri = $('#targetSelectionStatistics .uri').text();
                if(uri.indexOf("http") > -1){ // if it is uri
                    var CLAZZ = findClassfrom_ALL_TARGET_SCHEMATA(uri);
                    if(CLAZZ){
                        PageTransitions.goToPage(9, gotopage);
                        initPropertiesPage(CLAZZ);
                    }
                }
            }
            else{
                PageTransitions.goToPage(9, gotopage);
                sessionStorage.CurrentPage = gotopage;
            }
        }
        else{
            console.log('No page to go...');
        }
    });
    
    $(".page_navigator_mirror").click(function(){
        var gotopage = $(this).attr("goto");
        
        if(gotopage){
            $(".page_navigator[goto="+gotopage+"]").click();
        }
    });
    
    $(".sidebar-menu li").click(function(){
        $(".sidebar-menu li").removeClass('active');
        $(this).addClass('active');
    });
    
    //For target and source page
    $('.excludingResultsLabel').on('click', '.page_navigator_mirror', function () {
        var gotopage = $(this).attr("goto");
        
        if(gotopage){
            $(".page_navigator[goto="+gotopage+"]").click();
        }
    });
});