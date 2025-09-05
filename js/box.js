const gift = document.getElementById('container-gift');

function startSwing() {
  let angleY = window.innerWidth >= 992 ? 20 : 30;
  let angleZ = window.innerWidth >= 992 ? 30 : 40;

  gift.animate([
    { transform: `rotateY(${-angleY}deg) rotateZ(${angleZ}deg)` },
    { transform: `rotateY(${angleY}deg) rotateZ(${-angleZ}deg)` }
  ], {
    duration: 1600,
    easing: 'ease-in-out',
    direction: 'alternate',
    iterations: Infinity
  });
}

// Iniciar animación
startSwing();

// Ajustar al redimensionar
window.addEventListener('resize', () => {
  gift.getAnimations().forEach(anim => anim.cancel());
  startSwing();
});
