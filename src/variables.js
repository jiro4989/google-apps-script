
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
