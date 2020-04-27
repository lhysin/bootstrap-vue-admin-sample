import $regex from '@/utils/regex-utils.js';
import split from 'lodash/split';

/*
 * <template>
 *   <b-input
 *     :formatter="$filters.onlyAlpha"
 *   />
 * </template>
 */
export default {

  onlyAlpha (value) {
    return replaceNotIncludeRegex(value, $regex.alpha);
  },

  onlyNumeric (value) {
    return replaceNotIncludeRegex(value, $regex.numeric);
  },

  onlyKorean (value) {
    return replaceNotIncludeRegex(value, $regex.korean);
  },

};

const replaceNotIncludeRegex = function replaceNotIncludeRegex (value, regex) {
  return split(value, '').map(str => {
    if (regex.test(str)) {
      return str;
    } else {
      return null;
    }
  }).join('');
};