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

/* 웹접근성 포커스 연결 및 해제 */
const commUiFnFocus = {
	/* 단일 요소 포커스 연결 */
	focus : (_element) => {
		commUiFnFocus.set(_element, 0);
	},
	/* 히든 영역 포커스 연결 */
	onFocus : (_element) => {
		const findFocusElement = _element.querySelectorAll(commUiVar.focusElements);
		findFocusElement.forEach(function(_this) {
			commUiFnFocus.set(_this, 0);
		});
	},
	/* 단일 요소 포커스 해제 */
	blur : (_element) => {
		commUiFnFocus.set(_element, -1);
	},
	/* 히든 영역 포커스 해제 */
	onBlur : (_element) => {
		const findFocusElement = _element.querySelectorAll(commUiVar.focusElements);
		findFocusElement.forEach(function(_this) {
			commUiFnFocus.set(_this, -1);
		});
	},
	/* 반영 */
	set : (_target, _tabIndex) => {
		if (_target.classList.contains('select-data')) {
			return false;
		}
		_target.setAttribute('tabindex', _tabIndex);
		if (_tabIndex === 0) {
			_target.setAttribute('aria-hidden', false);
		} else {
			_target.setAttribute('aria-hidden', true);
		}
	}
};

/* GNB */
const commUiFnGnb = {
	/* 초기실행 */
	init : () => {
		// commUiFnGnb.toggle();
		commUiFnGnb.temp();
	},
	// toggle : () => {
	// 	const header = document.querySelector('#header');
	// 	const gnbMenu = document.querySelector('#header .btn-menu');
	// 	if (gnbMenu) {
	// 		/* 메뉴 아이콘 클릭 시 */
	// 		gnbMenu.addEventListener('click', function() {
	// 			const headerClass = header.classList;
	// 			if (headerClass.contains(commUiVar.openClass)) {
	// 				headerClass.remove(commUiVar.openClass);
	// 			} else {
	// 				headerClass.add(commUiVar.openClass);
	// 			}
	// 		});
	// 	}
	// },
	temp : () => {
		const gnbList = document.querySelectorAll('.gnb-list > li');
		gnbList.forEach(function(_this) {
			_this.addEventListener('mouseover', function() {
				_this.classList.add('is-open');
			});
			_this.addEventListener('mouseout', function() {
				_this.classList.remove('is-open');
			});
		});
	},
	// open : () => {},
	// close : () => {}
};
commUiFnGnb.init();

/* 탭 */
const commUiFnTab = {
	/* 초기실행 */
	init : () => {
		commUiFnTab.select();
		commUiFnTab.keyEvent();
	},
	/* 탭 메뉴 선택 시 */
	select : () => {
		const tabMenu = document.querySelectorAll('.tab-head .tab-menu');
		tabMenu.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const thisTab = this.closest('.tab');
				const thisItem = thisTab.querySelector(`#${this.getAttribute('aria-controls')}`);

				/* 부모 탭 체크 */
				let parentTF = false;
				if (thisTab.querySelectorAll('.tab').length) {
					parentTF = true;
				}

				/* 형제 탭 비활성화 */
				thisTab.querySelectorAll('.tab-head .tab-menu').forEach(function(_item) {
					/* 부모 탭일 경우 : 자식 요소 리턴 */
					if (parentTF) {
						if (!_item.closest('.tab').querySelectorAll('.tab').length) {
							return;
						}
					}
					_item.classList.remove(commUiVar.activeClass);
					_item.setAttribute('aria-selected', false);
					_item.querySelector('a').setAttribute('tabindex', -1);
				});
				/* 형제 탭 내용 비활성화 */
				thisTab.querySelectorAll('.tab-list .tab-item').forEach(function(_item) {
					/* 부모 탭일 경우 : 자식 요소 리턴 */
					if (parentTF) {
						if (!_item.closest('.tab').querySelectorAll('.tab').length) {
							return;
						}
					}
					_item.classList.remove(commUiVar.activeClass);
					_item.setAttribute('aria-hidden', true);
					_item.setAttribute('tabindex', -1);
				});

				/* 선택 탭 활성화 */
				this.classList.add(commUiVar.activeClass);
				this.setAttribute('aria-selected', true);
				this.querySelector('a').setAttribute('tabindex', 0);

				/* 선택 탭 내용 활성화 */
				thisItem.classList.add(commUiVar.activeClass);
				thisItem.setAttribute('aria-hidden', false);
				thisItem.setAttribute('tabindex', 0);

				/* 부모 탭일 경우 : 자식 요소 첫번빼 탭 선택 초기화 */
				if (parentTF) {
					if (thisItem.querySelectorAll('.tab').length) {
						thisItem.querySelector('.tab > .tab-head > .tab-menu:first-child').click();
					}
				}
			});
		});
	},
	/* 웹접근성 대응 : 키 이벤트 추가 */
	keyEvent : () => {
		const tabWrap = document.querySelectorAll('.tab-head');
		tabWrap.forEach(function(_this) {
			const tabMenu = _this.querySelectorAll('.tab-menu');
			tabMenu.forEach(function(_element, _index) {
				_element.addEventListener('keydown', function(_event) {
					/* 엔터키 OR 스페이스바 입력 시 클릭 이벤트 연결 */
					if (_event.keyCode === 13 || _event.keyCode === 32) {
						_event.preventDefault();
						_element.click();
					}

					/* 왼쪽 방향키 입력 시 탭 포커스 이동 */
					if (_event.keyCode === 37) {
						_event.preventDefault();
						if (_index === 0) {
							tabMenu[tabMenu.length - 1].querySelector('a').focus();
						} else {
							tabMenu[_index - 1].querySelector('a').focus();
						}
					}

					/* 오른쪽 방향키 입력 시 탭 포커스 이동 */
					if (_event.keyCode === 39) {
						_event.preventDefault();
						if (_index === tabMenu.length - 1) {
							tabMenu[0].querySelector('a').focus();
						} else {
							tabMenu[_index + 1].querySelector('a').focus();
						}
					}
				});
			});
		});
	}
};
commUiFnTab.init();

/* 탭 가로 스크롤 */
const commUiFnTabSize = () => {
	const tabScroll = document.querySelectorAll('.tab-scroll > .tab-head');
	tabScroll.forEach(function(_this) {
		let tabSize = 0, setUnit = '';
		/* 탭 넓이 구하기 */
		for (let j = 0; j < _this.children.length; j++) {
			// tabSize = tabSize + _this.children[j].offsetWidth + parseInt(window.getComputedStyle(_this.children[j]).getPropertyValue('margin-left'));
			tabSize = tabSize + _this.children[j].offsetWidth;
		}
		/* 디바이스 넓이에 따른 단위 세팅 */
		if (window.innerWidth > 1024) {
			setUnit = `px`;
		} else {
			tabSize = Math.ceil(tabSize * 0.1).toFixed(2);
			setUnit = `rem`;
		}
		_this.style.cssText = `width: ${tabSize}${setUnit}`;
	});
};
/* window.addEventListener('load', function() {
	commUiFnTabSize();
});
window.addEventListener('resize', function() {
	commUiFnTabSize();
}); */

/* 텍스트 필드 */
const commUiFnInput = {
	/* 초기실행 */
	init : () => {
		commUiFnInput.create();
		commUiFnInput.events();
	},
	/* 내용 체크, 포커스, 아웃 이벤트 */
	events : () => {
		const inputData = document.querySelectorAll('.input-data');
		inputData.forEach(function(_this) {
			if (_this.readOnly || _this.disabled) {
				return false;
			}
			/* 인풋 내용 체크 */
			_this.addEventListener('input', function() {
				/* 인풋 내용 체크 후 삭제 아이콘 노출 */
				if (this.value === '') {
					this.classList.remove(commUiVar.activeClass);
					commUiVar.activeTF.inputBtnClear = false; /* 히든요소 활성화 체크 */
					commUiFnFocus.blur(this.parentElement.querySelector('.btn-clear')); /* 삭제 아이콘 포커스 해제 */
				} else {
					this.classList.add(commUiVar.activeClass);
					commUiVar.activeTF.inputBtnClear = true; /* 히든요소 활성화 체크 */
					commUiFnFocus.focus(this.parentElement.querySelector('.btn-clear')); /* 삭제 아이콘 포커스 연결 */

					/* 검색 옵션 체크 후 검색어 오픈 */
					const optSearch = commUiFnSearch.check(this);
					if (optSearch) commUiFnSearch.open(this);
				}
				/* 이메일 옵션 체크 후 이벤트 호출 */
				const optEmail = commUiFnEmail.check(this);
				if (optEmail) commUiFnEmail.events(this);
			});

			/* 인풋 포커스 */
			_this.addEventListener('focus', function() {
				/* 오픈되어 있는 옵션 레이어 닫기 */
				commUiFnSearch.closeAll();
				/* commUiFnCalendar.close(); */

				/* 캘린더 옵션 체크 */
				/* const optCalendar = commUiFnCalendar.check(this);
				if (optCalendar) {
					commUiFnCalendar.open(this);
				} */

				/* 인풋 내용 체크 후 삭제 아이콘 노출 */
				commUiFnInput.hideClearButton();
				if (this.value !== '') {
					this.classList.add(commUiVar.activeClass);
					commUiVar.activeTF.inputBtnClear = true; /* 히든요소 활성화 체크 */
					commUiFnFocus.focus(this.parentElement.querySelector('.btn-clear')); /* 삭제 아이콘 포커스 연결 */

					/* 검색 옵션일 경우 */
					const optSearch = commUiFnSearch.check(this);
					if (optSearch) commUiFnSearch.open(this);
				}

				/* 혼합형일 경우 포커스 */
				if (this.closest('.input-button')) this.closest('.input-button').classList.add('is-text-focus');
			});

			/* 인풋 포커스 아웃 */
			_this.addEventListener('blur', function() {
				/* 혼합형일 경우 포커스 아웃 */
				if (this.closest('.input-button')) this.closest('.input-button').classList.remove('is-text-focus');
			});
		});
	},
	/* 삭제 버튼 엘리먼트 생성 */
	create : () => {
		const inputData = document.querySelectorAll('.input-data');
		inputData.forEach(function(_this) {
			/* 인풋이 비활성화가 아닐 경우 */
			if (!_this.readOnly && !_this.disabled) {
				/* 삭제 버튼 엘리먼트 생성 */
				const thisGroup = _this.closest('.input');
				const addButton = document.createElement('button');
				addButton.setAttribute('type', 'button');
				addButton.setAttribute('class', 'btn-clear');
				addButton.setAttribute('aria-hidden', true);
				addButton.setAttribute('tabindex', -1);
				thisGroup.append(addButton);

				/* 삭제 버튼 텍스트 엘리먼트 생성 */
				const btnClear = thisGroup.querySelector('.btn-clear');
				const addBtnText = document.createElement('span');
				addBtnText.setAttribute('class', 'sr-only')
				btnClear.append(addBtnText);
				btnClear.querySelector('.sr-only').innerHTML = '입력 내용 삭제';
			}
		});
		commUiFnInput.clearContent();
	},
	/* 삭제 버튼 클릭 시 */
	clearContent : () => {
		const inpBtnClear = document.querySelectorAll('.input .btn-clear');
		inpBtnClear.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const thisParentChild = this.closest('.input').querySelector('.input-data');

				commUiFnFocus.blur(this); /* 삭제 아이콘 포커스 해제 */

				/* 검색 옵션 체크 */
				const optSearch = commUiFnSearch.check(this);
				if (optSearch) commUiFnSearch.closeAll();

				/* 캘린더 옵션 체크 */
				/* const optCalendar = commUiFnCalendar.check(this);
				if (optCalendar) commUiFnCalendar.close(); */

				/* 인풋 내용 지우기 */
				thisParentChild.value = '';
				thisParentChild.focus();

				commUiVar.activeTF.inputBtnClear = false; /* 히든요소 활성화 체크 */
				thisParentChild.classList.remove(commUiVar.activeClass);
			});
		});
	},
	/* 삭제 버튼 일괄 숨김 */
	hideClearButton : () => {
		const inputData = document.querySelectorAll('.input-data');
		inputData.forEach(function(_this) {
			commUiVar.activeTF.inputBtnClear = false; /* 히든요소 활성화 체크 */
			_this.classList.remove(commUiVar.activeClass);
			
			const thisParent = _this.closest('.input');
			const inpBtnClear = thisParent.querySelector('.btn-clear');
			if (inpBtnClear) commUiFnFocus.blur(inpBtnClear);
		});
	}
};
commUiFnInput.init();

