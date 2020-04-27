# vue-cli

### vue cli 설치
```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

### vue 프로젝트 매니저
```
# http://localhost:8000
vue ui
```

### vue serve, build (from package.json)
```
# 로컬 웹팩서버
yarn serve

# 개발빌드 (/dist)
yarn build-dev

# 스테이지 빌드 (/dist)
yarn build-stg

# 운영빌드 (/dist)
yarn build
build-dev
```

### vue lint (from package.json)

```
# 로컬 및 개발환경(develoment)
# auto fix : true

yarn lint


# 운영환경(production)
# auto fix : true

yarn lint-prd

Options:
  --no-fix           do not auto-fix errors
```

### vue style lint

```
yarn lint-style [options] [...files]

Options:
  --no-fix           do not auto-fix errors
  --options          list additional stylelint cli options
```

### vue cli 배포 방법

https://cli.vuejs.org/guide/deployment.html#github-pages

https://github.com/multiplegeorges/vue-cli-plugin-s3-deploy

#### Reference By

[vue cli-service guide](https://cli.vuejs.org/guide/cli-service.html)
