 document.getElementById('appointmentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const servicio = document.getElementById('servicio').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const mensaje = document.getElementById('mensaje').value;

        // Crear el mensaje para WhatsApp
        const whatsappMessage = `Nombre: ${nombre}%0AWhatsapp: ${whatsapp}%0AServicio: ${servicio}%0AFecha: ${fecha}%0AHora: ${hora}%0AMensaje: ${mensaje}`;
        const whatsappUrl = `https://wa.me/1130207987?text=${whatsappMessage}`; // Reemplaza con tu número de WhatsApp

        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
    });