$(function(){
	$("#field_count").bind('change', function(){    
        var item_price = $("#item_price").text();
		$("#total_price").text(item_price * $(this).val());
    });
});