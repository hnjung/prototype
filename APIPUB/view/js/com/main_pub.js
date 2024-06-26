// 메인 오픈 모션
const TweenScaleEls1 = document.querySelector('.main-title');
const TweenScaleEls2 = document.querySelector('.slide-wrap');

const MainTxtMotion1 = gsap
  .timeline({
    scrollTrigger: {
      trigger: TweenScaleEls1,
    },
  })
  .from(TweenScaleEls1, {
    duration: 0.45,
    yPercent: -10,
    opacity: 0,
    delay: 0.2,
});

const MainSliderMotion = gsap
  .timeline({
    scrollTrigger: {
      trigger: TweenScaleEls2,
    },
  })
  .from(TweenScaleEls2, {
    duration: 0.45,
    xPercent: 10,
    opacity: 0,
    delay: 0.6,
});

// 메인 슬라이더
const cardSwiper = new Swiper('.card-swiper', {
  slidesPerView: 1,
  spaceBetween: 56,
  // loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});