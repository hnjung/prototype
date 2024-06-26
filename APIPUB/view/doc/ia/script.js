/* 데이터 */
const iaData = {
	/* 초기실행 */
	init : () => {
		iaData.change();
		iaData.filterReset();
		iaData.selectRow();
		iaData.sort();
		iaData.option();
	},
	/* 로딩 시 데이터 HTML 렌더링 */
	set : (_category, _data) => {
		const tableBody = $(`#${_category} .data-list tbody`);
		let htmlCode = '';
		if (_data.list.length > 0) {
			let seq = 0;
			$.each(_data.list, (_index, _this) => {
				seq++;
				htmlCode += `
					<tr>
						<td>${seq}</td>
						<td>${_this.createDate}</td>
						<td>${_this.modifyDate}</td>
						<td class="align-left">${_this.depth1}</td>
						<td class="align-left">${_this.depth2}</td>
						<td class="align-left">${_this.depth3}</td>
						<td class="align-left">${_this.depth4}</td>
						<td>${_this.device}</td>
						<td>${_this.user}</td>
						<td>${_this.pageType}</td>
						<td class="align-left">${_this.pageName}</td>
						<td class="align-left">${_this.pageID}</td>
						<td class="align-left"><a href="${_this.link}" target="_blank">${_this.link}</a></td>
						<td class="sort-order">${_this.order}</td>
						<td class="sort-status">${_this.status}</td>
						<td class="sort-wai">${_this.wai}</td>
						<td class="sort-name">${_this.name}</td>
						<td class="align-left">
				`;
				if (_this.memo.length > 0) {
					if (_this.memo.length > 1) {
						htmlCode += `<ul class="note-list option-fold">`;
					} else {
						htmlCode += `<ul class="note-list">`;
					}
					_this.memo.forEach(function(_memo) {
						htmlCode += `<li>${_memo.detail}</li>`;
					});
					htmlCode += `</ul>`;
				}
				htmlCode += `</td>
					</tr>
				`;
				tableBody.html(htmlCode);
			});
		}/*  else {
			htmlCode += `
				<tr class="nodata">
					<td colspan="18" class="align-center">데이터가 없습니다.</td>
				</tr>
			`;
			tableBody.html(htmlCode);
		} */

		/* 데이터 갯수 카운팅 호출 */
		iaData.count(_category);
		iaData.countAll(_category);
	},
	/* 로딩 시 셀렉트박스 옵션 값 렌더링 */
	option : () => {
		/* 순위 옵션 */
		const orderArr = [
			{'value': 1, 'text' : 1},
			{'value': 2, 'text' : 2},
			{'value': 3, 'text' : 3},
			{'value': 4, 'text' : 4},
			{'value': 5, 'text' : 5},
			{'value': 6, 'text' : 6},
			{'value': 7, 'text' : 7},
			{'value': 8, 'text' : 8},
			{'value': 9, 'text' : 9},
			{'value': '-', 'text' : '-'}
		];
		/* 상태 옵션 */
		const statusArr = [
			{'value': '대기', 'text' : '대기'}, 
			{'value': '진행', 'text' : '진행'},
			{'value': '확인', 'text' : '확인'},
			{'value': '완료', 'text' : '완료'},
			{'value': '삭제', 'text' : '삭제'}
		];
		/* 접근성 옵션 */
		const waiArr = [
			{'value': 'Y', 'text' : '완료'},
			{'value': '-', 'text' : '미완료'}
		];
		/* 담당자 옵션 */
		const nameArr = [
			{'value': '박지수', 'text' : '박지수'},
			{'value': '이종원', 'text' : '이종원'}
		];

		let orderHtmlCode = '';
		$.each(orderArr, (_index, _this) => {
			orderHtmlCode += `<option value="${_this.value}">${_this.text}</option>`
		});
		$('.data-list thead > tr > th select[data-sort-name="order"]').append(orderHtmlCode);

		let statusHtmlCode = '';
		$.each(statusArr, (_index, _this) => {
			statusHtmlCode += `<option value="${_this.value}">${_this.text}</option>`
		});
		$('.data-list thead > tr > th select[data-sort-name="status"]').append(statusHtmlCode);

		let waiHtmlCode = '';
		$.each(waiArr, (_index, _this) => {
			waiHtmlCode += `<option value="${_this.value}">${_this.text}</option>`
		});
		$('.data-list thead > tr > th select[data-sort-name="wai"]').append(waiHtmlCode);

		let nameHtmlCode = '';
		$.each(nameArr, (_index, _this) => {
			nameHtmlCode += `<option value="${_this.value}">${_this.text}</option>`
		});
		$('.data-list thead > tr > th select[data-sort-name="name"]').append(nameHtmlCode);
	},
	/* 셀렉트박스 값 변경 이벤트 */
	change : () => {
		$('.data-list thead > tr > th select').on('change', function() {
			const category = $(this).closest('.tab-item').attr('id');
			if ($(this).val() === '') {
				$(this).closest('th').removeClass('is-active');
			} else {
				$(this).closest('th').addClass('is-active');
			}
			iaData.filter(category);
		});
	},
	/* 데이터 필터링 */
	filter : (_category) => {
		const selectValue = $(`#${_category}`).find('.data-list thead > tr > th select');
		let orderValue = '';
		let statusValue = '';
		let waiValue = '';
		let nameValue = '';

		selectValue.each(function() {
			const thisName = $(this).attr('data-sort-name');
			const thisValue = $(this).val();

			switch (thisName) {
				case "order": orderValue = thisValue; break;
				case "status": statusValue = thisValue; break;
				case "wai": waiValue = thisValue; break;
				case "name": nameValue = thisValue; break;
				default: break;
			}
		});

		const rows = $(`#${_category}`).find('.data-list tbody > tr');
		let orderRow = '';
		let statusRow = '';
		let waiRow = '';
		let nameRow = '';

		/* 각 행의 데이터와 선택한 셀렉트박스의 값 비교 */
		rows.each(function() {
			orderRow = $(this).find('.sort-order').text();
			statusRow = $(this).find('.sort-status').text();
			waiRow = $(this).find('.sort-wai').text();
			nameRow = $(this).find('.sort-name').text();

			if (orderValue === '' && statusValue === '' && waiValue === '' && nameValue === '') { /* 0000 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === orderRow && statusValue === '' && waiValue === '' && nameValue === '') { /* 1000 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === '' && statusValue === statusRow && waiValue === '' && nameValue === '') { /* 0100 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === '' && statusValue === '' && waiValue === waiRow && nameValue === '') { /* 0010 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === '' && statusValue === '' && waiValue === '' && nameValue === nameRow) { /* 0001 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === orderRow && statusValue === statusRow && waiValue === '' && nameValue === '') { /* 1100 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === orderRow && statusValue === '' && waiValue === waiRow && nameValue === '') { /* 1010 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === orderRow && statusValue === '' && waiValue === '' && nameValue === nameRow) { /* 1001 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === '' && statusValue === statusRow && waiValue === waiRow && nameValue === '') { /* 0110 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === '' && statusValue === statusRow && waiValue === '' && nameValue === nameRow) { /* 0101 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === '' && statusValue === '' && waiValue === waiRow && nameValue === nameRow) { /* 0011 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === orderRow && statusValue === statusRow && waiValue === waiRow && nameValue === '') { /* 1110 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === orderRow && statusValue === '' && waiValue === waiRow && nameValue === nameRow) { /* 1011 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === orderRow && statusValue === statusRow && waiValue === '' && nameValue === nameRow) { /* 1101 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === '' && statusValue === statusRow && waiValue === waiRow && nameValue === nameRow) { /* 0111 */
				$(this).removeClass('is-hide').show();
			} else if (orderValue === orderRow && statusValue === statusRow && waiValue === waiRow && nameValue === nameRow) { /* 1111 */
				$(this).removeClass('is-hide').show();
			} else {
				$(this).addClass('is-hide').hide();
			}
		});
		iaData.count(_category);
	},
	/* 데이터 필터링 해제 */
	filterReset : () => {
		$('.filter-reset').on('click', function() {
			const category = $(this).closest('.tab-item').attr('id');
			$(`#${category} .data-list thead > tr > th select`).val('').trigger('change');
			$(`#${category} .data-list thead > tr > th`).removeClass('is-sort');
			$(`#${category} .data-list thead > tr > th .data-sort`).text('↓').removeClass('desc, asc');

			const recodes = $(`#${category}`).find('.data-list tbody > tr').get();

			recodes.sort(function(a, b) {
				let valueA = $(a).children('td').eq(0).text().toUpperCase();
				let valueB = $(b).children('td').eq(0).text().toUpperCase();
				return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
			});

			$.each(recodes, function(_index, _row) {
				$(`#${category} .data-list tbody`).append(_row);
			});
		});
	},
	/* 데이터 갯수 카운팅 */
	count : (_category) => {
		let ready = 0;
		let ing = 0;
		let finish = 0;
		let conform = 0;
		let del = 0;

		const lists = $(`#${_category} .data-list tbody > tr:not(.nodata)`).not('.is-hide');
		$.each(lists, function(_index, _this) {
			const status = $(_this).find('.sort-status').text();
			switch (status) {
				case "대기": ready++; break;
				case "진행": ing++; break;
				case "확인": conform++; break;
				case "완료": finish++; break;
				case "삭제": del++; break;
				default: break;
			}
		});

		let htmlCode = '';
		htmlCode = `전체 : <strong class="fc-primary">${lists.length}</strong>건,
					대기 : <strong class="fc-warning">${ready}</strong>건<span class="fc-base">(${ready ? (ready/lists.length*100).toFixed(2) : 0}%)</span>,
					진행 : <strong class="fc-highlight">${ing}</strong>건<span class="fc-base">(${ing ? (ing/lists.length*100).toFixed(2) : 0}%)</span>,
					확인 : <strong class="fc-highlight">${conform}</strong>건<span class="fc-base">(${conform ? (conform/lists.length*100).toFixed(2) : 0}%)</span>,
					완료 : <strong class="fc-secondary">${finish}</strong>건<span class="fc-base">(${finish ? (finish/lists.length*100).toFixed(2) : 0}%)</span>,
					삭제 : <strong class="fc-disabled">${del}</strong>건<span class="fc-base">(${del ? (del/lists.length*100).toFixed(2) : 0}%)</span>
		`;
		$(`#${_category} .title-h3 .count`).html(htmlCode);

		if (lists.length === 0) {
			$(`#${_category} .data-list tbody`).append(`
				<tr class="nodata">
					<td colspan="18" class="align-center">데이터가 없습니다.</td>
				</tr>
			`);
		} else {
			$(`#${_category} .data-list tbody > .nodata`).remove();
		}
	},
	/* 대 카테고리 별 데이터 갯수 카운팅 */
	countAll : (_category) => {
		const lists = $(`#${_category} .data-list tbody > tr:not(.nodata)`).not('.is-hide');
		$(`#${_category}Menu .tab-count`).html(lists.length);
	},
	/* 행 클릭 시 배경색 추가 */
	selectRow : () => {
		$('.data-list tbody > tr').on('click', function() {
			if ($(this).hasClass('is-active')) {
				$(this).removeClass('is-active');
			} else {
				$(this).addClass('is-active');
			}
		});
	},
	/* 내림차순 오름차순 정렬 */
	sort : () => {
		$('.tab-item .data').each(function(_target) {
			$(this).find('.data-list thead > tr > th').each(function(_this) {
				$(this).find('.data-sort').on('click', function() {
					const category = $(this).closest('.tab-item').attr('id');
	
					let sortFlag;
					if ($(this).is('.asc')) {
						/* 내림차순 */
						$(this).removeClass('asc').addClass('desc').text('↓');
						sortFlag = -1;
					} else {
						/* 오름차순 */
						$(this).addClass('asc').removeClass('desc').text('↑');
						sortFlag = 1;
					}
	
					$(this).closest('th').siblings().removeClass('is-sort');
					$(this).closest('th').siblings().find('.data-sort').text('↓').removeClass('desc, asc');
					$(this).closest('th').addClass('is-sort');
	
					const recodes = $(`#${category}`).find('.data-list tbody > tr').get();
	
					
					recodes.sort(function(a, b) {
						let valueA = $(a).children('td').eq(_this).text().toUpperCase();
						let valueB = $(b).children('td').eq(_this).text().toUpperCase();
						return (valueA < valueB) ? -sortFlag : (valueA > valueB) ? sortFlag : 0;
					});
	
					$.each(recodes, function(_index, _row) {
						$(`#${category} .data-list tbody`).append(_row);
					});
				});
			});
		});
	}
};

