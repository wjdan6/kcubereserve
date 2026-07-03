const { chromium } = require('playwright');

const PHONENUM = '' // 전화번호
const EMAIL = ''; //이메일 
const STDNUM = "" //동반이용자 학번


function isWeekend(date) {
  const day = date.getDay(); // 일요일 0, 월요일 1, ..., 토요일 6
  return day === 0 || day === 6;
}

function makeDateInfo(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const yyyy = String(year);
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');

  return {
    year,
    month,
    day,
    dateText: `${yyyy}-${mm}-${dd}`,
    displayText: `${yyyy}.${mm}.${dd}`,
  };
}

function getReservableDateAfter(days) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);

  // 일단 달력상 days일 뒤로 이동
  d.setDate(d.getDate() + days);

  // 주말이면 다음 평일까지 이동
  while (isWeekend(d)) {
    d.setDate(d.getDate() + 1);
  }

  return makeDateInfo(d);
}


(async () => {

  const browser = await chromium.launch({ headless: false });
  console.log("브라우저 열림");
  const context = await browser.newContext({
    storageState: 'auth.json'
  });
  console.log("로그인 세션 로드");
  const page = await context.newPage();
  console.log("페이지 이동 시작");
  await page.goto('https://wein.konkuk.ac.kr');
  console.log("위인전 이동");

  await page.getByRole('link', { name: '예약 신청 (현황 조회)' }).click();
  await page.getByText('전체', { exact: true }).click();
  await page.getByRole('link', { name: '선택 건물 예약 현황 조회' }).click();

  const targetDate = getReservableDateAfter(7); //7일뒤 예약
  console.log('목표 날짜:', targetDate.displayText);
  await page.locator('#ymdSelect').selectOption(targetDate.displayText); //날짜선택
  

  await page.locator('tr:nth-child(9) > td:nth-child(149) > div > .enable').click(); // 공대케이큐브 104-1 6시
  //await page.locator('tr:nth-child(12) > td:nth-child(109) > div > .enable').click(); //테스트용 공대 104-4호  13시
  
  await page.getByRole('button', { name: ':30~18:00' }).click();
  await page.getByRole('button', { name: ':00~18:30' }).click();
  await page.getByRole('button', { name: ':30~19:00' }).click();
  await page.getByRole('button', { name: ':00~19:30' }).click();
  await page.getByRole('button', { name: ':30~20:00' }).click();//3시간 예약
  
  await page.locator('#srupSeq').selectOption('1'); //이용목적 : 팀프로젝트
  await page.getByRole('textbox', { name: '휴대전화번호' }).click();
  await page.getByRole('textbox', { name: '휴대전화번호' }).fill(PHONENUM);
  await page.getByRole('textbox', { name: '이메일주소' }).click();
  await page.getByRole('textbox', { name: '이메일주소' }).fill(EMAIL);
  await page.getByRole('button', { name: '동반이용자 검색' }).click();
  await page.getByRole('textbox', { name: '학번, 교번, 아이디 입력' }).click();
  await page.getByRole('textbox', { name: '학번, 교번, 아이디 입력' }).fill(STDNUM); //동반이용자 학번 입력
  await page.getByRole('textbox', { name: '학번, 교번, 아이디 입력' }).click();
  await page.getByRole('link', { name: '추가' }).click();
  await page.getByRole('button', { name: '저장' }).click();
  await page.getByRole('link', { name: '대여 예약 신청하기' }).click();
  await page.getByRole('button', { name: '확인' }).click();
  console.log(targetDate+ " 예약 성공");
})();