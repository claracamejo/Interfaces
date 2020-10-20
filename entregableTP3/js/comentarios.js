let comentarios = document.querySelector('.comentarios');
let btn = document.querySelector('#submit').addEventListener('click', cometar);

comments = [
    {
        'usuario': 'fulanito',
        'comentario': 'lorem lipsus lorem lipsus'
    },
    {
        'usuario': 'Juancito',
        'comentario': 'lorem lipsus lorem lipsus'
    },
    {
        'usuario': 'Maria',
        'comentario': 'lorem lipsus lorem lipsus'
    },
    {
        'usuario': 'Pepita',
        'comentario': 'lorem lipsus lorem lipsus'
    },
    {
        'usuario': 'Menganita',
        'comentario': 'lorem lipsus lorem lipsus'
    }];


window.onload = function () {
    for (let coment of comments) {
        cargarcomentario(coment);
    }
    setTimeout(borrarCarga, 3000);
}

document.querySelector('.icon').addEventListener('click', myFunction);

function myFunction() {
    let x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function borrarCarga() {
    let carga = document.querySelector('#contedor_carga');
    let body = document.querySelector('.webBody');
    carga.style.display = 'none';
    body.style.visibility = 'visible';
}

function cargarcomentario(coment) {

    let newDiv = document.createElement("div");
    newDiv.className += "comentario";
    let newH3 = document.createElement("h3");
    let newp = document.createElement("p");

    newH3.textContent = coment.usuario;
    newp.textContent = coment.comentario;

    newDiv.appendChild(newH3);
    newDiv.appendChild(newp);

    comentarios.appendChild(newDiv);
}

function cometar() {

    let cmt = document.querySelector('#subject');
    let usr = document.querySelector('#fname');

    let data = {
        'usuario': usr.value,
        'comentario': cmt.value
    }

    cargarcomentario(data);

    $('#fname').val('');
    $('#subject').val('');
}
