
/**
 * GASのスクリプトプロパティ。
 * @type {Object}
 */
const props = PropertiesService.getScriptProperties();

/**
 * ユーザ名。
 * @type {String}
 */
const userName = props.getProperty('USER_NAME');

/**
 * TwitterアカウントのユーザID
 * @type {String}
 */
const twitterUserId = props.getProperty('TWITTER_USER_ID');

function setProperties() {
  props.setProperty('WEATHER_SEARCH_CITY', '');
  props.setProperty('WEATHER_SEARCH_COUNTRY', '');
  props.setProperty('USER_NAME', '');
  props.setProperty('OPEN_WEATHER_MAP_API_KEY', '');
  props.setProperty('TWITTER_API_KEY', '');
  props.setProperty('TWITTER_API_SECRET', '');
}
