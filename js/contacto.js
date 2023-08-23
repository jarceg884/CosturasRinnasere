// contacto.js

document.addEventListener('DOMContentLoaded', function() {
    let aboutSection = document.querySelector('.container.about');

    // Anima la opacidad y desplazamiento vertical al cargar la página
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(-50px)';
    aboutSection.style.transition = 'all 0.5s ease-out';

    setTimeout(() => {
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
    }, 100);
});
