import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '@/firebase/config'
import Login from '../views/Login.vue'
import Employee from '../views/Employee.vue'
import Admin from '../views/Admin.vue'
import PrintView from "../views/PrintView.vue"


// path guards
const alreadyAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user) {
    next({ name: "admin" })
  } else {
    next()
  }
}
const needAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: "login" })
  } else {
    next()
  }
}


const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: needAuth
  },
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: alreadyAuth
  },
  {
    path: '/:id',
    name: 'employee',
    component: Employee,
    props: true
  },
  {
    path: '/print/:id',
    name: 'print',
    component: PrintView,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
