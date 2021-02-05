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
