기본 세팅 

1. nodejs 설치
2. 프로젝트 폴더에서 cmd 실행

 npm install
 npx playwright install chromium
실행

3. node save-login.js 실행 후 팝업되는 학교 브라우저에서 로그인 후 cmd에서 enter입력. 폴더에 auth.json 생성됐는지 확인

4. node reserve.js 실행으로 1회 테스트

5. vscode같은 코드 에디터로 reserve.js 열고 최상단 전화번호, 이메일, 동반 이용자 학번 상수값 수정

6. 작업 스케줄러에 run-reserve.bat 등록 (알잘딱)
