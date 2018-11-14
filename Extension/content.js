$(function muda(){
  if($('[class*="msgcriptografada"]').length){

    ///////////////////////////////////////////////////////////////////////////
    chrome.runtime.sendMessage({type: "notification", options: {
    type: "basic",
    iconUrl: ("icone.png"),
    title: 'gadget9',
    message: 'The divergence number has changed. El Psy Kongroo.'
    }});
    ///////////////////////////////////////////////////////////////////////////

    var conteudoOriginal = $('[class*="msgcriptografada"]').html();
	  var restoDaMensagem = conteudoOriginal.substring(10);

    var dataNormal = conteudoOriginal.substring(0,10);
    //mini bug do milenio
	var Fix1 = dataNormal.substring(0,2);
	var Fix2 = dataNormal.substring(3,5);
	var Fix3 = dataNormal.substring(6,10);
	dataNormal = Fix2 + "." + Fix1 + "." + Fix3;
    //
    var dataLeapt = Date.parse(dataNormal).addDays(-7);
    var diaSemana = dataLeapt.getDay();
    var mes = dataLeapt.getMonth();

    var horarioInicial = $('.g3').html();
    var hora = horarioInicial.indexOf(":")-2;
    var minuto = horarioInicial.indexOf(":")+6;
    var horarioNovo = horarioInicial.substring(hora, minuto);

    switch(diaSemana) {
        case 0:
            diaSemana = "Sun, ";
            break;
        case 1:
            diaSemana = "Mon, ";
            break;
        case 2:
            diaSemana = "Tue, ";
            break;
        case 3:
            diaSemana = "Wed, ";
            break;
        case 4:
           diaSemana = "Thu, ";
           break;
        case 5:
            diaSemana = "Fri, ";
            break;
        case 6:
            diaSemana = "Sat, ";
            break;
        default:
            diaSemana = "Sun, ";
    }

    switch(mes) {
        case 0:
            mes = "Jan ";
            break;
        case 1:
            mes = "Feb ";
            break;
        case 2:
            mes = "Mar ";
            break;
        case 3:
            mes = "Apr ";
            break;
        case 4:
            mes = "May ";
            break;
        case 5:
            mes = "Jun ";
            break;
        case 6:
            mes = "Jul ";
            break;
        case 7:
            mes = "Aug ";
            break;
        case 8:
            mes = "Sep ";
            break;
        case 9:
            mes = "Oct ";
            break;
        case 10:
            mes = "Nov ";
            break;
        case 11:
            mes = "Dec ";
            break;
        default:
            mes = "Dec ";
    }
	
	var msg = diaSemana;
	msg += mes;
	msg += dataLeapt.toString('d, ');
	msg += dataLeapt.toString('yyyy');
	msg += " " + horarioNovo;
	
    $(".g3").html(msg);
    $('[class*="msgcriptografada"]').html(restoDaMensagem);
    $('[class*="msgcriptografada"]').removeAttr("class");
  }
  setTimeout(muda, 1000);
});
