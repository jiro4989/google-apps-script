/**
 * DateObjectから時刻文字列(hh:mm:ss)を生成して返す。
 * @param {Date} date 日付オブジェクト
 * @return {String}
 */
function utilFormatTime(date) {
  const pad = function(n) {
    return ('0' + n).slice(-2);
  };
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timeText = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  return timeText;
}

/*

// getCurrentFormatedTime は現在時刻を書式を整えて返す。
function getCurrentFormatedDateTime() {
  return formatTime(new Date());
}

function takeFormatedDate(dt) {
  return formatTime(dt).split(' ')[0];
}

function takeFormatedTime(dt) {
  return formatTime(dt).split(' ')[1];
}

// formatTime はDate変数から時刻文字列を生成します。
function formatTime(dt) {
  const year = dt.getFullYear();
  const month = ('0' + (dt.getMonth() + 1)).slice(-2);
  const date = ('0' + dt.getDate()).slice(-2);
  const hours = ('0' + dt.getHours()).slice(-2);
  const minutes = ('0' + dt.getMinutes()).slice(-2);
  const seconds = ('0' + dt.getSeconds()).slice(-2);
  return year + '-' + month + '-' + date + ' ' +
    hours + ':' + minutes + ':' + seconds;
}

*/
