export default [

  {
    path: '/partner/manage',
    name: 'PartnerManage',
    meta: {
      menuCd: 'PARTNER_MANAGE',
      menuNm: '협력사 목록',
    },
    component: () => import(/* webpackChunkName: "Partner" */ '@/views/partner/PartnerManage'),
  },

  {
    path: '/partner/regist',
    name: 'PartnerRegist',
    meta: {
      menuCd: 'PARTNER_REGIST',
      menuNm: '협력사 등록',
      writeOnly: true,
    },
    component: () => import(/* webpackChunkName: "Partner" */ '@/views/partner/PartnerRegist'),
  },

  {
    path: '/partner/detail/:ptnrNo',
    name: 'PartnerDetail',
    meta: {
      menuCd: 'PARTNER_DETAIL',
      menuNm: '협력사 상세',
    },
    component: () => import(/* webpackChunkName: "Partner" */ '@/views/partner/PartnerDetail'),
  },

  {
    path: '/partner/edit/:ptnrNo',
    name: 'PartnerEdit',
    meta: {
      menuCd: 'PARTNER_EDIT',
      menuNm: '협력사 수정',
      writeOnly: true,
    },
    component: () => import(/* webpackChunkName: "Partner" */ '@/views/partner/PartnerEdit'),
  },

];