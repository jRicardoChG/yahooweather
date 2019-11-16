var algo = $("#html");
var boton = $("#boton");
var texto = $("#pais");
var texto2 = $("#ciudad");
var parrafo = $("#parrafo");
var sectionPeticion = $("#detalles");
var tabla = $("#tabla");

boton.click(function () {
    Aservidor();
});

function Aservidor() {
    var pais = texto[0].value;
    var ciudad = texto2[0].value;
    var mensaje = {
        "mensaje": "hola servidor me escuchas?"
    };
    $.get("/peticion?mensaje=" + mensaje["mensaje"] + "&" + "pais=" + pais + "&" + "ciudad=" + ciudad, function (data, status) {
        var respuesta = data;
        console.log("hola mundo existo" + respuesta);
        if (respuesta != null || respuesta != "") {
            llenarDatosPagina(respuesta);
        } else {
            alert("Error, la peticion de la ciudad ha fallado, intente escribirlo de otra forma o intente de nuevo");
        }
    })
}

function llenarDatosPagina(respuesta) {
    $(tabla).children()[1].innerHTML = "";
    sectionPeticion.removeClass("hide");
    resXML = $.parseXML(respuesta);
    $("#nomCiudad").html($(resXML).find("yweather\\:location")[0].attributes.city.nodeValue);
    $("#nompais").html($(resXML).find("yweather\\:location")[0].attributes.country.nodeValue);
    $("#nomRegion").html($(resXML).find("yweather\\:location")[0].attributes.region.nodeValue);
    $("#lat").html("latitud: " + $(resXML).find("geo\\:lat").html());
    $("#long").html("longitud: " + $(resXML).find("geo\\:long").html());
    $("#horaSolicitud").html($(resXML).find("lastBuildDate").html());
    $("#humedad").html($(resXML).find("yweather\\:atmosphere")[0].attributes.humidity.nodeValue + " %");
    $("#presion").html($(resXML).find("yweather\\:atmosphere")[0].attributes.pressure.nodeValue + " hPa");
    $("#visibilidad").html($(resXML).find("yweather\\:atmosphere")[0].attributes.visibility.nodeValue + " Km");
    $("#amanecer").html($(resXML).find("yweather\\:astronomy")[0].attributes.sunrise.nodeValue);
    $("#anochecer").html($(resXML).find("yweather\\:astronomy")[0].attributes.sunset.nodeValue);

    //-------------------- tabla predicciones climaticas
    cont = 0;
    forecasts = $(resXML).find("yweather\\:forecast")
    for (dia of forecasts) {
        linea = document.createElement("tr");
        $(tabla).children()[1].appendChild(linea);
        for (atributo of dia.attributes) {
            dato = document.createElement("td");
            $(dato).html(atributo.nodeValue);
            $(dato).addClass("centrar");
            $(tabla).children()[1].children[cont].appendChild(dato);
        }
        cont++;
    }

}

$(document).ready(function () {
    var todo = $("*");
    for (valores of todo) {
        $(valores).addClass("global");
    }
})

$(document).change(function () {
    var todo = $("*");
    for (valores of todo) {
        $(valores).addClass("global");
    }
})