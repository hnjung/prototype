/* ⚠ 산출물 확인용으로 서버에 배포 금지 */

/* 푸터 공통 */
if (document.querySelector('#footer')) {
	document.querySelector('#footer').innerHTML = 
		`<div class="footer-inner">
			<div class="copyright">COPYRIGHT 2021. SHINHAN CORP. ALL RIGHTS RESERVED.</div>
			<div class="family-site" aria-haspopup="true">
				<button type="button" class="btn-familysite" aria-expanded="false">Family Site</button>
				<ul class="familysite-list" role="listbox">
					<li class="item" role="option">
						<a href="https://www.shinhangroup.com/" target="_blank" title="새창열림"><span>신한금융지주회사</span></a>
					</li>
					<li class="item" role="option">
						<a href="https://www.shinhanez.co.kr/" target="_blank" title="새창열림"><span>신한EZ손해보험</span></a>
					</li>
				</ul>
			</div>
		</div>`;
}