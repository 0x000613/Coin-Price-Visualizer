// 버튼 이벤트

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
// 페이지 첫 로드시 BTC로 차트 로드
draw3("BTC");



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
            const priceData = document.querySelector('.' + currencySymbol[currencyIdx] + "-price")
            const beforeData = priceData.innerHTML;

            // 상향가인지 하향가인지 검사해서 스타일 적용
            // 이전 가격이 갱신된 가격보다 작을 경우 (상향)
            if (Number(beforeData) < Number(currencyData[currencySymbol[currencyIdx]].last)) {
              priceData.classList.remove("down");
              priceData.classList.add("up");
            }

            // 이전 가격이 갱신된 가격보다 높을 경우 (하향)
            else if (Number(beforeData) > Number(currencyData[currencySymbol[currencyIdx]].last)) {
              priceData.classList.remove("down");
              priceData.classList.add("up");
            }

            // 새 가격으로 innerHTML을 갱신
            priceData.innerHTML = currencyData[currencySymbol[currencyIdx]].last;
          }
        }
      }
  };

  xhr.open(method, url);
  xhr.send();
}

setInterval(getData, 5000);