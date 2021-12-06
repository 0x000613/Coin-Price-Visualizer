// 코인 심볼 배열
const currencySimbol = ["btc", "eth"]

// 데이터를 가져오는 함수
function getData() {
    const xhr = new XMLHttpRequest();
    const method = "GET";

    // 링크에 숨겨진 data-deptno값을 백엔드에 전송함
    const url = "https://api.coinone.co.kr/ticker?currency=all";

    xhr.onreadystatechange = e => {
        const { target } = e;

        if(target.readyState === XMLHttpRequest.DONE) {
            if(target.status === 200) {
                const data = JSON.parse(target.response);

                // 화폐 가격 실시간 변경
                for (let currencyIdx = 0; currencyIdx < currencySimbol.length; currencyIdx++) {
                    console.log(data[currencySimbol[currencyIdx]]);

                    document.querySelector('#' + currencySimbol[currencyIdx] + "-price").innerHTML = data[currencySimbol[currencyIdx]].last;
                }
            }
        }
    };

    xhr.open(method, url);
    xhr.send();
}

setInterval(getData, 1000);