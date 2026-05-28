# Entry Blocks Mini Renderer — Third-Party Notices

이 디렉토리(`docs/assets/entry-blocks/`)는 [entrylabs/entryjs](https://github.com/entrylabs/entryjs)의 데이터·자산 일부를 **vendoring**하여 사용합니다.

## 출처 및 라이선스

**원본 프로젝트**: [entrylabs/entryjs](https://github.com/entrylabs/entryjs)
**라이선스**: Apache License, Version 2.0
**저작권**: Copyright © Connect Foundation

## 사용된 부분

| 항목 | 원본 위치 | 우리 위치 |
|---|---|---|
| 카테고리 색상 (colorSet) | `extern/util/static.js` (EntryStatic.colorSet) | `renderer.js`의 `COLORS` 상수 |
| 시작 카테고리 아이콘 (재생/키보드/마우스/오브젝트/신호/장면) | `images/block_icon/start_icon_*.svg` | `renderer.js`의 `ICONS` 상수 (inline) |
| 카테고리 마커 아이콘 10종 (start/flow/moving/looks/brush/sound/judgement/calc/variable/func) | `images/block_icon/*_icon.svg` | `renderer.js`의 `ICONS` 상수 (inline) |

## 자체 작성한 부분 (vendoring 아님)

- 모양 SVG path (hat / stack / cap / reporter / boolean / cblock / cblock_double): production 엔트리 에디터([playentry.org/ws](https://playentry.org/ws))의 시각적 디자인을 참고해 자체 구현
- contents 배열 시스템·렌더링 로직: 자체 작성
- block slot(자식 블록 끼우기) 재귀 처리: 자체 작성

## Apache License 2.0 요건

본 디렉토리에 vendoring된 데이터는 Apache License 2.0의 조건에 따라 사용되며, 본 NOTICE가 그 의무를 충족합니다.

라이선스 전문: https://www.apache.org/licenses/LICENSE-2.0
