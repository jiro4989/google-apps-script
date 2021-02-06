// wip //

function doPost(e) {
    var verifyToken = "";
    
    if (e) {
      //投稿の認証
      if (verifyToken != e.parameter.token) {
        throw new Error("invalid token.");
      }
    
      var app = SlackApp.create(slackIncomingWebhookToken);
      
      var chanel = "#weather";
      var botName = "気象情報Bot";
  
      var message = "";
      var city = e.parameter.text.substr("weather:".length);
      try {
        var weather = openWeatherMapApiFetchWeather(ownWeatherSearchCity, ownWeatherSearchCountry);
        switch (weather.cod) {
          case 200:
            message = "はい、[" + e.parameter.text.substr("weather:".length) +"]";
            break;
          default:
            message = "申し訳ありません。\n気象情報の取得に失敗いたしました。\n存在していない都市名を指定していませんか？\ncity=[" + city + "],code=[" + weather.cod + "]";
        }
      } catch (e) {
        message = "申し訳ありません。\n気象情報の取得に失敗いたしました。\n存在していない都市名を指定していませんか？\ncity=[" + city + "]";
      }
  
      return app.postMessage(chanel, message, {
        username: botName
      });
    }
    
    return new Error("Parameter is null.");
  }