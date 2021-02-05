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
 * OpenWeatherMapのAPIを呼び出して指定都市の天気情報をJSON文字列で取得する。
 * @param {String} city 検索都市
 * @param {String} country 検索国
 * @return {String}
 */
function openWeatherMapApiFetchWeather(city, country) {
  const url = `${openWeatherMapApiBaseUrl}/weather` +
    `?q=${city},${country}&appid=${openWeatherMapApiKey}`;
  return UrlFetchApp.fetch(url).getContentText();
}
