[![top](https://user-images.githubusercontent.com/60165363/135390500-710d67ad-216f-4713-a1d4-21403214cc62.png)](https://pham.jp/)

# **Pham**
## :pill: **概要**
---
### **コンセプト**  
- 薬局薬剤師向けビジネスSNS [現役薬剤師監修]

### **サービス概要資料**
#### https://bit.ly/3uuQGrS

### **ターゲット**  
- 薬局薬剤師

- 薬局採用担当者

### **解決課題**
- 自分のキャリアをあまり意識せず、なんとなくで就業先を決めてしまっている薬局薬剤師さんが多い
  - 売り手市場のため、短期間な給与アップのために転職を繰り返したり、特にキャリアを意識せずとも就職に困らない

  - そもそも職務経歴自体を覚えてないことも

  - 約7割が女性ということもあり、ライフイベントに重きをおいたキャリア形成
  
  - どの職場でも給与や業務内容が大きく異ならないことが多いので、たまたま知ってる薬局への直接応募や紹介事業者経由で転職


### **できること**  
- プロフィール作成し、自分や他者の経歴やスキルを可視化＆共有

- 薬剤師同士でのメッセージ交流  

- 企業・薬局の個性を知る

- 気になった求人には、お手軽応募

- 人事担当とはSNS内メッセージで簡単やりとり

|ログイン|プロフィール編集|
|:---:|:---:|
|![ログイン](https://user-images.githubusercontent.com/60165363/135390494-e7a69a2a-caf0-4961-86ca-39c75a4c9e15.png)|![プロフィール編集](https://user-images.githubusercontent.com/60165363/135390479-937af1a6-2e2d-418e-9d51-6215e0a95215.png)|

|メッセージ|薬剤師検索|
|:---:|:---:|
|![メッセージ](https://user-images.githubusercontent.com/60165363/135423920-2264aaa6-8580-4afc-97b7-9c03af4f65d5.png)|![薬剤師検索](https://user-images.githubusercontent.com/60165363/135423085-e23c14e9-3a1d-4b3b-af74-a8aa3f96f598.png)|

## :rocket: **デモ**
---
#### https://pham.jp/
レスポンシブ対応していますので、PC/TB/SPからご確認頂けます。

### **テストアカウント**
|メールアドレス|パスワード|
|:---:|:---:|
|testuser@gmail.com|123456|

### **クローン**
`$ git clone https://github.com/jin1125/pham.git`

`$ yarn run dev`

## :mag: **機能一覧**
---
- [x] 新規登録/ログイン(メールアドレス/Google)
- [x] メールアドレス変更
- [x] パスワード変更
- [x] ログアウト
- [x] アカウント削除(Authentication/Cloud Firestore)
- [x] お問い合わせ時メール送信
- [x] プロフィール編集
- [x] 画像アップロード
- [x] 検索(メッセージ/薬剤師/企業/求人)
- [x] 求人応募
- [x] マッチング
- [x] メッセージ

![求人応募](https://user-images.githubusercontent.com/60165363/135428801-9393bf4d-c533-4e2c-ac61-c03412f3726b.gif)

## :octocat: **使用技術**
---
|言語|
|:---|
|HTML/CSS|
|javascript|
|Typescript 4.4.3|
|Node.js 14.17.6|

|ライブラリ|
|:---|
|React 17.0.2|
|emoji-mart 3.0.1|
|react-alert 7.0.3|
|react-loading-skeleton 2.2.0|
|react-anchor-link-smooth-scroll 1.0.12 |

|フレームワーク|
|:---|
|Next.js 11.1.2|
|TailwindCSS 2.2.4|

|バックエンド|
|:---|
|vercel|
|**Firebase 8.10.0**|
| Authentication|
| Cloud Firestore|
| Storage|
| Functions 3.14.1|


|その他|
|:---|
|Algolia  4.10.5|
|headlessui 1.4.1|
|nodemailer 6.6.3|
|react-loader-spinner 4.0|

## :wrench: **実装予定機能**
---

- [ ] 企業用管理ページ
- [ ] 再レンダリング最適化
- [ ] Atomic Design化
- [ ] エラーチェック
- [ ] 認証入力値バリデーション
- [ ] 無限スクロール
- [ ] firebaseセキュリティルール
- [ ] confirmデザイン変更
- [ ] 画像トリミング機能
- [ ] メッセージのユーザーリストを最新順に並び替え