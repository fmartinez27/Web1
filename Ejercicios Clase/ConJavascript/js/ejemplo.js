function agregar(){
  //alert('sarasa');
  let miTexto = document.getElementById('texto').value;
  alert(miTexto);
}

function validar(){
  let myValue = document.getElementById('numbers').value;
  let num = parseInt(myValue);

  if (num >= 0){
    alert ("es positivo")
  }else {
    alert ("es negativo")
  }
}

function validar2(){
  let myValue1 = document.getElementById('numbers1').value;
  let num1 = parseInt(myValue1);
  let myValue2 = document.getElementById('numbers2').value;
  let num2 = parseInt(myValue2);

  if (((num2 > 0)&&(num1<0)) || ((num1 >  0)&&(num2<0))) {
    alert ("Alerta");
  }
}
function checkWord(){
    //alert('llegó');
    let text = document.getElementById('viernes').value;
    //let pelement = document.getElementById('mensaje')
    if (text.toLowerCase() == 'viernes'){
      document.getElementById('mensaje').innerHTML ='ES VIERNES!!!';
    }else{
      document.getElementById('mensaje').innerHTML = 'TE MUESTRO: '+text;
      document.getElementById('mensaje').style.color = '#FF0000';
    }
  }

function isPerfectLong(idWord, minSize, maxSize){
  let word = document.getElementById(idWord).value;

  if(word.length < minSize || word.length  > maxSize){
    return false;
  }
  return true;
}

function checkName(){
  if (!isPerfectLong('firstname', 3, 20)) {
    document.getElementById('errorForm').innerHTML += " * Name should be between 3 and 20 characters";
  }

}

function checkLastname(){
  if (!isPerfectLong('lastname', 3, 20)) {
    document.getElementById('errorForm').innerHTML += " * Lastname should be between 3 and 20 characters ";
  }

}

function checkEmail(){

  let testedEmail = document.getElementById('email').value
  if (testedEmail.match('@')) {
    let emailParts = testedEmail.split('@');
    let regex = /^[0-9a-zA-Z.]+$/;
    if(!emailParts[0].match(regex)){
      document.getElementById('errorForm').innerHTML += " * Wrong characters in the user id ";

  }

    if(!emailParts[1].match(regex) ){
      document.getElementById('errorForm').innerHTML += " * Wrong characters in the domain";

    }
    regex = /^[.]+$/;
    if (emailParts[1].includes(".")) {
      let final = emailParts[1].split('.');
      regex = /^[a-zA-Z]+$/;
      if(!final[1].match(regex)){
        document.getElementById('errorForm').innerHTML += " * Wrong characters in the user .com";

      }
    }else{
      document.getElementById('errorForm').innerHTML += " * Wrong domain";

    }
  } else {
    document.getElementById('errorForm').innerHTML += " * Missing @";

  }

}

function checkForm(){
  document.getElementById('errorForm').innerHTML = "";
  document.getElementById('errorForm').style.color = 'red';
  checkName();
  checkLastname();
  checkEmail();
  //alert(document.getElementById('errorForm').innerHTML);

  if (document.getElementById('errorForm').innerHTML == ""){
    document.getElementById('datosPersonales').submit();
  }

}


function processForm()
  {
    let parameters = location.search.substring(1).split("&");
    //alert(parameters);
    let temp = parameters[0].split("=");
    //alert(temp);
    if(temp!=""){
      l = unescape(temp[1]);
      temp = parameters[1].split("=");
      p = unescape(temp[1]);
      temp = parameters[2].split("=");
      m = unescape(temp[1]);
      temp = parameters[3].split("=");
      n = unescape(temp[1]);
      document.getElementById("recivedName").innerHTML = l;
      document.getElementById("recivedLastname").innerHTML = p;
      document.getElementById("recivedEmail").innerHTML = m;
      document.getElementById("recivedCommnet").innerHTML = n;
    }
  }
processForm();
