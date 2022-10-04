import { createRouter, createWebHistory } from "vue-router"
import store from '@/js/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name : "join",
      path: "/join",
      component: () => import("@/pages/JoinPage.vue")
    },
    {
      name : "login",
      path: "/login",
      component: () => import("@/pages/LoginPage.vue")
    },
    {
      name : "editor",
      path: "/editor",
      component: () => import("@/pages/EditorPage.vue")
    },
    {
      name : "profile",
      path: "/profile",
      component: () => import("@/pages/ProfilePage.vue")
    },
    {
      name : "list",
      path: "/list",
      children: [
        {
          name: "list",
          path: "",
          component: () => import("@/pages/ListPage.vue"),
        },
        {
          name: "read",
          path: ":id",
          component: () => import("@/pages/ReadPage.vue")
        }
      ]
    },
    {
      name : "main",
      path: "/",
      component: () => import("@/pages/MainPage.vue"),
      meta: {
        requiresAuth: true
      }
    },
  ],

})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => {
    
    if (record.meta.requiresAuth === undefined) console.log('검사 안하는 곳')
    if (record.meta.requiresAuth === true) console.log('검사하는 곳')
  }))
  console.log(to.fullPath)
  await store.dispatch('userStorage', to.fullPath)
  next()
})

export default router