/* 텍스트 필드 - 검색형 */
const commUiFnSearch = {
	/* 검색형 유형 체크 */
	check : (_element) => {
		let checkTF = false;
		if (_element.closest('.input').classList.contains('option-search') && _element.closest('.input').querySelector('.words')) checkTF = true;
		return checkTF;
	},
	/* 검색어 목록 열기 */
	open : (_element) => {
		const thisParent = _element.closest('.input');
		thisParent.querySelector('.words').setAttribute('aria-hidden', false);
		if (_element.getBoundingClientRect().top > (window.innerHeight / 2)) {
			thisParent.querySelector('.words').classList.add('show-up');
		} else {
			thisParent.querySelector('.words').classList.add('show-down');
		}

		/* 검색어 목록 항목 선택 이벤트 연결 */
		const inpOptSearch = thisParent.querySelectorAll('.words .word-item > a');
		inpOptSearch.forEach(function(_item) {
			_item.addEventListener('click', commUiFnSearch.select);
		});

		/* 키 이벤트 연결 */
		commUiFnSearch.keyEvent(_element);

		/* 히든요소 활성화 체크 */
		commUiVar.activeTF.inputSearch = true;
	},
	/* 검색어 목록 항목 선택 */
	select : (_event) => {
		const element = _event.target;
		element.closest('.input.option-search').querySelector('.input-data').focus();
		element.closest('.input.option-search').querySelector('.input-data').value = element.text;
		commUiFnSearch.closeAll();
	},
	/* 검색어 목록 일괄 닫기 */
	closeAll : () => {
		const inpOptSearch = document.querySelectorAll('.input.option-search .words');
		inpOptSearch.forEach(function(_this) {
			_this.setAttribute('aria-hidden', true);
			_this.classList.remove('show-up', 'show-down');
		});

		/* 히든요소 활성화 체크 */
		commUiVar.activeTF.inputSearch = false;
	},
	/* 웹접근성 대응 : 키 이벤트 연결 */
	keyEvent : (_element) => {
		_element.addEventListener('keydown', commUiFnSearch.keyInputDataFn);
		
		const inpOptSearch = _element.closest('.input').querySelectorAll('.words .word-item');
		inpOptSearch.forEach(function(_element, _index) {
			_element.addEventListener('keydown', commUiFnSearch.keyOptionsFn);
		});
	},
	/* 웹접근성 대응 : 텍스트 필드 키 입력 시 */
	keyInputDataFn : (_event) => {
		const element = _event.target;
		const keyCode = _event.keyCode;
		const inpOptSearch = element.closest('.input').querySelectorAll('.words .word-item');
		/* 위 아래 방향키 입력 시 검색어 목록의 첫번째 항목으로 포커스 */
		if (keyCode === 40 || keyCode === 38) {
			_event.preventDefault();
			if (!element.closest('.input').querySelector('.words').classList.contains('show-down') && !element.closest('.input').querySelector('.words').classList.contains('show-up')) {
				return false;
			}
			inpOptSearch[0].querySelector('a').focus();
		}
		/* ESC키 입력 시 닫기 */
		if (keyCode === 27) {
			commUiFnSearch.closeAll();
		}
	},
	/* 웹접근성 대응 : 검색어 목록에서 키 입력 시 */
	// keyOptionsFn : (_event) => {
	// 	const element = _event.target;
	// 	const keyCode = _event.keyCode;
	// 	const inpOptSearch = element.closest('.input').querySelectorAll('.words .word-item');
	// 	const selectIdx = [..._event.target.closest('.input').querySelectorAll('.words .word-item')].indexOf(_event.target.parentElement);

	// 	/* 엔터키 OR 스페이스바 입력 시 클릭 이벤트 연결 */
	// 	if (keyCode === 13 || keyCode === 32) {
	// 		_event.preventDefault();
	// 		element.click();
	// 	}
	// 	/* 아래 방향키 입력 시 탭 포커스 이동 */
	// 	if (keyCode === 40) {
	// 		_event.preventDefault();
	// 		if (selectIdx === inpOptSearch.length - 1) {
	// 			inpOptSearch[0].querySelector('a').focus();
	// 		} else {
	// 			inpOptSearch[selectIdx + 1].querySelector('a').focus();
	// 		}
	// 	}
	// 	/* 위 방향키 입력 시 탭 포커스 이동 */
	// 	if (keyCode === 38) {
	// 		_event.preventDefault();
	// 		if (selectIdx === 0) {
	// 			inpOptSearch[inpOptSearch.length - 1].querySelector('a').focus();
	// 		} else {
	// 			inpOptSearch[selectIdx - 1].querySelector('a').focus();
	// 		}
	// 	}
	// 	/* ESC키 입력 시 닫기 */
	// 	if (keyCode === 27) {
	// 		commUiFnSearch.closeAll();
	// 	}
	// }
};

/* 텍스트 필드 - 이메일형 */
const commUiFnEmail = {
	/* 이메일형 유형 체크 */
	check : (_element) => {
		let checkTF = false;
		if (_element.closest('.input').classList.contains('option-email')) checkTF = true;
		return checkTF;
	},
	/* 이벤트 */
	events : (_element) => {
		const regExpSymbol = new RegExp('[`~!#$%^&*()+=|<>?/:;{},]');
		const regExpKor = new RegExp('[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]');
		const regExpAt = new RegExp('@');

		const _this = _element;
		const thisParent = _this.closest('.input');
		const inpOptSearch = thisParent.querySelectorAll('.words .word-item');

		_this.value = (_this.value).split(' ').join('');
		const thisValue = _this.value;

		/* 특수문자와 한글 입력 시 리턴 */
		if (regExpSymbol.test(_this.value) || regExpKor.test(_this.value)) {
			_this.value = _this.value.substring(0, _this.value.length - 1);
			return;
		}

		/* @입력 후 */
		if (regExpAt.test(_this.value)) {
			/* @중복 입력 시 리턴 */
			if (_this.value.split('@').length - 1 > 1) {
				_this.value = _this.value.substring(0, _this.value.length - 1);
				return;
			}

			/* 2글자 이하 시 리턴 */
			if (_this.value.length < 3) {
				_this.value = _this.value.substring(0, _this.value.length - 1);
				return;
			}

			/* 입력 값 + 목록 값 비교 */
			const insertWord = _this.value.substring(_this.value.indexOf('@') + 1, _this.value.length);
			let listCount = inpOptSearch.length;

			inpOptSearch.forEach(function(_item) {
				const itemLink = _item.querySelector('a');
				const listWord = itemLink.innerHTML.substring(itemLink.innerHTML.indexOf('@') + 1, itemLink.innerHTML.length);

				if (listWord.indexOf(insertWord) === -1) {
					listCount--;
					_item.classList.add('is-hide');
				} else {
					_item.classList.remove('is-hide');
				}
			});

			/* 검색 결과가 목록에 없을 경우 */
			if (listCount === 0) {
				commUiFnSearch.closeAll();
			}

		/* @입력 전 */
		} else {
			/* 입력 값 목록에 출력 */
			inpOptSearch.forEach(function(_item) {
				const itemLink = _item.querySelector('a');
				let itemHtml = itemLink.innerHTML.substring(itemLink.innerHTML.indexOf('@'), itemLink.innerHTML.length);
				itemLink.innerHTML = '<em>' + thisValue + '</em>' + itemHtml;
			});
		}
	}
};

/* 텍스트 필드 데이터 마스킹 */
const commUiDataMask = {
	/* 비밀번호 숨기기 보기 */
	passwordToggle : () => {
		const passwordBtn = document.querySelectorAll('.input.option-password .btn-password');
		passwordBtn.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const thisParent = this.closest('.input');
				const thisData = thisParent.querySelector('.input-data');

				if (thisData.type === 'text') {
					thisData.type = 'password';
				} else {
					thisData.type = 'text';
				}
			});
		});
	}
};
commUiDataMask.passwordToggle();

