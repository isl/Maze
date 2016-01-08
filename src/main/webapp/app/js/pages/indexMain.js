/**
 * Author : Anyfantis Nikolaos 
 * Email: nanifant 'at' ics 'dot' forth 'dot' gr
 * © Copyright 2015 FOUNDATION FOR RESEARCH & TECHNOLOGY - HELLAS
 */

$( document ).ready(function() {
    $('.multipleMappings .addNewMapping').click(function(){
        var numOfTxtBox = $('.multipleMappings .mapId_txtBox').length;
        if(numOfTxtBox<5){
            var textBox = '<div class="input-group margin">\
                            <input type="text" class="mapId_txtBox form-control" placeholder="Mapping ID">\
                            <span class="input-group-btn">\
                              <button class="removeNewMapping btn btn-danger btn-flat" type="button"><i class="fa fa-times"></i></button>\
                            </span>\
                          </div>';
            $(textBox).insertBefore( $(this) );
        }
    });
    
    $('.multipleMappings').on('click', '.removeNewMapping', function() {
        var numOfTxtBox = $('.multipleMappings .mapId_txtBox').length;
        if(numOfTxtBox>2){
            var group = $(this).closest('.input-group');
            group.remove();
        }
    });
    
    $('.singleMapping .small-box-footer').click(function(){
        var mappingId = $('.singleMapping .mapId_txtBox').val();
        if(mappingId){
            location.href = GlobalResources.Services.ServerURL +'/Maze/singlemapping.html?id=Mapping'+mappingId;
        }
    });
    
    $('.multipleMappings .small-box-footer').click(function(){
        var url = GlobalResources.Services.ServerURL +'/Maze/multmappings.html?';
        var mappings = 0;
        $('.multipleMappings .mapId_txtBox').each(function( index, box ) {
            var value = $(this).val();
            if(value){
                mappings++;
                url += 'id' + mappings + '=Mapping' + value + '&';
                console.log( index + ": " + $( this ).val() );
            }
        });
        
        if(mappings>0){
            location.href = url.substring(0, url.length - 1);
        }
    });
    
});