
// 대시보드 오픈 모션
const fadeinEls = document.querySelectorAll('.dash-card li');
fadeinEls.forEach(function (textanimation, index) {
  gsap.from(textanimation, 1, {
    scrollTrigger: '.dash-card',
    duration: 0.45,
    delay: (index + 1) * 0.3,
    opacity: 0,
    y: 35,
  });
});