/* 텍스트 필드 - 날짜형 */
const commUiFnCalendar = {
	/* 전역변수 */
	comm : {
		openId : '', /* 팝업 오픈한 버튼 저장, 닫기 시 포커스 이동에 필요 */
		popupId : '#calendarPopup', /* 팝업 최상위 아이디 */
		titleId : '#calendarTitle' /* 팝업 타이틀 아이디 */
	},
	/* 초기실행 */
	init : () => {
		/* 캘린더 팝업이 있을 경우 이벤트 바인딩 */
		const popup = document.querySelector(commUiFnCalendar.comm.popupId);
		if (popup) {
			commUiFnFocus.onBlur(popup);
			commUiFnCalendar.button();
			commUiFnCalendar.select();
			// commUiFnCalendar.selectMonth();
			commUiFnCalendar.closeSet();
			commUiFnCalendar.keyEvent();
		}
	},
	/* 캘린더 오픈 */
	open : (_element) => {
		/* 오픈 */
		const popup = document.querySelector(commUiFnCalendar.comm.popupId);
		commUiVar.popupZIndex++;
		popup.style.zIndex = commUiVar.popupZIndex;
		popup.classList.add(commUiVar.openClass);

		/* 웹접근성 대응 */
		_element.setAttribute('aria-expanded', true);
		popup.setAttribute('aria-hidden', false);

		/* 포커스 연결 */
		commUiFnFocus.onFocus(popup);
		const selectData = popup.querySelectorAll('.select-data');
		selectData.forEach(function(_this) {
			_this.setAttribute('tabindex', -1);
		});

		/* 오픈한 버튼 요소 저장 */
		commUiFnCalendar.comm.openId = _element;

		/* 히든요소 활성화 체크 */
		commUiVar.activeTF.inputCalendar = true;

		/* 타이틀 부여 */
		const labelTextA = _element.getAttribute('aria-label') || _element.getAttribute('title');
		const labelId = _element.getAttribute('aria-labelledby');
		const labelElement = document.querySelector(`#${labelId}`);
		const labelTextB = labelElement ? labelElement.innerHTML : null;
		const thisLabel = labelTextA || labelTextB || 'NoTitle';
		popup.querySelector(`${commUiFnCalendar.comm.titleId} > span`).innerHTML = thisLabel;

		/* 오픈 시 포커스 */
		popup.querySelector('.day-group .is-active').focus();
	},
	/* 캘린더 아이콘 클릭 시 */
	button : () => {
		const calendarBtn = document.querySelectorAll('.input.option-date .btn-calendar');
		calendarBtn.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const thisParent = this.closest('.input');
				/* 인풋 비활성화 제외 */
				if (!thisParent.querySelector('.input-data').disabled) {
					commUiFnCalendar.open(this);
				}
			});
		});
	},
	/* 닫기 아이콘 클릭 시 */
	closeSet : () => {
		const popup = document.querySelector(commUiFnCalendar.comm.popupId);
		const closeButton = popup.querySelector('.btn-popup-close');
		closeButton.addEventListener('click', commUiFnCalendar.close);
	},
	/* 캘린더의 날짜 선택 */
	select : () => {
		const popup = document.querySelector(commUiFnCalendar.comm.popupId);
		const inpOptCalendar = popup.querySelectorAll('.calendar .day-group .day');
		inpOptCalendar.forEach(function(_this) {
			_this.addEventListener('click', function() {
				/* 선택한 날짜 활성화 */
				this.closest('.day-group').querySelectorAll('.day').forEach(function(_item) {
					_item.classList.remove(commUiVar.activeClass);
				});
				this.classList.add(commUiVar.activeClass);

				/* 인풋에 선택한 날짜 전달 */
				let pickYear, pickMonth, pickDay;
				const head = popup.querySelector('.calendar-group .calendar-head');
				pickYear = head.querySelector('.fn-year').value;
				pickMonth = head.querySelector('.fn-month').value;

				if (this.classList.contains('prev')) {
					if (pickMonth === 1) {
						pickYear--;
						pickMonth = 12;
					} else {
						pickMonth--;
					}
				}
				if (this.classList.contains('next')) {
					if (pickMonth === 12) {
						pickYear++;
						pickMonth = 1;
					} else {
						pickMonth++;
					}
				}
				pickMonth = (pickMonth + '').padStart(2, '0');
				pickDay = (this.innerHTML).padStart(2, '0');

				const openCalendar = commUiFnCalendar.comm.openId.closest('.input.option-date');
				openCalendar.querySelector('.input-data').value = `${pickYear}.${pickMonth}.${pickDay}`;
				commUiFnCalendar.close();
			});
		});
	},
	/* 캘린더의 날짜 선택(달 선택) */
	// selectMonth : () => {
	// 	const popup = document.querySelector(commUiFnCalendar.comm.popupId);
	// 	const inpOptCalendar = popup.querySelectorAll('.calendar .month-group .month');
	// 	inpOptCalendar.forEach(function(_this) {
	// 		_this.addEventListener('click', function() {
	// 			/* 선택한 날짜 활성화 */
	// 			this.closest('.day-group').querySelectorAll('.day').forEach(function(_item) {
	// 				_item.classList.remove(commUiVar.activeClass);
	// 			});
	// 			this.classList.add(commUiVar.activeClass);

	// 			/* 인풋에 선택한 날짜 전달 */
	// 			let pickYear, pickMonth, pickDay;
	// 			const head = popup.querySelector('.calendar-group .calendar-head');
	// 			pickYear = head.querySelector('.fn-year').value;
	// 			pickMonth = head.querySelector('.fn-month').value;

	// 			if (this.classList.contains('prev')) {
	// 				pickYear--;
	// 			}
	// 			if (this.classList.contains('next')) {
	// 				pickYear++;
	// 			}
	// 			pickMonth = (pickMonth + '').padStart(2, '0');
	// 			pickDay = (this.innerHTML).padStart(2, '0');

	// 			const openCalendar = commUiFnCalendar.comm.openId.closest('.input.option-date');
	// 			openCalendar.querySelector('.input-data').value = `${pickYear}.${pickMonth}`;
	// 			commUiFnCalendar.close();
	// 		});
	// 	});
	// },
	/* 캘린더 닫기 */
	close : () => {
		commUiVar.popupZIndex--;

		const popup = document.querySelector(commUiFnCalendar.comm.popupId);
		popup.setAttribute('aria-hidden', true);
		popup.classList.remove(commUiVar.openClass);
		
		/* 포커스 해제 */
		commUiFnFocus.onBlur(popup);

		/* 히든요소 활성화 체크 */
		commUiVar.activeTF.inputCalendar = false;

		/* 오픈한 버튼 요소로 포커스 이동 */
		commUiFnCalendar.comm.openId.focus();
		commUiFnCalendar.comm.openId = '';
	},
	/* 웹접근성 대응 : 키 이벤트 연결 */
	keyEvent : () => {
		const popup = document.querySelector(commUiFnCalendar.comm.popupId);

		/* ESC키 입력 시 닫기 */
		popup.addEventListener('keydown', function(_event) {
			if (_event.keyCode === 27) commUiFnCalendar.close();
		});

		/* 팝업 내부에 포커스 가두기 */
		const focusElement = popup.querySelectorAll(commUiVar.focusElements);
		const firstFocus = focusElement[0];
		const lastFocus = focusElement[focusElement.length - 1];

		/* 첫번째 요소에서 탭+쉬프트키 */
		firstFocus.addEventListener('keydown', function(_event) {
			if (_event.keyCode === 9 && _event.shiftKey && _event.target === firstFocus) {
				_event.preventDefault();
				lastFocus.focus();
			}
		});
		/* 마지막 요소에서 탭키 */
		lastFocus.addEventListener('keydown', function(_event) {
			if (_event.keyCode === 9 && !_event.shiftKey && _event.target === lastFocus) {
				_event.preventDefault();
				firstFocus.focus();
			}
		});
	}
};
commUiFnCalendar.init();

/* 셀렉트박스 팝업형 - 단일 오픈 처리 */
// const commUiFnSelectPopup = {
// 	/* 전역변수 */
// 	comm : {
// 		openId : '', /* 팝업 오픈한 버튼 저장, 닫기 시 포커스 이동에 필요 */
// 		popupId : '#selectPopup', /* 팝업 최상위 아이디 */
// 		titleId : '#selectTitle' /* 팝업 타이틀 아이디 */
// 	},
// 	/* 초기실행 */
// 	init : () => {
// 		commUiFnSelectPopup.create();
// 	},
// 	/* 엘리먼트 생성 */
// 	create : () => {
// 		const selectData = document.querySelectorAll('.select > .select-data');
// 		if (selectData.length) {
// 			/* 팝업 레이아웃 생성 */
// 			commUiFnSelectPopup.createPopup();

// 			/* 셀렉트박스 버튼 생성 */
// 			commUiFnSelectPopup.createButton(selectData);
// 		}
// 	},
// 	/* 팝업 레이아웃 생성 */
// 	createPopup : () => {
// 		const addPopup = document.querySelector('#popup').insertAdjacentHTML('beforeend', `
// 			<!-- .select-popup -->
// 			<div class="select-popup" id="selectPopup" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="selectTitle">
// 				<!-- .select-content -->
// 				<div class="select-content">
// 					<!-- .select-title -->
// 					<h2 class="select-title" id="selectTitle"><span></span></h2>
// 					<!--// .select-title -->
// 					<!-- .options -->
// 					<ul class="options" id="" role="listbox" aria-labelledby="selectTitle">
// 					</ul>
// 					<!--// .options -->
// 					<!-- .btn-popup-close -->
// 					<button type="button" class="btn-popup-close">
// 						<span class="icon"></span>
// 						<span class="sr-only">팝업 닫기</span>
// 					</button>
// 					<!--// .btn-popup-close -->
// 				</div>
// 				<!--// .select-content -->
// 			</div>
// 			<!--// .select-popup -->
// 		`);

// 		/* 포커스 해제 */
// 		const popup = document.querySelector(commUiFnSelectPopup.comm.popupId);
// 		commUiFnFocus.onBlur(popup);

// 		/* 닫기 버튼 클릭 이벤트 */
// 		const closeButton = popup.querySelector('.btn-popup-close');
// 		closeButton.addEventListener('click', commUiFnSelectPopup.close);
// 	},
// 	/* 셀렉트박스 버튼 생성 */
// 	createButton : (_elements) => { /* _element = 모든 셀렉트박스 데이터(.select > .select-data) */
// 		_elements.forEach(function(_this) {
// 			/* 셀렉트박스 속성 가져오기 */
// 			const thisSelect = _this.closest('.select');
// 			const thisOption = _this.querySelectorAll('option');

// 			/* 셀렉트박스 속성 가져오기 */
// 			const thisId = _this.getAttribute('id');
// 			const labelTextA = _this.getAttribute('aria-label') || _this.getAttribute('title');
// 			const labelId = _this.getAttribute('aria-labelledby');
// 			const labelElement = document.querySelector(`#${labelId}`);
// 			const labelTextB = labelElement ? labelElement.innerHTML : null;
// 			const thisLabel = labelTextA || labelTextB || 'NoTitle';

// 			/* 버튼 속성 세팅 및 생성 */
// 			const addButton = document.createElement('button');
// 			addButton.setAttribute('type', 'button');

