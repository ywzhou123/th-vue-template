
/**
 * 路由监听
 * @param {*} routerPrefix 路由前缀
 */
var getActiveRule = (routerPrefix) => {
  return location => location.pathname.startsWith(routerPrefix)
}
/**
 * 微应用定义
 */
var apps = [
  {
    name: 'th-vue-demo',
    entry: '//192.168.52.143:1801',
    container: '#demoApp',
    activeRule: '/demo',
    props: {
      title: 'ThVueDemo微应用'
    }
  },
  {
    name: 'th-vue-template',
    entry: '//192.168.52.143:8082',
    container: '#templateApp',
    activeRule: '/template',
    props: {
      title: 'ThVueTemplate微应用'
    }
  },
  {
    name: 'sgjssdk',
    entry: '//192.168.52.143:5500',
    container: '#sgjssdkApp',
    activeRule: '/sgjssdk'
  }

]
