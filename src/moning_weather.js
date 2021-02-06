/**
 * sendEmail はメールで気象情報を送信します。
 */
function sendEmail() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('B2:F32');
  const values = range.getValues();
  for (let i=0; i<values.length; i++) {
    const to = values[i][0];
    const city = values[i][1];
    const country = values[i][2];

    if (to.length < 1) continue;
    const json = getWeatherJSON(city, country);
    Logger.log(json);

    const item = json.list[0];
    const main = item.main;

    const temp = main.temp;
    const pres = main.pressure;
    const humi = main.humidity;
    const tmin = main.temp_min;
    const tmax = main.temp_max;
    const jst = formatTime(new Date(item.dt * 1000));
    const weatherIcon = '';
    // var weatherIcon = getWeatherIconString(item.weather[0].id)

    const subject = '[気象情報(日次)] [' + city + '] ' + formatTime(new Date());

    let message = '[' + city + ']の気象情報を通知いたします。\n\n';
    message += '## 気象記録日時\n' + jst + '\n\n';
    message += '## 天候\n';
    message += item.weather[0].main + ' ' + weatherIcon + '\n\n';
    message += '## 気温\n';
    message += '平均気温 ' + temp + '度\n';
    message += '最低気温 ' + tmin + '度\n';
    message += '最高気温 ' + tmax + '度\n\n';
    message += '## 気圧\n' + pres + 'hPa\n\n';
    message += '## 湿度\n' + humi + '%\n\n';

    MailApp.sendEmail(to, subject, message);
  }
}

/**
 * formatTime はDate変数から時刻文字列を生成します。
 * @param {Date} dt
 * @return {String}
 */
function formatTime(dt) {
  const year = dt.getFullYear();
  const month = ('0' + (dt.getMonth() + 1)).slice(-2);
  const date = ('0' + dt.getDate()).slice(-2);
  const hours = ('0' + dt.getHours()).slice(-2);
  const minutes = ('0' + dt.getMinutes()).slice(-2);
  const seconds = ('0' + dt.getSeconds()).slice(-2);
  return year + '/' + month + '/' + date + ' ' +
      hours + ':' + minutes + ':' + seconds + ' GMT+0900(JST)';
}
