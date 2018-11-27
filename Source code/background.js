chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.type == "notification")
      chrome.notifications.create('notification', request.options, function() { });
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.ativador == "vai")
	{
		/////////////////////////////////////////////////////////////////////////
		var hoje = new Date();
		var hoje2 = hoje.getDate() + '.' + hoje.getMonth() + '.' + hoje.getFullYear();
		mensagemParaMandar = "<h1 class='msgcriptografada'>" + hoje2 + request.mensagem + '</h1>';
		sendMessage('me', request.receptor, btoa(request.assunto),	mensagemParaMandar);
		/////////////////////////////////////////////////////////////////////////
	}
});

function sendMessage(userId, to, subject, email) {
    chrome.identity.getAuthToken({'interactive': true}, function(token) {
        // load Google's javascript client libraries
        var url = "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send?key=API_KEY_HERE&access_token=" + token;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState !== 4 || request.status !== 200) {
				if(request.readyState === 3 && request.status !== 200){
					chrome.runtime.sendMessage({statusEnvio: 'caca'});
				}
                return;
            }
			 chrome.runtime.sendMessage({statusEnvio: 'consegui'});
        }
        ;
        request.open('POST', url, true);
		request.setRequestHeader('Content-Type', 'message/rfc822');
		request.setRequestHeader('Content-Transfer-Encoding', 'BASE64');
		var parametros = 'From: B-Messenger \r\nTo: <'+to+'>\r\nSubject: =?utf-8?B?'+subject+'?=\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: BASE64\r\n\r\n'+email+'\r\n'
        request.send(parametros);
    });
}