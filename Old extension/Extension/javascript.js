$(document).ready(function(){
   $('body').on('click', 'button', function(){
	 minhaURL = 'https://1048596.000webhostapp.com/';
	 minhaURL+= '?mensagem=' + $('#mensagem').val();
	 minhaURL+= '&assunto=' + $('#assunto').val();
	 minhaURL+= '&emailReceptor=' + $('#emailReceptor').val();
     chrome.tabs.create({url: minhaURL});
     return false;
   });
});