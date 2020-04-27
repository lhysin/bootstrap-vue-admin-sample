# package.json


### husky, lint-stage, git-hook
https://woowabros.github.io/tools/2017/07/12/git_hook.html

https://www.huskyhoochu.com/npm-husky-the-git-hook-manager/

```
# install plugins
npm install husky lint-staged --save-dev
```

```js
// package.json
export default {
  ...
  "husky": {
    "hooks":{
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{vue,js}": [
      "vue-cli-service lint-prd",
      "git add"
    ],
    "src/**/*.{vue,htm,html,css,sss,less,scss}": [
      "vue-cli-service lint-style",
      "git add"
    ],
    "ignore": ["**/dist/*.min.js"]
  }
  ...
}

```

