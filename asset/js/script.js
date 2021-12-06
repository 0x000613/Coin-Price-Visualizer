const coinList = ["btc", "eth", "xrp", "mega", "klay", "luna", "vivi", "mnr", "rush", "eos"]

// 버튼 이벤트
const coinListItems = document.querySelectorAll(".coin-list-item");
for (const btn of coinListItems) {
  btn.addEventListener("click", e => {
    console.log(e.currentTarget.classList[0]);
    document.querySelector("#info-currency-price").classList = e.currentTarget.classList[0] + "-price";
    document.querySelector("#info-currency").innerHTML = e.currentTarget.classList[0].toUpperCase();
    // 페이지 첫 로드시 BTC로 차트 로드
    draw3(e.currentTarget.classList[0].toUpperCase());
  })
}

// 차트
function draw3(symbol) {
  var chartdata = [];
  $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_'+ symbol +'&start=1455699200&end=9999999999&period=14400', function(data) {
      $.each(data, function(i, item) {
          chartdata.push([item.date * 1000, item.open, item.high, item.low, item.close]);
      });
  }).done(function() {
      Highcharts.stockChart('coin-chart', {
          rangeSelector: {
              buttons: [{
                      type: 'hour',
                      count: 1,
                      text: '1h'
                  },
                  {
                      type: 'day',
                      count: 1,
                      text: '1d'
                  },
                  {
                      type: 'all',
                      count: 1,
                      text: 'All'
                  }
              ],
              selected: 2,
              inputEnabled: true
          },
          plotOptions: {
              candlestick: {
                  downColor: 'blue',
                  upColor: 'red'
              }
          },
          series: [{
              name: 'Price',
              type: 'candlestick',
              data: chartdata,
              tooltip: {
                  valueDecimals: 8
              }
          }]
      });
  });
}

// 코인 심볼 배열
const currencySymbol = ["btc", "eth"]

// 데이터를 가져오는 함수
function getData() {
  const xhr = new XMLHttpRequest();
  const method = "GET";

  // 링크에 숨겨진 data-deptno값을 백엔드에 전송함
  const url = "https://api.coinone.co.kr/ticker?currency=all";

  xhr.onreadystatechange = e => {
      const { target } = e;

      if (target.readyState === XMLHttpRequest.DONE) {
        if (target.status === 200) {
          let currencyData = JSON.parse(target.response);
          // 화폐 가격 실시간 변경
          for (let currencyIdx = 0; currencyIdx < currencySymbol.length; currencyIdx++) {
            // console.log(currencyData[currencySymbol[currencyIdx]]);

            // 화폐 가격을 가리키는 요소를 priceData 변수에 할당
            const priceData = document.querySelectorAll('.' + currencySymbol[currencyIdx] + "-price")
            const beforeData = priceData[0].innerHTML;


            // 상향가인지 하향가인지 검사해서 스타일 적용
            // 이전 가격이 갱신된 가격보다 작을 경우 (상향)
            if (Number(beforeData) < Number(currencyData[currencySymbol[currencyIdx]].last)) {
              for (const i of priceData) {
                i.classList.remove("down");
                i.classList.add("up");
              }
            }

            // 이전 가격이 갱신된 가격보다 높을 경우 (하향)
            else if (Number(beforeData) > Number(currencyData[currencySymbol[currencyIdx]].last)) {
              for (const i of priceData) {
                i.classList.remove("up");
                i.classList.add("down");
              }
            }

            // 새 가격으로 innerHTML을 갱신
            for (const i of priceData) {
              i.innerHTML = currencyData[currencySymbol[currencyIdx]].last;
            }
          }
        }
      }
  };

  xhr.open(method, url);
  xhr.send();
}
// 페이지 첫 로드시 BTC로 차트 로드
draw3("BTC");
// getData 함수 1초 주기로 반복 실행
setInterval(getData, 1000);