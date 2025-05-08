var email = require("emailjs/email");

import jwt from 'jsonwebtoken';


module.exports = (formulario: any) => {
    var token = jwt.sign(formulario.correo, process.env.TOKEN_SECRET || 'tokentest')
    var server = email.server.connect(
    {
        user: "destellojoyeria3@gmail.com",
        password:"vbuc itgi wucg cava",
        host: "smtp.gmail.com",
        ssl: true,
    });
    console.log("formulario.correo: " + formulario.correo);
    var message: any ={};
    message = {
        from: "destellojoyeria3@gmail.com",
        to: formulario.correo,
        bcc: "",
        subject: "Reestablece tu contraseña",
        attachment: [
            { data: `Hemos recibido una solicitud para reestablecer tu contraseña.
            Da click en el siguiente enlace:
            
            <a href="localhost:3000/${token}">Reestablecer contraseña </a>
            Si no fuiste tu, ignora este correo.`, alternative: true }
        ]
    };
    server.send(message, function(err:any, message:any) { console.log(err); });
    console.log("Llega despues.");
}