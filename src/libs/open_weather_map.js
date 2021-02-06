/**
 * OpenWeatherMapのAPIキー。
 * @type {String}
 */
const openWeatherMapApiKey = PropertiesService
    .getScriptProperties()
    .getProperty('OPEN_WEATHER_MAP_API_KEY');

/**
 * OpenWeatherMapのBaseURL。
 * @type {String}
 */
const openWeatherMapApiBaseUrl = 'http://api.openweathermap.org/data/2.5';

/**
 * OpenWeatherMapのAPIを呼び出して指定都市の天気情報をObjectで取得する。
 * @param {String} city 検索都市
 * @param {String} country 検索国
 * @return {Object}
 */
function openWeatherMapApiFetchWeather(city, country) {
  const url = `${openWeatherMapApiBaseUrl}/weather` +
    `?q=${city},${country}&appid=${openWeatherMapApiKey}`;
  const json = UrlFetchApp.fetch(url).getContentText();
  return JSON.parse(json);
}


/*
================================================================================

  Utilities

================================================================================
*/

/**
 * OpenWeatherMapの天気コードを天気の絵文字に変換して返す。
 * @param {Number} weatherCode 天気コード
 * @return {String}
 */
function openWeatherMapUtilWeatherCodeToWeatherIcon(weatherCode) {
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

/**
 * OpenWeatherMapのAPIレスポンスを天気アイコン文字列に変換して返す。
 * @param {Object} weather
 * @return {String}
 */
function openWeatherMapUtilFetchCurrentWeatherIcon(queryParam) {
  const weather = openWeatherMapApiFetchWeather(queryParam.city, queryParam.country);
  const weatherCode = weather.weather[0].id;
  const weatherIcon = openWeatherMapUtilWeatherCodeToWeatherIcon(weatherCode);
  return weatherIcon;
}
