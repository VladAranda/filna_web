// CARRUSEL DE NOTAS
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
const slider = document.querySelector('.slider');
let actual = 0;
let temporizador = null;
let controlManual = false;

// Crear un punto por cada nota
slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Ir a la nota ' + (i + 1));
    dot.addEventListener('click', () => irA(i));
    dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

function mostrar(n) {
    slides[actual].classList.remove('active');
    dots[actual].classList.remove('active');
    actual = (n + slides.length) % slides.length;
    slides[actual].classList.add('active');
    dots[actual].classList.add('active');
}

function detener() {
    clearInterval(temporizador);
    temporizador = null;
}

function iniciar() {
    detener();
    if (controlManual) return;
    temporizador = setInterval(() => mostrar(actual + 1), 8000);
}

function irA(n) {
    controlManual = true;
    detener();
    mostrar(n);
}

document.getElementById('prev').addEventListener('click', () => irA(actual - 1));
document.getElementById('next').addEventListener('click', () => irA(actual + 1));

// Pausar al pasar el cursor
slider.addEventListener('mouseenter', detener);
slider.addEventListener('mouseleave', iniciar);

dots[0].classList.add('active');
iniciar();