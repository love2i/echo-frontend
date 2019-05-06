# echo-WEB前端

github: [软工实践针棒](https://github.com/kkkwwwmmm/echo-frontend)

## 目录结构

```shell
├─.idea
├─dist     						# 打包文件目录
│  ├─css
│  ├─fonts
│  ├─img
│  └─js
├─node_modules  				# 模块
├─public  						# 自动生成，含index.html和favicon
├─src     						# 源文件
│  ├─apis       				# 封装的 api 接口，现在没有用
│  ├─assets						
│  ├─components					# 组件
│  │  ├─topLoading				# 进度条，后面使用 NProgress 代替
│  │  └─languageSelect			# 语言选择组件
│  ├─layout						# 布局页面，除了登录页之外基本都是使用这个布局组件
│  │  └─components 				# 布局组件中用到的组件，例如 header，menu 等
│  ├─locales					# 国际化支持
│  ├─plugins					# 使用的插件
│  ├─router						# 路由
│  ├─store						# vuex 本地状态管理
│  ├─styles						# 公共的样式
│  ├─utils						# 工具函数等
│  └─views						# 内容页面
│      ├─complaint				# 投诉
│      ├─dashboard				# 首页
│      ├─dormitory				# 宿舍管理
│      ├─error					# 错误页面
│      ├─excel					# 导入导出excel
│      ├─fee					# 水电费
│      ├─information			# 发布消息
│      ├─login					# 登录
│      ├─permission				# 权限测试，没有用
│      ├─questionnaire			# 问卷
│      ├─repair					# 维修
│      ├─test					# 测试，没啥用
│      └─worker					# 员工
├─static						# 静态资源
│  └─img
└─tests							# 单元测试，没写(....
    └─unit
```

## 路由

```javascript
export const constantRoutes = [...] // 固定路由
export const asyncRoutes = [....]	// 动态路由

// 每一条路由项长这样
{
    path: '',
    name: 'RouterNameHere',
    component: Layout,
    hidden: [true/false],
    meta: {roles: ['admin', 'super'], icon: 'info-circle',title:'info'},
    children: [
      {
        path: 'router/path/here',
        name: 'RouterNameHere',
    	hidden: [true/false],
        component: () => import('your/component/path/'),
        // 或者 component: SampleComponent ,需要声明 import 
        meta: {roles: ['admin', 'super'],title:'info-list'}
      },
      {....}
    ]
  }
```

path: 路由的路径

name: 路由名字

component: 对应的组件，父组件一般是 Layout 布局组件

hidden: [true/false]，是否在菜单显示，有些 bug

meta: 元数据，一些自定义数据

```json	
{
    roles: ['admin','super'], // 能操作这条路由的角色，两个都写就是都能看，只写一个就是对应的能看
    icon: 'sample-icon',      // 菜单上显示的图标，好像只支持一级菜单，忘了，使用方法：font-awesome搜索对应的图标，例如<i class="fas fa-ad"></i>，只要写fa后面的 ad 就好了
    title: 'complaint',       // 国际化时对应的键名，一般和组件名差不多
}
```

图标查找看 [font-awesome](<https://fontawesome.com/>) 。

children: 子组件，主要视图，每个子组件的结构和父组件差不多

## store

```javascript
export default new Vuex.Store({
  state: {
    roles: '',
    token: Cookie.get('token') || '',
    routes: [],
    addRoutes: [],
    dormitories: [],
    workerInfo: {},
    buildings: []
  },
  getters: {
    roles: ...
    token: ...
    routes: ...
    workerInfo: ...
    dormitories: ...
    buildings: ...
  },
  mutations: {
    ...
  },
  actions: {
    ...
  }
})
// other functions
```

roles：当前用户角色，登录或刷新时获取并保存

token：令牌，唯一存储在cookie里的东西，每次发送请求都会带上这个，用户信息也是根据 token 获取

routes：固定路由+有权查看的动态路由，过滤掉hidden的项，菜单根据这个生成

addRoutes：过滤完权限的动态添加的路由

dormitories: 宿舍列表，101-519

workerInfo: 当前登录的人员信息

buildings: 根据登录的人生成的楼的列表，不同的人管理的楼不同

## 国际化支持

在 src/locales 目录下，对应不同语言的文件列表，在 .env 文件中可以设置语言，对应不同的语言使用 ```this.$t('keyword')``` 就可以获取不同的语言，根据 this.$i18n.locale 的值来确定得到的语言，切换语言的逻辑在 components/languageSelect 组件中

## UI

使用 element-ui，文档看 [官网](https://element.eleme.io) 。

