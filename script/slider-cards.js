document.addEventListener("DOMContentLoaded", function() {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });


    // Pause autoplay on hover
    const swiperContainer = document.querySelector('.swiper');
    swiperContainer.addEventListener('mouseenter', function() {
        swiper.autoplay.stop();
    });

    swiperContainer.addEventListener('mouseleave', function() {
        swiper.autoplay.start();
    });
});