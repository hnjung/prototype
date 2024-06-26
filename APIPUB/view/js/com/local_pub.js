/* ⚠ 산출물 확인용으로 서버에 배포 금지 */

/* 푸터 공통 */
if (document.querySelector('#footer')) {
	document.querySelector('#footer').innerHTML = 
		`<div class="footer-inner">
			<div class="copyright">COPYRIGHT 2021. SHINHAN CORP. ALL RIGHTS RESERVED.</div>
		</div>`;
}

if (document.querySelector('#gnb')) {
	document.querySelector('#gnb').innerHTML = 
		` <div class="gnb-wrap">
			<ul class="util list depth-u1">
				<li>
					<!-- 로그인 후(s) -->
					<button type="button" class="btn contained option-sm"><span>로그아웃</span></button>
					<!--// 로그인 후(e) -->
					<!-- 로그인 전(s) -->
					<button type="button" class="btn primary option-sm"><span>로그인</span></button>
					<!--// 로그인 전(e) -->
				</li>
			</ul>
			<ul class="gnb-list list depth-u1">
				<li>
					<a href="javascript:;"><strong>대시보드</strong></a>
				</li>
				<li>
					<a href="javascript:;"><strong>관리</strong></a>
					<div class="snb-wrap">
						<ul class="snb-list list depth-u2">
							<li><a href="javascript:;">승인현황</a></li>
							<li><a href="javascript:;">APP</a></li>
							<li><a href="javascript:;">서비스</a></li>
							<li><a href="javascript:;">API</a></li>
						</ul>
					</div>
				</li>
				<li>
					<a href="javascript:;"><strong>고객지원</strong></a>
					<div class="snb-wrap">
						<ul class="snb-list list depth-u2">
							<li><a href="javascript:;">FAQ</a></li>
							<li><a href="javascript:;">공지사항</a></li>
							<li><a href="javascript:;">기술 Q&amp;A</a></li>
							<li><a href="javascript:;">공지팝업</a></li>
						</ul>
					</div>
				</li>
				<li>
					<a href="javascript:;"><strong>통계</strong></a>
					<div class="snb-wrap">
						<ul class="snb-list list depth-u2">
							<li><a href="javascript:;">사용통계</a></li>
							<li><a href="javascript:;">제공통계</a></li>
						</ul>
					</div>
				</li>
			</ul>
		</div>`;
}

/* 새로고침 시 마지막 스크롤 위치 고정 */
const rootPage = document.querySelector('#page');
if (rootPage) {
	let finalScrollTop = localStorage.getItem('dataFinalScrollTop');
	if (finalScrollTop !== null) {
		rootPage.scrollTop = parseInt(finalScrollTop, 10);
	}
	window.addEventListener('beforeunload', () => {
		localStorage.setItem('dataFinalScrollTop', rootPage.scrollTop);
	});
}

/* CSS 변수 제어하기 참고 */
// 가상 클래스 요소 얻기
// let root = document.querySelector(':root');

// window.getComputedStyle 메서드를 이용하면, 해당 요소에 전역적으로 적용된 모든 형태의 style을 반환한다
// let variables = getComputedStyle(root);

// 변수 값 얻기
// variables.getPropertyValue('--hover');