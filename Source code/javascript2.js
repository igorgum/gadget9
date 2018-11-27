$(document).ready(function(){
	$(function(){
		chrome.storage.sync.get('idioma', function(val) {
			if(val.idioma == "PTBR"){
				$("#qualidioma").html('<h1>Português</h1><br>Mude o idioma:');
			}else{
				$("#qualidioma").html('<h1>English</h1><br>Change the language:');
			}
		});
		
	});
	
	$('#portugues').on("click", function(){
		chrome.storage.sync.set({'idioma': 'PTBR'}, function(){close();});
	});
	$('#ingles').on("click", function(){
	   chrome.storage.sync.set({'idioma': 'ENG'}, function(){close();});
	});
});