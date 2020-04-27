import $axios from '@/plugins/axios';
import $globalConsts from '@/plugins/global-constants';
import $fileUtils from '@/utils/file-utils';
import $log from '@/plugins/vue-logger';

const $_validHtmlTagList = [
  'DOCTYPE', 'HEAD', 'META', 'STYLE', 'BODY', 'DIV', 'H1', 'H2', 'H3', 'H4',
  'Q', 'SPAN', 'BR', 'UL', 'OL', 'LI', 'TABLE', 'COLGROUP', 'TBODY', 'COL',
  'TR', 'TD', 'A', 'FONT', 'P', 'HR', 'TH', 'TITLE',
];

export default {

  createEmptyWindowPopup (specs) {
    if (!specs) {
      specs = 'width=1024';
    }

    return window.open('', '_blank', specs);
  },

  createEmptyWindowPopupWithParentStyle (specs) {

    return new Promise(function (resolve) {
      if (!specs) {
        specs = 'width=1024';
      }

      const newPopup = window.open('', '_blank', specs);

      const head = document.head;
      const newHead = document.createElement('head');
      for (let style of head.querySelectorAll('style')) {
        let newStyle = document.createElement('style');
        newStyle.innerHTML = style.innerHTML;
        newHead.appendChild(newStyle);
      }

      for (let link of head.querySelectorAll('link')) {
        const linkHref = link.href;
        if (linkHref && linkHref.endsWith('.css')) {
          $axios.get(linkHref).then(res => {
            let newStyle = document.createElement('style');
            newStyle.innerHTML = res.data;
            newHead.appendChild(newStyle);
          });
        }
      }

      newPopup.document.head.innerHTML = newHead.innerHTML;
      newPopup.document.body.classList.add('popup');

      resolve(newPopup);
    });

  },

  checkValidHtmlElementFromFile (file) {

    if (!file) {
      throw new Error('file is invalid.');
    }

    const _this = this;

    return new Promise(function (resolve, reject) {
      $fileUtils.inputFileReader(file).then(res => {
        return $axios.get(res.targetUrl);
      }).then(res => {

        const htmlElement = document.createElement('html');
        htmlElement.innerHTML = res.data;

        const elementSet = new Set();
        _this.removeScriptTag(htmlElement, elementSet);

        let isValid = true;
        for (let tagName of elementSet.values()) {
          let isExists = false;
          for (let validHtmlTag of $_validHtmlTagList) {
            if (tagName === validHtmlTag) {
              isExists = true;
            }
          }
          if (!isExists) {
            $log.error('invalid html tage ' + tagName);
            alert(file.name + ' ' + $globalConsts.INVALID_HTML_TAG_MSG);
            reject({ isInvalidElement: true });
            isValid = false;
            break;
          }
        }
        if (isValid) {
          resolve();
        }
      });
    });

  },

  removeScriptTag (element, set) {
    if (element.children && element.children.length > 0) {
      for (let child of element.children) {
        set.add(child.tagName);
        this.removeScriptTag(child, set);
      }
    }
  },
};