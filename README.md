## vite-preprocess-plugin

### Introduction

`vite-preprocess-plugin` 支持 vite 项目中使用条件编译功能.

### 安装

```
npm i vite-preprocess-plugin -D
yarn add vite-preprocess-plugin -D
```

### 配置

```js
// vite.config.js
import { defineConfig } from 'vite';
import vitePreprocess from 'vite-preprocess-plugin';

// 定义多个配置
const options = {web: true, h5: true};

export default defineConfig({
  plugins: [vitePreprocess(options), vue()],
  esbuild: {
    // 设置 esbuild 不处理注释内容
    legalComments: 'none',
  }
});
```

### 用法

```js
// *.js
// @ifdef web
console.log('web!')
// @endif

// @ifndef web
console.log('not web!')
// @endif
```

```html
<!-- *.vue, *.html -->
<template>
  <div class="wrapper">
    <!-- @ifdef web -->
    <h1>web</h1>
    <!-- @endif -->

    <!-- @ifndef web -->
    <h1>not web</h1>
    <!-- @endif -->
  </div>
</template>
```

```css
/* *.css */
.wrapper {
  /* @ifdef web */
  color: red;
  /* @endif */

  /* @ifndef web */
  color: blue;
  /* @endif */
}
```


