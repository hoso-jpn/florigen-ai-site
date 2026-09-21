# Florigen AI

農業Physical AIと育種研究の個人プロジェクトサイト。Next.js Pages Router / Reactで構成しています。

- `/`: 研究方針・現在の取り組み・公開研究コード・プロフィール
- `/roadmap`: 生育観測・記録から育種評価へ進む研究計画と検証段階

## ローカル開発

Node.js 24（`.nvmrc`）とnpmを使用します。

```sh
nvm use
npm ci
cp .env.example .env.local
```

`.env.local` の `SITE_USER` と `SITE_PASSWORD` に自分の認証情報を設定してから起動します。

```sh
npm run dev
```

`http://localhost:3000` を開き、設定した認証情報を入力してください。片方でも未設定・空の場合は401になります。パスワードにはコロンを使用できます。認証情報を `NEXT_PUBLIC_` 変数に入れないでください。

## 検証

```sh
npm run verify
```

Lint、認証の単体テスト、本番ビルド、HTTPスモークテストを順に実行します。スモークテストはループバックの空きポートで本番サーバーを起動し、一時的なテスト用認証情報を使います。実際の認証情報や外部サービスへの接続は不要です。

PRとmain更新時にGitHub Actionsで同じ検証を行います。画面変更時は両ページをスマホ幅・デスクトップ幅で確認し、キーボード移動、ページ間のリンク、JavaScript無効時の本文表示も確認します。

## 内容の更新

| 更新対象 | 編集ファイル |
| --- | --- |
| 研究段階、現在の取り組み、公開リポジトリ、更新日 | `src/data/research.js` |
| トップページの紹介・プロフィール | `src/pages/index.js` |
| 検証ゲート・研究仮説 | `src/pages/roadmap.js` |
| メニューとモバイル表示 | `src/components/SiteNav.js` / `SiteNav.module.css` |
| タイトル・description・canonical等 | `src/components/SiteHead.js` と各ページのprops |
| 認証 | `src/proxy.js` / `src/lib/basic-auth.mjs` |

研究構想と検証済みの成果を区別し、内容を確認した際に `updatedAt` を更新します。リポジトリへのリンク追加時には公開状態を確認してください。共同研究先・機関への所属・実証成果は、確定して公開可能になったものを掲載します。

## 認証と公開

現状はBasic認証付きの確認用サイトです。ホスティング先でも `SITE_USER` / `SITE_PASSWORD` の設定が必要です。HTTPSで利用します。

認証対象のレスポンスに `Cache-Control: private, no-store` と `X-Robots-Tag: noindex, nofollow` を設定し、ページ内のrobots指定もnoindexとしています。Next.jsの静的アセット・画像処理経路とfaviconは認証対象外です。ブラウザへ配信するコードやこの公開リポジトリに秘密情報を含めないでください。

一般公開へ切り替える際は認証・robots指定・検索エンジン向け設定をまとめて見直します。現時点ではsitemapや一般公開用の検索登録は設定していません。このリポジトリのCIは検証のみを担当し、デプロイ設定や本番の環境変数は管理していません。

## 依存関係の保守

DependabotでnpmとGitHub Actionsの更新PRを月次で確認します。Next.jsと`eslint-config-next`、Reactと`react-dom`はそれぞれ同時に評価します。更新時はlockfileをコミットし、`npm run verify`と画面確認を行ってください。

Next.jsの変更時は、`AGENTS.md`に従いインストール済みの `node_modules/next/dist/docs/` の該当ガイドを確認します。
