document.getElementById("dashboard-tab").addEventListener("click", doA);
alert("Gaston");
function doA(){
  alert("Gaston");
  doAjax("http://localhost/proyectos/incubadora/index2.html","dashboard");
}

function doAjax(URL, destiny){
 fetch(URL).then(
   function(response){
     response.text().then(
       function(texto){
         document.getElementById(destiny).innerHTML = texto;
       }
     );
   }
 );
}
