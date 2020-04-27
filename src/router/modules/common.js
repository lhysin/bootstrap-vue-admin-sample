export default [

  {
    path: '/',
    name: 'TheDashboard',
    meta: {
      menuCd: 'DASHBOARD',
      menuNm: '대시보드',
    },
    component: () => import('@/views/common/TheDashboard'),
  },

  // TODO 개발전용
  {
    path: '/sample',
    name: 'TheSample',
    meta: {
      menuCd: 'SAMPLE',
      menuNm: '샘플모음',
      notPrd: true,
    },
    component: () => import('@/views/sample/TheSample'),
  },

];