module.exports = {
  title: 'zxh ui',
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
      }
    ]
  },
  plugins: [
    'demo-container'
  ]
}