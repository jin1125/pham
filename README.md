[![top](https://user-images.githubusercontent.com/60165363/135390500-710d67ad-216f-4713-a1d4-21403214cc62.png)](https://pham.vercel.app/)

# **Pham**
## :pill: **概要**
---
### **コンセプト**  
- 薬局薬剤師向けビジネスSNS(現役薬剤師監修)

### **ターゲット**  
- 薬局薬剤師

- 薬局人事

### **解決課題**
- 自分のキャリアをあまり意識していない人が多い  
(今までの転職回数が多すぎて職務経歴を覚えてない方も)

- 転職候補として上がるのは、知名度のある大手薬局、近所の薬局、昔の実習先、知人紹介、人材紹介経由がほとんど

- どの職場でも給与や業務内容的には大きくは異ならないため、なんとなくで就業先を決めてしまっている人が多い


### **できること**  
- プロフィール作成し、自分の経歴やスキルを可視化

- 薬剤師同士でのメッセージ交流  

- 企業ページから企業・薬局の個性を知る

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
#### https://pham.vercel.app/
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
- [ ] アナリティクス、GTM
- [ ] firebaseセキュリティルール
- [ ] confirmデザイン変更
- [ ] 画像トリミング機能
- [ ] メッセージのユーザーリストを最新順に並び替え
- [ ] さらにTypescript化を進める