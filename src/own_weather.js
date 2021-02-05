/**
 * 検索対象の都市。
 * @type {String}
 */
const ownWeatherSearchCity = props.getProperty('OWN_WEATHER_SEARCH_CITY');

/**
 * 検索対象の国。
 * @type {String}
 */
const ownWeatherSearchCountry = props.getProperty('OWN_WEATHER_SEARCH_COUNTRY');

/**
 * Twitterのユーザー名を指定都市の現在の天気と時刻を付与して更新します。
 */
function ownWeatherUpdateUserNameWithCurrentWeather() {
  const weather = openWeatherMapApiFetchWeather(ownWeatherSearchCity,
      ownWeatherSearchCountry);
  const weatherIcon = ownWeatherWeatherJsonToWeatherIcon(weather);
  const newUserName = userName + weatherIcon + utilFormatTime(new Date());
  twitterApiPostUpdateUserName(newUserName);
}

/**
 * OpenWeatherMapのAPIレスポンスを天気アイコン文字列に変換して返す。
 * @param {Object} weatherJson
 * @return {String}
 */
function ownWeatherWeatherJsonToWeatherIcon(weatherJson) {
  const jsonData = JSON.parse(weatherJson);
  const weatherCode = jsonData.weather[0].id;
  const weatherIcon = ownWeatherWeatherCodeToWeatherIcon(weatherCode);
  Logger.log(weatherIcon);
  return weatherIcon;
}

/**
 * OpenWeatherMapの天気コードを天気の絵文字に変換して返す。
 * @param {Number} weatherCode 天気コード
 * @return {String}
 */
function ownWeatherWeatherCodeToWeatherIcon(weatherCode) {
  const weather = Math.floor(weatherCode / 100);
  switch (weather) {
    case 2:
    case 3:
    case 5:
      return '☔️';
    case 6:
      return '☃️';
    case 7:
      return '🌫️';
    case 8:
      if (weatherCode == 800) return '🌞';
      else return '☁️';
    default:
      return '❓';
  }
}
