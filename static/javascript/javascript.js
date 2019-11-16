
var algo = document.querySelector("html");
var boton = document.querySelector("#boton");
var texto = document.querySelector("#pais")
var texto2 = document.querySelector("#ciudad"); 
var xml = new XMLHttpRequest();
var parser = new DOMParser(); 
var parrafo = document.querySelector("#parrafo");
var sectionPeticion = document.querySelector("#detalles");
var tabla = document.querySelector("#tabla");
algo.classList.add("clasemira");

boton.addEventListener("click", function(){
    Aservidor();
});

function Aservidor(){
    var pais = texto.value;
    var ciudad = texto2.value;
    var mensaje = {"mensaje":"Hola servidor me escuchas"};
    xml.open("GET","/peticion?mensaje="+mensaje["mensaje"]+"&"+"pais="+pais+"&"+"ciudad="+ciudad,true);
    xml.send()
};

xml.onreadystatechange = function(){
    if (xml.readyState == 4)
    {
        console.log("hola mundo llegue aca");
        var respuesta = xml.responseText;
        if(respuesta != null || respuesta != "")
        {
            llenarDatosPagina(respuesta);
        } 
        else{
            alert("Error, la peticion de la ciudad ha fallado, intente escribirlo de otra forma o intente de nuevo");
        }
    }
};

window.onload = function(){
    var todo = document.querySelectorAll("*");
    for(valores of todo)
    {
        valores.classList.add("global");
    }
};

window.addEventListener("DOMNodeInserted", function(){
    var todo = document.querySelectorAll("*");
    for(valores of todo)
    {
        valores.classList.add("global");
    }
});

function llenarDatosPagina(respuesta){
    tabla.children[1].innerHTML = "";
    sectionPeticion.classList.remove("hide");
    console.log(respuesta);
    resXML = parser.parseFromString(respuesta,"text/xml");
    document.querySelector("#nomCiudad").innerHTML = resXML.querySelector("location").attributes.city.nodeValue;
    document.querySelector("#nompais").innerHTML = resXML.querySelector("location").attributes.country.nodeValue;
    document.querySelector("#nomRegion").innerHTML = resXML.querySelector("location").attributes.region.nodeValue;
    document.querySelector("#lat").innerHTML = "latitud: " + resXML.querySelector("lat").innerHTML;
    document.querySelector("#long").innerHTML = "longitud: " + resXML.querySelector("long").innerHTML;
    document.querySelector("#lat").innerHTML = "latitud: " + resXML.querySelector("lat").innerHTML;
    document.querySelector("#horaSolicitud").innerHTML = resXML.querySelector("lastBuildDate").innerHTML;
    document.querySelector("#humedad").innerHTML = resXML.querySelector("atmosphere").attributes.humidity.nodeValue + " %";
    document.querySelector("#presion").innerHTML = resXML.querySelector("atmosphere").attributes.pressure.nodeValue + " hPa";
    document.querySelector("#visibilidad").innerHTML = resXML.querySelector("atmosphere").attributes.visibility.nodeValue + " Km";
    document.querySelector("#amanecer").innerHTML = resXML.querySelector("astronomy").attributes.sunrise.nodeValue;
    document.querySelector("#anochecer").innerHTML = resXML.querySelector("astronomy").attributes.sunset.nodeValue;

    //-------------------- tabla predicciones climaticas
    cont = 0;
    forecasts = resXML.querySelectorAll("forecast")    
    for (dia of forecasts)
    {
        linea = document.createElement("tr");
        tabla.children[1].appendChild(linea);
        for (atributo of dia.attributes)
        {
            dato = document.createElement("td");
            dato.innerHTML=atributo.nodeValue;
            dato.classList.add("centrar");
            tabla.children[1].children[cont].appendChild(dato);
        }
        cont++;
    }
}