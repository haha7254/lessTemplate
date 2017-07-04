$(function(){

    resizeStatus();
});

window.addEventListener('resize', resizeStatus);



function resizeStatus(){
    var headerHeight = $('#header').height();
    var mainHeight = $('#main > div').height();
    
    var top = headerHeight + mainHeight;
    
    $("#state").css({
        top: top
    });    
}