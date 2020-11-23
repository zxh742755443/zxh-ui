module.exports = {
  title: 'zxh ui',
  base:'/zxh-ui/',
  description: '基于vue开发的常用组件',
  themeConfig:{
    repo: 'https://github.com/zxh742755443/zxh-ui',
    sidebar: [
      {
        path: '/',
        title: '简介'
      },
      {
        path: '/infinite-scroll/',
        title: '无限滚动'
      },
      {
        path: '/number-keyboard/',
        title: '数字键盘'
      },
      {
        path: '/lazy-loading/',
        title: '懒加载'
      }
    ]
  },
  plugins: [
    'demo-container'
  ]
}
