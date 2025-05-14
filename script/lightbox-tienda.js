document.addEventListener('DOMContentLoaded', () => {
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = document.querySelector('.close-lightbox');

  // Abrir lightbox al hacer clic en una imagen
  document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxModal.style.display = 'flex';
    });
  });

  // Cerrar con X
  closeLightbox.addEventListener('click', () => {
    lightboxModal.style.display = 'none';
  });

  // Cerrar al hacer clic fuera de la imagen
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.style.display = 'none';
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightboxModal.style.display = 'none';
    }
  });
});
