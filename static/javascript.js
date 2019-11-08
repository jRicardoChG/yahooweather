var algo = document.querySelector("html");
var boton = document.querySelector("#boton");
var texto = document.querySelector("#pais")
var xml = new XMLHttpRequest();
var parser = new DOMParser();
var parrafo = document.querySelector("#parrafo");

algo.classList.add("clasemira");

boton.addEventListener("click", function(){
    Aservidor();
});

xml.onreadystatechange = function(){
    if (xml.readyState == 4)
    {
        var respuesta = xml.responseText; 
        console.log(respuesta);
        respuestaxml = parser.parseFromString(respuesta,"text/xml");
        parrafo.innerHTML = respuestaxml.querySelector("channel").innerHTML;
    }
};

function Aservidor(){
    var pais = texto.value;
    var mensaje = {"mensaje":"Hola servidor me escuchas"};
    xml.open("GET","/peticion?mensaje="+mensaje["mensaje"]+"&"+"pais="+pais,true);
    xml.send()
};


