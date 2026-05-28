# Next Steps

`dev-docs/`의 모든 design doc에서 나온 **후속 TODO 통합 인덱스**. design doc을 새로 추가하거나 갱신할 때마다 그 문서의 "후속 TODO" 섹션 항목을 여기로 옮긴다.

각 항목 형식:

```
- [ ] **<요약>** — 출처: [<doc>.html](<doc>.html)
  추가 맥락 1줄 (선택)
```

상태가 바뀌면 `진행 중` / `완료` 섹션으로 옮기고 완료 시 PR 번호를 함께 적는다.

---

## 진행 중

(없음)

## 대기

### B-mini 렌더러
출처: [entry-blocks-renderer.html](entry-blocks-renderer.html)

- [ ] **c-block 자식 statement 안 note 처리 방식 결정**
  현재는 SVG 내부라 누락. 옵션: (a) c-block 외부로 분리 변환 (b) SVG 내부 회색 텍스트 (c) 그대로 손실 허용. 1편 묶음 3·4, 3편 묶음 4 등 학습 보조 텍스트 일부 손실 중.
- [ ] **복합 reporter (산술 연산 등) 정확한 nesting 표현**
  현재 "걷는속도 × 0.85" 같은 계산은 단순 텍스트로 표현. reporter 안에 reporter 끼우는 패턴 정의 필요.
- [ ] **모바일 viewport에서 폭 초과 대응**
  깊이 중첩된 c-block(3편 묶음 4 서브스텝)이 모바일 viewport를 초과. 가로 스크롤 컨테이너 vs 자동 축소 정책 미정.
- [ ] **`prototype-entry-blocks.html` 배포 본 포함 여부 결정**
  학습용이 아니라 디자인 시연용. `docs/`에 두면 GitHub Pages에 노출됨.
- [ ] **`colors.js` / `icons/*.svg` 보존 여부**
  `renderer.js`에 inline되어 실제 미사용. vendoring 원본 추적 목적이라면 유지, 깔끔함 우선이면 제거.

## 완료

(완료된 항목은 PR 번호와 함께 여기로 이동)
