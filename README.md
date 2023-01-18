# さいてんクン

小学校の先生のテスト自動作成、採点業務を効率化する web アプリ(デモアプリです)

[アプリリンク](https://saiten-kun.net)

## アプリ詳細

- 本アプリの機能はおおきく分けて２種類
  _ 先生機能<br>
  ┗ 生徒新規登録<br>
  ┗ テスト問題自動作成<br>
  ┗ テスト採点<br>
  _ 生徒機能<br>
  ┗ テスト開始<br>
  ┗ 今までのテスト<br>
  <br>
- テストは ChatGPT により自動作成
- 生徒の手書き文字を手書き文字認識 AI によりテキスト化し自動採点を実施
<br>
<br>
<br>
## アプリの使い方(先生側)

### 生徒の新規登録
  <p>
<img src="./README_img/01.png" alt="altテキスト" width="150"/>
<img src="./README_img/02.png" alt="altテキスト" width="150"/>
<img src="./README_img/03.png" alt="altテキスト" width="150"/>
<img src="./README_img/04.png" alt="altテキスト" width="150"/>
  </p>
  　ログイン⇨生徒新規登録⇨必要情報入力⇨生徒一覧で登録を確認

<br>
<br>

### テストの作成
  <p>
<img src="./README_img/01.png" alt="altテキスト" width="150"/>
<img src="./README_img/05.png" alt="altテキスト" width="150"/>
<img src="./README_img/06.png" alt="altテキスト" width="150"/>
<img src="./README_img/07.png" alt="altテキスト" width="150"/>
  </p>
  　ログイン⇨テスト作成⇨テストの科目等を選択⇨登録ボタンを押下


<br>
<br>

### テストの開始
  <p>
<img src="./README_img/01.png" alt="altテキスト" width="150"/>
<img src="./README_img/08.png" alt="altテキスト" width="150"/>
<img src="./README_img/09.png" alt="altテキスト" width="150"/>
  </p>
  　ログイン⇨テスト一覧⇨テストを選択して時間をセット後、「テスト開始」を押下


<br>
<br>

### テストの採点
  <p>
<img src="./README_img/01.png" alt="altテキスト" width="150"/>
<img src="./README_img/08.png" alt="altテキスト" width="150"/>
<img src="./README_img/10.png" alt="altテキスト" width="150"/>
<img src="./README_img/11.png" alt="altテキスト" width="150"/>
<img src="./README_img/12.png" alt="altテキスト" width="150"/>

  </p>
  　
  ログイン⇨テスト一覧⇨採点したいテストを選択⇨「自動採点」をクリック⇨成績を見たい生徒を選択


<br>
<br>
<br>

## アプリの使い方（生徒側）

### テストの開始
  <p>
<img src="./README_img/01.png" alt="altテキスト" width="150"/>
<img src="./README_img/13.png" alt="altテキスト" width="150"/>
<img src="./README_img/14.png" alt="altテキスト" width="150"/>
<img src="./README_img/15.png" alt="altテキスト" width="150"/>
  </p>
  ※先生のテスト開始後<br>
  ログイン⇨テスト開始を選択⇨出題されたテストを解く⇨右上の提出を選択しOKを押下
<br>
<br>

### テストの結果確認
  <p>
<img src="./README_img/01.png" alt="altテキスト" width="150"/>
<img src="./README_img/16.png" alt="altテキスト" width="150"/>
<img src="./README_img/17.png" alt="altテキスト" width="150"/>
<img src="./README_img/18.png" alt="altテキスト" width="150"/>
  </p>
  ※先生のテスト採点後<br>
  ログイン⇨今までのテストを選択⇨テストを選択しテスト結果確認を押下⇨自分の点数を確認
<br>
<br>
<br>
<br>



## 使用している技術
* フロントエンド<br>
  ┗React<br>
   　 ┗ react-router(ルーティングライブラリ)<br>
    　┗ recoil(ステート管理ライブラリ)<br>
    　┗ react-three-fiber(3Dアニメーションライブラリ)<br>
    　┗ MaterialUi(UIコンポーネントライブラリ)<br>
    　┗react-rewards(紙吹雪アニメーションライブラリ)<br>
  ┗webAPI<br>
    　┗ChatGPT(自然言語処理モデルAI-テスト作成に使用)<br>
    　┗UserLocal(手書き文字認識AI)<br>
<br>
<br>

## 注意事項
* ChatGPTはライセンス制限により問題作成に制限がかかる可能性があります。<br>
* UserLocalの文字認識AIのAPIは現在1000回/24hの制限があります。<br>


## 文責

* 作成者 kazu006 Tera-saka Yusuke333 riiiiion
* 所属　Taylor

