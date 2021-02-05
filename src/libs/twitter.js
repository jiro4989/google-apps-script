/**
 * @type {Object} OAuth1認証用インスタンス。プロパティはGASの画面から設定が必要。
 */
const twitter = TwitterWebService.getInstance(
    PropertiesService.getScriptProperties().getProperty('TWITTER_API_KEY'),
    PropertiesService.getScriptProperties().getProperty('TWITTER_API_SECRET'),
);

/**
 * @type {String} TwitterAPIのBaseURL。
 */
const twitterApiBaseUrl = 'https://api.twitter.com/1.1';

/**
 * Twitterの認証を行います。
 * これはTwitterAPIを利用する際に必須の処理です。
 */
function twitterAuthorize() {
  twitter.authorize();
}

/**
 * Twitterの認証をリセットします。
 * 手動でGASの画面から実行します。
 */
function twitterReset() {
  twitter.reset();
}

/**
 * Twitterの認証のコールバック関数です。
 * この関数もTwitterAPI利用の際に必須です。
 * @param {Object} request
 * @return {Object}
 */
function twitterAuthCallback(request) {
  return twitter.authCallback(request);
}

/**
 * TwitterAPIを実行するためのラッパー関数。
 * TwitterAPIを呼びたい場合はすべてこの関数を経由して実行すること。
 *
 * @param {String} path URLのパス。'/'から始める必要がある
 * @param {Object} param リクエストパラメータ
 */
function twitterApi(path, param) {
  const service = twitter.getService();
  const url = twitterApiBaseUrl + path;
  const response = service.fetch(url, param);
  Logger.log(JSON.parse(response));
}

/**
 * ユーザのタイムラインを取得する。
 */
function twitterApiGetUserTimeline() {
  twitterApi('/statuses/user_timeline.json');
}

/**
 * アカウント設定を取得する。
 */
function twitterApiGetAccountSettings() {
  twitterApi('/account/settings.json');
}

/**
 * アカウント認証情報を取得する。
 */
function twitterApiGetAccountVerifyCredentials() {
  twitterApi('/account/verify_credentials.json');
}

/**
 * アカウントのプロフィール情報のユーザ名を更新する。
 * @param {String} userName ユーザ名
 */
function twitterApiPostUpdateUserName(userName) {
  twitterApi('/account/update_profile.json', {
    method: 'post',
    payload: {name: userName},
  });
}

/**
 * ツイートを投稿する。
 * @param {String} msg 送信するメッセージ
 */
function twitterApiPostTweet(msg) {
  twitterApi('/statuses/update.json', {
    method: 'post',
    payload: {status: msg},
  });
}
