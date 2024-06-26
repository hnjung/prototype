/* 공통 전역변수 */
const commUiVar = {
	activeClass : 'is-active', /* 활성화 클래스명 */
	openClass : 'is-open', /* 오픈 클래스명 */
	animationSpeed : .3 * 1000, /* 애니메이션 시간 */
	focusElements : 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled], .btn-clear), [tabindex="0"], [data-focus-on="true"]', /* 웹접근성 포커스 요소 */
	activeTF : { /* 히든요소 활성화 체크 */
		inputBtnClear : false,
		inputSearch : false,
		inputCalendar : false,
		select : false,
		popup : false,
		popover : false
	},
	popupZIndex : 20
};

/* 셀렉트박스 */
const commUiFnSelect = {
	/* 초기실행 */
	init : () => {
		commUiFnSelect.create();
		commUiFnSelect.open();
		commUiFnSelect.select();
	},
	/* 엘리먼트 생성 */
	create : () => {
		const selectData = document.querySelectorAll('.select .select-data');
		selectData.forEach(function(_this) {
			const dataOption = _this.querySelectorAll('option');
			const _thisSelect = _this.closest('.select');
			if (dataOption.length) {
				const addSelectUI = document.createElement('div');
				addSelectUI.setAttribute('class', 'select-ui');
				_thisSelect.append(addSelectUI);

				const addLabel = document.createElement('button');
				addLabel.setAttribute('type', 'button');
				addLabel.setAttribute('class', 'label');
				_thisSelect.querySelector('.select-ui').append(addLabel);

				const addOptions = document.createElement('ul');
				addOptions.setAttribute('class', 'options scrollbar');
				_thisSelect.querySelector('.select-ui').append(addOptions);

				/* 옵션 관련 엘리먼트 생성 */
				dataOption.forEach(function(_option, _index){
					if (_option.selected === true) {
						const addSelectedTxt = document.createElement('span');
						_thisSelect.querySelector('.select-ui .label').append(addSelectedTxt);
						_thisSelect.querySelector('.select-ui .label span').innerHTML = _option.innerHTML;
						if (_option.disabled === true) {
							addSelectedTxt.setAttribute('class', 'is-placeholder');
						}
					}
					const addOptionList = document.createElement('li');
					if (_option.selected === true) {
						addOptionList.setAttribute('class', 'item ' + commUiVar.activeClass);
					} else {
						addOptionList.setAttribute('class', 'item');
					}
					if (_option.disabled === true) {
						addOptionList.setAttribute('class', 'item is-placeholder');
					}
					_thisSelect.querySelector('.select-ui .options').append(addOptionList);
					_thisSelect.querySelector('.select-ui .options').children[_index].innerHTML = _option.innerHTML;
				});
			}
		});
	},
	/* 옵션 열기 */
	open : () => {
		const selectLabel = document.querySelectorAll('.select .select-ui .label');
		selectLabel.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const _thisParent = this.closest('.select-ui');
				const _thisOptions = _thisParent.querySelector('.options');
		
				if (_thisParent.classList.contains(commUiVar.openClass)) {
					_thisParent.classList.remove(commUiVar.openClass);
					_thisOptions.classList.remove('show-up', 'show-down');

					/* 혼합형일 경우 포커스 */
					if (this.closest('.input-button')) this.closest('.input-button').classList.remove('is-select-focus');
				} else {
					commUiFnSelect.closeAll();
					_thisParent.classList.add(commUiVar.openClass);
					if (this.getBoundingClientRect().top > (window.innerHeight / 2)) {
						_thisOptions.classList.add('show-up');
					} else {
						_thisOptions.classList.add('show-down');
					}

					/* 혼합형일 경우 포커스 */
					if (this.closest('.input-button')) this.closest('.input-button').classList.add('is-select-focus');
				}
		
			});
		});
	},
	/* 옵션 일괄 닫기 */
	closeAll : () => {
		const selectUIOptions = document.querySelectorAll('.select .select-ui .options');
		selectUIOptions.forEach(function(_this) {
			_this.closest('.select-ui').classList.remove(commUiVar.openClass);
			_this.classList.remove('show-up', 'show-down');

			/* 혼합형일 경우 포커스 */
			if (_this.closest('.input-button')) _this.closest('.input-button').classList.remove('is-select-focus');
		});
	},
	/* 옵션 선택 시 */
	select : () => {
		const selectItem = document.querySelectorAll('.select .select-ui .options .item');
		selectItem.forEach(function(_this) {
			_this.addEventListener('click', function(e){
				const _thisParent = this.closest('.select');

				/* 셀렉트에 옵션값 전달 */
				const selectIdx = [...e.target.parentElement.children].indexOf(e.target);
				_thisParent.querySelector('.select-data').children[selectIdx].selected = true;
		
				/* 라벨 텍스트 변경 */
				_thisParent.querySelector('.select-ui .label').innerHTML = this.innerHTML;
		
				/* 형제 엘리먼트 활성화 */
				_thisParent.querySelectorAll('.select-ui .options .item').forEach(function(_item){
					_item.classList.remove(commUiVar.activeClass);
				});

				this.classList.add(commUiVar.activeClass);
				commUiFnSelect.closeAll();
			});
		});
	}
};
commUiFnSelect.init();

