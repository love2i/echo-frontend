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
    meta: {roles: ['admin', 'super'], icon: 'tachometer-alt',title:'dashboard'},
    // redirect:'/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashBoard'),
        meta: {roles: ['admin', 'super'],title:'dashboard'}
      }
    ]
  },{
    path: '',
    name: '',
    component: Layout,
    hidden:true,
    meta: {roles: ['admin', 'super'], title:'question-detail'},
    // redirect:'/dashboard',
    children: [
      {
        path: '/questionnaireDetail/:id',
        name: 'QuestionnaireDetail',
        component: () => import('@/views/questionnaire/QuestionnaireDetail'),
        meta: {roles: ['admin', 'super'], title: 'question-detail'}
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
  // {
  //   path: '',
  //   name: 'Permission',
  //   component: Layout,
  //   meta: {roles: ['super'], icon: 'cog',title:'permission'},
  //   children: [
  //     {
  //       path: '/permission',
  //       name: 'permission',
  //       component: () => import('@/views/permission/Permission'),
  //       meta: {roles: ['super'],title:'permission'}
  //     }
  //   ]
  // },
  {
    path: '',
    name: 'Excel',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'file-excel',title:'excel'},
    children: [
      {
        path: '/exportSheet',
        name: 'exportSheet',
        component: () => import('@/views/excel/ExportSheet'),
        meta: {roles: ['admin', 'super'],title:'excel-export'}
      },
      {
        path: '/importSheet',
        name: 'importSheet',
        component: () => import('@/views/excel/ImportSheet'),
        meta: {roles: ['super'],title:'excel-import'}
      }
    ]
  },
  {
    path: '',
    name: 'Dormitory',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'home',title:'dormitory'},
    children: [
      {
        path: '/dormitoryList',
        name: 'dormitoryList',
        component: () => import('@/views/dormitory/DormitoryList'),
        meta: {roles: ['admin', 'super'],title:'dormitory-list'}
      },
      {
        path: '/saveDormitory',
        name: 'saveDormitory',
        component: () => import('@/views/dormitory/SaveDormitoryInfo'),
        meta: {roles: ['admin', 'super'],title:'save-dormitory'}
      }
    ]
  },
  {
    path: '',
    name: 'Complaint',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'angry',title:'complaint'},
    children: [
      {
        path: '/complaint',
        name: 'complaint',
        component: () => import('@/views/complaint/Complaint'),
        meta: {roles: ['admin', 'super'],title:'complaint-list'}
      }
    ]
  },
  {
    path: '',
    name: 'Fee',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'dollar-sign',title:'fee'},
    children: [
      {
        path: '/fee',
        name: 'fee',
        component: () => import('@/views/fee/Fee'),
        meta: {roles: ['admin', 'super'],title:'fee-list'}
      }
    ]
  },
  {
    path: '',
    name: 'Information',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'info-circle',title:'info'},
    children: [
      {
        path: '/informationList',
        name: 'informationList',
        component: () => import('@/views/information/InformationList'),
        meta: {roles: ['admin', 'super'],title:'info-list'}
      },
      {
        path: '/informationDetail',
        name: 'informationDetail',
        hidden: true,
        component: () => import('@/views/information/InformationDetail'),
        meta: {roles: ['admin', 'super'],title:'info-detail'}
      }, {
        path: '/postInformation',
        name: 'postInformation',
        component: () => import('@/views/information/PostInformation'),
        meta: {roles: ['admin', 'super'],title:'info-post'}
      }
    ]
  },
  {
    path: '',
    name: 'Questionnaire',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'question',title:'question'},
    children: [
      {
        path: '/questionnaire',
        name: 'questionnaire',
        component: () => import('@/views/questionnaire/Questionnaire'),
        meta: {roles: ['admin', 'super'],title:'question-list'}
      },
      {
        path: '/postQuestionnaire',
        name: 'postQuestionnaire',
        component: () => import('@/views/questionnaire/PostQuestionnaire'),
        meta: {roles: ['admin', 'super'],title:'question-post'}
      },
      // {
      //   path: '/questionnaireDetail/:id',
      //   name: 'QuestionnaireDetail',
      //   component: () => import('@/views/questionnaire/QuestionnaireDetail'),
      //   meta: {roles: ['admin', 'super'], title: 'question-detail'}
      // }
    ]
  },
  {
    path: '',
    name: 'Worker',
    component: Layout,
    meta: {roles: ['super'], icon: 'users',title:'worker'},
    children: [
      {
        path: '/worker',
        name: 'worker',
        component: () => import('@/views/worker/Worker'),
        meta: {roles: ['admin', 'super'],title:'worker-list'}
      }
    ]
  },
  {
    path: '',
    name: 'Repair',
    component: Layout,
    meta: {roles: ['admin', 'super'], icon: 'tools',title:'repair'},
    children: [
      {
        path: '/repair',
        name: 'repair',
        component: () => import('@/views/repair/RepairList'),
        meta: {roles: ['admin', 'super'],title:'repair-list'}
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
