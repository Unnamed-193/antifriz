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
  initTechAnimation();
}

// Функция для анимации секции Components
function initOwAnimation() {
  const owSection = document.querySelector('.ow');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

  const baseSettings = {
    delay: 0.1,
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
    .from('.line__left .line__list-item', { 
      x: -40, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.3 
    }, 'line')
    .from('.line__right .line__list-item', { 
      x: 40, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.3 
    }, 'line');
}

// Функция для анимации секции Evidence
function initTechAnimation() {
  const techSection = document.querySelector('.tech');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
  const techTl = gsap.timeline({
    scrollTrigger: {
      trigger: techSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });

  if(isMobile) {
    techTl
    .from('.tech__suptitle', { y: 30, opacity: 0, duration: 0.8 })
    .from('.tech__title', { y: 30, autoAlpha: 0, duration: 0.5, ease: "power1.out" }, '-=0.3');
  
  // Анимация первого элемента списка
  techTl
    .from('.tech__list-item:first-child .tech__count', { y: 20, opacity: 0, duration: 0.4 })
    .from('.tech__list-item:first-child .tech__text', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.tech__list-item:first-child .tech__img-box', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2');
  
  // Анимация второго элемента списка
  techTl
    .from('.tech__list-item:nth-child(2) .tech__count', { y: 20, opacity: 0, duration: 0.4 })
    .from('.tech__list-item:nth-child(2) .tech__text', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.tech__list-item:nth-child(2) .tech__img-box', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
    .from('.tech__list-item:nth-child(2) .tech__text:last-child', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.tech__conclusion', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');

  } else {
    techTl
    .from('.tech__suptitle', { y: 30, opacity: 0, duration: 0.8 })
    .from('.tech__title', { y: 30, autoAlpha: 0, duration: 0.5, ease: "power1.out" }, '-=0.3');
  
  // Анимация первого элемента списка
  techTl
    .from('.tech__list-item:first-child .tech__count', { y: 20, opacity: 0, duration: 0.4 })
    .from('.tech__list-item:first-child .tech__text', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.tech__list-item:first-child .tech__img-box', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2');
  
  // Анимация второго элемента списка
  techTl
    .from('.tech__list-item:nth-child(2) .tech__count', { y: 20, opacity: 0, duration: 0.4 })
    .from('.tech__list-item:nth-child(2) .tech__text', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')
    .from('.tech__list-item:nth-child(2) .tech__img-box', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
    .from('.tech__conclusion', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');

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