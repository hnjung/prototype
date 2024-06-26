/* Auto케어 보장 선택 */
const productUiCareCover = {
	init : () => {
		const btnSelect = document.querySelectorAll('.care-cover > .card-item .btn-select');
		if (btnSelect) {
			btnSelect.forEach(function(_this) {
				_this.addEventListener('click', productUiCareCover.select);
			});
		}
	},
	select : (_event) => {
		const element = _event.target;
		const control = element.closest('.card-item').querySelector('.control');

		if (control.checked === false) {
			element.classList.add('is-active');
			control.checked = true;
		} else {
			element.classList.remove('is-active');
			control.checked = false;
		}
	}
};
productUiCareCover.init();

/* 쏠편한 국내여행 slide */
if (document.querySelector('.prd-travel-banner > .swiper')) {
	const productUiTravelBannerSwiper = new Swiper('.prd-travel-banner > .swiper', {
		speed: 300,
		spaceBetween: 16,
		slidesPerView: 'auto',
		centeredSlides: false,
		a11y: {
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드',
		}
	});
}

/* 상품 상세 이미지 애니메이션 */
const productUiDetailAni = {
	set : () => {
		const page = document.querySelector('#page');
		const windowHeight = window.innerHeight;
		const elementVisible = 100;
		page.addEventListener('scroll', function() {
			const element = page.querySelectorAll('.pdr-img.fn-ani-set');
			element.forEach(function(_this) {
				const itemTop = _this.getBoundingClientRect().top;

				if (itemTop < windowHeight - elementVisible) {
					lottie.play(_this.dataset.aniItem);
				}
			});
		});
	}
};
productUiDetailAni.set();

/* 접고펼치기(한개만 확장)
	.fn-accordion-list : 최상위 목록 요소
	.fn-accordion-wrap : 부모 요소
	.fn-accordion-link : 타이틀 요소(버튼 이벤트 연결 시)
	.fn-accordion-btn : 버튼 요소
	.fn-accordion-item[] : 접고 펼칠 요소들
	data-accordion-slide="true" : 애니메이션 반영 여부
*/
const productUiFnAccordion = {
	/* 초기실행 */
	init : () => {
		productUiFnAccordion.load();
		productUiFnAccordion.events();
		productUiFnAccordion.links();
	},
	/* 버튼 클릭 */
	events : () => {
		const accordionBtn = document.querySelectorAll('.fn-accordion-wrap .fn-accordion-btn');
		accordionBtn.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const thisWrap = this.closest('.fn-accordion-wrap');
				let opened = true;
				if (thisWrap.classList.contains(commUiVar.openClass)) {
					opened = false;
				} else {
					/* 형제 요소 일괄 닫기 */
					const thisList = this.closest('.fn-accordion-list').querySelectorAll('.fn-accordion-wrap');
					thisList.forEach(function(_this2) {
						productUiFnAccordion.set(_this2.querySelector('.fn-accordion-btn'), false);
					});
				}
				productUiFnAccordion.set(this, opened);
			});
		});
	},
	/* 제목 클릭 시 */
	links : () => {
		const accordionLink = document.querySelectorAll('.fn-accordion-wrap .fn-accordion-link');
		accordionLink.forEach(function(_this) {
			_this.addEventListener('click', function(e) {
				/* 버튼 클릭 이벤트 */
				if (!e.target.classList.contains('helper-btn')) {
					_this.closest('.fn-accordion-wrap').querySelector('.fn-accordion-btn').click();
				}
			});
		});
	},
	/* 로딩 */
	load : () => {
		const accordionWrap = document.querySelectorAll('.fn-accordion-wrap');
		accordionWrap.forEach(function(_this) {
			let opened = false;

			/* 열려있을 때 */
			if (_this.classList.contains(commUiVar.openClass)) {
				opened = true;
			}

			/* 세팅 호출 */
			productUiFnAccordion.set(_this.querySelector('.fn-accordion-btn'), opened);
		});
	},
	/* 세팅 */
	set : (_element, _opened) => {
		const thisWrap = _element.closest('.fn-accordion-wrap');
		const btnText = _element.querySelector('span.sr-only');

		let btnValue = `열기`;
		if (_opened) { /* 열기 */
			thisWrap.classList.add(commUiVar.openClass);
			btnValue = `닫기`;
		} else {
			thisWrap.classList.remove(commUiVar.openClass);
		}
		if (btnText) {
			btnText.innerHTML = btnValue;
		}

		/* 웹접근성 세팅 호출 */
		productUiFnAccordion.setWA(_element, _opened);
	},
	/* 웹접근성 세팅 */
	setWA : (_element, _opened) => {
		const thisWrap = _element.closest('.fn-accordion-wrap');
		const thisItems = thisWrap.querySelectorAll('.fn-accordion-item');
		const slideOption = thisWrap.dataset.accordionSlide;

		let waExpanded = false;
		let waHidden = true;
		if (_opened) { /* 열기 */
			waExpanded = true;
			waHidden = false;
		}
		_element.setAttribute('aria-expanded', waExpanded);

		thisItems.forEach(function(_this) {
			_this.setAttribute('aria-hidden', waHidden);

			if (_opened) { /* 열기 */
				commUiFnFocus.onFocus(_this);
			} else { /* 닫기 */
				commUiFnFocus.onBlur(_this);
			}

			if (slideOption) {
				productUiFnAccordion.setSlide(_this, _opened);
			}
		});
	},
	/* 애니메이션 세팅 */
	setSlide : (_element, _opened) => {
		let heightVal = 0;
		let overflowVal = 'hidden';
		let accordionSpeed = 0;
		if (_opened) { /* 열기 */
			heightVal = _element.scrollHeight;
			overflowVal = 'initial';
			accordionSpeed = commUiVar.animationSpeed;
		}
		_element.style.maxHeight = `${heightVal}px`;
		setTimeout(() => {
			_element.style.overflow = `${overflowVal}`;
		}, accordionSpeed);
		
	}
};
productUiFnAccordion.init();

