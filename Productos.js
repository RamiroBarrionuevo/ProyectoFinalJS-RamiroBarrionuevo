//FUNCIONES FLECHAS
const stockProductos = [
    {
      id: 1,
      nombre: "McForno",
      cantidad: 1,
      desc: "Pan de papa, medallon de 120grs, doble feta de cheddar,panceta ahumada,aderezo y papas crinkle",
      precio: 1200,
      img: "./../images/Mcforno.jpg",
    },
    {
      id: 2,
      nombre: "American",
      cantidad: 1,
      desc: "Pan de papa, medallon de 120grs, doble feta de cheddar,tomate,lechuga,cebolla cruda en aros,aderezo y papas crinkle",
      precio: 1000,
      img: "./../images/American.jpg",
    },
    {
      id: 3,
      nombre: "Veggie",
      cantidad: 1,
      desc: "Pan de papa, medallon de 120grs de )proteina de soja ,garbanzos y gluten), doble feta de cheddar,tomate,lechuga,cebolla cruda en aros,aderezo y papas crinkle",
      precio: 900,
      img: "./../images/veggie.jpg",
    },
    {
      id: 4,
      nombre: "Cuarto de libra",
      cantidad: 1,
      desc: "Pan de papa, medallon de 120grs, doble feta de cheddar,cebolla en brunoise,mostaza,ketchup heinz y papas crinkle",
      precio: 1100,
      img: "./../images/cuartodelibra.jpg",
    },
    {
      id: 5,
      nombre: "Muzzarella",
      cantidad: 1,
      desc: "salsa de tomate,queso muzzarella y oregano",
      precio: 1200,
      img: "./../images/muzza.jpg",
    },
    {
      id: 6,
      nombre: "Fugazzetta",
      cantidad: 1,
      desc: "salsa de tomate,queso muzzarella,cebolla caramelizada y oregano",
      precio: 1300,
      img: "./../images/fugazzeta.jpg",
    },
    {
      id: 7,
      nombre: "Camaron",
      cantidad: 1,
      desc: "salsa de tomate,queso muzzarella, camarones salteados con limon, pesto de albahaca y oregano",
      precio: 1700,
      img: "./../images/camaron.jpg",
    },
    {
      id: 8,
      nombre: "Especial",
      cantidad: 1,
      desc: "salsa de tomate,queso muzzarella, jamon cocido, morron,aceitunas negras y oregano",
      precio: 1480,
      img: "./../images/especial.jpg",
    },
    {
      id: 9,
      nombre: "Roquefort",
      cantidad: 1,
      desc: "salsa de tomate,queso muzzarella, queso roquefort, aceitunas negras y oregano",
      precio: 1300,
      img: "./../images/roque.jpg",
    },
    {
      id: 10,
      nombre: "Doble Muzzarella",
      cantidad: 1,
      desc: "salsa de tomate,doble queso muzzarella y oregano",
      precio: 1480,
      img: "./../images/doblemuzza.jpg",
    },
    {
        id: 11,
        nombre: "Napolitana",
        cantidad: 1,
        desc: "salsa de tomate,queso muzzarella,tomates en rodaja, aceite de ajo y oregano",
        precio: 1300,
        img: "./../images/Napolitana.jpg",
      },
      {
        id: 12,
        nombre: "Hongos y panceta",
        cantidad: 1,
        desc: "salsa de tomate,queso muzzarella,champiñones a la provenzal,panceta ahumada,aceite de oliva y oregano",
        precio: 1480,
        img: "./../images/hongoypanceta.jpg",
      },
      {
        id: 13,
        nombre: "Peperoni",
        cantidad: 1,
        desc: "salsa de tomate,queso muzzarella,rodajas de peperoni y oregano",
        precio: 1540,
        img: "./../images/peperoni.jpg",
      },
  ];
  let carrito = [];
  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector('#procesar-pago')
   //MAIN
  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });
  if(formulario){
    formulario.addEventListener('submit', enviarCompra)
  }
  
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "./compra.html";
      }
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
      });
    }
  
    if (carrito.length === 0) {
      console.log("Nada");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
//FUNCIONES
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  

  function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
  }
  function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const persona = document.querySelector('#cliente').value
     const email = document.querySelector('#correo').value
  
     if(email === '' || persona == ''){
       Swal.fire({
         title: "¡Debes completar tu email y nombre!",
         text: "Rellena el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
     })
   } else {
  
    const btn = document.getElementById('button');


   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_le7ibeh';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
};
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
  
       setTimeout(() => {
         alertExito.remove()
       }, 3000)
  
  
     }, 3000)

   localStorage.clear()
    }
  
