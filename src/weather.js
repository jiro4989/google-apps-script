/**
 * 検索対象の都市。
 * @type {String}
 */
const weatherSearchCity = props.getProperty('WEATHER_SEARCH_CITY');

/**
 * 検索対象の国。
 * @type {String}
 */
const weatherSearchCountry = props.getProperty('WEATHER_SEARCH_COUNTRY');

/**
 * Twitterのユーザー名を指定都市の現在の天気と時刻を付与して更新する。
 */
function updateTwitterUserNameWithCurrentWeather() {
  const searchQuery = {
    city: weatherSearchCity,
    country: weatherSearchCountry,
  };
  const weatherIcon = openWeatherMapUtilFetchCurrentWeatherIcon(searchQuery);
  const newUserName = userName + weatherIcon + utilFormatTime(new Date());
  twitterApiPostUpdateUserName(newUserName);
}
