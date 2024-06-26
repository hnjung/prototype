/* 튜토리얼 */
const pageUiTutorialSwiper = new Swiper('.tutorial-visual > .swiper', {
	speed: 300,
	spaceBetween: 0,
	slidesPerView: 1,
	parallax: true,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},
	a11y: {
		slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
	}
});