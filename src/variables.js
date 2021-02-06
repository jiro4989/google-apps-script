
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

/**
 * スクリプトプロパティを更新する。
 * AppsScriptのUI上でスクリプトプロパティを更新できなくなったため
 * プロパティを更新したいときだけ以下の設定値を書き換えて手動実行する。
 */
function setProperties() {
  props.setProperty('WEATHER_SEARCH_CITY', '');
  props.setProperty('WEATHER_SEARCH_COUNTRY', '');
  props.setProperty('USER_NAME', '');
  props.setProperty('OPEN_WEATHER_MAP_API_KEY', '');
  props.setProperty('TWITTER_API_KEY', '');
  props.setProperty('TWITTER_API_SECRET', '');
}
