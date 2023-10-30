## vite-preprocess-plugin

### 简介

`vite-preprocess-plugin` 支持 vite 项目中使用条件编译功能.

### 安装

```sh
npm i vite-preprocess-plugin -D
```

```sh
yarn add vite-preprocess-plugin -D
```

### 配置

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// vitePreprocess 插件
import vitePreprocess from 'vite-preprocess-plugin';

// vitePreprocess 配置
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


## 发布

```sh
# 查看当前的 npm 配置
npm config list    //

# 将 npm 源更换为 npm 官方源
npm config set registry https://registry.npmjs.org/
# 登陆
npm login
# 发布
npm publish
 
# 发布之后可以切回淘宝源
npm config set registry=https://registry.npmmirror.com/
```