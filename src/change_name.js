//
// // 次郎のつぶやきを取得してスプレッドシートのセルの値を変更する。
// function changeName() {
//   // 次郎のつぶやきを取得
//   let mentionList = getMentions();
//   if (mentionList.length < 1) return;

//   // 特定の文言のみにフィルタ
//   const data = filterAndValidate(mentionList);
//   if (!data['ok']) return;

//   mentionList = data['result'];

//   // セルに埋め込む値のみ取得
//   const mention = mentionList[0].text;
//   const nameRegex = /^@[^\s]+\schname\s+([^\s]+)\s*.*/;
//   const name = mention.replace(nameRegex, '$1');

//   // セルに値を埋め込む
//   // 更新の際は、直前の名前をセルに残す
//   const sheet = SpreadsheetApp.getActiveSheet();
//   const befName = sheet.getRange('B1').getValue();
//   sheet.getRange('B1').setValue(name);
// }

// // 名前変更を実行するのに適当なつぶやきであるかの判定どデータフィルタを実施する。
// // 問題なければtrue, NGの場合はfalseを返す。
// // 不正なデータの場合はresultがnullになる。
// //
// // {"result":list, "ok":true}
// function filterAndValidate(mentionList) {
//   // 自分からのツイートのみ抽出
//   mentionList = mentionList.filter(function(v) {
//     const n = v.user.screen_name;
//     if (n == twitterUserId) return true;
//     else return false;
//   });
//   if (mentionList.length < 1) return {'result': null, 'ok': false};

//   // 文言がchnameから始まる
//   mentionList = mentionList.filter(function(v) {
//     const t = v.text;
//     const nt = t.replace(/@[^\s]+\s/g, '');
//     if (nt.match(/^chname\s+/)) return true;
//     else return false;
//   });
//   if (mentionList.length < 1) return {'result': null, 'ok': false};

//   // chnameに続いて文字列指定がある
//   mentionList = mentionList.filter(function(v) {
//     const t = v.text;
//     const nt = t.replace(/@[^\s]+\s/g, '');
//     if (nt.match(/^chname\s+([^\s]+)/)) return true;
//     else return false;
//   });
//   if (mentionList.length < 1) return {'result': null, 'ok': false};

//   return {'result': mentionList, 'ok': true};
// }
