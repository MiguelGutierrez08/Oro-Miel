window.onload=function(){
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    principal=document.getElementById("principal");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    btnIngresar = document.getElementById("BotonIngresar");
    txtCorreoI=document.getElementById("correo");
    txtContrasenaI=document.getElementById("contrasena");
    nombreP=document.getElementById("nombreP");
    txtcorreoM=document.getElementById("correoM");
    txtmensajeM=document.getElementById("mensajeM");
    btnEnviar=document.getElementById("enviarM");
    photo=document.getElementById("photo");
    cameraa=document.getElementById("camera");
    openn=document.getElementById("open");
    mapa=document.getElementById("mapa");
    
}

if(localStorage.getItem("login") !=="1"){
    ingreso.style.display="block";
    principal.style.display="none";
    redactar.style.display="none";
    document.getElementById("camara").style.display="none";
}
else{
    ingreso.style.display="none";
    principal.style.display="block";
    redactar.style.display="block";
    document.getElementById("mensajes").style.display="block";
    nombre=localStorage.getItem("nombre");
    correo=localStorage.getItem("correo");
    document.getElementById("nombreP").innerHTML=nombre;
    leerM();
}

btnRegistrar.addEventListener("click", function(){
    ingreso.style.display="none";
    registro.style.display="block";
});


btnRegistro.addEventListener("click",function(){
    if(txtCorreo.value==""){
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    } else {
        txtCorreo.classList.remove("errorCampo");
    }

    if(txtNombre.value==""){
        alert("debe ingresar nombre");
        txtNombre.classList.add("errorCampo");
        return false;
    } else {
        txtNombre.classList.remove("errorCampo");
    }

    if(txtContrasena.value==""){
        alert("Debe escribir la contraseña");
        txtContrasena.classList.add("errorCampo");
        return false;
    } else {
        txtContrasena.classList.remove("errorCampo");
    }

    if(txtConfirmacion.value==""){
        alert("Debe ingresar la confirmacion");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    } else {
        txtConfirmacion.classList.remove("errorCampo");
    }

    if(txtConfirmacion.value!==txtContrasena.value){
        alert("La confirmacion y la contraseña no coinciden");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    } else {
        txtConfirmacion.classList.remove("errorCampo");
    }

    if(txtFecha.value==""){
        alert("debe ingresar la fecha");
        txtFecha.classList.add("errorCampo");
        return false;
    } else {
        txtFecha.classList.remove("errorCampo");
    }

    let datos= new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch("http://tpamgb.orgfree.com/registro.php", {
        method:'POST',
        body:datos
    })

    .then(function(response){
        if(response.ok){
            alert("Usuario registrado");
        }
        else {
            alert("Ocurrio un error al registrar");
            console.log(response);
        }
    })

    .catch(function(err){
        alert("Ocurrio un error ->" + err);
        console.log(err);
    })
});

document.getElementById("BotonIngresar").addEventListener("click", function(){
    if(txtCorreoI.value==""){
        alert("Debe ingresar el correo");
        txtCorreoI.classList.add("errorCampo");
        return;
    } else{
        txtCorreoI.classList.remove("errorCampo");
    }
    if(txtContrasenaI.value==""){
        alert("Debe ingresar la Contraseña");
        txtContrasenaI.classList.add("errorCampo");
        return;
    } else{
        txtContrasenaI.classList.remove("errorCampo");
    }
    let datosI= new FormData();
    datosI.append("correo", txtCorreoI.value);
    datosI.append("contrasena", txtContrasenaI.value);

    fetch("http://tpamgb.orgfree.com/ingreso.php", {
        method:'POST',
        body:datosI
    })

    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.fallo== "contrasena"){
            alert("Debe escribir la contraseña correcta");
        }
        else {
            nombre= data.nombre;
            correo=data.correo;
            ingreso.style.display="none";
            principal.style.display="none";
            document.getElementById("mensajes").style.display="block";
            redactar.style.display="block"
            nombreP.innerHTML=nombre;
            localStorage.setItem("login", 1);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("correo", correo);
            leerM();
        }
    })
    .catch(function(err){
        alert("Ocurrio un error ->" + err);
        console.log(err);
    })
});

