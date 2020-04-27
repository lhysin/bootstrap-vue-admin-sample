const users = [
  {
    adminId: 'superAdmin',
    adminNm: '슈퍼관리자',
    accessMenus: [
      { menuCd: 'DASHBOARD', read: true, write: true },
      { menuCd: 'PARTNER_MANAGE', read: true, write: false },
      { menuCd: 'PARTNER_DETAIL', read: true, write: false },
    ],
  },
];

const token = {
  access_token: 'aba68284-7c32-4055-9dc6-6e5d1cfa970b',
  token_type: 'bearer',
  refresh_token: '3904dde4-01aa-43ba-9b50-4662d4308fc8',
  expires_in: 41697,
};

export default function (mock) {

  mock.onPost('/oauth/token').reply(() => [200, token]);

  mock.onPut(new RegExp(`/oauth/verify/sms/*`)).reply(200);

  mock.onGet('/oauth/me').reply(() => {
    const loginUser = users.find(user => user.adminId === 'superAdmin');

    return [200, { loginUser: loginUser }];
  });

  mock.onDelete('/oauth/revoke').reply(200);

  mock.onPost('/histories/menus').reply(() => [200, token]);

}

