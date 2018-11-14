<?php

//////////////////////////////////////////////////
// Envelopa a mensagem em uma div com classe a ser reconhecida pela extensão
//////////////////////////////////////////////////
$diaAgora = date('d.m.Y');
$antes = "<h1 class='msgcriptografada'>";
$depois = '</h1>';
 //////////////////////////////////////////////////
 
session_start();

//////////////////////////////////////////////////
//Ao receber GET do form, transforma em SESSION p ser usado dps do redirect do google
//////////////////////////////////////////////////
if(isset($_GET['mensagem'])){
	//se veio um get
	$_SESSION['mensagemS']= $antes . $diaAgora . $_GET['mensagem'] . $depois;
}
if(isset($_GET['emailReceptor'])){
	//se veio um get
	$_SESSION['emailReceptorS']= $_GET['emailReceptor'];
}
if(isset($_GET['assunto'])){
	//se veio um get
	$_SESSION['assuntoS']= $_GET['assunto'];
}
//////////////////////////////////////////////////
//Se receber LOGOUT=TRUE, esquece os SESSIONS
//////////////////////////////////////////////////
if(isset($_GET['logout']) && $_GET['logout']=='true'){
	unset($_SESSION['mensagemS']);
	unset($_SESSION['emailReceptorS']);
	unset($_SESSION['assuntoS']);
	unset($_SESSION['gmail_access_token']);
	unset($_SESSION['access_token']);
	echo'<script>window.location.replace("https://1048596.000webhostapp.com")</script>';
}

require_once 'src/Google/autoload.php';
$client = new Google_Client();
$client->setClientId("BOTE O CLIENT ID AQUI");
$client->setClientSecret("BOTE O CLIENT SECRET AQUI");
$client->setRedirectUri("https://1048596.000webhostapp.com");
$client->setAccessType('online');

//////////////////////////////////////////////////
//Adicionar escopos aqui:
$client->addScope("https://www.googleapis.com/auth/gmail.send");
////////////////////////////////////////////////////////////////////
 
if (isset($_REQUEST['code'])) {
    $code = $_REQUEST['code'];
    $client->authenticate($code);
     if($client->isAccessTokenExpired()) {
		$authUrl = $client->createAuthUrl();
		header('Location: ' . filter_var($authUrl, FILTER_SANITIZE_URL));
	}
    $_SESSION['gmail_access_token'] = $client->getAccessToken();
     
	header("Location: https://1048596.000webhostapp.com/index.php");
}
 
if (isset($_SESSION['gmail_access_token'])) {
    $client->setAccessToken($_SESSION['gmail_access_token']);
	$objGMail = new Google_Service_Gmail($client);
	if(isset($_SESSION['emailReceptorS'])) {
		//////////////////////////////////////////////////
		//Está LOGADO & recebeu form
		//////////////////////////////////////////////////
		try {
		$strRawMessage = "From: B-Messenger \r\n";
		$strRawMessage .= "To: <" . $_SESSION['emailReceptorS'] . ">\r\n";
		$strRawMessage .= 'Subject: =?utf-8?B?' . base64_encode($_SESSION['assuntoS']) . "?=\r\n";
		$strRawMessage .= "MIME-Version: 1.0\r\n";
		$strRawMessage .= "Content-Type: text/html; charset=utf-8\r\n";
		$strRawMessage .= 'Content-Transfer-Encoding: BASE64' . "\r\n\r\n";
		$strRawMessage .= $_SESSION['mensagemS'] . "\r\n";
		
		$mime = rtrim(strtr(base64_encode($strRawMessage), '+/', '-_'), '=');
		$msg = new Google_Service_Gmail_Message();
		$msg->setRaw($mime);
		
		$objGMail->users_messages->send("me", $msg);
		
		unset($_SESSION['mensagemS']);
		unset($_SESSION['emailReceptorS']);
		unset($_SESSION['assuntoS']);
		unset($_SESSION['gmail_access_token']);
		unset($_SESSION['access_token']);
		header("Location: https://1048596.000webhostapp.com/enviado.html");
		
		} catch (Exception $e) {
			print($e->getMessage());
			unset($_SESSION['gmail_access_token']);
			unset($_SESSION['access_token']);
			unset($_SESSION['mensagemS']);
			unset($_SESSION['emailReceptorS']);
			unset($_SESSION['assuntoS']);
		}
	}else{
		//////////////////////////////////////////////////
		//Está LOGADO mas não recebeu form
		//////////////////////////////////////////////////
		echo "<main>\n";
		echo "<h1>GADGET9</h1>\n";
		echo "<button onclick=\"location.href = 'https://1048596.000webhostapp.com/?logout=true';\" style=\"background-color:blue;color: white; position: absolute;right: 0px;top: 0px;\">Logout from Google</button>\n";
		echo "<hr>\n";
		echo "<h2 style=\"color:red\">FORM FOR SENDING EMAIL:</h2>\n";
		echo "<form action=\"\" method=\"get\" style=\"background-color: white\">\n";
		echo "<label for=\"emailReceptor\">To:</label>\n";
		echo "<br>\n";
		echo "<input type=\"email\" name=\"emailReceptor\" id=\"emailReceptor\" required>\n";
		echo "<br>\n";
		echo "<label for=\"assunto\">Subject:</label>\n";
		echo "<br>\n";
		echo "<input type=\"text\" name=\"assunto\" id=\"assunto\" required>\n";
		echo "<br>\n";
		echo "<label for=\"mensagem\">Message:</label>\n";
		echo "<br>\n";
		echo "<input type=\"text\" name=\"mensagem\" id=\"mensagem\" required>\n";
		echo "<br>\n";
		echo "<br>\n";
		echo "<input type=\"submit\" value=\"Submit\">\n";
		echo "</form>\n";
		echo "<hr>\n";
		echo "<a href='privacy.html'>Read privacy policy</a>.";
		echo "</main>";	
	}
}
else {
    // Falha
    if (isset($_REQUEST['error'])) {
        echo "error auth";
    }
    else{
        // Redirect
        $authUrl = $client->createAuthUrl();
        header("Location: $authUrl");
    }
}