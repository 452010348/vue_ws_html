var Foo = { template: '<div>foo</div>' }
var Bar = { template: '<div>bar</div>' }
var constantRoutes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]

function createRouter(){
  return new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
}
var router =  createRouter();
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 function resetRouter() {
  var newRouter = createRouter()
  console.log('%c%s', 'color:#C43C67', `resetRouter`, router.matcher, newRouter.matcher)
  router.matcher = newRouter.matcher // reset router
}