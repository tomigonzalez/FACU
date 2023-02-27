document.querySelector(".menu").addEventListener("click", animateBars)

let linea1 = document.querySelector(".linea1");
let linea2 = document.querySelector(".linea2");
let linea3 = document.querySelector(".linea3");

function animateBars(){
    linea1.classList.toggle("activa-linea1");
    linea2.classList.toggle("activa-linea2");
    linea3.classList.toggle("activa-linea3");
}

const iconoMenu = document.querySelector("#iconoMenu"),
    menu = document.querySelector("#menuActive")

iconoMenu.addEventListener("click", (e) => {

    menu.classList.toggle("active-menu")
});

const shopContent = document.getElementById ("shop");
const verCarrito = document.getElementById ("verCarrito");
const modalContainer = document.getElementById ("modal-container");
const cantidadCarrito = document.getElementById ("cantidadCarrito");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  stockProductos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}" class="img">
    <h2>${product.nombre}</h2>
    <p>Cantidad:${product.cantidad}</p>
    <p>Preacio:$${product.precio}</p>
    `;
    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Agregar al carrito"
    comprar.className = "comprar"
    
    content.append (comprar);

    comprar.addEventListener("click", () =>{
      const repeat = carrito.some((repitProduct) => repitProduct.id === product.id)
      
      if (repeat){
        carrito.map((prod) =>{
          if(prod.id === product.id){
            prod.cantidad++
          };
        });
      } else {
      carrito.push({
        id : product.id,
        img : product.img,
        nombre : product.nombre,
        precio : product.precio,
        cantidad : product.cantidad,

      });
    };
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
    });
  });
  const btnOpenCart = document.getElementById("open");
  const toggleCart = () => {
    modalContainer.classList.toggle("is-active");}
    btnOpenCart.addEventListener("click", toggleCart);

  verCarrito.addEventListener("click", () => {
    
    modalContainer.innerHTML = "";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
      <h1 class="modal-titulo">CARRITO</h1>

    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText ="x";
    modalButton.className = "modal-button";


    
   
//Boton cerrar carrito

    // modalButton.addEventListener("click", () => {
    //   console.log("ASD");
    //   modalContainer.classList.toggle ('is-active')
    // });

    modalHeader.append(modalButton);
    
    carrito.forEach ((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content"
      carritoContent.innerHTML = `
                <img src="${product.img}">
                <h3>${product.nombre}</h3>
                <p>${product.cantidad}</p>
                <p> $${product.precio} </p>
                `;

      modalContainer.append(carritoContent);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalCompra);
  });

  const saveLocal = () => { 
  localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  

  
  