// 			if (_this.classList.contains('is-readonly')) {
// 				addButton.setAttribute('class', 'select-button is-readonly');
// 				addButton.setAttribute('tabindex', -1);
// 			} else {
// 				addButton.setAttribute('class', 'select-button');
// 			}
// 			if (_this.disabled) {
// 				addButton.setAttribute('disabled', '');
// 			}

// 			/* 웹접근성 대응 : 속성 추가 */
// 			addButton.setAttribute('role', 'combobox');
// 			addButton.setAttribute('aria-controls', `${thisId}Option`);
// 			if (labelTextA) {
// 				addButton.setAttribute('aria-label', labelTextA);
// 			} else if (labelTextB) {
// 				addButton.setAttribute('aria-labelledby', labelId);
// 			} else {
// 				addButton.setAttribute('aria-label', '');
// 			}
// 			addButton.setAttribute('aria-expanded', 'false');
// 			addButton.setAttribute('aria-haspopup', 'listbox');

// 			/* 생성 */
// 			thisSelect.append(addButton);

// 			/* 버튼명 세팅 및 생성 */
// 			let selectTitle = '';
// 			const addSelectText = document.createElement('span');
// 			if (thisOption.length) {
// 				/* 옵션이 있는 경우 */
// 				thisOption.forEach(function(_option, _index) {
// 					if (_option.selected === true) {
// 						selectTitle = _option.innerHTML;
// 						if (_option.disabled === true) {
// 							addSelectText.setAttribute('class', 'is-placeholder');
// 						}
// 					}
// 				});
// 			} else {
// 				/* 옵션이 없는 경우 */
// 				selectTitle = thisLabel;
// 			}

// 			/* 버튼명 생성 */
// 			thisSelect.querySelector('.select-button').append(addSelectText);
// 			thisSelect.querySelector('.select-button > span').innerHTML = selectTitle;

// 			/* 버튼 클릭 이벤트 연결 */
// 			commUiFnSelectPopup.eventSelectButton(addButton);
// 		});
// 	},
// 	/* 셀렉트박스 버튼 클릭 이벤트 */
// 	eventSelectButton : (_element) => { /* _element = 모든 셀렉트박스 버튼(.select > .select-button) */
// 		if (!_element.classList.contains('is-readonly') && !_element.disabled) {
// 			_element.addEventListener('click', function() {
// 				commUiFnSelectPopup.open(this);
// 			});
// 		}
// 	},
// 	/* 옵션 추가 및 속성 부여 */
// 	createOption : (_element) => { /* _element = 클릭한 버튼(.select > .select-button) */
// 		const thisData = _element.closest('.select').querySelector('.select-data');
// 		const thisOption = thisData.querySelectorAll('option');

// 		const labelTextA = thisData.getAttribute('aria-label') || thisData.getAttribute('title');
// 		const labelId = thisData.getAttribute('aria-labelledby');
// 		const labelElement = document.querySelector(`#${labelId}`);
// 		const labelTextB = labelElement ? labelElement.innerHTML : null;
// 		const thisLabel = labelTextA || labelTextB || 'NoTitle';

// 		const popup = document.querySelector(commUiFnSelectPopup.comm.popupId);
		
// 		/* 타이틀 부여 */
// 		popup.querySelector(`${commUiFnSelectPopup.comm.titleId} > span`).innerHTML = thisLabel;
		
// 		/* 옵션 속성 부여 및 목록 초기화 */
// 		const options = popup.querySelector('.options');
// 		options.setAttribute('id', `${thisData.getAttribute('id')}Option`);
// 		options.innerHTML = '';

// 		if (thisOption.length) {
// 			/* 옵션 추가 */
// 			thisOption.forEach(function(_option, _index) {
// 				const addOptionList = document.createElement('li');
// 				let setClassName = `item`;
// 				let setAriaSelected = false;
// 				let setTabIndex = 0;

// 				if (_option.selected === true) {
// 					setClassName = `item ${commUiVar.activeClass}`;
// 					setAriaSelected = true;
// 				}
// 				if (_option.disabled === true) {
// 					setClassName = `item is-placeholder`;
// 					setTabIndex = -1;
// 					addOptionList.setAttribute('aria-hidden', 'true');
// 				}
// 				addOptionList.setAttribute('class', setClassName);
// 				addOptionList.setAttribute('role', 'option');
// 				addOptionList.setAttribute('aria-selected', setAriaSelected);
// 				addOptionList.setAttribute('tabindex', setTabIndex);
// 				options.append(addOptionList);
// 				options.children[_index].innerHTML = _option.innerHTML;
// 			});
// 		}
// 	},
// 	/* 옵션 열기 */
// 	open : (_element) => { /* _element = 클릭한 버튼(.select > .select-button) */
// 		/* 옵션 추가 및 속성 부여 실행 */
// 		commUiFnSelectPopup.createOption(_element);
		
// 		/* 오픈 */
// 		const popup = document.querySelector(commUiFnSelectPopup.comm.popupId);
// 		commUiVar.popupZIndex++;
// 		popup.style.zIndex = commUiVar.popupZIndex;
// 		popup.classList.add(commUiVar.openClass);

// 		/* 웹접근성 대응 */
// 		_element.setAttribute('aria-expanded', true);
// 		popup.setAttribute('aria-hidden', false);

// 		/* 포커스 연결 */
// 		commUiFnFocus.onFocus(popup);

// 		/* 오픈한 버튼 요소 저장 */
// 		commUiFnSelectPopup.comm.openId = _element;

// 		/* 히든요소 활성화 체크 */
// 		commUiVar.activeTF.select = true;

// 		/* 옵션 선택 이벤트 연결 및 오픈 시 활성화 OR 포커스 항목 인덱스 구하기 */
// 		const options = popup.querySelector('.options');
// 		const item = options.querySelectorAll('.item');
// 		let activeIndex = 0;
// 		item.forEach(function(_this, _index) {
// 			/* 옵션 선택 이벤트 연결 */
// 			_this.addEventListener('click', commUiFnSelectPopup.select);

// 			/* 포커스 항목 인덱스 */
// 			if (_this.classList.contains('is-placeholder')) {
// 				activeIndex = 1;
// 			}
// 			if (_this.classList.contains('is-active')) {
// 				activeIndex = _index;
// 			}
// 		});

// 		/* 오픈 시 포커스 */
// 		if (item.length) {
// 			item[activeIndex].focus();
// 		} else {
// 			popup.querySelector('.select-content').focus();
// 		}

// 		/* 키 이벤트 연결 */
// 		commUiFnSelectPopup.keyEvent();
// 	},
// 	/* 옵션 닫기 */
// 	close : () => {
// 		commUiVar.popupZIndex--;

// 		const popup = document.querySelector(commUiFnSelectPopup.comm.popupId);
// 		popup.setAttribute('aria-hidden', true);
// 		popup.classList.remove(commUiVar.openClass);
		
// 		/* 포커스 해제 */
// 		commUiFnFocus.onBlur(popup);

// 		/* 히든요소 활성화 체크 */
// 		commUiVar.activeTF.select = false;

// 		/* 오픈한 버튼 요소로 포커스 이동 */
// 		commUiFnSelectPopup.comm.openId.focus();
// 		commUiFnSelectPopup.comm.openId = '';
// 	},
// 	/* 옵션 선택 시 */
// 	select : (_event) => { /* _event = 셀렉트박스 팝업 > 옵션 항목 클릭 이벤트 */
// 		const element = _event.target;
// 		const openSelect = commUiFnSelectPopup.comm.openId.closest('.select');

// 		/* 셀렉트에 옵션값 전달 */
// 		const selectIdx = [...element.parentElement.children].indexOf(element);
// 		const selectData = openSelect.querySelector('.select-data');
// 		selectData.children[selectIdx].selected = true;

// 		/* 라벨 텍스트 변경 */
// 		const selectButton = openSelect.querySelector('.select-button');
// 		selectButton.setAttribute('aria-expanded', false);
// 		selectButton.querySelector('span').classList.remove('is-placeholder');
// 		selectButton.querySelector('span').innerHTML = element.innerHTML;

// 		/* 닫기 */
// 		commUiFnSelectPopup.close();
// 	},
// 	/* 웹접근성 대응 : 키 이벤트 연결 */
// 	keyEvent : () => {
// 		const popup = document.querySelector(commUiFnSelectPopup.comm.popupId);

// 		/* 팝업 내 키 입력 시 */
// 		popup.addEventListener('keydown', commUiFnSelectPopup.keyPopupFn);

// 		/* 옵션 목록에서 키 입력 시 */
// 		const item = popup.querySelectorAll('.options > .item');
// 		item.forEach(function(_element, _index) {
// 			_element.addEventListener('keydown', commUiFnSelectPopup.keyOptionsFn);
// 		});
// 	},
// 	/* 웹접근성 대응 : 팝업 내 키 입력 시 */
// 	keyPopupFn : (_event) => {
// 		const element = _event.target;
// 		const keyCode = _event.keyCode;
// 		const shiftKey = _event.shiftKey;
// 		const popup = document.querySelector(commUiFnSelectPopup.comm.popupId);
// 		const options = popup.querySelector('.options');
// 		const item = options.querySelectorAll('.item');

// 		/* 첫번째 옵션이 placeholder 속성일 경우 첫번째 옵션 Index값 변경 */
// 		let firstIndex = 0;
// 		item.forEach(function(_this) {
// 			if (_this.classList.contains('is-placeholder')) firstIndex = 1;
// 		});
// 		/* 방향키 입력 시 옵션으로 포커스 이동 */
// 		if (keyCode === 40 && !element.classList.contains('item')) {
// 			_event.preventDefault();
// 			item[firstIndex].focus();
// 		}
// 		if (keyCode === 38 && !element.classList.contains('item')) {
// 			_event.preventDefault();
// 			item[item.length - 1].focus();
// 		}

// 		/* ESC키 입력 시 닫기 */
// 		if (keyCode === 27) commUiFnSelectPopup.close();

// 		/* 탭키 입력 시 포커스 이동 삭제 */
// 		if (((keyCode === 9 && !shiftKey) || (keyCode === 9 && shiftKey)) && element.classList.contains('btn-popup-close')) _event.preventDefault();
// 	},
// 	/* 웹접근성 대응 : 옵션 목록에서 키 입력 시 */
// 	keyOptionsFn : (_event) => {
// 		const element = _event.target;
// 		const keyCode = _event.keyCode;
// 		const popup = document.querySelector(commUiFnSelectPopup.comm.popupId);
// 		const options = popup.querySelector('.options');
// 		const item = options.querySelectorAll('.item');

// 		/* 첫번째 옵션이 placeholder 속성일 경우 첫번째 옵션 Index값 변경 */
// 		let firstIndex = 0;
// 		item.forEach(function(_this) {
// 			if (_this.classList.contains('is-placeholder')) firstIndex = 1;
// 		});