/* Family Site */
const FooterFamily = {
	init: () => {
		const BtnFamilySite = document.querySelector('.btn-familysite');

		if (BtnFamilySite) {
			FooterFamily.events(BtnFamilySite);
		} else { }
	},
	events: (BtnFamilySite) => {
		function toggleAriaExpanded() {
			let isExpanded = BtnFamilySite.getAttribute('aria-expanded') === 'true';
			BtnFamilySite.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
		}

		BtnFamilySite.addEventListener('click', function () {
			toggleAriaExpanded();
			// window.addEventListener('click', windowClickHandler);
			return false;
		});

		let familyItems = document.querySelectorAll('.familysite-list .item');

		familyItems.forEach(function (item) {
			item.addEventListener('click', function () {
				BtnFamilySite.setAttribute('aria-expanded', 'false');
			});
		});
	}
};
FooterFamily.init();

/* 애니메이션 */
const commUiResultAnimation = {
	/* 값 가져오기 */
	set : () => {
		const aniSet = document.querySelectorAll('.fn-ani-set');
		aniSet.forEach(function(_this) {
			const aniItem = _this.dataset.aniItem;
			const aniLoop = Boolean(_this.dataset.aniLoop || false);
			commUiResultAnimation.load(_this, aniItem, aniLoop);
		});
	},
	/* 실행하기 */
	load : (_element, _file, _loop) => {
		const getURL = window.location.href;
		let pathDir = '../';
		if (getURL.indexOf('/doc/guide/') !== -1) {
			pathDir = '../../';
		}
		lottie.loadAnimation({
			container: _element,
			path: `${pathDir}js/com/animation-json/${_file}.json`,
			renderer: 'svg',
			loop: _loop,
			speed: 1,
		});
	},
	/* 공통-로딩 */
	loading : () => {
		const loadingIcon = document.querySelector('#loading .loading-bar > span');
		if (loadingIcon) {
			commUiResultAnimation.load(loadingIcon, 'loading', true);
		}
	}
};
commUiResultAnimation.set();
commUiResultAnimation.loading();

/* 접고펼치기
	.fn-fold-wrap : 부모 요소
	.fn-fold-link : 타이틀 요소(버튼 이벤트 연결 시)
	.fn-fold-btn : 버튼 요소
	.fn-fold-item[] : 접고 펼칠 요소들
	data-fold-slide="true" : 애니메이션 반영 여부
*/
const commUiFnFold = {
	/* 초기실행 */
	init : () => {
		commUiFnFold.load();
		commUiFnFold.events();
		commUiFnFold.links();
	},
	/* 버튼 클릭 */
	events : () => {
		const foldBtn = document.querySelectorAll('.fn-fold-wrap .fn-fold-btn');
		foldBtn.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const thisWrap = this.closest('.fn-fold-wrap');
				let opened = true;
				if (thisWrap.classList.contains(commUiVar.openClass)) {
					opened = false;
				}
				commUiFnFold.set(this, opened);
			});
		});
	},
	/* 제목 클릭 시 */
	links : () => {
		const foldLink = document.querySelectorAll('.fn-fold-wrap .fn-fold-link');
		foldLink.forEach(function(_this) {
			_this.addEventListener('click', function() {
				/* 버튼 클릭 이벤트 */
				_this.closest('.fn-fold-wrap').querySelector('.fn-fold-btn').click();
			});
		});
	},
	/* 로딩 */
	load : () => {
		const foldWrap = document.querySelectorAll('.fn-fold-wrap');
		foldWrap.forEach(function(_this) {
			let opened = false;

			/* 열려있을 때 */
			if (_this.classList.contains(commUiVar.openClass)) {
				opened = true;
			}

			/* 세팅 호출 */
			commUiFnFold.set(_this.querySelector('.fn-fold-btn'), opened);
		});
	},
	/* 세팅 */
	set : (_element, _opened) => {
		const thisWrap = _element.closest('.fn-fold-wrap');
		let btnValue = `열기`;
		if (_opened) { /* 열기 */
			thisWrap.classList.add(commUiVar.openClass);
			btnValue = `닫기`;
		} else {
			thisWrap.classList.remove(commUiVar.openClass);
		}
		_element.querySelector('span.sr-only').innerHTML = btnValue;

		/* 웹접근성 세팅 호출 */
		commUiFnFold.setWA(_element, _opened);
	},
	/* 웹접근성 세팅 */
	setWA : (_element, _opened) => {
		const thisWrap = _element.closest('.fn-fold-wrap');
		const thisItems = thisWrap.querySelectorAll('.fn-fold-item');
		const slideOption = thisWrap.dataset.foldSlide;

		let waExpanded = false;
		let waHidden = true;
		if (_opened) { /* 열기 */
			waExpanded = true;
			waHidden = false;
		}
		_element.setAttribute('aria-expanded', waExpanded);

		thisItems.forEach(function(_this) {
			_this.setAttribute('aria-hidden', waHidden);

			if (slideOption) {
				commUiFnFold.setSlide(_this, _opened);
			}
		});
	},
	/* 애니메이션 세팅 */
	setSlide : (_element, _opened) => {
		let heightVal = 0;
		if (_opened) { /* 열기 */
			heightVal = _element.scrollHeight;
		}
		_element.style.maxHeight = `${heightVal}px`;
	}
};
commUiFnFold.init();