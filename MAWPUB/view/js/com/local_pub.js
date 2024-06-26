/* ⚠ 산출물 확인용으로 서버에 배포 금지 */

/* 푸터 공통 */
if (document.querySelector('#footer')) {
	document.querySelector('#footer').innerHTML = ``;
}

/* 메뉴 공통 */
if (document.querySelector('#gnb')) {
	document.querySelector('#gnb').innerHTML = `
<div class="gnb-inner">
	<!-- .util -->
	<div class="util">
		<ul class="util-list">
			<li class="util-item main"><a href="./HMEHMEHME_M01.html" class="link" role="button"><span class="sr-only">메인 바로가기</span></a></li>
			<li class="util-item search"><a href="javascript:;" class="link" role="button"><span class="sr-only">검색 바로가기</span></a></li>
			<li class="util-item setting"><a href="javascript:;" class="link" role="button"><span class="sr-only">설정 바로가기</span></a></li>
			<li class="util-item close"><button type="button" class="btn-menu-close"><span class="sr-only">메뉴 닫기</span></button></li>
		</ul>
	</div>
	<!--// .util -->
	<!-- .session - 2024-01-05 : 로그인 및 간편홈 설정 영역 추가 -->
	<div class="session">
		<div class="session-wrap">
			<div class="session-item">
				<span class="avatar type1"><span class="sr-only">캐릭터 쏠</span></span>
				<!-- [D]캐릭터 종류별
					<span class="avatar none"><span class="sr-only">캐릭터 없음</span></span>
					<span class="avatar type1"><span class="sr-only">캐릭터 쏠</span></span>
					<span class="avatar type2"><span class="sr-only">캐릭터 몰리</span></span>
					<span class="avatar type3"><span class="sr-only">캐릭터 리노</span></span>
					<span class="avatar type4"><span class="sr-only">캐릭터 슈</span></span>
					<span class="avatar type5"><span class="sr-only">캐릭터 도레미</span></span>
					<span class="avatar type6"><span class="sr-only">캐릭터 루루라라</span></span>
					<span class="avatar type7"><span class="sr-only">캐릭터 폴리</span></span>
					<span class="avatar type8"><span class="sr-only">캐릭터 레이</span></span>
				-->
				<strong class="subject">김신한님</strong>
				<button type="button" class="btn texted"><span>로그아웃</span></button>
			</div>
			<div class="session-item">
				<!-- .switch* -->
				<label for="easyHome" class="switch-item">
					<input type="checkbox" name="" id="easyHome" class="control" checked>
					<span class="label">
						<span class="txt">간편홈</span>
					</span>
				</label>
				<!--// .switch* -->
			</div>
		</div>
	</div>
	<!--// .session - 2024-01-05 : 로그인 및 간편홈 설정 영역 추가 -->
	<!-- .history -->
	<div class="history">
		<strong class="quick-title"><span class="txt">최근 이용 메뉴</span></strong>
		<div class="quick-wrap set-scroll">
			<ul class="quick-list">
				<li class="quick-item"><a href="javascript:;" class="link">보험계약확인</a></li>
				<li class="quick-item"><a href="javascript:;" class="link">납입증명서 발행</a></li>
				<li class="quick-item"><a href="javascript:;" class="link">개인신용정보 이용/제공현황</a></li>
			</ul>
		</div>
	</div>
	<!--// .history -->
	<!-- .recommend -->
	<div class="recommend">
		<strong class="quick-title"><span class="txt">추천 메뉴</span></strong>
		<div class="quick-wrap set-scroll">
			<ul class="quick-list">
				<li class="quick-item"><a href="javascript:;" class="link">보험계약확인</a></li>
				<li class="quick-item"><a href="javascript:;" class="link">납입증명서 발행</a></li>
				<li class="quick-item"><a href="javascript:;" class="link">개인신용정보 이용/제공현황</a></li>
			</ul>
		</div>
	</div>
	<!--// .recommend -->
	<!-- .anchor -->
	<div class="anchor">
		<div class="anchor-wrap set-scroll">
			<ul class="anchor-list">
				<li class="anchor-item product"><a href="#menu-gnb-product" class="link"><span class="txt">상품가입</span></a></li>
				<li class="anchor-item contract"><a href="#menu-gnb-contract" class="link"><span class="txt">계약관리</span></a></li>
				<li class="anchor-item reward"><a href="#menu-gnb-reward" class="link"><span class="txt">보상</span></a></li>
				<li class="anchor-item custom"><a href="#menu-gnb-custom" class="link"><span class="txt">고객센터</span></a></li>
				<li class="anchor-item company"><a href="#menu-gnb-company" class="link"><span class="txt">회사소개</span></a></li>
				<li class="anchor-item certify"><a href="#menu-gnb-certify" class="link"><span class="txt">인증센터</span></a></li>
			</ul>
		</div>
	</div>
	<!--// .anchor -->
	<!-- .gnb* -->
	<div class="gnb-wrap">
		<ul class="gnb-list" role="menubar">
			<li class="gnb-item product" id="menu-gnb-product" role="none">
				<span class="txt" role="menuitem">상품가입</span>
				<ul class="menu-2nd-list" role="menu">
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">신한SOL 주택화재보험</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">신한 국내여행보험</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">신한 레저보험</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">신한 해외장기체류보험</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">신한 해외여행보험</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">신한 Auto케어보장보험</a></li>
				</ul>
			</li>
			<li class="gnb-item contract" id="menu-gnb-contract" role="none">
				<span class="txt" role="menuitem">계약관리</span>
				<ul class="menu-2nd-list" role="menu">
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보험계약확인</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">증명서발행</a></li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">장기보험 계약변경</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">계약자/피보험자정보변경</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">주소지변경</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">가입금액변경</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">결제방법/계좌변경</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">기타</a></li>
						</ul>
					</li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">일반보험 계약변경</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">여행보험</a></li>
						</ul>
					</li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">보험료납입</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보험료납입</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">효력상실예정계약보험료납입</a></li>
						</ul>
					</li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">보험료환급/해지</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">계약해지 신청</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">청약 철회 신청</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">개시전취소신청</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">중도인출신청</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">만기/중도환급금신청</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">휴면보험금신청</a></li>
						</ul>
					</li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">내정보 확인/변경</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">개인정보변경</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">우편물수령처변경</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">안내장내역확인</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">완전판매모니터링</a></li>
						</ul>
					</li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">개인신용정보 이용 및 제공사실 조회</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">개인신용정보 이용/제공현황</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">마케팅정보활용 동의/철회</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">개인신용정보 보유현황</a></li>
						</ul>
					</li>
				</ul>
			</li>
			<li class="gnb-item reward" id="menu-gnb-reward" role="none">
				<span class="txt" role="menuitem">보상</span>
				<ul class="menu-2nd-list" role="menu">
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">질병/상해 보험금청구</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">안내</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보험금청구</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">필요서류 안내</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보상내역 확인</a></li>
						</ul>
					</li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">재물/배상책임 보험금청구</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">안내</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보험금청구</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">필요서류 안내</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보상내역 확인</a></li>
						</ul>
					</li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">AUTO 보험금청구</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">안내</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보험금청구</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">필요서류 안내</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보상내역 확인</a></li>
						</ul>
					</li>
				</ul>
			</li>
			<li class="gnb-item custom" id="menu-gnb-custom" role="none">
				<span class="txt" role="menuitem">고객센터</span>
				<ul class="menu-2nd-list" role="menu">
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">공지사항</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">자주하는질문</a></li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">고객의소리</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">고객상담요청</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">전자민원신청</a></li>
						</ul>
					</li>
					<li class="menu-2nd-item fn-fold-wrap is-open" data-fold-slide="true" role="none">
						<a href="javascript:;" class="link option-fold fn-fold-btn" aria-expanded="false" role="menuitem">보험제도안내</a>
						<ul class="menu-3rd-list fn-fold-item" role="menu">
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보험사기신고안내</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보험금가지급제도</a></li>
							<li class="menu-3rd-item" role="none"><a href="javascript:;" class="link" role="menuitem">보험금신속지급제도</a></li>
						</ul>
					</li>
				</ul>
			</li>
			<li class="gnb-item company" id="menu-gnb-company" role="none">
				<span class="txt" role="menuitem">회사소개</span>
				<ul class="menu-2nd-list" role="menu">
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem" title="새창으로 열림">회사소개</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem" title="새창으로 열림">브랜드/홍보</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem" title="새창으로 열림">채용정보</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem" title="새창으로 열림">공시실</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem" title="새창으로 열림">Contact Us</a></li>
				</ul>
			</li>
			<li class="gnb-item certify" id="menu-gnb-certify" role="none">
				<span class="txt" role="menuitem">인증센터</span>
				<ul class="menu-2nd-list" role="menu">
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">간편비밀번호 등록/삭제</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">생체인증 등록/삭제</a></li>
					<li class="menu-2nd-item" role="none"><a href="javascript:;" class="link" role="menuitem">금융인증서 등록/해지</a></li>
				</ul>
			</li>
		</ul>
	</div>
	<!-- .gnb* -->
</div>
	`;
}

