
const pintarCarrito = () => {
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

  

    modalHeader.append(modalButton);
    
    carrito.forEach ((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content"
      carritoContent.innerHTML = `
                <img src="${product.img}">
                <h3>${product.nombre}</h3>
                <p>Cantidad: ${product.cantidad}</p>
                <p> $${product.precio} </p>
                <p>Total: $${product.cantidad * product.precio}</p>
                `;

      modalContainer.append(carritoContent);

      let eliminar = document.createElement("span");
      eliminar.innerText = "❌"
      eliminar.className = "dlelete-product"
      carritoContent.append(eliminar);

      eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalCompra);
  };

  verCarrito.addEventListener("click", pintarCarrito)

  const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
      return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
  };

  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
    
  };

  carritoCounter();