// 		/* 포커스된 옵션 Index값 */
// 		const selectIdx = [...item].indexOf(_event.target);

// 		/* 엔터키 OR 스페이스바 입력 시 클릭 이벤트 연결 */
// 		if (keyCode === 13 || keyCode === 32) {
// 			_event.preventDefault();
// 			element.click();
// 		}

// 		/* 방향키 입력 시 탭 포커스 이동 */
// 		if (keyCode === 40) { /* 아래 */
// 			_event.preventDefault();
// 			if (selectIdx === item.length - 1) {
// 				item[firstIndex].focus();
// 			} else {
// 				item[selectIdx + 1].focus();
// 			}
// 		}
// 		if (keyCode === 38) { /* 위 */
// 			_event.preventDefault();
// 			if (selectIdx === firstIndex) {
// 				item[item.length - 1].focus();
// 			} else {
// 				item[selectIdx - 1].focus();
// 			}
// 		}

// 		/* 탭키 입력 시 닫기 버튼으로 포커스 이동 */
// 		if ((keyCode === 9 && _event.shiftKey) || (keyCode === 9 && !_event.shiftKey)) {
// 			_event.preventDefault();
// 			popup.querySelector('.btn-popup-close').focus();
// 		}
// 	}
// };
// //commUiFnSelectPopup.init();

// /* 셀렉트박스 버튼형 */
// const commUiFnSelectBtn = {
// 	/* 전역변수 */
// 	comm : {
// 		openId : ''
// 	},
// 	/* 초기실행 */
// 	init : () => {
// 		/* 선택 완료 시 이벤트 바인딩 */
// 		const selectConfirm = document.querySelectorAll('.fn-select-confirm');
// 		selectConfirm.forEach(function(_this) {
// 			_this.addEventListener('click', commUiFnSelectBtn.confirm);
// 		});

// 		/* 목록 오픈 시 이벤트 바인딩 */
// 		const selectBtn = document.querySelectorAll('.fn-select-btn');
// 		selectBtn.forEach(function(_this) {
// 			_this.addEventListener('click', commUiFnSelectBtn.open);
// 		});

// 		/* 목록 아이템 선택 시 이벤트 바인딩 */
// 		const selectWrap = document.querySelectorAll('.fn-select-wrap');
// 		selectWrap.forEach(function(_this) {
// 			const selectItem = _this.querySelectorAll('.fn-select-item');
// 			selectItem.forEach(function(_this) {
// 				_this.querySelector('.fn-select-input').addEventListener('input', commUiFnSelectBtn.select);
// 			});
// 		});
// 	},
// 	/* 선택 값 체크 */
// 	check : (_element) => {
// 		const thisParent = _element.closest('.fn-select-wrap');
// 		const thisItem = thisParent.querySelectorAll('.fn-select-item');
// 		let getValue = '';
// 		let getText = '';

// 		thisItem.forEach(function(_this) {
// 			const thisInput = _this.querySelector('.fn-select-input');
// 			const thisTitle = _this.querySelector('.fn-select-title')

// 			if (thisInput.checked === true) {
// 				getValue = thisInput.dataset.selectValue;
// 				getText = thisTitle.innerHTML;
// 			}
// 		});

// 		/* 선택 값 리턴 */
// 		if (getValue) return [getValue, getText];
// 	},
// 	/* 목록 아이템 선택 */
// 	select : (_event) => {
// 		const element = _event.target;
// 		const getValue = commUiFnSelectBtn.check(element)[0];

// 		if (getValue) {
// 			element.closest('.fn-select-wrap').querySelector('.fn-select-confirm').disabled = false;
// 		}
// 	},
// 	/* 목록 오픈 */
// 	open : (_event) => {
// 		let element = _event.target;
// 		if (element.classList.contains('fn-select-value')) {
// 			element = element.parentElement;
// 		}
// 		commUiFnSelectBtn.comm.openId = element;
// 	},
// 	/* 선택 완료 */
// 	confirm : (_event) => {
// 		const element = _event.target;
// 		const selectBtn = commUiFnSelectBtn.comm.openId.querySelector('.fn-select-value');
// 		const getValue = commUiFnSelectBtn.check(element)[0];
// 		const getText = commUiFnSelectBtn.check(element)[1];

// 		selectBtn.classList.remove('is-placeholder');
// 		selectBtn.innerHTML = getText;
// 		selectBtn.dataset.selectValue = getValue;
// 		commUiFnSelectBtn.comm.openId = '';
// 	}
// };
// commUiFnSelectBtn.init();



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



/* 텍스트에어리어 */
const commUiFnTextarea = {
	/* 초기실행 */
	init : () => {
		commUiFnTextarea.setStrLength();
	},
	/* 글자수 반영 */
	setStrLength : () => {
		const countWarp = document.querySelectorAll('.textarea-count');
		countWarp.forEach(function(_this) {
			const maxByte = _this.querySelector('.count-max').innerHTML;
			const countStr = _this.querySelector('.count-char');
			const textareaData = _this.closest('.textarea').querySelector('.textarea-data');
			let textareaValue = textareaData.value;
			let nowByte = 0;

			/* 로딩 시 반영 */
			nowByte = commUiFnTextarea.getByte(textareaValue);
			countStr.innerHTML = nowByte;

			if (textareaData.readOnly || textareaData.disabled) {
				return false;
			}

			/* 인풋 내용 체크 이벤트 */
			textareaData.addEventListener('input', function() {
				textareaValue = textareaData.value;
				nowByte = commUiFnTextarea.getByte(textareaValue);

				/* 입력 글자수 초과할 경우 */
				if (nowByte > maxByte) {
					textareaData.value = commUiFnTextarea.checkStrLimited(textareaValue, maxByte);
					nowByte = maxByte;
					alert(`한글 ${maxByte/2}자, 영문 ${maxByte}자 이하로 작성해 주세요.`);
				}

				countStr.innerHTML = nowByte;
			});
		});
	},
	/* 입력 글자수 체크, 최대값 넘으면 잘라서 반환 */
	checkStrLimited : (_textareaValue, _maxByte) => {
		const textareaValue = _textareaValue.split('');
		let getValue = '';
		let nowByte = 0;

		for (let i = 0; i < textareaValue.length; i += 1) {
			const char = textareaValue[i];
			const decimal = char.charCodeAt(0);
			const byte = commUiFnTextarea.getCharByte(decimal);

			if (nowByte + byte <= _maxByte) { 
				nowByte += byte;
				getValue += char;
			} else {
				break;
			}
		}
		return getValue;
	},
	/* 입력 전체 글자수 Byte 반환 */
	getByte : (_str) => {
		return _str.split('').map((s) => s.charCodeAt(0)).reduce((prev, unicodeDecimalValue) => prev + commUiFnTextarea.getCharByte(unicodeDecimalValue), 0);
	},
	/* 입력 한글자 Byte 반환 */
	getCharByte : (_decimal) => {
		return (_decimal >> 7) || (10 === _decimal) ? 2 : 1;
	}
};
commUiFnTextarea.init();

/* 파일첨부 */
const commUiFnAttachFile = {
	/* 초기실행, 이벤트 연결 */
	init : () => {
		const fileItem = document.querySelectorAll('.file');
		fileItem.forEach(function(_this) {
			_this.querySelector('.file-data').addEventListener('change', commUiFnAttachFile.attach);

			_this.querySelector('.file-label').addEventListener('keydown', commUiFnAttachFile.keyEvent);

			_this.querySelector('.file-name > .btn-delete').addEventListener('click', commUiFnAttachFile.delete);
		});
	},
	/* 웹접근성 대응 : 키 이벤트 연결 */
	keyEvent : (_event) => {
		const element = _event.target;
		const keyCode = _event.keyCode;

		if (keyCode === 13 || keyCode === 32) {
			_event.preventDefault();
			element.querySelector('.file-data').click();
		}
	},
	/* 첨부 */
	attach : (_event) => {
		const element = _event.target;
		const thisValue = element.value;

		if (thisValue) {
			const thisFile = element.closest('.file');
			thisFile.querySelector('.file-name > .txt').innerHTML = thisValue.substr(thisValue.lastIndexOf('\\') + 1, thisValue.length);
			thisFile.classList.add('has-value');

			/* 웹접근성 대응 */
			commUiFnAttachFile.setWA(thisFile, false);
		}
	},
	/* 삭제 */
	delete : (_event) => {
		const element = _event.target;
		const thisFile = element.closest('.file');

		thisFile.querySelector('.file-data').value = '';
		thisFile.querySelector('.file-name > .txt').innerHTML = '';
		thisFile.classList.remove('has-value');

		/* 웹접근성 대응 */
		commUiFnAttachFile.setWA(thisFile, true);
	},
	/* 웹접근성 대응 */
	setWA : (_element, _attached) =>  {
		const element = _element;
		let waNameHidden = false;
		let waNameTabIndex = 0;
		let waLabelHidden = true;
		let waLabelTabIndex = -1;

		if (_attached) {
			waNameHidden = true;
			waNameTabIndex = -1;
			waLabelHidden = false;
			waLabelTabIndex = 0;
		}

		element.querySelector('.file-name').setAttribute('aria-hidden', waNameHidden);
		element.querySelector('.file-name > .btn-delete').setAttribute('tabindex', waNameTabIndex);

		element.querySelector('.file-label').setAttribute('aria-hidden', waLabelHidden);
		element.querySelector('.file-label').setAttribute('tabindex', waLabelTabIndex);
	}
};
commUiFnAttachFile.init();

/* 범위 */
const commUiFnRange = {
	init : () => {
		const inputRange = document.querySelectorAll('.input.option-range');
		inputRange.forEach(function(_this) {
			const inputRange = _this.querySelector('.input-range');
			commUiFnRange.set(inputRange);
			inputRange.addEventListener('input', commUiFnRange.change);
		});
	},
	set : (_element) => {
		const thisParent = _element.closest('.input.option-range');
		const thisValue = _element.value - 1;

		thisParent.querySelector('.range-bar > em').style.width = `${thisValue * 25}%`;
	},
	change : (_event) => {
		const element = _event.target;
		commUiFnRange.set(element);
	}
};
commUiFnRange.init();

