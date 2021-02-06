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
  const searchQuery = {
    city: ownWeatherSearchCity,
    country: ownWeatherSearchCountry,
  };
  const weatherIcon = openWeatherMapUtilFetchCurrentWeatherIcon(searchQuery);
  const newUserName = userName + weatherIcon + utilFormatTime(new Date());
  twitterApiPostUpdateUserName(newUserName);
}
