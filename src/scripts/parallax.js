document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('inicio');
  const parallaxBg = document.getElementById('hero-parallax-bg');

  if (!heroSection || !parallaxBg) return;

  // Respeita preferências de acessibilidade do sistema operacional
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Intensidade do parallax (valores entre 0.25 e 0.45 dão o melhor efeito)
  const velocidade = 0.35;
  let ticking = false;

  function atualizarParallax() {
    const rect = heroSection.getBoundingClientRect();
    const alturaJanela = window.innerHeight;

    // Só calcula o movimento enquanto a faixa estiver visível na tela
    if (rect.bottom > 0 && rect.top < alturaJanela) {
      const deslocamento = -rect.top * velocidade;
      parallaxBg.style.transform = `translate3d(0, ${deslocamento.toFixed(2)}px, 0)`;
    }

    ticking = false;
  }

  function aoRolar() {
    if (!ticking) {
      window.requestAnimationFrame(atualizarParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar, { passive: true });

  // Posiciona corretamente logo ao carregar a página
  atualizarParallax();
});
