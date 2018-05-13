let pathCardGlobe = 'img/globo-mobil.gif';
let pathCardEmpty = 'img/agua-empty.gif';
let pathCardBack = 'img/card-back.png';
let pathCardWrong = 'img/wrong-2.png';
/** CardsLine is a controls array, we will be setting up different flags to determine the status of the game during the whole game.
1 = Tiene un elemento
0 = No tiene elemento
2 = acierta el elemento
3 = no acierta el elemento
**/
let cardsLine = [];
let totalSessionErrors = 0;
let totalSessionAsserts = 0;
let totalPartialErrors = 0;
let totalPartialAsserts = 0;
let gamesCounter = 0;
let wonGamesCounter = 0;

document.getElementById("button-comenzar").addEventListener("click", startGame);
document.getElementById("button-seleccionar").addEventListener("click", seleccionarCasilla);
document.getElementById("button-seleccionar").classList.replace('button','button-hidden');
document.getElementById("message-num-casilla").classList.replace('message-num-casilla','message-num-casilla-hidden');
document.getElementById("numero-casilla").classList.replace('action-input','action-input-hidden');
document.getElementById('message-delay').classList.replace('message-delay-hidden','message-delay');
document.getElementById("delay-cartas").classList.replace('action-input-hidden','action-input');

function updateScores(){
  document.getElementById('aciertos-totales').value = totalSessionAsserts;
  document.getElementById('errores-totales').value = totalSessionErrors;
  document.getElementById('errores-parciales').value = totalPartialErrors;
  document.getElementById('aciertos-parciales').value = totalPartialAsserts;
}

function checkCompleted(){
  for (let i = 0; i < 5; i++){
    if (cardsLine[i]==1){
      return false;
    }
  }
  return true;
}

function checkLostGame(){
  for (let i = 0; i < 5; i++){
    if (cardsLine[i]==0){
      return false;
    }
  }
  return true;
}

function seleccionarCasilla(){
  timming=-1;
  document.getElementById('countdown').innerHTML = '';
  let cardNumber = document.getElementById('numero-casilla').value;
  let id = 0;
  let idGlobo = 0;
  if (cardNumber > 0 && cardNumber < 6){
    if(cardsLine[cardNumber-1] == 1){
      cardsLine[cardNumber-1] = 2;
      id = cardNumber-1;
      id = "casilla-"+id;
      drawCards(cardsLine);
      totalSessionAsserts++;
      totalPartialAsserts++;
      updateScores();
    } else if (cardsLine[cardNumber-1] == 0){
      cardsLine[cardNumber-1] = 3;
      id = cardNumber-1;
      id = "casilla-"+id;
      drawCards(cardsLine);
      totalPartialErrors++;
      totalSessionErrors++;
      updateScores();
    } else if ((cardsLine[cardNumber-1] == 2) || (cardsLine[cardNumber-1] == 3)){
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
    updateScores();
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
    updateScores();
    document.getElementById('message-delay').classList.replace('message-delay-hidden','message-delay');
    document.getElementById("delay-cartas").classList.replace('action-input-hidden','action-input');
    document.getElementById("button-comenzar").classList.replace('button-hidden','button');
    document.getElementById("message-num-casilla").classList.replace('message-num-casilla','message-num-casilla-hidden');
    document.getElementById("numero-casilla").classList.replace('action-input','action-input-hidden');
  }
  document.getElementById('numero-casilla').value = '';
  drawCards(cardsLine);
  if (wonGamesCounter == 3){
    alert('CONGRATS!! You are an expert in this game');
    wonGamesCounter = 0;
  }
}

function addRandomCards(cardsLine){
  cardsLine[0] = 1;
  for ( i = 1; i < 5; i++){
    if (Math.random() > 0.5){
      cardsLine[i] = 1;
    }else{
      cardsLine[i] = 0;
    }
  }
}

function showFrontCards(cardsLine){
  for (let i = 0; i < 5; i++){
    let id = "casilla-"+i;
    if (cardsLine[i]==1){
      document.getElementById(id).childNodes[1].src = pathCardGlobe;
    }else{
      document.getElementById(id).childNodes[1].src = pathCardEmpty;
    }
  }
}

let timming = 0;
function showRemaining() {
  if (timming < 0) {
    drawCards(cardsLine);
    return;
  }else if(timming < 1){
    document.getElementById('countdown').innerHTML = 'Start!!';
  }else
  document.getElementById('countdown').innerHTML = timming;
  timming = timming - 1;
}

function startGame(){
  updateScores();
  drawCards(cardsLine);
  if ((gamesCounter % 2)== 0){
    addRandomCards(cardsLine);
  }
  else{
    invertcardsLine(cardsLine);
  }
  showFrontCards(cardsLine);
  document.getElementById("button-comenzar").classList.replace('button','button-hidden');
  document.getElementById('message-delay').classList.replace('message-delay','message-delay-hidden');
  document.getElementById("delay-cartas").classList.replace('action-input','action-input-hidden');
  document.getElementById("message-num-casilla").classList.replace('message-num-casilla-hidden','message-num-casilla');
  document.getElementById("numero-casilla").classList.replace('action-input-hidden','action-input');
  document.getElementById("button-seleccionar").classList.replace('button-hidden','button');
  timming = document.getElementById('delay-cartas').value;
  setInterval(showRemaining, 1000);
  gamesCounter++;
}

function drawCards(cardsLine){
  for (let i = 0; i < 5; i++){
      let id = "casilla-"+i;
      if((cardsLine[i]==0) || (cardsLine[i]==1) ){
        document.getElementById(id).childNodes[1].src = pathCardBack;
      } else if (cardsLine[i]==2){
        document.getElementById(id).childNodes[1].src = pathCardGlobe;
      } else {
        document.getElementById(id).childNodes[1].src = pathCardWrong;
      }
  }
}

function invertcardsLine(cardsLine){
  cardsLine[0] = 1;
  for(let i = 1; i < 5; i++){
    if ((cardsLine[i] ==0) || (cardsLine[i] == 3)){
      cardsLine[i] = 1;
    }
    else{
      cardsLine[i] = 0;
    }
  }
}
