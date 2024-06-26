/* 메뉴 */
const adminUIGnb = {
	init : () => {
		adminUIGnb.accordion();
		adminUIGnb.fold();
	},
	/* 메뉴별 접고펼치기 */
	accordion : () => {
		const checkAll = document.querySelector('#checkSideControl');
		if (checkAll) {
			checkAll.addEventListener('click', function() {
				const menus = document.querySelectorAll('#admin-aside .accordion');
				if (this.checked) {
					menus.forEach(function(_this) {
						commUiFnFold.set(_this.querySelector('.btn-fold'), true);
					});
				} else {
					menus.forEach(function(_this) {
						commUiFnFold.set(_this.querySelector('.btn-fold'), false);
					});
				}
			});
		}
	},
	/* 왼쪽으로 접고펼치기 */
	fold : () => {
		const gnbBtn = document.querySelector('#gnbFoldControl');
		if (gnbBtn) {
			gnbBtn.addEventListener('click', function() {
				const aside = document.querySelector('#admin-main');
				if (aside.classList.contains('gnb-open')) {
					aside.classList.remove('gnb-open');
				} else {
					aside.classList.add('gnb-open');
				}
			});
		}
	}
};
adminUIGnb.init();

/* 탭 가로 스크롤 */
const adminUITab = {
	comm : {
		tabSize : 0
	},
	init : () => {
		adminUITab.set();
		adminUITab.eventMoveBtn();
		adminUITab.eventScroll();
	},
	/* 탭 넓이 구하기 */
	set : () => {
		const tab = document.querySelector('#admin-tab');
		const tabScroll = tab.querySelector('.admin-tab-scroll');
		const tabList = tabScroll.querySelector('.admin-tab-list');

		adminUITab.comm.tabSize = 0;

		for (let j = 0; j < tabList.children.length; j++) {
			adminUITab.comm.tabSize = adminUITab.comm.tabSize + tabList.children[j].getBoundingClientRect().width + parseInt(window.getComputedStyle(tabList.children[j]).getPropertyValue('margin-right'));
		}
		adminUITab.comm.tabSize = adminUITab.comm.tabSize + parseInt(window.getComputedStyle(tabList).getPropertyValue('padding-right'));
		tabList.style.cssText = `width: ${adminUITab.comm.tabSize}px`;

		if (tabScroll.offsetWidth < tabList.offsetWidth) {
			document.querySelector('#tab-move-next').classList.remove('is-hide');
		}
	},
	/* 탭 좌우 버튼 클릭 */
	eventMoveBtn : () => {
		const tabPrev = document.querySelector('#tab-move-prev');
		tabPrev.addEventListener('click', function() {
			this.closest('#admin-tab').querySelector('.admin-tab-scroll').scroll({left: 0, behavior: 'smooth'});
		});
		const tabNext = document.querySelector('#tab-move-next');
		tabNext.addEventListener('click', function() {
			this.closest('#admin-tab').querySelector('.admin-tab-scroll').scroll({left: adminUITab.comm.tabSize, behavior: 'smooth'});
		});
	},
	/* 탭 스크롤 시 버튼 히든 처리 */
	eventScroll : () => {
		const tab = document.querySelector('#admin-tab');
		const tabScroll = tab.querySelector('.admin-tab-scroll');
		const tabList = tabScroll.querySelector('.admin-tab-list');
		const tabPrev = document.querySelector('#tab-move-prev');
		const tabNext = document.querySelector('#tab-move-next');

		tabScroll.addEventListener('scroll', function() {
			if (this.scrollLeft === 0) {
				tabPrev.classList.add('is-hide');
			} else {
				tabPrev.classList.remove('is-hide');
			}
			if (this.scrollLeft + tabScroll.clientWidth >= tabList.offsetWidth) {
				tabNext.classList.add('is-hide');
			} else {
				tabNext.classList.remove('is-hide');
			}
		});
	}
}
window.addEventListener('load', function() {
	adminUITab.init();
});
window.addEventListener('resize', function() {
	adminUITab.set();
});