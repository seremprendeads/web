//Linghtbox
 document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');

    // Agregar evento a todas las imágenes con la clase 'gallery-item'
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.src; // Obtenemos el src de la imagen
            lightbox.style.display = 'flex'; // Mostrar el lightbox
            lightboxImg.src = imgSrc; // Establecer la imagen en el lightbox
        });
    });

    // Cerrar el lightbox al hacer clic en el botón de cerrar
    closeBtn.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });

    // Cerrar el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});