# EZEN-FrontEnd-TeamSemiPortfolio

코인원 API를 사용한 실시간 코인 정보 시각화 웹 프로그램 개발

### 작업자 및 파트 분담

- 김우영 (자바스크립트 AJAX 통신, 차트 구현)
- 이정원 (PPT, 프론트 상단, 프론트 우측)
- 오예림 (프론트 우측)
- 유현승 (프론트 레이아웃, 박스 디자인)

### 라이브러리, API

[자바스크립트 라이브러리 및 적용 기술]
- Highcharts.js
- jQuery
- AJAX (JavaScript)

[REST API]
- Coinone 암호화폐 거래, 시세정보 REST API
- Poloniex 암호화폐 차트 데이터 REST API

### Demo

- https://ezen-frontend-team-semi-portfolio.vercel.app/

### 코드 작성 가이드라인

```html
<!-- 주석 -->
<!-- 주석은 코드 상단에 위치합니다. -->

<!-- 클래스명은 공백을 하이폰으로 대체하며, 소문자만을 사용합니다. -->
<!-- id -> class 순으로 작성합니다. -->
<div id="my-id" class="class-example"></div>

<!-- 메인 컨테이너는 div 대신 각각 header, main, footer 태그를 사용합니다. -->
<header>
    this is header
</header>
<main>
    this is main
</main>
<footer>
    this is footer
</footer>
```

```js
// 변수명, 함수명의 띄어쓰기 구분은 카멜 표기법을 사용합니다.
// Function example
function returnAdd(x, y){
    return x + y;
}

// Variable example
const myVar = returnAdd(1, 3);
```

### 작업 디렉토리

작업 디렉토리는 아래와 같은 디렉토리 구조를 준수합니다.

```plaintext
.
├── assets
│   ├── css
│   │   ├── common.css
│   │   └── style.css
│   ├── img
│   │   ├── css.png
│   │   ├── html.png
│   │   ├── js.png
│   │   ├── mountain.jpeg
│   │   └── red-background.jpeg
│   ├── js
│   │   └── script.js
│   ├── lib
│   │   ├── animationsjs
│   │   │   └── animations.js
│   │   └── fullpagejs
│   │       ├── fullpage.css
│   │       └── fullpage.js
│   └── video
│       └── flowers.mp4
└── index.html
```

`index.html` 파일은 루트 디렉토리에 위치시키고 `css`, `js`, `image`, `video` 파일은 `assets` 디렉토리 하위에 위치시킵니다.
