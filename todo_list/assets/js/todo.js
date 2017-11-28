// Check off specific to-do's by clicking
$("ul").on("click", "li", function(){
	// // If li is gray
	// if($(this).css("color") === "rgb(128, 128, 128)"){
	// 	// turn it black
	// 	$(this).css({
	// 		textDecoration: "none",
	// 		color: "black"
	// 	});
	// } else {
	// 	// turn it gray
	// 	$(this).css({
	// 		textDecoration: "line-through",
	// 		color: "gray"
	// 	});
	// }

	// Easier than the above
	$(this).toggleClass("completed");
});

// Delete to-do when the X is clicked
$("ul").on("click", "span", function(event){
  event.stopPropagation();
  $(this).parent().fadeOut(500,function(){
    $(this).remove();
  });
});

$("input[type='text']").keypress(function(event){
  if(event.which === 13){
    var input = $(this).val();
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + input + "</li>");
    $("input").val("");
  }
});

$(".fa-plus").click(function(){
  $("input[type='text']").fadeToggle();
});
