# vscode 추천설정

### 확장프로그램
```
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension octref.vetur
```

### 추천 setting.json
> eslint 기반 auto fix
> ctrl + shift + p
>  => Preferences: Open Settings (JSON)
```
{
    "editor.tabSize": 2,
    "editor.renderWhitespace": "boundary",
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    },
    "eslint.format.enable": true,
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "vetur.format.defaultFormatter.js": "none",
    "[vue]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
}
```


