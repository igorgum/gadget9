$(document).ready(function(){
   $('body').on('click', 'button', function(){
	 var receptorVar = $('#emailReceptor').val();
	 var assuntoVar = $('#assunto').val();
	 var mensagemVar = $('#mensagem').val();
	 chrome.runtime.sendMessage({ativador: "vai", receptor: receptorVar, assunto: assuntoVar, mensagem: mensagemVar});
	 $('button').prop("disabled",true);
     return false;
   });
   
   
	chrome.runtime.onMessage.addListener(function(request, sender) {
		if (request.statusEnvio == "consegui"){
			chrome.storage.sync.get('idioma', function(val) {
				if(val.idioma == "PTBR"){
					$('main').html('<h1 id="fundo2" class="sombra formulario" style="color: white; position: absolute;right: 20%;top: 35%;padding-top: 20px;padding-bottom: 20px;">>D-mail enviado<</h1>');
				}else{
					$('main').html('<h1 id="fundo2" class="sombra formulario" style="color: white; position: absolute;right: 20%;top: 35%;padding-top: 20px;padding-bottom: 20px;">>D-mail sent<</h1>');
				}
			});
		}else if(request.statusEnvio == "caca"){
			chrome.storage.sync.get('idioma', function(val) {
				if(val.idioma == "PTBR"){
					$('main').html('<h1 id="fundo2" class="sombra formulario" style="color: white; position: absolute;right: 34%;top: 35%;padding-top: 20px;padding-bottom: 20px;">>Erro<</h1>');
				}else{
					$('main').html('<h1 id="fundo2" class="sombra formulario" style="color: white; position: absolute;right: 34%;top: 35%;padding-top: 20px;padding-bottom: 20px;">>Error<</h1>');
				}
			});
		}
	});
   
   //////tratando o botão
   $('button').prop("disabled",true);
	$("input").on('keyup', function (){
		if($('#emailReceptor').val().length === 0 || $('#assunto').val().length === 0 || $('#mensagem').val().length === 0){
			$('button').prop("disabled",true);
		}else{
			$('button').prop("disabled",false);
		}
	});
	
	
	///////tratando idioma
	chrome.storage.sync.get('idioma', function(val) {
		if(val.idioma == "PTBR"){
			$("#zero").html('Formulário do D-mail');
			$("#um").html('Para:');
			$("#emailReceptor").attr("placeholder", "Email do destinatário").val("").focus().blur();
			$("#dois").html('Assunto:');
			$("#assunto").attr("placeholder", "Assunto do email").val("").focus().blur();
			$("#tres").html('Mensagem:');
			$("#mensagem").attr("placeholder", "Mensagem do email").val("").focus().blur();
			$("#submit").html('Enviar');
		}
	});
});