/* 모바일청약 가입 전 확인사항 */
const productUiJoinGuide = {
	/* 초기실행 */
	init : () => {
		const guideWrap = document.querySelector('.join-guide-wrap');
		const btnConfirm = document.querySelector('#joinGuideBtnConfirm');

		if (guideWrap) {
			/* 버튼 이벤트 호출 */
			btnConfirm.addEventListener('click', productUiJoinGuide.more);

			/* 스크롤 대상 타겟 세팅 */
			const scrollWrap = productUiJoinGuide.target(guideWrap);
			if (scrollWrap) {
				/* 페이징 처리 */
				productUiJoinGuide.paging(scrollWrap);

				/* 스크롤 이벤트 호출 */
				scrollWrap.addEventListener('scroll', productUiJoinGuide.scroll);
			}

			/* 리사이즈 이벤트 호출 */
			window.addEventListener('resize', productUiJoinGuide.resize);
		}
	},
	/* 스크롤 대상 타겟 구하기 */
	target : (_element) => {
		const element = _element;
		let thisWrap = '';
		let thisScrollWrap = '';
		if (element.closest('#page')) {
			thisWrap = element.closest('#page');
			thisScrollWrap = thisWrap;
		}
		if (element.closest('.popup-wrap')) {
			thisWrap = element.closest('.popup-wrap');
			thisScrollWrap = thisWrap.querySelector('.popup-content');
		}
		return thisScrollWrap;
	},
	/* 완료 여부 체크 */
	check : () => {
		const btnConfirm = document.querySelector('#joinGuideBtnConfirm');
		if (btnConfirm.classList.contains('is-confirm')) {
			return 'confirm';
		} else {
			return 'none';
		}
	},
	/* 페이징 처리 */
	paging : (_element) => {
		const pageCheck = productUiJoinGuide.check();
		if (pageCheck === 'confirm') return true;

		const element = _element;
		const btnConfirm = document.querySelector('#joinGuideBtnConfirm');
		const deviceH = document.querySelector('#wrap').scrollHeight;
		const scrollWrapH = element.scrollHeight;
		const nowScrollTop = element.scrollTop;

		btnConfirm.querySelector('span > em').innerHTML = `(${Math.ceil(nowScrollTop / deviceH)}/${Math.ceil(scrollWrapH / deviceH)})`;
	},
	/* 버튼 클릭 */
	more : (_event) => {
		const pageCheck = productUiJoinGuide.check();
		if (pageCheck === 'confirm') return true;

		const element = _event.target;
		const deviceH = document.querySelector('#wrap').scrollHeight;

		const scrollWrap = productUiJoinGuide.target(element);
		const nowScrollTop = scrollWrap.scrollTop;
		scrollWrap.scrollTop = nowScrollTop + deviceH;
	},
	/* 스크롤 */
	scroll : (_event) => {
		const pageCheck = productUiJoinGuide.check();
		if (pageCheck === 'confirm') return true;

		const element = _event.target;
		const deviceH = document.querySelector('#wrap').scrollHeight;

		const scrollWrap = productUiJoinGuide.target(element);
		const nowScrollTop = scrollWrap.scrollTop;
		const scrollWrapH = scrollWrap.scrollHeight;

		const btnConfirm = document.querySelector('#joinGuideBtnConfirm');
		if ((nowScrollTop + deviceH) >= scrollWrapH) {
			btnConfirm.classList.add('is-confirm');
			btnConfirm.querySelector('span').innerHTML = `모두 확인했습니다`;
		}
		productUiJoinGuide.paging(scrollWrap);
	},
	/* 리사이즈 */
	resize : () => {
		productUiJoinGuide.init();
	}
};
productUiJoinGuide.init();

/* 기아멤버십 보험료 예시 말풍선 - 2024-04-04 : 함수명 변경 */
const productUiKiaLeisureTooltip = {
	init : () => {
		const btnClose = document.querySelector('#btnKiaTooltipClose');
		if (btnClose) {
			btnClose.addEventListener('click', productUiKiaLeisureTooltip.close);
		}
	},
	close : (_event) => {
		const element = _event.target;
		const kiaWrap = element.closest('.kia-members');
		kiaWrap.classList.remove('is-open');
		const kiaBody = kiaWrap.querySelector('.tooltip-body');
		kiaBody.setAttribute('aria-hidden', true);
	}
};
productUiKiaLeisureTooltip.init();

/* 제휴 이벤트 상세 스크롤 시 헤더 보임 - 2024-04-04 : 추가 */
const productUiPartnerHeader = {
	set : () => {
		const partnerDetail = document.querySelector('.partner-detail');
		if (partnerDetail) {
			partnerDetail.addEventListener('scroll', function() {
				const thisScrollTop = this.scrollTop;
	
				if (thisScrollTop > 0) {
					this.querySelector('#header').classList.add(commUiVar.activeClass);
				} else {
					this.querySelector('#header').classList.remove(commUiVar.activeClass);
				}
			});
		}
	}
};
productUiPartnerHeader.set();