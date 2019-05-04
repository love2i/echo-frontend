import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'
import Error404 from '@/views/error/Error404'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'root',
    hidden: true,
    component: Layout,
    redirect: {name: 'dashboard'},
    meta: {roles: ['admin', 'super']}
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {roles: ['admin', 'super']},
    component: () => import('@/views/login/Login')
  }, {
    path: '',
    name: 'DashBoard',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'tachometer-alt'},
    // redirect:'/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashBoard'),
        meta: {roles: ['admin', 'super']}
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    hidden: true,
    meta: {roles: ['admin', 'super']},
    component: () => import('@/views/test/Test')
  },
  {
    path: '/404',
    hidden: true,
    meta: {roles: ['admin', 'super']},
    component:Layout,
    children:[
      {
        path:'',
        name:'404',
        component: Error404
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '',
    name: 'Permission',
    component: Layout,
    meta: {roles: ['super'], icon: 'cog'},
    children: [
      {
        path: '/permission',
        name: 'permission',
        component: () => import('@/views/permission/Permission'),
        meta: {roles: ['super']}
      }
    ]
  },
  {
    path: '',
    name: 'Excel',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'file-excel'},
    children: [
      {
        path: '/exportSheet',
        name: 'exportSheet',
        component: () => import('@/views/excel/ExportSheet'),
        meta: {roles: ['admin', 'super']}
      },
      {
        path: '/importSheet',
        name: 'importSheet',
        component: () => import('@/views/excel/ImportSheet'),
        meta: {roles: ['super']}
      }
    ]
  },
  {
    path: '',
    name: 'Dormitory',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'home'},
    children: [
      {
        path: '/dormitoryList',
        name: 'dormitoryList',
        component: () => import('@/views/dormitory/DormitoryList'),
        meta: {roles: ['admin', 'super']}
      },
      {
        path: '/saveDormitory',
        name: 'saveDormitory',
        component: () => import('@/views/dormitory/SaveDormitoryInfo'),
        meta: {roles: ['admin', 'super']}
      }
    ]
  },
  {
    path: '',
    name: 'Complaint',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'angry'},
    children: [
      {
        path: '/complaint',
        name: 'complaint',
        component: () => import('@/views/complaint/Complaint'),
        meta: {roles: ['admin', 'super']}
      }
    ]
  },
  {
    path: '',
    name: 'Fee',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'dollar-sign'},
    children: [
      {
        path: '/fee',
        name: 'fee',
        component: () => import('@/views/fee/Fee'),
        meta: {roles: ['admin', 'super']}
      }
    ]
  },
  {
    path: '',
    name: 'Information',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'info-circle'},
    children: [
      {
        path: '/informationList',
        name: 'informationList',
        component: () => import('@/views/information/InformationList'),
        meta: {roles: ['admin', 'super']}
      },
      {
        path: '/informationDetail',
        name: 'informationDetail',
        hidden: true,
        component: () => import('@/views/information/InformationDetail'),
        meta: {roles: ['admin', 'super']}
      }, {
        path: '/postInformation',
        name: 'postInformation',
        component: () => import('@/views/information/PostInformation'),
        meta: {roles: ['admin', 'super']}
      }
    ]
  },
  {
    path: '',
    name: 'Questionnaire',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'question'},
    children: [
      {
        path: '/questionnaire',
        name: 'questionnaire',
        component: () => import('@/views/questionnaire/Questionnaire'),
        meta: {roles: ['admin', 'super']}
      },
      {
        path: '/postQuestionnaire',
        name: 'postQuestionnaire',
        component: () => import('@/views/questionnaire/PostQuestionnaire'),
        meta: {roles: ['admin', 'super']}
      },
      {
        path: '/questionnaireDetail/:id',
        name: 'QuestionnaireDetail',
        component: () => import('@/views/questionnaire/QuestionnaireDetail'),
        meta: {roles: ['admin', 'super']}
      }
    ]
  },
  {
    path: '',
    name: 'Worker',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'users'},
    children: [
      {
        path: '/worker',
        name: 'worker',
        component: () => import('@/views/worker/Worker'),
        meta: {roles: ['admin', 'super']}
      }
    ]
  },
  {
    path: '',
    name: 'Repair',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'tools'},
    children: [
      {
        path: '/repair',
        name: 'repair',
        component: () => import('@/views/repair/RepairList'),
        meta: {roles: ['admin', 'super']}
      }
    ]
  },

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
