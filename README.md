# React + Typescript

---
### css module import 이슈
- webpack을 사용하고 css module 사용시 정상적으로 접근하지 못하는 문제 발생
- 즉 트렌스파일링이 원하는 방향으로 동작을 안해 해당 문법을 사용할 수 없다. 
```ts
import styles from './a.module.css'
export default function A() {
  return <div calssName={styles.wrapper}>A Component</div>
}
```
해결법
  - webpack의 옵션을 아래와 같이 수정한다.
```js
 module: {
  rules: [
    // CSS Modules
    {
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              namedExport: false,
            },
          },
        },
      ],
    },
  ]
}
```

- namedExport: true의 동작 (기본값)
CSS 클래스 이름들이 각각의 **이름 내보내기(named export)**로 변환됨
```js
import { wrapper, ... } from './a.module.css'

export default function A() {
  return <div calssName={wrapper}>A Component</div>
}
```
---
### npm -> pnpm 마이그레이션
1) 설치 (v9.12.3)
```
npm install -g pnpm
pnpm -v
```

2)  package.json 수정
```json
{
  ...,
  "engines": {
    "node": "^18.18.0 || ^20.9.0 || >=21.1.0",
    "pnpm": ">=8.0.0",
    "npm": "please-use-pnpm",
    "yarn": "please-use-pnpm"
  }
}
```
3) root 경로에 .npmrc 파일 생성
- 엔진 버전을 제한을 강제로 적용하는 옵션
```json
engine-strict=true
```

4) 의존성 유지가 필요할때 수행
- 기존 lock 파일을 마이그레이션 해줌
```
pnpm import
```

5) npm 관련 내용 정리
```
rm -rf node_modules
rm package-lock.json
npm cache clean --force
```
6) 라이브러리 재설치
```
pnpm install
```
참고)
- preinstall 방식은 설치를 막는다고 설명하는데 실제 테스트 해보니 막지는 못하는듯..
```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```
---
모듈 번들러 마이그레이션 (webpack -> vite)
- 기존 Webpack & loader 삭제
```
pnpm uninstall webpack webpack-cli webpack-dev-server @swc/cli @swc/core css-loader style-loader swc-loader
```
- vite + SWC
```
pnpm install vite @vitejs/plugin-react-swc
```

빌드 속도 비교
webpack(1.9초) vs vite (0.4초)