/* 팝업 - 다중 오픈 처리 */
const commUiFnPopup = {
	/* 전역변수 */
	comm : {
		openId : [], /* 팝업 오픈한 버튼 저장, 닫기 시 포커스 이동에 필요 */
		openOrder : 0 /* 오픈 시 카운팅, 다중 오픈 처리에 필요 */
	},
	/* 초기실행 */
	init : () => {
		// commUiFnPopup.focusSet();
		commUiFnPopup.openSet();
		commUiFnPopup.closeSet();
		commUiFnPopup.drag();
	},
	/* 웹접근성 포커스 세팅 */
	focusSet : () => {
		const subWrap = document.querySelectorAll('.popup-wrap');
		subWrap.forEach(function(_this) {
			commUiFnFocus.onBlur(_this);
		});
	},
	/* 웹접근성 대응 : 키 이벤트 연결 */
	keyEvent : (_element) => {
		const focusElement = _element.querySelectorAll(commUiVar.focusElements);
		const firstFocus = focusElement[0];
		const lastFocus = focusElement[focusElement.length - 1];

		/* 첫번째 요소에서 탭+쉬프트키 */
		firstFocus.addEventListener('keydown', commUiFnPopup.keyFocusFirst);
		/* 마지막 요소에서 탭키 */
		lastFocus.addEventListener('keydown', commUiFnPopup.keyFocusLast);
	},
	/* 첫번째 요소에서 탭+쉬프트키 */
	keyFocusFirst : (_event) => {
		const element = _event.target.closest('.popup-wrap');
		const focusElement = element.querySelectorAll(commUiVar.focusElements);
		const firstFocus = focusElement[0];
		const lastFocus = focusElement[focusElement.length - 1];

		if (_event.keyCode === 9 && _event.shiftKey && _event.target === firstFocus) {
			_event.preventDefault();
			// lastFocus.focus();
		}
	},
	/* 마지막 요소에서 탭키 */
	keyFocusLast : (_event) => {
		const element = _event.target.closest('.popup-wrap');
		const focusElement = element.querySelectorAll(commUiVar.focusElements);
		const firstFocus = focusElement[0];
		const lastFocus = focusElement[focusElement.length - 1];

		if (_event.keyCode === 9 && !_event.shiftKey && _event.target === lastFocus) {
			_event.preventDefault();
			// firstFocus.focus();
		}
	},
	/* 열기 - 실행 */
	open : (_target) => {
		const thisPopupWrap = document.querySelector(_target);
		if (!thisPopupWrap) return;

		commUiVar.popupZIndex++;
		commUiFnPopup.comm.openOrder++;

		thisPopupWrap.style.zIndex = commUiVar.popupZIndex;
		thisPopupWrap.classList.add(commUiVar.openClass);

		commUiVar.activeTF.popup = commUiFnPopup.comm.openOrder; /* 히든요소 활성화 체크 */

		/* 포커싱 처리 */
		thisPopupWrap.setAttribute('aria-hidden', false);
		// document.querySelector(_target + ' .popup-inner').focus();

		/* 히든 영역 포커스 연결 */
		commUiFnFocus.onFocus(thisPopupWrap);

		/* 자동완성 포커스 해제 */
		const wordItem = thisPopupWrap.querySelectorAll('.option-search > .words > .word-item > a');
		wordItem.forEach(function(_this) {
			_this.setAttribute('tabindex', -1);
		});

		/* .option-guide 유형 최대 높이값 세팅 */
		if (thisPopupWrap.classList.contains('option-guide')) {
			const thisPopupCont = thisPopupWrap.querySelector('.popup-content');
			thisPopupCont.style.maxHeight = `${thisPopupCont.scrollHeight}px`;
		}

		commUiFnPopup.keyEvent(thisPopupWrap);
	},
	/* 열기 - 타겟 이벤트 추가 */
	openSet : () => {
		const btnPopupOpen = document.querySelectorAll('.fn-popup-open');
		btnPopupOpen.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const popupId = _this.dataset.popupId;
				commUiFnPopup.open(popupId);

				/* 오픈한 버튼 저장(닫기 시 포커스 이동 처리), 다중 팝업 고려하여 배열에 추가 */
				commUiFnPopup.comm.openId.push(_this);

				/* .option-guide 오픈 버튼 z-index 처리 */
				if (_this.classList.contains('btn-popup-guide-open')) {
					_this.style.zIndex = `0`;
				}
			});
		});
	},
	/* 닫기 - 실행 */
	close : (_target) => {
		commUiVar.popupZIndex--;
		commUiFnPopup.comm.openOrder--;
		const thisPopupWrap = document.querySelector(_target);

		thisPopupWrap.classList.remove(commUiVar.openClass);
		setTimeout(() => {
			thisPopupWrap.removeAttribute('style');
		}, commUiVar.animationSpeed);

		commUiVar.activeTF.popup = commUiFnPopup.comm.openOrder; /* 히든요소 활성화 체크 */

		/* 포커싱 처리 */
		thisPopupWrap.setAttribute('aria-hidden', true);
		commUiFnFocus.onBlur(thisPopupWrap); /* 히든 영역 포커스 해제 */

		/* .option-guide 유형 최대 높이값 세팅, 오픈 버튼 z-index 처리 */
		if (thisPopupWrap.classList.contains('option-guide')) {
			const thisPopupCont = thisPopupWrap.querySelector('.popup-content');
			thisPopupCont.style.maxHeight = `0px`;
			commUiFnPopup.comm.openId[commUiFnPopup.comm.openOrder].style.zIndex = `30`;
		}

		/* 오픈한 버튼 저장(닫기 시 포커스 이동 처리), 다중 팝업 고려하여 배열에 추가 */
		// commUiFnPopup.comm.openId[commUiFnPopup.comm.openOrder].focus();
		commUiFnPopup.comm.openId.pop();
	},
	/* 닫기 - 타겟 이벤트 추가 */
	closeSet : () => {
		const btnPopupClose = document.querySelectorAll('.fn-popup-close');
		btnPopupClose.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const popupId = _this.dataset.popupId;
				commUiFnPopup.close(popupId);
			});
		});

		const subWrap = document.querySelectorAll('.popup-wrap');
		subWrap.forEach(function(_this) {
			_this.addEventListener('keydown', function(_event) {
				if (_event.keyCode === 27) {
					commUiFnPopup.close(_this.querySelector('.fn-popup-close').dataset.popupId);
				}
			});
		});
	},
	/* 폴드유형 드래그 전역변수 */
	dragVar : {
		positionY : undefined,
		contentHeight : 0
	},
	/* 드래그 - PC 마우스 이벤트와 함께 사용할 경우 대비 */
	dragEvent : (_event) => _event.touches ? _event.touches[0] : _event,
	/* 드래그 시 콘텐츠 높이 세팅 */
	dragSetHeight : (_value, _target) => {
		const thisParent = _target.closest('.popup-inner');
		commUiFnPopup.dragVar.contentHeight = Math.max(0, Math.min(90, _value));
		thisParent.style.maxHeight = `calc(var(--vh, 1vh) * ${commUiFnPopup.dragVar.contentHeight})`;
		if (commUiFnPopup.dragVar.contentHeight === 90) {
			thisParent.classList.add('is-fill');
		} else {
			thisParent.classList.remove('is-fill');
		}
	},
	/* 드래그 */
	drag : () => {
		const btnPopupDrag = document.querySelectorAll('.btn-popup-drag');
		btnPopupDrag.forEach(function(_this) {
			let dragStart;
			let dragEnd;
			const popupDragTarget = _this.closest('.popup-wrap').querySelector('.popup-content');
			commUiFnPopup.dragVar.contentHeight = 50;
			commUiFnPopup.dragSetHeight(commUiFnPopup.dragVar.contentHeight, popupDragTarget);

			/* 드래그 시작 */
			_this.addEventListener('touchstart', function(_event) {
				commUiFnPopup.dragVar.positionY = commUiFnPopup.dragEvent(_event).pageY;
				dragStart = commUiFnPopup.dragVar.positionY;
			});

			/* 드래그 중 */
			_this.addEventListener('touchmove', function(_event) {
				if (commUiFnPopup.dragVar.positionY === undefined) return;
				const pageY = commUiFnPopup.dragEvent(_event).pageY;
				const deltaY = commUiFnPopup.dragVar.positionY - pageY;
				const deltaVH = deltaY / window.innerHeight * 100;
				commUiFnPopup.dragSetHeight(commUiFnPopup.dragVar.contentHeight + deltaVH, popupDragTarget);
				commUiFnPopup.dragVar.positionY = pageY;
				dragEnd = pageY;
				/* console.log('move', pageY, deltaY, deltaVH, commUiFnPopup.dragVar.contentHeight + deltaVH); */
			});

			/* 드래그 종료 */
			_this.addEventListener('touchend', function() {
				commUiFnPopup.dragVar.positionY = undefined;
				const deltaVH = (dragStart / window.innerHeight * 100) - (dragEnd / window.innerHeight * 100);
				if (deltaVH > 5) {
					commUiFnPopup.dragSetHeight(100, popupDragTarget);
				} else if (deltaVH < -5) {
					commUiFnPopup.dragSetHeight(50, popupDragTarget);
				} else {
					if (commUiFnPopup.dragVar.contentHeight > 75) {
						commUiFnPopup.dragSetHeight(100, popupDragTarget);
					} else {
						commUiFnPopup.dragSetHeight(50, popupDragTarget);
					}
				}
			});

			/* 위 아래 방향키 입력 시 */
			_this.addEventListener('keyup', function(_event) {
				if (_event.keyCode === 38) {
					commUiFnPopup.dragSetHeight(100, popupDragTarget);
				}
				else if (_event.keyCode === 40) {
					commUiFnPopup.dragSetHeight(50, popupDragTarget);
				}
			});
		});
	}
}
commUiFnPopup.init();

