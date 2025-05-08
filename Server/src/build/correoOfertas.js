"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var email = require("emailjs/email");
module.exports = (productos, correo) => {
    var server = email.server.connect({
        user: "destellojoyeria3@gmail.com",
        password: "vbuc itgi wucg cava",
        host: "smtp.gmail.com",
        ssl: true,
    });
    var message = {};
    var ofertaHTML = "<h2>Ofertas Destello Joyeria</h2>";
    // Iterar sobre cada producto y agregar su información al correo HTML
    productos.forEach((producto, index) => {
        console.log(producto.nombre);
        console.log(producto.precio);
        ofertaHTML += `
            <p><strong>Producto ${index + 1}:</strong></p>
            <p>Nombre del producto: ${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Descuento: ${producto.descuento}</p>
            <p>Inicio del descuento: ${producto.inicio_descuento}</p>
            <p>Fin del descuento: ${producto.fin_descuento}</p>
            <br><br>
        `;
    });
    ofertaHTML += "<p>¡HASTA AGOTAR EXISTENCIAS!</p>";
    message = {
        from: "destellojoyeria3@gmail.com",
        to: correo,
        bcc: "",
        subject: "Ofertas Destello Joyeria",
        attachment: [
            { data: ofertaHTML, alternative: true }
        ]
    };
    server.send(message, function (err, message) { console.log(err); });
    console.log("Correo enviado después de construir el cuerpo.");
};
