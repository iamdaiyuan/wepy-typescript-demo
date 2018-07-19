# WePY Templates

wepy的typescipt模板

## Usage

```
安装 wepy-cli：
npm install -g wepy-cli
拉取本模板
wepy init liuguolong1991/wepy-typescript-demo my-project
cd my-project
npm run dev
```

## PS
由于wepy目前没有支持tslint，所以在wepy就算TS有错，也是能编译运行的，只能通过die的提示来避免错误。
目前用的vscode,假如有错，在左边目录树就会标红，还算可以。
并且用ts需要对wepy和wx对象进行定义，虽然有@types/wepy库可以使用，但是感觉没人更新的样子，很多api都没在里面
因此我在模板下增加了typings/global.d.ts  目的就是为了增加一些@types/wepy没有的定义
因为我也是用到啥才加啥，也没有说去扫一遍文档，所以大家遇到没有的情况也自己加一加吧0.0
## Links

[wepy](https://tencent.github.io/wepy/)

