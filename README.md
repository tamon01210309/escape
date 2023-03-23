### 開発環境

- node
- gulp
- ejs
- scss
- typescript

### 開発環境構築手順

```
> npm install
```

### 構成

- webサイトの開発時のコードは`src/`の下に置いてください

```
- src
  - ejs/
    - index.ejs
  - assets/
    - index.ts
    - style.scss
    - reset.css
    - images/
```

- build後のファイルは`dist/`以下に置かれます。

### 実行

- build

```
> make build
```

- webサイト起動

```
> make run
```
