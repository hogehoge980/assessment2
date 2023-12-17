//ます最初に要素を作る。htmlからidを参照して（右辺）それをこっちで参照ようにするために
//左辺で設定する userNameInput =document.getElementById('user-name);とか

'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

/*htmlにある  <button id="assessment">診断する</button>があるので
今はassessmentButtonという名前に.jsの方では切り替わってる。そしてこれに.onclick
をつけることで診断するって所がボタンだからそれを押したらファンクション関数が動けと命令している
内容はhtmlの方で    <input type="text" id="user-name" size="40" maxlength="20">
というテキストを入力するスペースを作ったから、そこに対して、.valueを繋げることで
const usernameInput = document.getElementById('user-name');
事態はまず要素usernameInputという箱を作っただけで、このuser-nameに入ってる値 Valueは
参照できないので、だからusernameInput.valueとわざわざ .valueをお尻につなげている*/


assessmentButton.onclick = () =>{
  const username = userNameInput.value;
  if(username.length === 0) {
    return;
  }

  /*次に、最初はまずh3の要素を作成してheaderというところに代入している。
  次にそのheader要素に対して、htmlでtextで表示が可能にするために.innerTextを追加している
  これがないとhtml側で読み込んでも表示されない。なのでわざわざheader.innerTextとしている
  次にheader.innnerTextだけではhtml上には表示されない。あくまでh3要素でかつhtmlテキスト
  に変換したものをheaderに代入してくれってしているだけここまでで。
  だからその後にhtml上に表示したければ、resultdivisionの場所に.appendChild（表示してくれ）
  そしてその表示して欲しいのは上のheaderであるということ。これは
  header.innerTextと書いてもいいんだけど。
    resultDivision.appendChild(header.innerText);省略できて
    右辺(innerText)が左辺のheader代入しているとみなしてもいい。
    だから  resultDivision.appendChild(header);でもOK
  */

  resultDivision.innerText='';

  /*const header = document.createElement('h3');
  header.innerText = '診断結果です,header.innerTextで作りました';
  resultDivision.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(username);
  paragraph.innerText = result;
  resultDivision.appendChild(paragraph); */

  //headerDivisionの作成
  const headerDivision = document.createElement('div');
  headerDivision.setAttribute('class', 'card-header text-bg-primary');
  headerDivision.innerText = '診断結果';

  //bodiDivisionの作成
  const bodyDivision = document.createElement('div');
  bodyDivision.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(username);
  paragraph.innerText = result;
  bodyDivision.appendChild(paragraph);

  //resultDivisionにBootstrapのスタイルを適用する。
  resultDivision.setAttribute('class', 'card');

  //headerDivisionとbodyDivisionをresultDivisionに差し込む
  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);


    // ツイートエリアの作成

  tweetDivision.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
  'https://twitter.com/intent/tweet?button_hashtag=' +
  encodeURIComponent('あなたのいいところ') +
  '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';

  tweetDivision.appendChild(anchor);

  // Twitter widgets.js の追加

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivision.appendChild(script);
};

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};


const answers = [
  '###userName###0のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###1のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###2のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###3のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###4のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###5のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###6のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###7のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###8のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###9のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###10のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###11のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###12のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###13のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###14のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###15のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/*
.charCodeAt(i) の意味
.charCodeAt(i) は、文字列内の特定の文字の Unicode コードポイントを取得するメソッドです。
i は、文字列内の文字の位置を表すインデックス (0 から始まる) です。

例えば、文字列 "Takeshi" では:

takeshi.charCodeAt(0) は "T" の Unicode コードポイント (84) を返します。
takeshi.charCodeAt(1) は "a" の Unicode コードポイント (97) を返します。
i が username.length (6) より小さい限り、以下の処理を繰り返します。
i = 0: sumofcharcode = 0 + takeshi.charCodeAt(0) (84)
i = 1: sumofcharcode = 84 + takeshi.charCodeAt(1) (97)
i = 2: sumofcharcode = 181 + takeshi.charCodeAt(2) (107)
i = 3: sumofcharcode = 288 + takeshi.charCodeAt(3) (115)
i = 4: sumofcharcode = 403 + takeshi.charCodeAt(4) (104)
i = 5: sumofcharcode = 507 + takeshi.charCodeAt(5) (105)
ループ終了:

i が username.length (6) に達するとループは終了します。
結果:

最終的な sumofcharcode の値は 507+105 = 612 になります。
612%12 の意味は612/16です。(またAnswersが１６項目あるから) =計算結果は 
38と4余りです。なので４番目を選ぶことになります。

*/


function assessment(username){
  let sumofcharcode = 0;
  for(let i=0; i<username.length; i++){
    sumofcharcode = sumofcharcode + username.charCodeAt(i);
  }

  const index = sumofcharcode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', username);
  return result;
}

function test(){
  console.log('診断結果の文章のテスト');
//太郎
console.log('太郎');
console.assert(assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

//次郎
console.log('次郎');
console.assert(
  assessment('次郎') ===
    '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

//花子
console.log('花子');
console.assert(
  assessment('花子') ===
    '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.log('診断結果の文章のテスト終了');

console.log('同じ名前なら、同じ結果を出力することのテスト');

console.log('太郎');
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)

console.log('次郎');
console.assert(
  assessment('次郎') === assessment('次郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)

console.log('花子');
console.assert(
  assessment('花子') === assessment('花子'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)

console.log('同じ名前なら、同じ結果を出力することのテスト終了');
}

test();

