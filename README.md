# review

[toc]

## 项目构建

> pnpm create vue@lastest

然后选择ts+pinia

## 构成

### 树结构

- App
  - title
  - input-group
    - input
    - submit-btn
  - todo-list
    - check-btn
    - todo-content
    - del-btn
  - side-bar
    - 筛选过滤已完成
    - 删除全部
    - 全部完成/未完成
    - 删除已完成

全局数据：todos，filtered
全局方法：toggleCompleted，deleteCompleted
计算属性：filteredTodos

## pinia

### 使用pinia

> main.ts中

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia' //导入pinia创建方法
import App from './App.vue'
const app = createApp(App)
app.use(createPinia()) //创建pinia，并使用pinia
app.mount('#app')
```

### 定义store

> src/stores/xx.ts中

```ts
import {ref} from 'vue'
import { defineStore } from 'pinia'
export interface todo{
    text:string,
    completed:boolean,
    id:number
}
export const useTodoStore = defineStore{//useTodoStore为命名习惯
    'todos',//设置一个唯一id
    ()=>{//使用setup API，和html中使用setup的vue3 setup很像
        //定义响应式数据 对应于选项式的data
        const todos = ref([] as todo)//需要从vue中导入ref
        const count = ref(1)
        //定义计算属性，需要引入computed
        const doubleCount = computed(()=>{
            return count.value*2
        })
        //定义方法，对应于methods
        function fn(){};
        return {
            todos,// 将ref响应式数据暴露出去
            fn //将方法暴露出去
        }
    }
}
```

### 使用store

> 在某个组件的\<script setup lang='ts'>\</script>中

```ts
//引入stores/todo.ts中导出的实例化方法
import { useTodoStore } from '@/stores/todo.ts'
//辅助结构的函数
import { storeToRefs } from 'pinia'
//实例化store
const store = useTodoStore()
//可以直接访问store实例中return暴露的属性和方法
//通过store[prop]访问
console.log(store.todos)
store.fn()
//方法可以直接解构
const { fn } = store
//属性直接解构得到的数据不是响应式的，需要借助 storeToRefs,从pinia中导入
const { todos, count, doubleCount } = storeToRefs(store)
```

## ts

1. 定义接口

```ts
declare interface example {
  text: string
}
```

也可以不使用declare，直接export

```ts
export interface example {
  text: string
}
```

2. 使用断言
   当ts自动类型不符合我们预期时使用

```ts
export interface todo {
  something: string
}
const todos = ref([] as todo[]) //断言为todo数组

inputRef.value!.focus() //断言为非null
```

3. 泛型

```ts
const inputRef = ref<HTMLInputElement | null>(null)
//泛型可用于在使用函数时，指定函数参数类型
```

## 细节杂项

1. 打包路径：在vite.config.js中，配置 **==base:'./'==**

```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
})
```

如果是vue.config.js,则配置 **==publicPath:'./'==**

2. eslint莫名其妙报错:可能是编辑器或电脑性能问题，建议重启vscode

3. GitHub action自动打包部署

```yml
name: Build and Deploy Vue Project

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pages: write
      actions: read

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          run_install: false

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Verify lockfile
        run: ls -la pnpm-lock.yaml

      - name: Install dependencies
        run: pnpm install --no-frozen-lockfile

      - name: Build project
        run: pnpm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: dist
          force_orphan: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

注意配置写入权限、先安装pnpm再安装node.js(ai生成的是反过来的，反过来会报错)
