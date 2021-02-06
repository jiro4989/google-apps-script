/**
 * 天気を検索してSlackに通知するBot。
 * スラッシュコマンドから起動される。
 * @param {Event} e
 * @return {Error}
 */
function doPost(e) {
  const verifyToken = '';

  if (e) {
    // 投稿の認証
    if (verifyToken != e.parameter.token) {
      throw new Error('invalid token.');
    }

    const app = SlackApp.create(slackIncomingWebhookToken);

    const chanel = '#weather';
    const botName = '気象情報Bot';

    let message = '';
    const city = e.parameter.text.substr('weather:'.length);
    try {
      const weather = openWeatherMapApiFetchWeather(weatherSearchCity,
          weatherSearchCountry);
      switch (weather.cod) {
        case 200:
          message = 'はい、[' + e.parameter.text.substr('weather:'.length) +']';
          break;
        default:
          message = '申し訳ありません。\n気象情報の取得に失敗いたしました。\n' +
              '存在していない都市名を指定していませんか？\n' +
              'city=[' + city + '],code=[' + weather.cod + ']';
      }
    } catch (e) {
      message = '申し訳ありません。\n気象情報の取得に失敗いたしました。\n' +
          '存在していない都市名を指定していませんか？\n' +
          'city=[' + city + ']';
    }

    return app.postMessage(chanel, message, {
      username: botName,
    });
  }

  return new Error('Parameter is null.');
}
