const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://wein.konkuk.ac.kr');

  console.log('브라우저에서 직접 로그인하세요.');
  console.log('로그인이 끝나면 터미널에서 Enter를 누르세요.');

  process.stdin.once('data', async () => {
    await context.storageState({ path: 'auth.json' });
    await browser.close();
    console.log('로그인 상태가 auth.json에 저장되었습니다.');
  });
})();