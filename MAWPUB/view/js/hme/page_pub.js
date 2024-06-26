/* 메인 - 비주얼 영역 */
const mainUiVisualSwiper = new Swiper('.main-visual > .swiper', {
	speed: 300,
	spaceBetween: 20,
	slidesPerView: 1,
	centeredSlides: false,
	loop: false,
	autoplay: {
		delay: 5000,
		disableOnInteraction: true,
		pauseOnMouseEnter: true,
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'fraction',
	},
	a11y: {
		slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
	}
});
const mainUiVisualControl = document.querySelector('#mainVisualControl');
if (mainUiVisualControl) {
	mainUiVisualControl.addEventListener('click', function() {
		if (this.classList.contains('is-stop')) {
			this.classList.remove('is-stop');
			this.querySelector('.sr-only').innerHTML = `자동재생 멈추기`;
			mainUiVisualSwiper.autoplay.start();
		} else {
			this.classList.add('is-stop');
			this.querySelector('.sr-only').innerHTML = `자동재생 시작하기`;
			mainUiVisualSwiper.autoplay.stop();
		}
	});
}

/* 메인 - 판매량 BEST */
const mainUiBestSwiper = new Swiper('.main-prd-best > .swiper', {
	speed: 300,
	spaceBetween: 8,
	slidesPerView: 'auto',
});

/* 상품 - 이달의 추천 상품 */
const mainUiMonthlySwiper = new Swiper('.main-monthly > .swiper', {
	speed: 300,
	spaceBetween: 20,
	slidesPerView: 1,
	centeredSlides: false,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},
	a11y: {
		slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
	}
});

/* 상품 - 중간 배너 */
const mainUiProductBannerSwiper = new Swiper('.product-banner > .swiper', {
	speed: 300,
	spaceBetween: 20,
	slidesPerView: 'auto',
	centeredSlides: true,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},
	a11y: {
		slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
	}
});

/* 상품 - 퀵메뉴 */
const mainUiProductQuick = {
	/* 초기실행 */
	init : () => {
		mainUiProductQuick.anchor();
	},
	/* 앵커 메뉴 이벤트 연결 */
	anchor : () => {
		const quickMenu = document.querySelector('.product-quick');
		if (quickMenu) {
			/* 스크롤 이벤트 */
			const gnbScroll = document.querySelector('#page');
			gnbScroll.addEventListener('scroll', mainUiProductQuick.anchorScroll);

			/* 클릭 이벤트 */
			const anchorMenu = document.querySelectorAll('.product-quick .product-quick-item > .link');
			anchorMenu.forEach(function(_this) {
				_this.addEventListener('click', mainUiProductQuick.anchorClick);
			});
		}
	},
	/* 스크롤 시 앵커 메뉴 활성화 - 2023-12-04 : 불필요 변수 삭제 */
	anchorScroll : (_event) => {
		const headerY = document.querySelector('#header').scrollHeight;
		const quickY = document.querySelector('.product-quick').scrollHeight;
		const mainMenuY = document.querySelector('.main-menu').scrollHeight;
		const productBannerY = document.querySelector('.product-banner.type1').scrollHeight;
		const sectionPad = window.getComputedStyle(document.querySelector('.section')).getPropertyValue('padding-bottom').replace(/[^0-9]/g, "");

		const element = _event.target;
		const scrollTop = Math.ceil(element.scrollTop);

		/* 해당 영역의 앵커 메뉴 활성화 */
		document.querySelectorAll('.product-quick .product-quick-item > .link').forEach(function(_this) {
			const thisTarget = _this.getAttribute('href');
			const menuId = document.querySelector(thisTarget);
			const menuTop = menuId.offsetTop;
			const menuTopGap = menuTop - headerY - quickY;
			const scrollBottom = scrollTop + window.innerHeight;

			if (scrollTop > menuTopGap) {
				mainUiProductQuick.anchorActive(_this);
			} else if ((scrollBottom - productBannerY - mainMenuY - sectionPad) === (menuTop + headerY + menuId.offsetHeight)) {
				mainUiProductQuick.anchorActive(_this);
			}
		});
	},
	/* 앵커 메뉴 활성화 */
	anchorActive : (_element) => {
		const thisWrap =_element.closest('.product-quick-wrap');
		const thisMenu = _element.closest('.product-quick-item');
		const thisList = thisWrap.querySelector('.product-quick-list');

		/* 활성화 */
		_element.closest('.product-quick').querySelectorAll('.product-quick-item').forEach(function(_this) {
			_this.classList.remove(commUiVar.activeClass);
		})
		thisMenu.classList.add(commUiVar.activeClass);

		/* 가로 스크롤 가운데 위치 이동 */
		thisWrap.scrollLeft = thisMenu.offsetLeft + (thisMenu.offsetWidth / 2) - (thisList.offsetWidth / 2);
	},
	/* 앵커 메뉴 클릭 시 스크롤 이동 - 2023-12-04 : 불필요 변수 삭제 */
	anchorClick : (_event) => {
		_event.preventDefault();

		const gnbScroll = document.querySelector('#page');
		const quickY = document.querySelector('.product-quick').scrollHeight;

		let element = _event.target;
		if (element.classList.contains('txt')) {
			element = element.parentElement;
		}
		const thisWrap = element.closest('.product-quick-wrap');
		const thisList = thisWrap.querySelector('.product-quick-list');

		thisList.querySelectorAll('.product-quick-item').forEach(function(_this) {
			_this.classList.remove(commUiVar.activeClass);
		});
		element.parentElement.classList.add(commUiVar.activeClass);

		const thisLink = element.getAttribute('href');
		let targetTop = document.querySelector(thisLink).offsetTop;

		/* 가로 세로 스크롤 위치 이동 */
		gnbScroll.scrollTop = `${targetTop - quickY}`;
		thisWrap.scrollLeft = element.offsetLeft + (element.offsetWidth / 2) - (thisList.offsetWidth / 2);
	}
};
mainUiProductQuick.init();

/* 마이페이지 - 추천 상품 */
const mainUiRecommendBannerSwiper = new Swiper('.recommend-banner > .swiper', {
	speed: 300,
	spaceBetween: 8,
	slidesPerView: 'auto',
	centeredSlides: false,
	a11y: {
		slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
	}
});

/* 캐릭터 설정 - 추천 상품 */
const mainUiAvatarBannerSwiper = new Swiper('.avatar-banner > .swiper', {
	speed: 300,
	spaceBetween: 8,
	slidesPerView: 'auto',
	centeredSlides: true,
	a11y: {
		slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
	}
});

/* 마이페이지 - 캐릭터 변경 버튼 - 2024-03-08 : 추가 */
const mainUiSetAvatar = {
	init : () => {
		const btnClose = document.querySelector('#btnSetAvatarClose');
		if (btnClose) {
			btnClose.addEventListener('click', mainUiSetAvatar.close);
		}
	},
	close : (_event) => {
		const element = _event.target;
		const avatarWrap = element.closest('.set-avatar');
		avatarWrap.classList.remove('is-open');
		const avatarBody = avatarWrap.querySelector('.tooltip-body');
		avatarBody.setAttribute('aria-hidden', true);
	}
};
mainUiSetAvatar.init();