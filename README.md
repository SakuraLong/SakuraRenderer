# SakuraRenderer 前端文本渲染器

## 特色

这是一款基于 vue 3 开发的简易前端文本渲染器，由用户提供文章，前端进行渲染。语法简单，文档全面，在编写文章方面基本上不需要html代码。支持多种模板语法，为用户提供一个简单美观的文本渲染器。

## 安装
```
npm install sakura-renderer
```

## 使用
```
import SakuraRenderer from 'sakura-renderer'
app.use(SakuraRenderer)
```
vue文件template中
```
<sr-article-container ref='render'></sr-article-container>
```
在文件中调用
```
this.#refs.render.setArticle('= Hello world!') // 设置文章内容
this.$refs.render.updateUserData({
  githubToken:'YOUR TOKEN'
}) // 设置用户数据（可选）
this.#refs.render.render() // 渲染
```

## 官网链接
See [Sakura Renderer](http://123.249.110.185:8000/).

## 官网GitHub仓库
See [Sakura Renderer](https://github.com/SakuraLong/SakuraRendererWeb).