/* 팝오버 */
const commUiFnPopover = {
	/* 전역변수 */
	comm : {
		openId : '', /* 팝업 오픈한 버튼 저장, 닫기 시 포커스 이동에 필요 */
		zIndex : 20
	},
	/* 초기실행 */
	init : () => {
		// commUiFnPopover.focusSet();
		commUiFnPopover.openSet();
		commUiFnPopover.closeSet();
	},
	/* 웹접근성 포커스 세팅 */
	focusSet : () => {
		const subWrap = document.querySelectorAll('.popover');
		subWrap.forEach(function(_this) {
			commUiFnFocus.onBlur(_this);
		});
	},
	/* 열기 - 실행 */
	open : (_target) => {
		const popoverOpened = document.querySelectorAll('.popover.is-open');
		popoverOpened.forEach(function(_this) {
			commUiFnPopover.close(`#${_this.id}`);
		});

		commUiFnPopover.comm.zIndex++;
		const thisPopupWrap = document.querySelector(_target);
		const thisHelpWrap = thisPopupWrap.closest('.helper');
		let position;

		/* 위치 계산 */
		position = commUiFnPopover.position(thisHelpWrap);
		if (position === 'right') {
			thisHelpWrap.classList.add('option-right');
		}

		thisPopupWrap.style.zIndex = commUiFnPopover.comm.zIndex;
		thisPopupWrap.classList.add(commUiVar.openClass);

		commUiVar.activeTF.popover = true; /* 히든요소 활성화 체크 */

		/* 포커싱 처리 */
		thisPopupWrap.setAttribute('aria-hidden', false);
		// document.querySelector(_target).focus();
		commUiFnFocus.onFocus(thisPopupWrap); /* 히든 영역 포커스 연결 */

		/* 팝오버가 스크롤 영역에 포함되어 있을 경우 체크 및 이벤트 실행 */
		commUiFnPopoverScroll.init(thisPopupWrap, 'open');
	},
	/* 위치 계산 */
	position : (_element) => {
		const thisBtn = _element.querySelector('.helper-btn');
		let position = '';
		if (thisBtn.getBoundingClientRect().left > (window.innerWidth / 2)) {
			position = 'right';
		}
		return position;
	},
	/* 열기 - 타겟 이벤트 추가 */
	openSet : () => {
		const btnPopupOpen = document.querySelectorAll('.fn-popover-open');
		btnPopupOpen.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const popoverId = _this.dataset.popoverId;
				commUiFnPopover.open(popoverId);
				commUiFnPopover.comm.openId = _this;
			});
		});
	},
	/* 닫기 - 실행 */
	close : (_target) => {
		commUiFnPopover.comm.zIndex--;
		const thisPopupWrap = document.querySelector(_target);
		const thisHelpWrap = thisPopupWrap.closest('.helper');
		
		thisPopupWrap.classList.remove(commUiVar.openClass);
		
		setTimeout(() => {
			thisPopupWrap.removeAttribute('style');
			thisHelpWrap.classList.remove('option-right');
		}, commUiVar.animationSpeed);

		commUiVar.activeTF.popover = false; /* 히든요소 활성화 체크 */
		
		/* 포커싱 처리 */
		thisPopupWrap.setAttribute('aria-hidden', true);
		// commUiFnPopover.comm.openId.focus();
		// commUiFnFocus.onBlur(thisPopupWrap); /* 히든 영역 포커스 해제 */

		/* 팝오버가 스크롤 영역에 포함되어 있을 경우 체크 및 이벤트 삭제 */
		commUiFnPopoverScroll.init(thisPopupWrap, 'close');
	},
	/* 닫기 - 타겟 이벤트 추가 */
	closeSet : () => {
		const btnPopupClose = document.querySelectorAll('.fn-popover-close');
		btnPopupClose.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const popoverId = _this.dataset.popoverId;
				commUiFnPopover.close(popoverId);
			});
		});
	}
};
commUiFnPopover.init();

/** 팝오버 - 스크롤 영역에 포함되어 있을 경우 */
const commUiFnPopoverScroll = {
	/* 초기실행 */
	init : (_popover, _action) => {
		const scrollElement = commUiFnPopoverScroll.check(_popover);
		if (scrollElement) {
			commUiFnPopoverScroll.set(_popover, scrollElement, _action);
		}
	},
	/* 체크 */
	check : (_popover) => {
		let scrollWrap;
		const checkElement = ['.data-body.option-fixed-head', '.data-body.option-fixed-side', '.data-body.option-fixed-mix'];
		checkElement.forEach(function(_this) {
			scrollWrap = scrollWrap || _popover.closest(_this);
		});
		return scrollWrap;
	},
	/* 이벤트 설정 */
	set : (_popover, _scrollWrap, _action) => {
		commUiFnPopoverScroll.position(_popover, _scrollWrap);
		if (_action === 'open') {
			_scrollWrap.addEventListener('scroll', commUiFnPopoverScroll.events);
		} else if (_action === 'close') {
			_scrollWrap.removeEventListener('scroll', commUiFnPopoverScroll.events);
		}
	},
	/* 이벤트 실행 */
	events : (_event) => {
		const scrollWrap = _event.target;
		const openPopover = scrollWrap.querySelectorAll('.popover.is-open');
		openPopover.forEach(function(_this) {
			commUiFnPopoverScroll.position(_this, scrollWrap);
		});
	},
	/* 위치 계산 및 반영 */
	position : (_popover, _scrollWrap) => {
		let xScroll = _scrollWrap.scrollLeft;
		let yScroll = _scrollWrap.scrollTop;
		const helper = _popover.closest('.helper');

		if (helper.classList.contains('option-right')) {
			_popover.style.marginRight = `${xScroll}px`;
		} else {
			_popover.style.marginLeft = `-${xScroll}px`;
		}
		_popover.style.marginTop = `-${yScroll}px`;
	}
};

/* 툴팁 */
const commUiFnTooltip = {
	/* 초기실행 */
	init : () => {
		commUiFnTooltip.events();
	},
	/* 이벤트 */
	events : () => {
		/*
			포커스 시 오픈 호출
			블러 시 닫기 호출
			클릭 시 is-open 클래스 체크 후 오픈/닫기 호출
		*/
		const btnTip = document.querySelectorAll('.tooltip-btn');
		btnTip.forEach(function(_this) {
			_this.addEventListener('focus', commUiFnTooltip.open);
			_this.addEventListener('blur', commUiFnTooltip.close);
		});
	},
	/* 열기 */
	open : (_event) => {
		/* is-open 클래스 추가
			위치 호출
		*/
		const element = _event.target;
		const parent = element.closest('.tooltip');
		const y = commUiFnTooltip.position(parent)[0];
		const x = commUiFnTooltip.position(parent)[1];

		parent.classList.add(commUiVar.openClass, `${y}`, `${x}`);
	},
	/* 닫기 */
	close : (_event) => {
		/* is-open 클래스 삭제 */
		const element = _event.target;
		const parent = element.closest('.tooltip');

		parent.classList.remove(commUiVar.openClass);
		setTimeout(() => {
			parent.classList.remove('top', 'bottom', 'left', 'right');
		}, commUiVar.animationSpeed);
	},
	/* 위치 */
	position: (_element) => {
		const thisBtn = _element.querySelector('.tooltip-btn');
		let y = 'top';
		if (thisBtn.getBoundingClientRect().top > (window.innerHeight / 2)) {
			y = 'bottom';
		}
		let x = 'left';
		if (thisBtn.getBoundingClientRect().left > (window.innerWidth / 2)) {
			x = 'right';
		}
		return [y, x];
	}
};
commUiFnTooltip.init();

/* 바디 클릭 시 */
document.querySelector('body').addEventListener('click', function(_event) {
	/* console.log('_event.target===', _event.target); */
	/* 인풋 삭제 버튼 숨기기 */
	if (commUiVar.activeTF.inputBtnClear) {
		if (!_event.target.parentElement.classList.contains('input')) commUiFnInput.hideClearButton();
	}

	/* 인풋 검색어 리스트 닫기 */
	if (commUiVar.activeTF.inputSearch) {
		if (!_event.target.parentElement.classList.contains('option-search')) commUiFnSearch.closeAll();
	} 

	/* 인풋 캘린더 닫기 */
	if (commUiVar.activeTF.inputCalendar) {
		if (_event.target.classList.contains('calendar-popup') && _event.target.classList.contains(commUiVar.openClass)) {
			commUiFnCalendar.close();
		}
	}

	/* 셀렉 옵션 리스트 닫기 */
	if (commUiVar.activeTF.select) {
		if (_event.target.classList.contains('select-popup') && _event.target.classList.contains(commUiVar.openClass)) {
			commUiFnSelectPopup.close();
		}
	}

	/* 팝업 닫기 */
	// if (commUiVar.activeTF.popup > 0) {
	// 	if (_event.target.classList.contains('popup-wrap') && _event.target.classList.contains(commUiVar.openClass)) {
	// 		commUiFnPopup.close('#' + _event.target.id);
	// 	}
	// }

	/* 팝오버 닫기 */
	if (commUiVar.activeTF.popover) {
		if (!_event.target.closest('.popover') && !_event.target.closest('.fn-popover-open')) {
			const popoverOpened = document.querySelectorAll('.popover.is-open');
			popoverOpened.forEach(function(_this) {
				commUiFnPopover.close(`#${_this.id}`);
			});
		}
	}
});

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

			if (_opened) { /* 열기 */
				commUiFnFocus.onFocus(_this);
			} else { /* 닫기 */
				commUiFnFocus.onBlur(_this);
			}

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

/* 접고펼치기 - 단일
	.fn-fold-id : 버튼 요소
	data-fold-target : 접고 펼칠 요소
*/
const commUiFnFoldID = {
	/* 초기실행 */
	init : () => {
		commUiFnFoldID.events();
	},
	/* 버튼 클릭 */
	events : () => {
		const foldBtn = document.querySelectorAll('.fn-fold-id');
		foldBtn.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const thisWrap = document.querySelector(`#${this.dataset.foldTarget}`);
				let opened = true;
				if (thisWrap.classList.contains(commUiVar.openClass)) {
					opened = false;
				}
				commUiFnFoldID.set(this, opened);
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
			commUiFnFoldID.set(_this.querySelector('.fn-fold-btn'), opened);
		});
	},
	/* 세팅 */
	set : (_element, _opened) => {
		const thisWrap = document.querySelector(`#${_element.dataset.foldTarget}`);
		let btnValue = `열기`;
		if (_opened) { /* 열기 */
			_element.closest('tr').classList.add(commUiVar.activeClass);
			thisWrap.classList.add(commUiVar.openClass);
			btnValue = `닫기`;
		} else {
			_element.closest('tr').classList.remove(commUiVar.activeClass);
			thisWrap.classList.remove(commUiVar.openClass);
		}
		_element.querySelector('span.sr-only').innerHTML = btnValue;

		/* 웹접근성 세팅 호출 */
		commUiFnFoldID.setWA(_element, _opened);
	},
	/* 웹접근성 세팅 */
	setWA : (_element, _opened) => {
		const thisWrap = document.querySelector(`#${_element.dataset.foldTarget}`);

		let waExpanded = false;
		let waHidden = true;
		if (_opened) { /* 열기 */
			waExpanded = true;
			waHidden = false;
		}
		_element.setAttribute('aria-expanded', waExpanded);
		thisWrap.setAttribute('aria-hidden', waHidden);

		if (_opened) { /* 열기 */
			commUiFnFocus.onFocus(thisWrap);
		} else { /* 닫기 */
			commUiFnFocus.onBlur(thisWrap);
		}
	}
};
commUiFnFoldID.init();

