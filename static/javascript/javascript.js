
var algo = document.querySelector("html");
var boton = document.querySelector("#boton");
var texto = document.querySelector("#pais")
var xml = new XMLHttpRequest();
var parser = new DOMParser(); 
var parrafo = document.querySelector("#parrafo");
var sectionPeticion = document.querySelector("#detalles");
var tabla = document.querySelector("#tabla");
algo.classList.add("clasemira");

boton.addEventListener("click", function(){
    Aservidor();
});

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

function Aservidor(){
    var pais = texto.value;
    var mensaje = {"mensaje":"Hola servidor me escuchas"};
    xml.open("GET","/peticion?mensaje="+mensaje["mensaje"]+"&"+"pais="+pais,true);
    xml.send()
};


window.onload = function(){
    var todo = document.querySelectorAll("*");
    for(valores of todo)
    {
        valores.classList.add("global");
    }
};

window.addEventListener("DOMinsertedNode", function(){
    var todo = document.querySelectorAll("*");
    for(valores of todo)
    {
        valores.classList.add("global");
    }
});

function llenarDatosPagina(respuesta){
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

    linea = document.createElement("tr");
    

    for (atributos of resXML.querySelector("forecast").attributes)
    {
        dato = document.createElement("td");
        dato.innerHTML = atributos.nodeName;
        tabla.children[0].appendChild(linea);
        tabla.children[0].children[0].appendChild(dato);
    }


}