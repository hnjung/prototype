/* ⚠ 산출물 확인용으로 서버에 배포 금지 */

/* 푸터 공통 */
if (document.querySelector('#footer')) {
	document.querySelector('#footer').innerHTML = 
		`<div class="footer-inner">
			<div class="copyright">COPYRIGHT 2021. SHINHAN CORP. ALL RIGHTS RESERVED.</div>
				<div class="family-site">
			</div>
		</div>`;
}

if (document.querySelector('#gnb')) {
	document.querySelector('#gnb').innerHTML = 
		`<div class="gnb-wrap">
			<ul class="util list depth-u1">
				<li class="userinfo">
					<span class="fc-primary">[이용기관명] 홍길동</span>님, 반갑습니다!
					<p class="ip">22.333.44.555 / 2023.12.31 23:59:42</p>
				</li>
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
					<a href="javascript:;"><strong>계약조회</strong></a>
				</li>
				<li>
					<a href="javascript:;"><strong>차량정보조회</strong></a>
				</li>
				<li>
					<a href="javascript:;"><strong>여행보험</strong></a>
					<div class="snb-wrap">
						<ul class="snb-list list depth-u2">
							<li><a href="javascript:;">계약조회</a></li>
							<li><a href="javascript:;">설계검색</a></li>
							<li><a href="javascript:;">가입설계</a></li>
							<li><a href="javascript:;">실적조회</a></li>
							<li><a href="javascript:;">증명서발급</a></li>
							<li><a href="javascript:;">요청게시판</a></li>
						</ul>
					</div>
				</li>
				<li>
					<a href="javascript:;"><strong>공지사항</strong></a>
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