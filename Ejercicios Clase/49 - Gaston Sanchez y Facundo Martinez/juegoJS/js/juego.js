var casillero = [];

/**
1 = Tiene un elemento
0 = No tiene elemento
2 = acierta el elemento
3 = no acerta el elemento
**/
function agregarElementosAlAzar(casillero){
  for (var i = 0; i < 5; i++){
    if (Math.random() > 0.5){
      casillero[i] = 1;
    }else{
      casillero[i] = 0;
    }
  }

}

function dibujarCasilleroInicial(casillero){
  for (var i = 0; i < 5; i++){
    if (casillero[i]==1){
      var id = "casilla-"+i;

      const trebolImagen = "<img src='../juegoJS/img/trebol.png' id='trebol'>";

      document.getElementById(id).innerHTML = "<p>*</p>";

    }
  }

}

function comenzarInicial(){
  limpiarCasillas(casillero);
  agregarElementosAlAzar(casillero);
  dibujarCasilleroInicial(casillero);

}

function limpiarCasillas(casillero){
  for (var i = 0; i < 5; i++){
      var id = "casilla-"+i;
      document.getElementById(id).innerHTML = "";
  }
}
