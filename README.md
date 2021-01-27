## Class101 프론트엔드 개발자 과제

> 장바구니 기능 구현하기

### Libraries

- React
- Styled-components
- Typescript

### How to start

`npm run dev`

### 장바구니 추가 기능 및 UI 개선

- 장바구니에서 아이템 삭제
- 장바구니에 아이템을 3개이상 담을 경우 안내창과 함께 방지 ("장바구니에 담을 수 있는 아이템의 최대 개수는 3개 입니다.")
- 장바구니 아이콘 토글
- 미디어 쿼리

### 아쉬운 부분

- 반응형 이미지 슬라이더 (모바일 버전)

### 기타 사항

- 모든 스타일은 Styled-components를 사용했습니다.
- 상태관리는 useReducer와 ContextAPI를 사용했습니다.
- 가독성을 높이기 위해서 모든 import는 absolute path를 사용했습니다.
- Reducer를 깔끔하게 유지하기 위해서 `updateObject`함수를 생성하여 로직을 분리시켰습니다.

과제를 구현하면서 기능 구현과 함께 코드의 가독성을 높이는데 가장 노력을 많이 기울였습니다.
