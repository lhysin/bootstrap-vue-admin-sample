import includes from 'lodash/includes';

import $axiosMockUtils from '@/utils/axios-mock-utils';
import $globalConsts from '@/plugins/global-constants';
import $moment from '@/plugins/moment';

const partners = [
  { rowNum: 1, ptnrNo: 'P0001', ptnrNm: '협력사01', empNm: '담당자01', strDtime: '2019.10.01 12:30:19', endDtime: '2019.10.02 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 2, ptnrNo: 'P0002', ptnrNm: '협력사02', empNm: '담당자02', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 3, ptnrNo: 'P0003', ptnrNm: '협력사03', empNm: '담당자03', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 4, ptnrNo: 'P0004', ptnrNm: '협력사04', empNm: '담당자04', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 5, ptnrNo: 'P0005', ptnrNm: '협력사05', empNm: '담당자05', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 6, ptnrNo: 'P0006', ptnrNm: '협력사06', empNm: '담당자06', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 7, ptnrNo: 'P0007', ptnrNm: '협력사07', empNm: '담당자07', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 8, ptnrNo: 'P0008', ptnrNm: '협력사08', empNm: '담당자08', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 9, ptnrNo: 'P0009', ptnrNm: '협력사09', empNm: '담당자09', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 10, ptnrNo: 'P0010', ptnrNm: '협력사10',empNm: '담당자10', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 11, ptnrNo: 'P0011', ptnrNm: '협력사11',empNm: '담당자11', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 12, ptnrNo: 'P0012', ptnrNm: '협력사12',empNm: '담당자12', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 13, ptnrNo: 'P0013', ptnrNm: '협력사13',empNm: '담당자13', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 14, ptnrNo: 'P0014', ptnrNm: '협력사14',empNm: '담당자14', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 15, ptnrNo: 'P0015', ptnrNm: '협력사15',empNm: '담당자15', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 16, ptnrNo: 'P0016', ptnrNm: '협력사16',empNm: '담당자16', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 17, ptnrNo: 'P0017', ptnrNm: '협력사17',empNm: '담당자17', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 18, ptnrNo: 'P0018', ptnrNm: '협력사18',empNm: '담당자18', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 19, ptnrNo: 'P0019', ptnrNm: '협력사19',empNm: '담당자19', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 20, ptnrNo: 'P0020', ptnrNm: '협력사20',empNm: '담당자20', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 21, ptnrNo: 'P0021', ptnrNm: '협력사21',empNm: '담당자21', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 22, ptnrNo: 'P0022', ptnrNm: '협력사22',empNm: '담당자22', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 23, ptnrNo: 'P0023', ptnrNm: '협력사23',empNm: '담당자23', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 24, ptnrNo: 'P0024', ptnrNm: '협력사24',empNm: '담당자24', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 25, ptnrNo: 'P0025', ptnrNm: '협력사25',empNm: '담당자25', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 26, ptnrNo: 'P0026', ptnrNm: '협력사26',empNm: '담당자26', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 27, ptnrNo: 'P0027', ptnrNm: '협력사27',empNm: '담당자27', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 28, ptnrNo: 'P0028', ptnrNm: '협력사28',empNm: '담당자28', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 29, ptnrNo: 'P0029', ptnrNm: '협력사29',empNm: '담당자29', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
  { rowNum: 30, ptnrNo: 'P0030', ptnrNm: '협력사30',empNm: '담당자30', strDtime: '2019.10.01 12:30:19', endDtime: '2019.11.01 23:59:59', regDtime: '2019.10.11 00:00:00' },
];

const partnerUri = '/v1/partners';

export default function (mock) {

  mock.onGet(partnerUri).reply((config) => {
    const params = config.params;

    const filter = function (o) {
      if (params.ptnrNo) {
        return includes(o.ptnrNo, params.ptnrNo);
      }
      if (params.ptnrNm) {
        return includes(o.ptnrNm, params.ptnrNm);
      }

      return true;
    };

    const result = $axiosMockUtils.arrayPagination(partners, params, filter);

    return [200, result];
  });

  mock.onGet(new RegExp(`${partnerUri}/*`)).reply(config => {
    const pathArr = config.url.split('/');
    const ptnrNo = pathArr[pathArr.length - 1];
    const partner = partners.find(partner => partner.ptnrNo === ptnrNo);

    return [200, partner];
  });

  mock.onPost(partnerUri).reply((config) => {
    const payload = config.data;
    const params = JSON.parse(payload);

    const lastRowNum = partners[partners.length -1].rowNum;
    const partner = {
      ...params,
      rowNum: partners.length + 1,
      ptnrNo: 'P' + String(lastRowNum + 1).padStart(4, '0'),
      regDtime: $moment().format($globalConsts.YYYY_MM_DD_HH_MM_SS_FORMAT),
    };

    partners.push(partner);

    return [200];
  });

  mock.onPut(partnerUri).reply((config) => {
    const payload = config.data;
    const params = JSON.parse(payload);

    var foundIndex = partners.findIndex(partner => partner.ptnrNo === params.ptnrNo);
    partners[foundIndex] = {
      ...params,
    };

    return [200];
  });

  mock.onDelete(partnerUri).reply(200);

}