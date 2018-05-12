let casillero = [];
let totalSessionErrors = 0;
let totalSessionAsserts = 0;
let totalPartialErrors = 0;
let totalPartialAsserts = 0;
let gamesCounter = 0;
let wonGamesCounter = 0;

document.getElementById("button-comenzar").addEventListener("click", comenzarInicial);
document.getElementById("button-seleccionar").addEventListener("click", seleccionarCasilla);
document.getElementById("button-seleccionar").classList.replace('button','button-hidden');
document.getElementById("message-num-casilla").classList.replace('message-num-casilla','message-num-casilla-hidden');
document.getElementById("numero-casilla").classList.replace('action-input','action-input-hidden');
document.getElementById('message-delay').classList.replace('message-delay-hidden','message-delay');
document.getElementById("delay-cartas").classList.replace('action-input-hidden','action-input');

/**
1 = Tiene un elemento
0 = No tiene elemento
2 = acierta el elemento
3 = no acierta el elemento
**/
function actualizarPuntos(){
  document.getElementById('aciertos-totales').value = totalSessionAsserts;
  document.getElementById('errores-totales').value = totalSessionErrors;
  document.getElementById('errores-parciales').value = totalPartialErrors;
  document.getElementById('aciertos-parciales').value = totalPartialAsserts;
}

function checkCompleted(){
  for (let i = 0; i < 5; i++){
    if (casillero[i]==1){
      return false;
    }
  }
  return true;
}

function checkLostGame(){
  for (let i = 0; i < 5; i++){
    if (casillero[i]==0){
      return false;
    }
  }
  return true;
}

function seleccionarCasilla(){
  end=-1;
  document.getElementById('countdown').innerHTML = '';
  let casillaNumber = document.getElementById('numero-casilla').value;
  let id = 0;
  let idGlobo = 0;
  if (casillaNumber > 0 && casillaNumber < 6){
    if(casillero[casillaNumber-1] == 1){
      casillero[casillaNumber-1] = 2;
      id = casillaNumber-1;
      id = "casilla-"+id;
      limpiarCasillas(casillero);
      totalSessionAsserts++;
      totalPartialAsserts++;
      actualizarPuntos();
    } else if (casillero[casillaNumber-1] == 0){
      casillero[casillaNumber-1] = 3;
      id = casillaNumber-1;
      id = "casilla-"+id;
      limpiarCasillas(casillero);
      totalPartialErrors++;
      totalSessionErrors++;
      actualizarPuntos();
    } else if ((casillero[casillaNumber-1] == 2) || (casillero[casillaNumber-1] == 3)){
      document.getElementById('countdown').innerHTML = "Number already used. Please select other number!";
    }
  }else{
    document.getElementById('countdown').innerHTML = "Wrong value for this game! Insert a number between 1 and 5.";
  }
  if (checkCompleted()){
    document.getElementById('countdown').innerHTML = 'Congrats!!! You have found all globes!';
    document.getElementById("button-seleccionar").classList.replace('button','button-hidden');
    document.getElementById('numero-casilla').value = "";
    totalPartialErrors=0;
    totalPartialAsserts=0;
    actualizarPuntos();
    document.getElementById('message-delay').classList.replace('message-delay-hidden','message-delay');
    document.getElementById("delay-cartas").classList.replace('action-input-hidden','action-input');
    document.getElementById("button-comenzar").classList.replace('button-hidden','button');
    document.getElementById("message-num-casilla").classList.replace('message-num-casilla','message-num-casilla-hidden');
    document.getElementById("numero-casilla").classList.replace('action-input','action-input-hidden');
    wonGamesCounter++;
  }else if(checkLostGame()){
    document.getElementById('countdown').innerHTML = 'Sorry!! You lost the game!';
    document.getElementById("button-seleccionar").classList.replace('button','button-hidden');
    document.getElementById('numero-casilla').value = "";
    totalPartialErrors=0;
    totalPartialAsserts=0;
    actualizarPuntos();
    document.getElementById('message-delay').classList.replace('message-delay-hidden','message-delay');
    document.getElementById("delay-cartas").classList.replace('action-input-hidden','action-input');
    document.getElementById("button-comenzar").classList.replace('button-hidden','button');
    document.getElementById("message-num-casilla").classList.replace('message-num-casilla','message-num-casilla-hidden');
    document.getElementById("numero-casilla").classList.replace('action-input','action-input-hidden');
  }
  document.getElementById('numero-casilla').value = '';
  limpiarCasillas(casillero);
  if (wonGamesCounter == 3){
    alert('CONGRATS!! You are an expert in this game');
    wonGamesCounter = 0;
  }
}

function agregarElementosAlAzar(casillero){
  casillero[0] = 1;
  for ( i = 1; i < 5; i++){
    if (Math.random() > 0.5){
      casillero[i] = 1;
    }else{
      casillero[i] = 0;
    }
  }
}

function dibujarCasilleroInicial(casillero){
  for (let i = 0; i < 5; i++){
    if (casillero[i]==1){
      let id = "casilla-"+i;
      let globoImagen = "<img src='../juegoJS/img/globo-mobil.gif' class='imagen-casilla'>";
      document.getElementById(id).innerHTML = globoImagen;
    }else{
      let id = "casilla-"+i;
      let emptyImagen = "<img src='../juegoJS/img/agua-empty.gif' class='imagen-casilla'>";
      document.getElementById(id).innerHTML = emptyImagen;
    }
  }
}

let end = 0;
function showRemaining() {

  if (end < 0) {
    limpiarCasillas(casillero);
    return;
  }else if(end < 1){
    document.getElementById('countdown').innerHTML = 'Start!!';
  }else
  document.getElementById('countdown').innerHTML = end;
  end = end - 1;
}

function comenzarInicial(){
  actualizarPuntos();
  limpiarCasillas(casillero);
  if ((gamesCounter % 2)== 0){
    agregarElementosAlAzar(casillero);
  }
  else{
    invertirCasillero(casillero);
  }
  dibujarCasilleroInicial(casillero);
  document.getElementById("button-comenzar").classList.replace('button','button-hidden');
  document.getElementById('message-delay').classList.replace('message-delay','message-delay-hidden');
  document.getElementById("delay-cartas").classList.replace('action-input','action-input-hidden');
  document.getElementById("message-num-casilla").classList.replace('message-num-casilla-hidden','message-num-casilla');
  document.getElementById("numero-casilla").classList.replace('action-input-hidden','action-input');
  document.getElementById("button-seleccionar").classList.replace('button-hidden','button');
  end = document.getElementById('delay-cartas').value;
  setInterval(showRemaining, 1000);
  gamesCounter++;
}

function limpiarCasillas(casillero){
  for (let i = 0; i < 5; i++){
      let id = "casilla-"+i;
      if((casillero[i]==0) || (casillero[i]==1) ){
        document.getElementById(id).innerHTML =  "<img src='img/card-back.png' class='imagen-casilla' >";
      } else if (casillero[i]==2){
        document.getElementById(id).innerHTML =  "<img src='img/globo-mobil.gif' class='imagen-casilla' >";
      } else {
        document.getElementById(id).innerHTML =  "<img src='img/wrong-2.png' class='imagen-casilla' >";
      }
  }
}

function invertirCasillero(casillero){
  casillero[0] = 1;
  for(let i = 1; i < 5; i++){
    if ((casillero[i] ==0) || (casillero[i] == 3)){
      casillero[i] = 1;
    }
    else{
      casillero[i] = 0;
    }
  }

}
