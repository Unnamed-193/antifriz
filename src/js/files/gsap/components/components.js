import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрация плагина
gsap.registerPlugin(ScrollTrigger);

// Основная функция инициализации анимаций
function initAnimations() {
  // Настройки по умолчанию для ScrollTrigger
  ScrollTrigger.defaults({
    markers: false,
    scroller: window,
    anticipatePin: 1
  });

  initOwAnimation();
  initLineAnimation();
  initEvidenceAnimation();
}

// Функция для анимации секции Components
function initOwAnimation() {
  const owSection = document.querySelector('.ow');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

  const baseSettings = {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  };

  if (isMobile) {
    // Мобильная версия
    console.log(1);
    
  } else {
    // Десктоп версия
    const componentsTl = gsap.timeline({
      scrollTrigger: {
        trigger: owSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    });
    
    componentsTl
      .from('.ow__title', baseSettings)
      .from('.ow__text', baseSettings, '-=0.3')
  }
}

// Функция для анимации секции Line
function initLineAnimation() {
  const lineSection = document.querySelector('.line');
  
  const lineTl = gsap.timeline({
    scrollTrigger: {
      trigger: lineSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });

  lineTl
    .from('.line__title', { y: 30, opacity: 0, duration: 0.8 })
    .from('.line__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.line__left', { x: -30, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.line__list-item', { 
      x: 30, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.2 
    }, '-=0.4');
}

// Функция для анимации секции Evidence
function initEvidenceAnimation() {
  const evidenceSection = document.querySelector('.evidence');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
  const evidenceTl = gsap.timeline({
    scrollTrigger: {
      trigger: evidenceSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });

  if(isMobile) {
    evidenceTl
    .from('.evidence__title', { y: 30, autoAlpha: 0, duration: 0.5, ease: "power1.out" })
    .from('.evidence__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
    .from('.evidence__mileage', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.evidence__img-mobile', { y: 50, opacity: 0, duration: 0.8, ease: "power2.out" }, '-=0.3')
    .from('.evidence__result', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.evidence__btn', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
  } else {
      evidenceTl
    .from('.evidence__title', { y: 30, autoAlpha: 0, duration: 0.5, ease: "power1.out" })
    .from('.evidence__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
    .from('.evidence__mileage', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.evidence__result', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.evidence__btn', { y: 50, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.evidence__img._md3dn', { x: 100, opacity: 0, duration: 1, ease: "power2.out" }, '-=0.8')
  }


}

// Обработчик ресайза с дебаунсом
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация с небольшой задержкой для стабильности
  setTimeout(() => {
    initAnimations();
    ScrollTrigger.refresh();
  }, 500);
});

// Убираем обработчики при unmount (если используется в SPA)
window.addEventListener('beforeunload', () => {
  window.removeEventListener('resize', handleResize);
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});