/* 아코디언 토글 추가 */
const commUiFoldToggle = {
	init : () => {
		commUiFoldToggle.play();
	},
	play : () => {
		const foldToggle = document.getElementsByClassName("accordion-head2");
		let i;

		for (i = 0; i < foldToggle.length; i++) {
			foldToggle[i].addEventListener("click", function() {
				
				let before = document.getElementsByClassName('fold-active')[0]               // 기존에 활성화된 버튼
				if (before && document.getElementsByClassName('fold-active')[0] != this) {  // 자신 이외에 이미 활성화된 버튼이 있으면
						before.nextElementSibling.style.maxHeight = null;   // 기존에 펼쳐진 내용 접고
						before.classList.remove('fold-active');                  // 버튼 비활성화
				}

				this.classList.toggle('fold-active');
				let content = this.nextElementSibling;

				if (content.style.maxHeight){
					content.style.maxHeight = null;
				} else {
					content.style.maxHeight = null;
					content.style.maxHeight = content.scrollHeight + "px";
				}
			});
		}
	}
};
commUiFoldToggle.init();

/* 하단 고정형 버튼일 경우 콘텐츠 여백 클래스 추가 */
const commUiFnFixMainButton = {
	init : () => {
		const mainButton = document.querySelectorAll('.btn-group.option-main');
		mainButton.forEach(function(_this) {
			const thisPage = _this.closest('#page');
			const thisFooter = thisPage.querySelector('#footer > .footer-inner');
			if (thisFooter) {
				commUiFnFixMainButton.add(thisPage);
			} else {
				const thisParent = _this.closest('#content');
				const section = thisParent.querySelectorAll('.section');
				section.forEach(function(_element, _index) {
					if ((section.length - 1) === _index) {
						commUiFnFixMainButton.add(_element);
					}
				});
			}
		});
	},
	add : (_element) => {
		_element.classList.add('has-space');
	}
};
commUiFnFixMainButton.init();

/* 콘텐츠하단 고정영역 있을 경우 여백 추가 */
const commUiFnContentFix = {
	init : () => {
		const mainButton = document.querySelectorAll('.content-foot');
		mainButton.forEach(function(_this) {
			const thisParent = _this.closest('#content') || _this.closest('.popup-content');
			const section = thisParent.querySelectorAll('.section');
			const thisHeight = _this.scrollHeight;

			commUiFnContentFix.set(section, thisHeight);
		});
	},
	init2 : () => {
		const mainButton = document.querySelectorAll('.popup-wrap.option-guide');
		mainButton.forEach(function(_this) {
			const thisParent = _this.closest('#wrap');
			const thisPage = thisParent.querySelector('#page');
			const section = thisPage.querySelectorAll('#content > .section');
			const thisHeight = _this.querySelector('.popup-head').scrollHeight;

			commUiFnContentFix.set(section, thisHeight);
		});
	},
	set : (_element, _height) => {
		const section = _element;
		section.forEach(function(_element, _index) {
			if ((section.length - 1) === _index) {
				_element.classList.add('has-space-fix-content');
				_element.style.paddingBottom = `${_height}px`;
			}
		});
	}
};
commUiFnContentFix.init();
commUiFnContentFix.init2();

/* VH 단위 계산 */
const commUiFnSetVH = () => {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};
commUiFnSetVH();
window.addEventListener('resize', commUiFnSetVH);

/* 데이터형 테이블 열 선택 */
const commUiFnDataSelect = {
	set : (_id) => {
		const dataID = document.querySelector(_id);
		if (dataID) {
			commUiFnDataSelect.event(dataID);
		}
	},
	event : (_id) => {
		const inputRadio = _id.querySelectorAll('.data-radio > .radio-item > .control');
		inputRadio.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const thisTable = this.closest('table');
				const thisIndex = [...this.closest('tr').querySelectorAll('th')].indexOf(this.closest('th'));
				const allRowLength = thisTable.rows.length;
				const headCellLength = thisTable.rows[0].children.length;
				for (let i = 0; i < allRowLength; i++) {
					if (thisTable.rows[i].children.length === headCellLength) {
						for (let j = 0; j < thisTable.rows[i].children.length; j++) {
							thisTable.rows[i].children[j].classList.remove('is-select');
						}
						thisTable.rows[i].children[thisIndex].classList.add('is-select');
					}
				}
			});
		});
	}
};

/* 데이터형 테이블 선택 시 열 이동 */
const commUiFnDataMove = {
	set : (_id) => {
		const dataID = document.querySelector(_id);
		if (dataID) {
			commUiFnDataMove.event(dataID);
			commUiFnDataSelect.event(dataID);
		}
	},
	event : (_id) => {
		const inputRadio = _id.querySelectorAll('.data-radio > .radio-item > .control');
		inputRadio.forEach(function(_this) {
			_this.addEventListener('click', function() {
				const thisTable = this.closest('table');
				const thisIndex = [...this.closest('tr').querySelectorAll('th')].indexOf(this.closest('th'));
				const allRowLength = thisTable.rows.length;
				const headCellLength = thisTable.rows[0].children.length;
				const setIndex = 0; /* 이동 위치 세팅 */
				let cellData;

				for (let i = 0; i < allRowLength; i++) {
					if (thisTable.rows[i].children.length === headCellLength) {
						cellData = thisTable.rows[i].children[thisIndex];
						thisTable.rows[i].children[thisIndex].remove();

						thisTable.rows[i].insertBefore(cellData, thisTable.rows[i].children[setIndex]);
						cellData = '';
					}
				}
				this.closest('.data-body').scrollLeft = 0;
			});
		});
	}
};

/* 페이지진행상황바 */
const commUiProgressBar = {
	init : () => {
		const bar = document.querySelectorAll('.progress > .bar');
		bar.forEach(function(_this) {
			const thisWrap = _this.closest('#page') || _this.closest('.popup-content');
			commUiProgressBar.set(thisWrap);
			thisWrap.addEventListener('scroll', commUiProgressBar.events);
		});
	},
	set : (_wrap) => {
		let wrapHeight = _wrap.scrollHeight;
		let screenHeight = window.innerHeight;
		if (_wrap.classList.contains('popup-content')) {
			screenHeight = _wrap.closest('.popup-inner').scrollHeight;
		}

		let per = Math.floor(((_wrap.scrollTop) / (wrapHeight - screenHeight)) * 100);
		if (per > 100) per = 100;

		const thisBar = _wrap.querySelector('.progress > .bar');
		thisBar.style.width = `${per}%`;
		thisBar.querySelector('span').innerHTML = `${per}%`;
	},
	events : (_event) => {
		commUiProgressBar.set(_event.target);
	}
};
commUiProgressBar.init();

/* 페이지 상단 이동 */
const commUiPageTop = {
	init : () => {
		const btnTop = document.querySelector('.btn-page-top');
		if (btnTop) {
			const page = document.querySelector('#page');
			btnTop.addEventListener('click', function() {
				page.scrollTop = 0;
			});
		}
	}
};
commUiPageTop.init();

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
		let pathDir = '../../../../';
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

/* 메인카피 타이틀 스크롤 애니메이션 */
const commUiMainCopy = {
	set : () => {
		const mainCopy = document.querySelectorAll('.main-copy');
		mainCopy.forEach(function(_this) {
			let thisWrap = '';
			let thisScrollWrap = '';
			if (_this.closest('#page')) {
				thisWrap = _this.closest('#page');
				thisScrollWrap = thisWrap;
			}

			if (_this.closest('.popup-wrap')) {
				thisWrap = _this.closest('.popup-wrap');
				thisScrollWrap = thisWrap.querySelector('.popup-content');
			}

			if (thisWrap.dataset.mainCopy) {
				commUiMainCopy.events(thisScrollWrap);
			}
		});
	},
	events : (_element) => {
		_element.addEventListener('scroll', function() {
			const mainCopy = this.querySelector('.main-copy');
			const thisScrollTop = this.scrollTop;
			let mainCopyY = mainCopy.offsetTop + mainCopy.scrollHeight;

			let thisWrap = '';
			let thisWrapTitle = '';
			if (this.closest('#page')) {
				thisWrap = this.closest('#page');
				thisWrapTitle = thisWrap.querySelector('#header > .header-title');
			}

			if (this.closest('.popup-wrap')) {
				thisWrap = this.closest('.popup-wrap');
				thisWrapTitle = thisWrap.querySelector('.popup-head > .popup-title');
				mainCopyY = mainCopy.offsetTop;
			}

			if (thisScrollTop > mainCopyY) {
				thisWrapTitle.classList.add(commUiVar.activeClass);
			} else {
				thisWrapTitle.classList.remove(commUiVar.activeClass);
			}
		});
	}
};
commUiMainCopy.set();

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

// Maxlength
function maxLengthChk(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

// Input Format
function cc_format(target) {
	target.value = target.value.replace(/[^0-9]/g, '');
	let value = target.value.split('');
	let type = target.className;
	if (type.indexOf('datepicker') !== -1) {
		let textArr = [
			[0, 3],
			[0, value.length > 7 ? 2 : 2],
			[0, 2],
		];
		target.value = textArr
			.map(function (v) {
				return value.splice(v[0], v[1]).join('');
			})
			.filter(function (text) {
				return text;
			})
			.join(':');

		// 쿼크값 방지
		let chk = target.value.length;
		if (chk === 10) {
			let chk_a = target.value.split('.');
			let num1 = Number(chk_a[0]);
			let num2 = Number(chk_a[1]);
			let num3 = Number(chk_a[2]);
			if (!(num1 > 0 && num2 > 0 && num2 <= 12 && num3 > 0 && num3 <= 31)) {
				target.value = '';
			}
		}
	} else if (type.indexOf('monthpicker') !== -1) {
		let _textArr = [
			[0, 4],
			[0, 2],
		];
		target.value = _textArr
			.map(function (v) {
				return value.splice(v[0], v[1]).join('');
			})
			.filter(function (text) {
				return text;
			})
			.join(':');

		// 쿼크값 방지
		let _chk = target.value.length;
		if (_chk === 6) {
			let _chk_a = target.value.split('.');
			let _num = Number(_chk_a[0]);
			if (!(_num > 0)) {
				target.value = '';
			}
		} else if (_chk === 7) {
			let _chk_a2 = target.value.split('.');
			let _num2 = Number(_chk_a2[0]);
			let _num3 = Number(_chk_a2[1]);
			if (!(_num2 > 0 && _num3 > 0 && _num3 <= 12)) {
				target.value = '';
			}
		}
	} else {
		let _textArr2 = [
			[0, value.length > 9 ? 2 : 2],
			[0, value.length > 10 ? 4 : 3],
			[0, 4],
		];
		target.value = _textArr2
			.map(function (v) {
				return value.splice(v[0], v[1]).join('');
			})
			.filter(function (text) {
				return text;
			})
			.join(':');
	}
}