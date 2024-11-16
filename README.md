# React + Typescript

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
