/* js/script.js - Lógica de Acordeón con Scroll y Rotación */

const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const icon = header.querySelector('i'); // El ícono del chevron

    // 1. Configurar transición suave para el ícono vía JS
    if (icon) {
        icon.style.transition = 'transform 0.3s ease';
    }

    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // 2. CERRAR LOS DEMÁS (y resetear sus íconos)
        accordionItems.forEach(accItem => {
            if (accItem !== item && accItem.classList.contains('active')) {
                accItem.classList.remove('active');
                
                // Resetear ícono del otro acordeón
                const otherIcon = accItem.querySelector('.accordion-header i');
                if (otherIcon) {
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            }
        });

        // 3. LÓGICA DEL ACORDEÓN ACTUAL
        if (!isActive) {
            // ABRIR
            item.classList.add('active');
            
            // Rotar ícono actual
            if (icon) icon.style.transform = 'rotate(180deg)';

            // --- SCROLL AL HEADER ---
            // Esperamos 300ms (tiempo estándar de una animación CSS) 
            // para asegurar que el contenido se ha desplegado.
            setTimeout(() => {
                header.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start'  // Alinea el header en la parte superior
                });
            }, 100);

        } else {
            // CERRAR
            item.classList.remove('active');
            
            // Resetear ícono actual
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
    });
});

const info = document.getElementById('info');

function toggleHeroDerTop() {
    const heroDer = document.querySelector('.hero__der');
    const isOpen = heroDer.classList.contains('hero__der--open');
    heroDer.classList.toggle('hero__der--open');
    heroDer.style.top = isOpen ? '100vh' : '0vh';
  }
  

  

  window.addEventListener('load', function() {
    var pantallaCarga = document.getElementById('pantalla-carga');
    pantallaCarga.style.display = 'none';
  });
  
  


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-bg');
    const container = document.querySelector('.hero__izq');
    
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');

    // --- CONFIGURACIÓN DE VELOCIDAD ---
    // 50ms es aprox 20 cuadros por segundo. 
    // MÁS LENTO, aumenta este número (ej. 80, 100).
    // MÁS RÁPIDO, disminúyelo (ej. 30).
    const velocidad = 70; 

    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    resizeCanvas();

    // Bases del ADN (A, T, C, G) y binarios
    const characters = 'LUIS LOPEZ MENDEZ'; 
    
    const fontSize = 14; 
    let columns = Math.floor(canvas.width / fontSize);
    
    let drops = [];
    function initDrops() {
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; 
        }
    }
    initDrops();

    function draw() {
        // Fondo semi-transparente.
        // 0.1 = estela larga. 0.2 = estela más corta (se borra más rápido).
        ctx.fillStyle = 'rgba(10, 0, 26, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#b026ff'; // Púrpura base
        ctx.font = 'bold ' + fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Brillo aleatorio para algunas letras
            if (Math.random() > 0.95) {
                ctx.fillStyle = '#e8abff'; // Blanco/Rosa
            } else {
                ctx.fillStyle = '#b026ff'; // Púrpura
            }

            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // --- CAMBIO CLAVE ---
    // Usamos setInterval en lugar de requestAnimationFrame
    // Esto fuerza a la animación a esperar 'velocidad' milisegundos entre cuadros.
    let interval = setInterval(draw, velocidad);

    window.addEventListener('resize', () => {
        clearInterval(interval); // Limpiamos el intervalo anterior
        resizeCanvas();
        initDrops();
        interval = setInterval(draw, velocidad); // Reiniciamos
    });
});

/* --- LIGHTBOX LOGIC --- */

function openModal() {
  document.getElementById("myModal").style.display = "block";
  // Bloquear el scroll del body cuando el modal está abierto
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  // Reactivar el scroll
  document.body.style.overflow = "auto";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  
  // Si no hay slides (el modal no existe), salir para evitar errores
  if (slides.length === 0) return;

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  
  slides[slideIndex-1].style.display = "block";
}

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});


/* --- FLIP CARD LOGIC --- */

function toggleFlip() {
    const card = document.getElementById('card-flip');
    // Alternar la clase 'flipped' que definimos en CSS
    card.classList.toggle('flipped');
}