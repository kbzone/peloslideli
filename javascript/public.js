$(document).ready(function() {
	$("#escribir_comentario .email").bind("change keyup",function(){
		var email = $(this).val();
		$(".preview .avatar").load("gravatar.php", "email="+email, function(respuesta){
			$(this).html("<img src='" + respuesta + "' />");
		});
	});
	$("#escribir_comentario .nombre").bind("change keyup",function(){
		var nombre = $(this).val();
		$(".preview .nombre").html(nombre);
	});
	$("#escribir_comentario .comentario").bind("change keyup",function(){
		var comentario = $(this).val();
		$(".preview .comentario").html(comentario);
	});
});