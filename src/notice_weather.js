/**
 * main
 */
function main() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange('A2:I64');
  const values = range.getValues();

  // スプレッドシートのユーザーレコード数分処理
  for (let i=0; i<values.length; i++) {
    const user = values[i];
    sendEmail(user);
  }
}

/**
 * ユーザーレコードの都市、国情報から天気情報を取得し、
 * 気温が基準値を超過していた場合にメール通知をだす
 * @param {*} user
 */
function sendEmail(user) {
  Logger.log('sendNotice:', user);

  const userMap = toMap(user);

  if (userMap.id === '' || !userMap.sendable) {
    Logger.log('IDか通知フラグがfalseのため処理をスキップ');
    return;
  }

  // スプレッドシートの情報を定期実行にセットすることはできないので
  // 毎時間起動するけれど、現在時刻がユーザ定義時間かどうか判定し、
  // trueのときは後続の処理を実行するようにする。
  if (!isRangeTime(userMap, new Date())) {
    Logger.log('ユーザ定義時間でないのでスキップ');
    return;
  }

  // 現在気温を取得
  const weather = getWeatherJSON(userMap.city, userMap.country);
  const currentTemperature = weather.list[0].main.temp;
  const minTemperature = weather.list[0].main.temp_min;
  const maxTemperature = weather.list[0].main.temp_max;

  // 気温が下限値を下回ったら通知
  if (minTemperature < userMap.underTemperature) {
    Logger.log('気温が下限を下回っていたのでメール通知');
    const info = '⇩';
    send(userMap, info, weather);
    return;
  }

  // 気温が上限値を上回ったら通知
  if (userMap.overTemperature < maxTemperature) {
    Logger.log('気温が上限を上回っていたのでメール通知');
    const info = '⇧';
    send(userMap, info, weather);
    return;
  }
}

/**
 * UserをMapに変換する
 * @param {User} user
 * @return {Map}
 */
function toMap(user) {
  return {
    id: user[0],
    name: user[1],
    email: user[2],
    noticeTime: user[3],
    underTemperature: user[4],
    overTemperature: user[5],
    city: user[6],
    country: user[7],
    sendable: user[8],
  };
}

/**
 * isRangeTime は時刻が、ユーザのメール通知時刻かどうかを判定する。
 * @param {User} user
 * @param {Date} date
 * @return {Boolean}
 */
function isRangeTime(user, date) {
  const userTime = takeFormatedTime(user.noticeTime);
  const checkTime = takeFormatedTime(date);
  const userTimeHour = userTime.split(':')[0];
  const checkTimeHour = checkTime.split(':')[0];
  return userTimeHour === checkTimeHour;
}

/**
 * メールを送信する。
 * @param {Map} userMap
 * @param {String} info
 * @param {Object} weather
 */
function send(userMap, info, weather) {
  const weatherIcon = getWeatherIconString(weather.list[0].weather[0].id);
  info = weatherIcon + info;

  const subject = makeSubject(userMap, info);
  const message = makeMessage(userMap, weather);

  MailApp.sendEmail(userMap.email, subject, message);
}


/**
 * makeSubject はメール件名を作成する。
 * @param {User} user
 * @param {String} message
 * @return {String}
 */
function makeSubject(user, message) {
  const currentTime = getCurrentFormatedDateTime();
  const subject = '【お天気情報】' + currentTime + '/' + message;
  return subject;
}

/**
 * makeMessage はメール本文を作成する。
 * @param {User} user
 * @param {Object} weather
 * @return {String}
 */
function makeMessage(user, weather) {
  const weatherIcon = getWeatherIconString(weather.list[0].weather[0].id);
  const currentTemperature = weather.list[0].main.temp;
  const minTemperature = weather.list[0].main.temp_min;
  const maxTemperature = weather.list[0].main.temp_max;
  const message = user.name + ' 様\n\n' +
    user.city + 'の現在の天気情報です。\n\n' +
      '天気: ' + weatherIcon + '\n' +
      '現在気温: ' + currentTemperature + '\n' +
      '最低気温: ' + minTemperature + '\n' +
      '最高気温: ' + maxTemperature + '\n';
  return message;
}
