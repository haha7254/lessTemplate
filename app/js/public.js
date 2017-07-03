$(document).ready(function() {

	//$("#top_banner").find("> div").imgLiquid();
	$("#top_banner").css({
		height:$(window).height()
	}).find("> div").imgLiquid();




	//solu 2 
	var _top_banner_now = 1;
	var _length = $('#top_banner > div').length;
	$('#top_banner_next').click(function(){

		_top_banner_now = _top_banner_now+1;
		if( _top_banner_now > $('#top_banner > div').length){
			_top_banner_now = 1;
		}		
		$('#top_banner').attr('class', 'n'+ _top_banner_now);
	})


	$("#top_banner_prev").click(function(){
		_top_banner_now = _top_banner_now-1;
		if( _top_banner_now < 1){
			_top_banner_now = $('#top_banner > div').length;
		}

		$('#top_banner').attr('class', 'n'+ _top_banner_now);
	})







	// //1  2  3  4  5

	// var _top_banner_now = 2;
	// $('#top_banner_count').text($('#top_banner > div').length);
	// $('#top_banner_now').text(_top_banner_now);

	// $("#top_banner_next").click(function(){
	// 	var $tmp = $("#top_banner > div").eq(0).clone(true);
	// 	$("#top_banner").append($tmp);

	// 	$("#top_banner > div").eq(0).remove();

	// 	_top_banner_now = _top_banner_now+1;
	// 	if( _top_banner_now > $('#top_banner > div').length){
	// 		_top_banner_now = 1;
	// 	}
	// 	$('#top_banner_now').text(_top_banner_now);

	// })
	// $("#top_banner_prev").click(function(){
	// 	var $tmp = $("#top_banner > div").last().clone(true);
	// 	$("#top_banner").prepend($tmp);

	// 	$("#top_banner > div").last().remove();
	// 	_top_banner_now = _top_banner_now - 1;
	// 	if( _top_banner_now < 1){
	// 		_top_banner_now = $('#top_banner > div').length;
	// 	}

	// 	$('#top_banner_now').text(_top_banner_now);
	// }).click();

	// setTimeout(function(){
	// 	$("#top_banner").addClass("transi");
	// }, 500);
	
});