## Node js 서버 보일러 플레이트

설치목록
> 디펜던시
- npm i dotenv winston lodash express http-status-codes cors helmet bcrypt jsonwebtoken typeorm mysql2 reflect-metadata

~~~
dotenv : .env 설정
winston : 로그
lodash : js 함수 유틸
express : 웹서버
http-status-codes : http 상태코드 
cors : cors
helmet : 보안 설정
bcrypt : 암호화
jsonwebtoken : 보안 토큰
typeorm : DB ORM(typescript용)
reflect-metadata : DB 메타데이터 관리
mysql2 : mysql
~~~

> 개발 디펜던시
- npm i -D typescript tslint ts-node tslint-config-prettier nodemon @babel/cli @babel/core @babel/node @babel/preset-env @types/dotenv @types/winston @types/lodash @types/express @types/http-status-codes @types/cors @types/helmet @types/bcrypt @types/jsonwebtoken

~~~
typescript : 타입스크립트
tslint : 타입스크립트 문법 체크
ts-node : 타입스크립트 node 실행
tslint-config-prettier : 타입스크립트 문법 자동 포맷터
nodemon : 파일 변경 감지 후 자동 재시작
@babel/cli : 바벨(cli)
@babel/core : 바벨(코어)
@babel/node : 바벨(node)
@babel/preset-env : 바벨(환경설정)
@types/*** : ***모듈에 대한 타입스크립트 문법 지원
~~~