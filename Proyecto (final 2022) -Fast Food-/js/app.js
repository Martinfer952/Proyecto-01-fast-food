/////////////// BOTONES NAV //////////////////
let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  shoppingCart.classList.remove("active");
  navbar.classList.remove("active");
};

let shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#cart-btn").onclick = () => {
  shoppingCart.classList.toggle("active");
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
};

let btnCerrarCarrito = document.querySelector(".fa-xmark");
btnCerrarCarrito.addEventListener("click", () => {
  shoppingCart.classList.remove("active");
});

let navbar = document.querySelector(".nav-bar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
};

window.onscroll = () => {
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  navbar.classList.remove("active");
};

/////////////// BOTONES ICONOS SECCION ARME SU COMBO //////////////////
let boxPizzas = document.querySelector(".pizzasContainer");
let boxBurger = document.querySelector(".burgersContainer");
let boxBebidas = document.querySelector(".bebidasContainer");
let btnBurger = document.querySelector("#burger-btn");
let btnPizzas = document.querySelector("#pizza-btn");
let btnBebidas = document.querySelector("#bebidas-btn");

document.querySelector("#pizza-btn").onclick = () => {
  boxPizzas.classList.remove("desactive");
  boxBurger.classList.add("desactive");
  boxBebidas.classList.add("desactive");

  btnBurger.classList.remove("color");
  btnPizzas.classList.add("color");
  btnBebidas.classList.remove("color");
};

document.querySelector("#burger-btn").onclick = () => {
  boxPizzas.classList.add("desactive");
  boxBurger.classList.remove("desactive");
  boxBebidas.classList.add("desactive");

  btnBurger.classList.add("color");
  btnPizzas.classList.remove("color");
  btnBebidas.classList.remove("color");
};

document.querySelector("#bebidas-btn").onclick = () => {
  boxPizzas.classList.add("desactive");
  boxBurger.classList.add("desactive");
  boxBebidas.classList.remove("desactive");

  btnBurger.classList.remove("color");
  btnPizzas.classList.remove("color");
  btnBebidas.classList.add("color");
};

/////////////// BOTONES AGREGAR AL CARRITO //////////////////
let btnAgregar = document.querySelectorAll(".btnAgregar");
let mensajeAlert = document.querySelector(".alert");
let tbody = document.querySelector(".tbody");
let carrito = [];

btnAgregar.forEach((btn) => {
  btn.addEventListener("click", addToCarritoItem);
});

let btnCloseAlert = document.querySelector(".closeBtn");
btnCloseAlert.addEventListener("click", () => {
  mensajeAlert.classList.remove("show");
  mensajeAlert.classList.add("hide");
});

/********Tomar datos********/
function addToCarritoItem(e) {
  let button = e.target;
  let item = button.closest(".box");
  let itemTittle = item.querySelector(".card-tittle").textContent;
  let itemPrecio = item.querySelector(".precio").textContent;
  let itemImg = item.querySelector(".box-img").src;

  let newItem = {
    tittle: itemTittle,
    precio: itemPrecio,
    img: itemImg,
    cantidad: 1,
  };

  setTimeout(function () {
    mensajeAlert.classList.remove("show");
    mensajeAlert.classList.add("hide");
  }, 4000);
  mensajeAlert.classList.remove("hide");
  mensajeAlert.classList.add("show");
  addItemCarrito(newItem);
  carritoTotal();
}

/********Si selecciona más de una vez un mismo alimento, aumentar cantidad********/
function addItemCarrito(newItem) {
  const numCantidad = tbody.getElementsByClassName("cantidad");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].tittle.trim() === newItem.tittle.trim()) {
      carrito[i].cantidad++;
      const spanValue = numCantidad[i];
      spanValue.value++;
      carritoTotal();
      return null;
    }
  }
  carrito.push(newItem);
  renderCarrito();
}

/********Crear div en Mi Carrito de clase .tbody********/
function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    let div = document.createElement("div");
    div.classList.add("itemCarrito");
    let contenido = `
    <div class="box">
    <i class="fas fa-trash btn-eliminar-item"></i>
    <img src=${item.img} alt="" />
    <div class="contenido">
    <h3 class="tittle">${item.tittle}</h3>
    <span class="precio">${item.precio}</span>
    <input type="number" min="1" value=${item.cantidad} class="cantidad">
    </div>
    </div>
    `;
    div.innerHTML = contenido;
    tbody.append(div);
    div
      .querySelector(".btn-eliminar-item")
      .addEventListener("click", removeItemCarrito);
    div.querySelector(".cantidad").addEventListener("change", sumaCantidad);
  });
  carritoTotal();
}

/********Muestra el total/precio de los alimentos agregados********/
function carritoTotal() {
  let total = 0;
  const itemTotal = document.querySelector(".total");
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ""));
    total = total + precio * item.cantidad;
  });
  itemTotal.innerHTML = `Total : $${total}`;
}

/********Boton eliminar del carrito********/
function removeItemCarrito(e) {
  const btnEliminar = e.target;
  const div = btnEliminar.closest(".itemCarrito");
  const tittle = div.querySelector(".tittle").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].tittle.trim() === tittle.trim()) {
      carrito.splice(i, 1);
    }
  }
  div.remove();
  carritoTotal();
}

/********Si editamos manualmente la cantidad desde el input********/
function sumaCantidad(e) {
  const sumaInput = e.target;
  const div = sumaInput.closest(".itemCarrito");
  const tittle = div.querySelector(".tittle").textContent;
  carrito.forEach((item) => {
    if (item.tittle.trim() === tittle) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      carritoTotal();
    }
  });
}
