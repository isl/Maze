/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */


/* MAZE CONFIG DATA */

var GlobalResources = {
    System :{
        DebugMode : false,   //no connection with server at all (only for design purposes)
        CacheMode : true    //NOT SUPPORTED YET get data if they are not cached already
    },
    Services : {
        ServerURL: 'http://'+window.location.hostname+':8080',
        RestService: 'http://'+window.location.hostname+':8080/Maze/webresources',
        TargetSchemaService:'http://139.91.183.3/3MEditor/FetchBinFile?type=target_info&file='
    }
};