/* 공통UI - 결제 동일 코드 - 2024-03-19 : 웹접근성 속성 추가 */
if (document.querySelector('#comm-payment')) {
	const commPayment = document.querySelector('#comm-payment');
	commPayment.querySelectorAll('.payment-menu > .radio-group > .radio-item').forEach(function(_this) {
		_this.addEventListener('input', function() {
			commPayment.querySelectorAll('.payment-content').forEach(function(_this) {
				_this.style.display = 'none';
				_this.setAttribute('aria-hidden', true);
			});
			if (this.classList.contains('card')) {
				document.querySelector('#payment-content-card').style.display = 'block';
				document.querySelector('#payment-content-card').setAttribute('aria-hidden', false);
			}
			if (this.classList.contains('easy')) {
				document.querySelector('#payment-content-easy').style.display = 'block';
				document.querySelector('#payment-content-easy').setAttribute('aria-hidden', false);
			}
			if (this.classList.contains('bank')) {
				document.querySelector('#payment-content-bank').style.display = 'block';
				document.querySelector('#payment-content-bank').setAttribute('aria-hidden', false);
			}
		});
	});
}

/* 새로고침 시 마지막 스크롤 위치 고정 */
/* const rootPage = document.querySelector('#page');
if (rootPage) {
	let finalScrollTop = localStorage.getItem('dataFinalScrollTop');
	if (finalScrollTop !== null) {
		rootPage.scrollTop = parseInt(finalScrollTop, 10);
	}
	window.addEventListener('beforeunload', () => {
		localStorage.setItem('dataFinalScrollTop', rootPage.scrollTop);
	});
} */

/* CSS 변수 제어하기 참고 */
// 가상 클래스 요소 얻기
// let root = document.querySelector(':root');

// window.getComputedStyle 메서드를 이용하면, 해당 요소에 전역적으로 적용된 모든 형태의 style을 반환한다
// let variables = getComputedStyle(root);

// 변수 값 얻기
// variables.getPropertyValue('--hover');