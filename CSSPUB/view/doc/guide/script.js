const guideMenu = {
	init : () => {
		guideMenu.links();
		guideMenu.folder();
	},
	folder : () => {
		const checkAll = document.querySelector('#checkSideControl');
		checkAll.addEventListener('click', function() {
			const menus = document.querySelectorAll('#aside .accordion');
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
	},
	links : () => {
		const guideLink = document.querySelectorAll('#aside .fn-guide-link');
		guideLink.forEach(function(_this) {
			_this.addEventListener('click', function(e) {
				e.preventDefault();
				const _thisId = this.getAttribute('href');
				const _thisElement = document.querySelector(_thisId);
				if (_thisElement !== null) {
					document.querySelector('#page').scrollTop = _thisElement.offsetTop;
				}
			});
		});
	}
};
guideMenu.init();