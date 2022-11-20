//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventsListeners();
function cargarEventsListeners() {
    //cuando agregas un curso preionando "agregar carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);
    
    //vaciar carrito
    vaciarCarritoBtn.addEventListener("click",() => {
        articulosCarrito = [];

        limpiarHTML();
    })

}

//funciones

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);


    }
}

//eliminar un curso del carrito
function eliminarCurso(e) { 
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        //eliminar del arreglo de articuloCarrito por el data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); // iterar sobre el carrito y mostrar su HTML
    }
}

//leer los datos y extraer info
function leerDatosCurso(curso) {
    // console.log(curso);

    //objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1

    }

    //revisar si existe el curso en lista carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualiza el contador
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }


    console.log(articulosCarrito);

    carritoHTML();
}

//muestra el carrito de compras en HTML
function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();

    //recorre el carrito y genera HTML
    articulosCarrito.forEach(curso => {
        // console.log(curso);
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src = "${imagen}" width = "100" >
        </td>     
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> 
            <a href = "#" class="borrar-curso" data-id = "${id}"> X </a> 
        </td>
        `;

        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
        document.querySelector('#lista-carrito tbody')
    })

}

//elimina los curos del tbody

function limpiarHTML() {
    // contenedorCarrito.innerHTML = "";
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

// añade un contador si se agrega mas de un mismo curso
function contadorDeCursos() {

}






