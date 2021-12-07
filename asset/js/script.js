// 현재 정보창이 활성화된 코인 심볼 Init
var currentViewCurrency = "btc";

// 코인 심볼 배열
// 플로닉스 차트에서 화폐 누적 데이터를 가져올때 사용함
const currencySymbol = ["btc", "eth", "xrp", "doge", "etc", "bch", "ltc", "btt", "trx", "eos", "qtum"]

// 버튼 이벤트
const coinListItems = document.querySelectorAll(".coin-list-item");
for (const btn of coinListItems) {
  btn.addEventListener("click", e => {
    // 활성화 코인 변경
    currentViewCurrency = e.currentTarget.classList[0];
    // 코인 리스트에서 코인 클릭시 즉시 ajax 데이터 갱신
    getCoinData();
    // 상단 코인 정보창 코인 가격 갱신
    document.querySelector("#info-currency-price").classList = e.currentTarget.classList[0] + "-price";
    // 상단 코인 정보창 코인 심볼명 갱신
    document.querySelector("#info-currency").innerHTML = e.currentTarget.classList[0].toUpperCase();
    // 클릭된 코인으로 차트 재생성
    drawChart(e.currentTarget.classList[0].toUpperCase());
  })
}

// 3자리마다 콤마 찍는 함수 정의
function comma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 차트 생성, 갱신 함수
function drawChart(symbol) {
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

// 코인 정보 데이터를 가져오는 함수 (Coinone API, Poloniex API)
function getCoinData() {
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
            const beforeData = parseInt(priceData[0].innerHTML);

            // 등락률 갱신
            const rangePriceData = document.querySelectorAll('.' + currencySymbol[currencyIdx] + "-range-price");
            for (const i of rangePriceData) {
              // 등락률 계산 후 innerHTML 삽입
              i.innerHTML = (((currencyData[currencySymbol[currencyIdx]].last - currencyData[currencySymbol[currencyIdx]].yesterday_last) / currencyData[currencySymbol[currencyIdx]].yesterday_last) * 100).toFixed(2);
              // 등락률이 어제보다 낮을경우 (등)
              if ((((currencyData[currencySymbol[currencyIdx]].last - currencyData[currencySymbol[currencyIdx]].yesterday_last) / currencyData[currencySymbol[currencyIdx]].yesterday_last) * 100) < 0) {
                i.classList.remove("up");
                i.classList.add("down");
              }
              // 등락률이 어제보다 높을 경우 (락)
              else if ((((currencyData[currencySymbol[currencyIdx]].last - currencyData[currencySymbol[currencyIdx]].yesterday_last) / currencyData[currencySymbol[currencyIdx]].yesterday_last) * 100) >= 0) {
                i.classList.remove("down");
                i.classList.add("up");
              }
            }

            // 거래량 갱신
            const allVolumeData = document.querySelectorAll('.' + currencySymbol[currencyIdx] + "-amount-volume");
            for (const i of allVolumeData) {
              i.innerHTML = comma(parseInt(currencyData[currencySymbol[currencyIdx]].volume));
            }

            // 상향가인지 하향가인지 검사해서 스타일 적용
            // 이전 가격이 갱신된 가격보다 작을 경우 (상향)
            if (parseInt(beforeData) < parseInt(currencyData[currencySymbol[currencyIdx]].last)) {
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
              i.innerHTML = comma(currencyData[currencySymbol[currencyIdx]].last);
            }
            // 상단 코인 정보창 고가 갱신
            document.querySelector(".high-price").innerHTML = comma(parseFloat(currencyData[currentViewCurrency].high).toFixed(3));
            // 상단 코인 정보창 저가 갱신
            document.querySelector(".low-price").innerHTML = comma(parseFloat(currencyData[currentViewCurrency].low).toFixed(3));
            // 상단 코인 정보창 전일가 갱신
            document.querySelector(".previous-price").innerHTML = comma(parseFloat(currencyData[currentViewCurrency].yesterday_last).toFixed(3));
            // 상단 코인 정보창 거래량 갱신
            document.querySelector(".volume").innerHTML = comma(parseFloat(currencyData[currentViewCurrency].volume).toFixed(3));
          }
        }
      }
  };

  xhr.open(method, url);
  xhr.send();
}

// 페이지 첫 로드시 BTC로 차트 로드
drawChart("BTC");
// getData 함수 1초 주기로 반복 실행
setInterval(getCoinData, 1000);