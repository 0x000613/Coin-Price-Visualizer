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

// Poloniex API로 누적 데이터를 가져오고 해당 누적 데이터로 차트 생성, 갱신하는 함수
function drawChart(symbol) {
    var chartdata = [];
    $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_' + symbol + '&start=1455699200&end=9999999999&period=14400', function(data) {
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

// 코인 정보 데이터를 가져오는 함수 (Coinone API)
function getCoinData() {
    const xhr = new XMLHttpRequest();
    const method = "GET";

    // 링크에 숨겨진 data-deptno값을 백엔드에 전송함
    const url = "https://api.coinone.co.kr/ticker?currency=all";

    xhr.onreadystatechange = e => {
        const {
            target
      } = e;

        

        if (target.readyState === XMLHttpRequest.DONE) {
            if (target.status === 200) {
              // Coinone API로부터 리턴받은 데이터
              currencyData = JSON.parse(target.response);

              // 심볼 하나씩 순회
              for (const symbol of currencySymbol) {
                // 암호 화폐 가격 갱신 파트
                // 선택된 심볼 암호화폐의 가격을 나타내는 HTML 요소를 순회
                for (const currencyPriceElement of document.querySelectorAll('.' + symbol + "-price")) {
                  // 해당 요소의 innerHTML을 API로 가져온 암호화폐 가격으로 갱신
                  // 이전 가격과 비교하여 가격이 올랐으면 (replaceAll을 이용해 콤마를 제거한 순수 값을 가져와서 대조함)
                  if (parseFloat(currencyPriceElement.innerHTML.replaceAll(',', '')) < currencyData[symbol].last) {
                    // down 클래스 제거, up 클래스 부여
                    currencyPriceElement.classList.add("highlight");
                    setTimeout(() => currencyPriceElement.classList.remove("highlight"), 500);
                    currencyPriceElement.classList.remove("down");
                    currencyPriceElement.classList.add("up");
                    // 가격 업데이트
                    currencyPriceElement.innerHTML = comma(currencyData[symbol].last)
                  }
                  // 이전 가격과 비교하여 가격이 내렸으면
                  else if (parseFloat(currencyPriceElement.innerHTML.replaceAll(',', '')) > currencyData[symbol].last) {
                    // up 클래스 제거, down 클래스 부여
                    currencyPriceElement.classList.add("highlight");
                    setTimeout(() => currencyPriceElement.classList.remove("highlight"), 500);
                    currencyPriceElement.classList.remove("up");
                    currencyPriceElement.classList.add("down");
                    // 가격 업데이트
                    currencyPriceElement.innerHTML = comma(currencyData[symbol].last)
                  }
                }

                // 암호 화폐 등락률 갱신 파트
                // 선택된 심볼 암호화폐의 등락률을 나타내는 HTML 요소를 순회
                for (const currencyRangePriceElement of document.querySelectorAll('.' + symbol + "-range-price")) {
                  // 해당 요소의 innerHTML을 API로 가져온 암호화폐 데이터를 가반으로 계산하여 으로 갱신
                  // 이전 등락률과 비교하여 등락률이 올랐으면 (replaceAll을 이용해 콤마를 제거한 순수 값을 가져와서 대조함)
                  if (parseFloat(currencyRangePriceElement.innerHTML.replaceAll(',', '')) < currencyData[symbol].yesterday_last) {
                    // down 클래스 제거, up 클래스 부여
                    currencyRangePriceElement.classList.remove("down");
                    currencyRangePriceElement.classList.add("up");
                    // 등락률 업데이트
                    currencyRangePriceElement.innerHTML = comma(((currencyData[symbol].last - currencyData[symbol].yesterday_last) / currencyData[symbol].yesterday_last * 100).toFixed(2))
                  }
                  // 이전 등락률과 비교하여 등락률이 내렸으면
                  else if (parseFloat(currencyRangePriceElement.innerHTML.replaceAll(',', '')) > currencyData[symbol].yesterday_last) {
                    // up 클래스 제거, down 클래스 부여
                    currencyRangePriceElement.classList.remove("up");
                    currencyRangePriceElement.classList.add("down");
                    // 등락률 업데이트
                    currencyRangePriceElement.innerHTML = comma(((currencyData[symbol].last - currencyData[symbol].yesterday_last) / currencyData[symbol].yesterday_last * 100).toFixed(2))
                  }
                }
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
setInterval(getCoinData, 500);