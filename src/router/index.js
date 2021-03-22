import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AccountSetting from '@/views/AccountSetting.vue'
import FindPassword from '@/views/FindPassword'
import Test from '@/views/Test'
//import store from '../store'
// import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter:(to,from,next)=>{
    //   let isLogin = false;
    //   next();
    //   if(to.meta.requiresAuth&&isLogin){
    //     next();
    //   }else{
    //     next("/login");
    //   }
    // },
    // meta: {
    //   requireAuth: true
    // }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/account-setting',
    name: 'AccountSetting',
    component: AccountSetting
  },
  {
    path: '/find-password',
    name: 'FindPassword',
    component: FindPassword
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/cloudmusicplayer/',
  routes
})



// if (sessionStorage.getItem('token')) {
//   store.commit('setToken', sessionStorage.getItem('token'))
// }

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) { //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
//     if (store.state.token) {
//       next();
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   } else {
//     next();
//   }
// })

export default router