# EZEN-FrontEnd-TeamSemiPortfolio

코인원 API를 사용한 실시간 코인 정보 시각화 웹 프로그램 개발

### 작업자

- 김우영
- 양수원

### Demo

- https://xeroslab.github.io/EZEN-Frontend-TeamSemiPortfolio/

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
