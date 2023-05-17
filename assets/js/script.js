//VARIABLES
let botonCalcular = document.getElementById("botonCalculo");
let botonGasto = document.getElementById("botonGasto");
let botonBorrarTodo = document.getElementById("botonBorrarTodo");
let datosPresupuesto = document.getElementById("datosPresupuesto");
let datosGastos = document.getElementById("datosGastos");
let datosSaldo = document.getElementById("datosSaldo");
let arrayGastos = [];
let arrayPresupuesto = [];

//CLASE
class ListaGastos {
    constructor(nombre, valor, imagen){
        this.nombre = nombre;
        this.valor = valor;
        this.imagen = imagen;
    }
};

//FUNCIONES 
const limpiar = () => {
    document.getElementById("presupuestoIngresado").value = "";
    document.getElementById("ingresarProducto").value = "";
    document.getElementById("ingresarPrecio").value = "";
};

const agregarPresupuesto = () => {
    let ingresarPresupuesto = document.getElementById("presupuestoIngresado").value;
    let total = 0;

    if (ingresarPresupuesto != "" && !isNaN(ingresarPresupuesto) && ingresarPresupuesto > 0){
        arrayPresupuesto.push(ingresarPresupuesto);
        for (let i = 0; i < arrayPresupuesto.length; i++) {
            let num = Number(arrayPresupuesto[i]);
            total += num;
        }
        datosPresupuesto.innerText = formatoMoneda(total)
    } else {alert("Debe ingresar un número mayor a 0")};
    saldo()
    limpiar()
};

const agregarGastos = () => {
    let ingresarProducto = document.getElementById("ingresarProducto").value;
    let ingresarPrecio = Number(document.getElementById("ingresarPrecio").value);
    let imagen = "./assets/img/basurero.png";

    if (ingresarProducto != "" && ingresarPrecio != "" && !isNaN(ingresarPrecio) && ingresarPrecio > 0) {
        let clase = new ListaGastos(ingresarProducto, ingresarPrecio, imagen);
        arrayGastos.push(clase)
    } else {alert("Debe ingresar un número mayor a 0")};
    agregarTabla()
    limpiar()
};

const agregarTabla = () => {
    let tabla = document.getElementById("tablaPintar");
    tabla.innerHTML = "";

    for (date of arrayGastos){
        tabla.innerHTML += `
            <tr>
                <td id="gasto">${date.nombre}</td>
                <td id="valor">${formatoMoneda(date.valor)}</td>
                <td> <img id="img1" src="${date.imagen}" onclick ="basurero(${arrayGastos.indexOf(date)})" style="cursor:pointer; width:25px; heigth:20px"/></td>
            </tr>
            `
    }
    saldo()
};

function saldo () {
    let gastoTotal = 0;
    let presupuestoTotal = 0;

    for (let i = 0; i < arrayPresupuesto.length; i++) {
        let num = Number(arrayPresupuesto[i]);
        presupuestoTotal += num;
    }

    arrayGastos.forEach((e) => {
        let num2 = Number(e.valor);
        gastoTotal += num2;
    })

    let saldo = presupuestoTotal - gastoTotal;

    datosGastos.innerText = formatoMoneda(gastoTotal);
    datosSaldo.innerText = formatoMoneda(saldo);
};

const basurero = (i) => {
    arrayGastos.splice(i, 1);
    saldo();
    agregarTabla();
};

const borrarTodo = () => {
    arrayPresupuesto = [];
    datosPresupuesto.innerText = "$" + 0;
    arrayGastos = [];
    basurero();
    limpiar();
};

const formatoMoneda = (valor) => {
    let valorCambiado =
            "$" +
            Number(valor).toLocaleString("es-CL", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
    }); return valorCambiado
};

//EVENTOS
botonCalcular.addEventListener("click", agregarPresupuesto);
botonGasto.addEventListener("click", agregarGastos);
botonBorrarTodo.addEventListener("click", borrarTodo);

//COMENTARIOS:

//Quise dejar que el saldo pudiera quedar en negativo para que la persona pueda saber por cuanto dinero se está pasando de su presupuesto.