function abrirBarra(){
    document.getElementById("barraMenu").style.width="250px";
}

function cerrarBarra(){
    document.getElementById("barraMenu").style.width="0";
}

document.getElementById("enviarM").addEventListener("click",function(){
    if(txtcorreoM.value==""){
        alert("debe ingresar el correo al que sera enviado el mensaje");
        txtcorreoM.classList.add("errorCampo");
        return;
    } else{
        txtcorreoM.classList.remove("errorCampo");
    }

    if(txtmensajeM.value==""){
        alert("debe ingresar el mensaje al correo que sera enviado");
        txtmensajeM.classList.add("errorCampo");
        return;
    } else{
        txtmensajeM.classList.remove("errorCampo");
    }

    let datosM= new FormData();
    datosM.append("correoM", txtcorreoM.value);
    datosM.append("mensajeM", txtmensajeM.value);

    fetch("http://tpamgb.orgfree.com/registrarMensaje.php", {
        method:'POST',
        body:datosM
    })

    .then(function(response){
        if(response.ok){
            alert("Mensaje Enviado");
        }
        else{
            alert("Ocurrio un error al Enviar el mensaje");
            console.log(response);
        }
        return response.json();
    })
    
    .catch(function(err){
        alert("Ocurrio un error ->" + err);
        console.log(err);
    })
})

function leerM(){
    let datosLM= new FormData();
    datosLM.append("correoUsuario", correo);
    fetch("http://tpamgb.orgfree.com/leerMensajes.php", {
        method:'POST',
        body:datosLM
    })

    .then(function(response){
        return response.json();
    })
    .then(function(data){
        for(let x=0; x <data.length; x++){
            document.getElementById("mensajes").innerHTML=
            document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" + 
            data[x].fecha + "<br>";
        }
    })
    .catch(function(err){
        alert("Ocurrio un error ->" + err);
        console.log(err);
    });
}

function tomarFoto(){
    redactar.style.display="none";
    document.getElementById("mensajes").style.display="none";
    document.getElementById("camara").style.display="block";
    cerrarBarra()
}

document.getElementById("open").addEventListener("click", function(){
    cameraa.click();
});

document.getElementById("camera").addEventListener("change",function(e){
    ruta=URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src=ruta;
    if(obtenerSO()=="iOS"){
        let link=document.createElement('a');
        link.download="test.png";
        link.href=ruta;
        link.click();
        alert("Foto Capturada");
    }
    

});

function cerrarSesion() {
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);
    //.clear
    redactar.style.display="none";
    document.getElementById("principal").style.display="none";
    document.getElementById("mensajes").style.display="none";
    document.getElementById("camara").style.display="none";
    document.getElementById("ingreso").style.display="block";
}

function mensajes() {
    redactar.style.display="block";
    document.getElementById("mensajes").style.display="block";
    document.getElementById("camara").style.display="none";
    cerrarBarra();
}

function obtenerSO(){
    let so=null;
    let platform = window.navigator.platform,
        iosPlatforms= ['iPhone', 'iPad', 'iPod'];
    
    if(iosPlatforms.includes(platform)){
        so='iOS';
    }
    return so;
}

function obtenerLugar(){
    coordenadas={lat: 0, lon: 0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas={lat: position.coords.latitude, lon: position.coords.longitude}
        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
    .then(response => response.json())
    .then(data =>{
        document.getElementById("lugar").value = data.address.country + "," + data.address.state;
    })
    .catch(error=>{
        console.log(error);
        coordenadas={lat: 0,lon: 0};
    })
 
    });
}

document.getElementById("mapa").addEventListener("click", function(){
    if(coordenadas.lat!=0 && coordenadas.lon!=0){
        alert( coordenadas.lat + "," + coordenadas.lon);
        window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon" + coordenadas.lon + "&zoom=20");   
    } else {
        alert("no hay imagen, no hay coordenadas");
    }

        
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('../sw.js').then( () => {
        console.log('Service Worker Registered')
      });
    });
  }
  