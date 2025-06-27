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
  const bottlesContainer = document.querySelector('.ow__bottles');
  const bottles = gsap.utils.toArray('.ow__bottles img');


  if (isMobile) {
    // Мобильная версия
    console.log(1);
  } else {
    // Десктоп версия
    gsap.set(bottles, {
      x: (i) => {
        switch(i) {
          case 0: return '335%';
          case 1: return '216%';
          case 2: return '112%';
          case 4: return '-102%';
          case 5: return '-214%';
          case 6: return '-333%';
          default: return 0;
        }
      },
      y: (i) => [0,1,2,6].includes(i) ? '2%' : 0,
      opacity: (i) => i === 3 ? 1 : 0,
      zIndex: (i) => {
        if (i === 3) return 4;
        if ([0,6].includes(i)) return 1;
        if ([1,5].includes(i)) return 2;
        return 3;
      }
    });


    const showTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: owSection,
        start: 'top 40%',
        end: 'top 30%',
        toggleActions: 'play none none none',
        markers: false // можно включить для отладки
      }
    });
    
    showTimeline.to(bottlesContainer, {
      opacity: 1,
      y: 0,
      duration: 0.5
    });
    
    showTimeline.to(bottles, {
      x: (i) => {
        switch(i) {
          case 0: return '169%';
          case 1: return '112%';
          case 2: return '61%';
          case 4: return '-49%';
          case 5: return '-102%';
          case 6: return '-172%';
          default: return 0;
        }
      },
      y: (i) => [0,1,2,6].includes(i) ? '2%' : 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.3');

    // Обратная анимация при скролле вниз за пределы секции
    const hideTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: owSection,
        start: 'bottom bottom',
        end: 'bottom+=100% bottom',
        toggleActions: 'play none none none',
        markers: false // можно включить для отладки
      }
    });
    
    hideTimeline.to(bottles, {
      x: (i) => {
        switch(i) {
          case 0: return '335%';
          case 1: return '216%';
          case 2: return '112%';
          case 4: return '-102%';
          case 5: return '-214%';
          case 6: return '-333%';
          default: return 0;
        }
      },
      opacity: (i) => i === 3 ? 1 : 0,
      duration: 0.8,
      ease: 'power2.inOut'
    });
    
    hideTimeline.to(bottlesContainer, {
      opacity: 0,
      duration: 0.1
    }, '-=0.5');

  
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
  // .from('.line__center--desktop', {
  //   y: -563,
  //   x: 9,
  //   scale: 0.78,
  //   duration: 1.5,
  // })
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