/* 각 카테고리 데이터 가져와서 합치기 */
const iaAllData = {
	"list" : []
};

$.each(iaFrontData.list , function(){
	iaAllData.list.push(this);
});
$.each(iaAdminData.list , function(){
	iaAllData.list.push(this);
});

const allData = JSON.parse(JSON.stringify(iaAllData));
iaData.set('tabAll', allData);

/* 카테고리별 데이터 가져오기 */
/** Front */
const frontData = JSON.parse(JSON.stringify(iaFrontData));
iaData.set('tabFront', frontData);

/** Admin */
const adminData = JSON.parse(JSON.stringify(iaAdminData));
iaData.set('tabAdmin', adminData);

/* 데이터 이벤트 실행 */
iaData.init();

/* 메모 */
const iaMemo = {
	/* 초기실행 */
	init : () => {
		iaMemo.toggle();
		iaMemo.all();
	},
	/* 토글 */
	toggle : () => {
		$('.data-list tbody > tr > td .note-list.option-fold').on('click', function() {
			if ($(this).hasClass('is-open')) {
				$(this).removeClass('is-open');
			} else {
				$(this).addClass('is-open');
			}
		});
	},
	/* 전체 더보기 */
	all : () => {
		$('.btn-memo-all').on('click', function() {
			const category = $(this).closest('.tab-item').attr('id');
			if ($(this).hasClass('is-open')) {
				$(this).removeClass('is-open').text('더보기');
				$(`#${category} .data-list tbody > tr > td .note-list.option-fold`).each(function() {
					$(this).removeClass('is-open');
				});
			} else {
				$(this).addClass('is-open').text('닫기');
				$(`#${category} .data-list tbody > tr > td .note-list.option-fold`).each(function() {
					$(this).addClass('is-open');
				});
			}
		});
	}
};
iaMemo.init();