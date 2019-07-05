# wcdog-manager

### 新闻类后台管理系统 (基于Vue)
这是一套简易完整的项目，包含前端、后端、移动端三端应用。

### 介绍
#### 1.后台源码
SSM(Spring+SpringMVC+Mybatis)<br/>
戳这里[后台源码(Android)](https://github.com/xandone/wcdog)<br/>
#### 2.移动端app(Android) 
MVP+Material+retrofit2+Rx..<br/>
戳这里[移动端app(Android)](https://github.com/xandone/wcdog-app)<br/>
#### 2.web前端项目 
vue+vuex+vue Router+scss<br/>
戳这里[web前端项目](https://github.com/xandone/wcdog-web)<br/>

### 功能说明
- [x] 用户管理
- [x] 帖子管理
- [x] 评论管理
- [x] 公告面板/说说管理
- [x] banner管理
- [ ] 图片管理
- [ ] 用户权限
- [ ] 管理员权限
- [ ] 其他

### 效果预览


### 目录结构

``` bash
├── public                                       // 构建相关  
│   ├── index.html                               // 入口html文件
├── src                                          // 项目代码
│   ├── assets                                   // 图标等静态资源
│   ├── components                               // 全局公用组件
│   │   ├── headTop.vue                          // 头部组件
│   │   ├── comments.vue                         // 评论组件
│   │   ├── NoPermisson.vue                      // 空白组件
│   ├── config                                   // 全局配置
│   │   ├── env.js                               // url、常量等
│   ├── page
│   │   ├── admin.vue                            // 管理员界面
│   │   ├── adminList.vue                        // 管理员列表
│   │   ├── banner.vue                           // banner列表/新增/删除
│   │   ├── imgList.vue                          // 图片列表(todo)
│   │   ├── jokeAdd.vue                          // 新增新闻
│   │   ├── jokeList.vue                         // 新闻列表
│   │   ├── login.vue                            // 登录
│   │   ├── manager.vue                          // 首页/统计
│   │   ├── plank.vue                            // 公告面板
│   │   ├── talkList.vue                         // 说说列表
│   │   ├── userList.vue                         // 用户列表
│   │   |                         
│   ├── utils
│   │   ├── utils.js                             // 公共方法   
│   ├── views
│   │   ├── home.vue                             // 主页           
│   ├── store                                    // 全局store
│   ├── App.vue                                  // 页面入口
│   └── main.js                                  // 程序入口
├── pic                                          // 预览图片
├── .babelrc                                     // babel-loader 配置
├── .eslintrc.js                                 // eslint 配置项
├── .gitignore                                   // git 忽略项
└── package.json                                 // package.json
```

### 安装运行

```
# Project setup
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

```

## License