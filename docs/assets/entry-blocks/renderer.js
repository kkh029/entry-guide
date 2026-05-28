/*!
 * Entry Blocks Mini Renderer (B-mini)
 * 엔트리 게임 코딩 교육 문서용 — 정적 HTML에서 엔트리 블록 모양을 SVG로 렌더링
 *
 * 데이터 출처:
 *   - 카테고리 색상: entrylabs/entryjs extern/util/static.js (Apache 2.0)
 *   - 아이콘 SVG:   entrylabs/entryjs images/block_icon/*.svg (Apache 2.0)
 *
 * SVG path는 production 엔트리 에디터(playentry.org/ws) 디자인을 기준으로 자체 작성.
 *
 * 지원 모양: hat / stack / cap / reporter / boolean / cblock / cblock_double
 * 지원 필드: text / input / dropdown / icon / block (자식 블록 끼우기)
 */
(function (global) {
  'use strict';

  /* ----------------------------------------------------------
   * 상수
   * ---------------------------------------------------------- */
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const FONT_FAMILY =
    "'Nanum Gothic', NanumGothic, 나눔고딕, '맑은 고딕', 'Malgun Gothic', sans-serif";
  const FONT_SIZE = 13;
  const FONT_SIZE_FIELD = 12;
  const FONT_SIZE_SMALL = 12;       // reporter / boolean 본체

  // 일반 블록(hat/stack/cap/cblock top)
  const BODY_H        = 36;
  const BODY_RX       = BODY_H / 2;     // 오른쪽 캡슐 반지름

  // 작은 블록 (reporter/boolean)
  const SMALL_H       = 28;
  const SMALL_RX      = SMALL_H / 2;    // reporter 캡슐
  const BOOL_NOTCH    = SMALL_H / 2;    // boolean 양옆 사선 가로 깊이

  // 위/아래 connector (∇/▽)
  const TRI_W         = 12;
  const TRI_H         = 6;
  const TRI_CX        = 18;             // 본체 왼쪽 끝에서 connector 가운데 x

  // c-block
  const CBLOCK_BOTTOM_H = 12;           // c-block 아래쪽 띠 높이
  const CBLOCK_INDENT   = 16;           // 안쪽 슬롯 왼쪽 들여쓰기
  const CBLOCK_INNER_MIN_H = 28;        // 슬롯 비었을 때 최소 높이

  // 콘텐츠 영역
  const SIDE_PAD      = 14;
  const CONTENT_GAP   = 6;
  const ICON_LARGE    = 30;             // hat 왼쪽 큰 동그라미
  const ICON_LARGE_PAD_R = 8;
  const ICON_SMALL    = 22;             // 우측 카테고리 마커
  const INPUT_H       = 22;
  const INPUT_PAD     = 7;
  const DROPDOWN_PAD  = 6;
  const DROPDOWN_ARROW_W = 10;
  const MIN_WIDTH     = 80;
  const MIN_WIDTH_SMALL = 30;

  /* ----------------------------------------------------------
   * 색상 — EntryStatic.colorSet (Apache 2.0, entrylabs/entryjs)
   * ---------------------------------------------------------- */
  const COLORS = {
    START:        { fill: '#00b400', stroke: '#009400' },
    FLOW:         { fill: '#19baea', stroke: '#1498c0' },
    MOVING:       { fill: '#ad3efb', stroke: '#8b19db' },
    LOOKS:        { fill: '#ff3a61', stroke: '#c72042' },
    BRUSH:        { fill: '#ff9b00', stroke: '#fc6500' },
    TEXT:         { fill: '#e43500', stroke: '#ad2800' },
    SOUND:        { fill: '#67b100', stroke: '#508a00' },
    JUDGE:        { fill: '#4562f5', stroke: '#1b3ad8' },
    CALC:         { fill: '#f4af18', stroke: '#ff7f00' },
    VARIABLE:     { fill: '#dd47d8', stroke: '#b819b3' },
    ANALYSIS:     { fill: '#25aeff', stroke: '#1592ff' },
    FUNC:         { fill: '#de5c04', stroke: '#a14100' },
    HARDWARE:     { fill: '#00b6b1', stroke: '#008380' },
    HIDDEN:       { fill: '#8aa3b2', stroke: '#728997' },
  };

  const CATEGORY_TO_MARKER = {
    START:    'start',
    FLOW:     'flow',
    MOVING:   'moving',
    LOOKS:    'looks',
    BRUSH:    'brush',
    SOUND:    'sound',
    JUDGE:    'judgement',
    CALC:     'calc',
    VARIABLE: 'variable',
    FUNC:     'func',
  };

  /* ----------------------------------------------------------
   * 아이콘 — entrylabs/entryjs images/block_icon/ (Apache 2.0)
   * ---------------------------------------------------------- */
  const ICONS = {
    play: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g fill="none" fill-rule="evenodd"><circle cx="15" cy="15" r="14.5" fill="#FFF" stroke="#F2F2F2"/><path fill="#00B400" d="M11 9.67v10.66a1 1 0 0 0 1.539.843l8.339-5.33a1 1 0 0 0 0-1.686l-8.34-5.33A1 1 0 0 0 11 9.67z"/></g></svg>`,
    keyboard: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g fill="none" fill-rule="evenodd"><circle cx="15" cy="15" r="14.5" fill="#FFF" stroke="#F2F2F2"/><path fill="#00B400" d="M10 10h12.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 6 20.5v-9A1.5 1.5 0 0 1 7.5 10H9V7.5A2.5 2.5 0 0 1 11.5 5h6A1.5 1.5 0 0 0 19 3.5v-2h1v2A2.5 2.5 0 0 1 17.5 6h-6A1.5 1.5 0 0 0 10 7.5V10z"/><path fill="#FFF" d="M9 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm2 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM9.5 19h11a.5.5 0 1 1 0 1h-11a.5.5 0 1 1 0-1z"/></g></svg>`,
    mouse: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g fill="none" fill-rule="evenodd"><circle cx="15" cy="15" r="14.5" fill="#FFF" stroke="#F2F2F2"/><g transform="translate(9 6)"><rect width="12" height="17" fill="#00B400" rx="5.5"/><rect width="2" height="4" x="5" y="3" fill="#FFF" rx="1"/></g></g></svg>`,
    object: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 28 28"><g fill="none" fill-rule="evenodd"><circle cx="14" cy="14" r="13.5" fill="#FFF" stroke="#F2F2F2"/><path fill="#8222FF" stroke="#8222FF" stroke-width=".2" d="M13.86 5.6c1.548.026 2.827.336 3.968.926a8.454 8.454 0 0 1 3.826 4.02 8.49 8.49 0 0 1 .746 3.286c-.024 1.693-.394 3.085-1.087 4.3A8.402 8.402 0 0 1 14.14 22.4c-1.689-.024-3.104-.406-4.335-1.122a8.43 8.43 0 0 1-3.75-4.55 8.505 8.505 0 0 1-.455-2.586c.028-1.559.334-2.821.914-3.95A8.404 8.404 0 0 1 13.86 5.6z"/></g></svg>`,
    signal: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g fill="none" fill-rule="evenodd"><circle cx="15" cy="15" r="14.5" fill="#FFF" stroke="#F2F2F2"/><g transform="translate(6 1.5)"><path fill="#00B400" stroke="#00B400" d="M8.488 12.658H6.985l-2.963 8.395h7.43l-2.964-8.395z"/><g fill="#00B400"><path stroke="#FFF" d="M16.301 14.967A7.453 7.453 0 0 1 5.785 4.45l10.516 10.516z"/><path d="M14.173 6.144a.525.525 0 0 1 .683.683l-2.21 5.526a.525.525 0 0 1-.86.176L8.472 9.213a.525.525 0 0 1 .176-.858l5.526-2.21zm-4.397 2.89l2.19 2.19 1.46-3.65-3.65 1.46z"/></g><circle cx="13.816" cy="7.184" r="1.158" fill="#FFF" stroke="#00B400"/></g></g></svg>`,
    scene: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g fill="none" fill-rule="evenodd"><circle cx="15" cy="15" r="14.5" fill="#FFF" stroke="#F2F2F2"/><g transform="translate(6.5 5)"><rect width="14.933" height="9.6" x="1.067" y="7.467" fill="#00B400" rx="1"/><g transform="rotate(-15 16.738 1.282)"><rect width="14.933" height="3.2" fill="#00B400" rx=".5"/><path fill="#FFF" d="M2.133 0h2.134L2.133 3.2H0L2.133 0zm5.334 0H9.6L7.467 3.2H5.333L7.467 0zM12.8 0h2.133L12.8 3.2h-2.133L12.8 0z"/></g></g></g></svg>`,
    // 카테고리 오른쪽 마커 (22x22 원형)
    start: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#009400"/><path fill="#3BCE3B" d="M8.2 16.2H9a.8.8 0 0 1 0 1.6H5.8a.8.8 0 1 1 0-1.6h.8V5.8a.8.8 0 1 1 1.6 0v10.4zm3.622-4.31c-.952.19-2.09.123-2.66-.261A.34.34 0 0 1 9 11.343V6.01a.333.333 0 0 1 .542-.26c.571.38 1.331.473 2.28.283 1.429-.286 2.68-1.328 5.062-.278.13.065.115.154.115.255v5.333c0 .184-.149.334-.333.334-.092 0-.214-.065-.344-.113-2.197-.782-3.071.039-4.5.325z"/></g></svg>`,
    flow: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#1498C0"/><path fill="#6DDDFE" d="M11 5c1.105 0 2 .895 2 2 0 .446-.146.858-.393 1.19l2.216 3.484c.059-.005.118-.007.177-.007 1.105 0 2 .895 2 2 0 1.104-.895 2-2 2s-2-.896-2-2c0-.636.297-1.203.76-1.57l-2.053-3.225c-.22.083-.458.128-.707.128-.249 0-.487-.045-.707-.128L8.24 12.097c.463.367.76.934.76 1.57 0 1.104-.895 2-2 2s-2-.896-2-2c0-1.105.895-2 2-2 .06 0 .118.002.177.007l2.216-3.483C9.146 7.858 9 7.446 9 7c0-1.105.895-2 2-2z"/></g></svg>`,
    moving: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#8B19DB"/><path fill="#BD65FB" d="M7.972 13.31l4.202-.56a1 1 0 0 1 1.132.992v.908a1 1 0 0 1-1.132.99l-4.202-.558.263 1.05a.5.5 0 0 1-.763.538l-3.087-2.058a.5.5 0 0 1 0-.832l3.087-2.058a.5.5 0 0 1 .763.537l-.263 1.05zm6.056-3.61l-4.202.56a1 1 0 0 1-1.132-.992V8.36a1 1 0 0 1 1.132-.99l4.202.558-.263-1.05a.5.5 0 0 1 .763-.538l3.087 2.058a.5.5 0 0 1 0 .832l-3.087 2.058a.5.5 0 0 1-.763-.537l.263-1.05z"/></g></svg>`,
    looks: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#C72042"/><path fill="#F57" d="M7.754 6l2.754 1.59v3.18l-2.754 1.59L5 10.77V7.59L7.754 6zm7.066 0L18 9.18l-3.18 3.18-3.18-3.18L14.82 6zm-3.46 11.306a2.827 2.827 0 1 1 0-5.653 2.827 2.827 0 0 1 0 5.653z"/></g></svg>`,
    brush: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#FC6500"/><path fill="#FFB250" d="M9.313 12.535c1.07 0 1.938.868 1.938 1.939.003 3.183-6.227 2.713-5.119 2.16.738-.37 1.153-1.077 1.245-2.122l-.001.009-.002-.047c0-1.02.788-1.855 1.787-1.933zm7.07-8.245c.601.421.747 1.25.327 1.85l-4.019 5.74c-.42.6-1.249.746-1.85.326-.6-.421-.747-1.25-.326-1.85l4.018-5.74c.421-.6 1.25-.746 1.85-.326z"/></g></svg>`,
    sound: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#508A00"/><path fill="#7ECC12" d="M8.714 9.357v4.329H7a1 1 0 0 1-1-1v-2.329a1 1 0 0 1 1-1h1.714zm1.357 4.337V9.35l3.834-2.837a1 1 0 0 1 1.595.804v8.411a1 1 0 0 1-1.595.804l-3.834-2.837z"/></g></svg>`,
    judgement: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#1B3AD8"/><path fill="#99ADFF" d="M9.761 11.23l5.015-5.02a.716.716 0 1 1 1.014 1.014l-5.505 5.511a.719.719 0 0 1-.126.101.717.717 0 0 1-.908-.088L6.21 9.708a.717.717 0 0 1 1.014-1.015l2.537 2.538zm-2.327 3.372h5.018a.717.717 0 1 1 0 1.434H7.434a.717.717 0 1 1 0-1.434z"/></g></svg>`,
    calc: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#FF7F00"/><path fill="#FFDE82" d="M9.381 13.118l.75-.75a.353.353 0 0 0-.5-.498l-.749.749-.748-.75a.353.353 0 0 0-.5.5l.75.749-.75.748a.353.353 0 0 0 .5.5l.748-.75.75.75a.353.353 0 1 0 .498-.5l-.749-.748zm-.146-4.589V7.471a.353.353 0 0 0-.706 0v1.058H7.471a.353.353 0 0 0 0 .706h1.058v1.06a.353.353 0 1 0 .706 0v-1.06h1.06a.353.353 0 1 0 0-.706h-1.06zM7 5h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/></g></svg>`,
    variable: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#B819B3"/><path fill="#F778F3" d="M7 9.135c0-.475.152-.956.457-1.444.306-.487.75-.891 1.336-1.211C9.378 6.16 10.06 6 10.84 6c.725 0 1.365.134 1.92.401.555.268.984.631 1.286 1.091.303.46.454.96.454 1.5 0 .426-.086.798-.259 1.118a3.42 3.42 0 0 1-.615.829c-.237.232-.663.623-1.278 1.174-.17.155-.307.29-.41.408a1.66 1.66 0 0 0-.228.323c-.05.097-.089.195-.116.292-.028.098-.069.269-.124.514-.095.52-.392.78-.893.78a.912.912 0 0 1-.656-.255c-.177-.17-.266-.422-.266-.758 0-.42.065-.783.195-1.09a2.77 2.77 0 0 1 .518-.81c.215-.233.504-.51.87-.83.32-.28.55-.49.693-.633.143-.143.263-.301.36-.476.098-.176.146-.365.146-.57 0-.4-.148-.738-.446-1.013-.297-.275-.681-.413-1.151-.413-.55 0-.955.14-1.215.417-.26.277-.48.686-.66 1.226-.17.565-.492.848-.968.848a.951.951 0 0 1-.708-.297C7.096 9.58 7 9.365 7 9.135zm3.66 8.22a1.18 1.18 0 0 1-.799-.296c-.227-.198-.341-.474-.341-.829 0-.315.11-.58.33-.795.22-.215.49-.322.81-.322.315 0 .58.107.795.322.215.215.322.48.322.795 0 .35-.112.625-.337.825-.225.2-.485.3-.78.3z"/></g></svg>`,
    func: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><g fill="none" fill-rule="evenodd"><circle cx="11" cy="11" r="11" fill="#A14100"/><path fill="#FF7B22" d="M9.965 9.657c.898-1.77 2.09-3.561 3.778-3.65 2.533-.133 2.469 1.66 2.009 2.045-.46.386-1.086.02-.964-.5-.442-.302-1.083.706-1.787 2.105h1.78a.622.622 0 1 1 0 1.245h-2.39c-.673 1.388-1.488 3.04-2.047 3.628-.732.768-1.673 1.587-3.75 1.298-1.03-.35-.513-1.29 0-1.18.532.136 1.242-.586 2.22-2.564.17-.344.354-.748.555-1.182H7.936a.622.622 0 1 1 0-1.245h2.03z"/></g></svg>`,
  };

  /* ----------------------------------------------------------
   * 텍스트 너비 측정
   * ---------------------------------------------------------- */
  let _measureSvg = null;
  function measureSvgText(text, size, weight) {
    if (!_measureSvg) {
      _measureSvg = document.createElementNS(SVG_NS, 'svg');
      _measureSvg.setAttribute('width', '0');
      _measureSvg.setAttribute('height', '0');
      _measureSvg.style.cssText = 'position:absolute;left:-9999px;visibility:hidden;';
      document.body.appendChild(_measureSvg);
    }
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('font-family', FONT_FAMILY);
    t.setAttribute('font-size', size);
    t.setAttribute('font-weight', weight);
    t.textContent = String(text);
    _measureSvg.appendChild(t);
    const w = t.getBBox().width;
    _measureSvg.removeChild(t);
    return Math.ceil(w);
  }

  /* ----------------------------------------------------------
   * Content 측정 + 렌더링
   *   content는 { type, value | block | name }
   *   block 측정 시 자식 SVG를 만들어 c._svg / c._w / c._h 캐시
   * ---------------------------------------------------------- */
  function measureContent(c, fontSize) {
    fontSize = fontSize || FONT_SIZE;
    switch (c.type) {
      case 'text':
        c._w = measureSvgText(c.value, fontSize, '700');
        c._h = fontSize + 2;
        return c._w;
      case 'input': {
        const inner = measureSvgText(c.value, FONT_SIZE_FIELD, '700');
        c._w = Math.max(20, inner + INPUT_PAD * 2);
        c._h = INPUT_H;
        return c._w;
      }
      case 'dropdown': {
        const inner = measureSvgText(c.value, FONT_SIZE_FIELD, '700');
        c._w = Math.max(36, inner + DROPDOWN_PAD * 2 + DROPDOWN_ARROW_W);
        c._h = INPUT_H;
        return c._w;
      }
      case 'icon':
        c._w = c.size || ICON_SMALL;
        c._h = c.size || ICON_SMALL;
        return c._w;
      case 'block': {
        const child = renderBlock(c.block);     // SVG 미리 생성 + 캐시
        c._svg = child;
        c._w = parseFloat(child.getAttribute('width'));
        c._h = parseFloat(child.getAttribute('height'));
        return c._w;
      }
      default:
        return 0;
    }
  }

  function renderContent(svg, c, x, centerY, color) {
    switch (c.type) {
      case 'text':     return drawText(svg, x, centerY, c.value);
      case 'input':    return drawInput(svg, x, centerY, c.value);
      case 'dropdown': return drawDropdown(svg, x, centerY, c.value, color);
      case 'icon':     return drawIcon(svg, x, centerY - (c.size || ICON_SMALL) / 2, c.name, c.size);
      case 'block': {
        // 자식 SVG를 transform translate로 배치 (높이 중앙 정렬)
        const g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('transform', `translate(${x},${centerY - c._h / 2})`);
        g.appendChild(c._svg);
        svg.appendChild(g);
        return;
      }
    }
  }

  function drawText(svg, x, y, value) {
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('x', x);
    t.setAttribute('y', y);
    t.setAttribute('font-family', FONT_FAMILY);
    t.setAttribute('font-size', FONT_SIZE);
    t.setAttribute('font-weight', '700');
    t.setAttribute('fill', '#ffffff');
    t.setAttribute('dominant-baseline', 'middle');
    t.textContent = String(value);
    svg.appendChild(t);
  }

  function drawInput(svg, x, y, value) {
    const valStr = String(value);
    const innerW = Math.max(8, measureSvgText(valStr, FONT_SIZE_FIELD, '700'));
    const W = innerW + INPUT_PAD * 2;
    const H = INPUT_H;
    const r = document.createElementNS(SVG_NS, 'rect');
    r.setAttribute('x', x);
    r.setAttribute('y', y - H / 2);
    r.setAttribute('width', W);
    r.setAttribute('height', H);
    r.setAttribute('rx', H / 2);
    r.setAttribute('ry', H / 2);
    r.setAttribute('fill', '#ffffff');
    r.setAttribute('stroke', 'rgba(0,0,0,.15)');
    r.setAttribute('stroke-width', '1');
    svg.appendChild(r);
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('x', x + W / 2);
    t.setAttribute('y', y);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-family', FONT_FAMILY);
    t.setAttribute('font-size', FONT_SIZE_FIELD);
    t.setAttribute('font-weight', '700');
    t.setAttribute('fill', '#333');
    t.setAttribute('dominant-baseline', 'middle');
    t.textContent = valStr;
    svg.appendChild(t);
  }

  function drawDropdown(svg, x, y, value, color) {
    const valStr = String(value);
    const innerW = measureSvgText(valStr, FONT_SIZE_FIELD, '700');
    const W = Math.max(36, innerW + DROPDOWN_PAD * 2 + DROPDOWN_ARROW_W);
    const H = INPUT_H;
    const r = document.createElementNS(SVG_NS, 'rect');
    r.setAttribute('x', x);
    r.setAttribute('y', y - H / 2);
    r.setAttribute('width', W);
    r.setAttribute('height', H);
    r.setAttribute('rx', H / 2);
    r.setAttribute('ry', H / 2);
    r.setAttribute('fill', color.stroke);
    svg.appendChild(r);
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('x', x + DROPDOWN_PAD);
    t.setAttribute('y', y);
    t.setAttribute('font-family', FONT_FAMILY);
    t.setAttribute('font-size', FONT_SIZE_FIELD);
    t.setAttribute('font-weight', '700');
    t.setAttribute('fill', '#ffffff');
    t.setAttribute('dominant-baseline', 'middle');
    t.textContent = valStr;
    svg.appendChild(t);
    const arrowX = x + W - DROPDOWN_ARROW_W - 2;
    const tri = document.createElementNS(SVG_NS, 'path');
    tri.setAttribute('d', `M ${arrowX},${y - 2} L ${arrowX + 6},${y - 2} L ${arrowX + 3},${y + 2} z`);
    tri.setAttribute('fill', '#ffffff');
    svg.appendChild(tri);
  }

  function drawIcon(svg, x, y, iconKey, size) {
    if (!ICONS[iconKey]) return;
    const wrap = document.createElementNS(SVG_NS, 'g');
    wrap.setAttribute('transform', `translate(${x},${y})`);
    wrap.innerHTML = ICONS[iconKey];
    const innerSvg = wrap.querySelector('svg');
    if (innerSvg) {
      const s = size || ICON_SMALL;
      innerSvg.setAttribute('width', s);
      innerSvg.setAttribute('height', s);
    }
    svg.appendChild(wrap);
  }

  /* ----------------------------------------------------------
   * Path 헬퍼
   * ---------------------------------------------------------- */
  // 일반 모양: 왼쪽 평평 + 오른쪽 캡슐. 위/아래 connector 옵션.
  function commonOuterPath(W, H, hasTopNotch, hasBottomConvex) {
    const r = H / 2;
    const cL = TRI_CX - TRI_W / 2;
    const cR = TRI_CX + TRI_W / 2;
    const parts = [`M 0,0`];
    if (hasTopNotch) {
      parts.push(`H ${cL}`, `L ${TRI_CX},${TRI_H}`, `L ${cR},0`);
    }
    parts.push(
      `H ${W - r}`,
      `A ${r},${r} 0 0,1 ${W},${r}`,
      `V ${H - r}`,
      `A ${r},${r} 0 0,1 ${W - r},${H}`
    );
    if (hasBottomConvex) {
      parts.push(`H ${cR}`, `L ${TRI_CX},${H + TRI_H}`, `L ${cL},${H}`);
    }
    parts.push(`H 0`, 'z');
    return parts.join(' ');
  }

  /* ----------------------------------------------------------
   * 모양 정의
   *   각 shape: render(opts, color) → SVG element 반환
   * ---------------------------------------------------------- */
  const SHAPE_DEFS = {
    /* ------- hat / stack / cap ------- */
    hat:   { render: (o, c) => renderBasic(o, c, /*topNotch*/false, /*bottomConvex*/true) },
    stack: { render: (o, c) => renderBasic(o, c, true,  true) },
    cap:   { render: (o, c) => renderBasic(o, c, true,  false) },

    /* ------- reporter ------- */
    reporter: { render: (o, c) => renderReporter(o, c) },

    /* ------- boolean ------- */
    boolean: { render: (o, c) => renderBoolean(o, c) },

    /* ------- c-block 단일/이중 슬롯 ------- */
    cblock:        { render: (o, c) => renderCBlock(o, c, /*slots*/1) },
    cblock_double: { render: (o, c) => renderCBlock(o, c, 2) },
  };

  /* ----------------------------------------------------------
   * 기본 모양 렌더링 (hat / stack / cap)
   * ---------------------------------------------------------- */
  function renderBasic(opts, color, topNotch, bottomConvex) {
    const icon = opts.icon || null;
    const contents = opts.contents || [];
    const showMarker =
      opts.marker === false ? false :
      opts.marker ? true :
      (opts.shape === 'stack' || opts.shape === 'cap') && !!CATEGORY_TO_MARKER[opts.category];
    const markerKey = opts.marker || CATEGORY_TO_MARKER[opts.category];

    // 1) contents 측정
    const widths = contents.map((c) => measureContent(c, FONT_SIZE));
    const contentsW = widths.reduce((a, b) => a + b, 0)
                    + Math.max(0, contents.length - 1) * CONTENT_GAP;

    // 2) 본체 폭
    const leftStart = icon ? (SIDE_PAD - 6) + ICON_LARGE + ICON_LARGE_PAD_R : SIDE_PAD;
    let W = leftStart + contentsW + SIDE_PAD;
    if (showMarker) W += CONTENT_GAP + ICON_SMALL + 2;
    W = Math.max(W, MIN_WIDTH);

    const totalH = BODY_H + (bottomConvex ? TRI_H : 0);
    const svg = makeSvg(W, totalH);

    // 3) 본체 path
    addPath(svg, commonOuterPath(W, BODY_H, topNotch, bottomConvex), color);

    // 4) 왼쪽 큰 아이콘 (hat용)
    if (icon) {
      drawIcon(svg, SIDE_PAD - 6 - 2, (BODY_H - ICON_LARGE) / 2, icon, ICON_LARGE);
    }

    // 5) contents 배치
    let cx = leftStart;
    contents.forEach((c, i) => {
      renderContent(svg, c, cx, BODY_H / 2, color);
      cx += widths[i] + (i < contents.length - 1 ? CONTENT_GAP : 0);
    });

    // 6) 오른쪽 카테고리 마커
    if (showMarker) {
      drawIcon(svg, W - SIDE_PAD - ICON_SMALL + 4, (BODY_H - ICON_SMALL) / 2, markerKey, ICON_SMALL);
    }

    return svg;
  }

  /* ----------------------------------------------------------
   * reporter (캡슐)
   * ---------------------------------------------------------- */
  function renderReporter(opts, color) {
    const contents = opts.contents || [];
    const widths = contents.map((c) => measureContent(c, FONT_SIZE_SMALL));
    const contentsW = widths.reduce((a, b) => a + b, 0)
                    + Math.max(0, contents.length - 1) * CONTENT_GAP;
    const H = SMALL_H;
    const padLR = H / 2;       // 캡슐 가장자리 안에 들어가도록
    const W = Math.max(MIN_WIDTH_SMALL, contentsW + padLR * 2);

    const svg = makeSvg(W, H);
    // 캡슐 path
    const r = H / 2;
    const d = `M ${r},0 H ${W - r} A ${r},${r} 0 0,1 ${W - r},${H} H ${r} A ${r},${r} 0 0,1 ${r},0 z`;
    addPath(svg, d, color);

    let cx = padLR;
    contents.forEach((c, i) => {
      renderContent(svg, c, cx, H / 2, color);
      cx += widths[i] + (i < contents.length - 1 ? CONTENT_GAP : 0);
    });
    return svg;
  }

  /* ----------------------------------------------------------
   * boolean (양옆 뾰족한 육각형)
   * ---------------------------------------------------------- */
  function renderBoolean(opts, color) {
    const contents = opts.contents || [];
    const widths = contents.map((c) => measureContent(c, FONT_SIZE_SMALL));
    const contentsW = widths.reduce((a, b) => a + b, 0)
                    + Math.max(0, contents.length - 1) * CONTENT_GAP;
    const H = SMALL_H;
    const notch = BOOL_NOTCH;
    const padLR = 6;
    const W = Math.max(MIN_WIDTH_SMALL, contentsW + (notch + padLR) * 2);

    const svg = makeSvg(W, H);
    // 육각형 path
    const d = [
      `M 0,${H / 2}`,
      `L ${notch},0`,
      `H ${W - notch}`,
      `L ${W},${H / 2}`,
      `L ${W - notch},${H}`,
      `H ${notch}`,
      'z',
    ].join(' ');
    addPath(svg, d, color);

    let cx = notch + padLR;
    contents.forEach((c, i) => {
      renderContent(svg, c, cx, H / 2, color);
      cx += widths[i] + (i < contents.length - 1 ? CONTENT_GAP : 0);
    });
    return svg;
  }

  /* ----------------------------------------------------------
   * c-block (단일·이중 슬롯)
   *   opts: { shape, category, contents, statements, middleContents? }
   *   - statements: 단일 슬롯이면 [block,...]    한 배열
   *                 이중 슬롯이면 [[block,...], [block,...]]
   *   - middleContents: 이중 슬롯의 가운데 띠 contents (예: "아니면")
   * ---------------------------------------------------------- */
  function renderCBlock(opts, color, slotCount) {
    const topContents = opts.contents || [];
    const middleContents = opts.middleContents || [{ type: 'text', value: '아니면' }];
    let statementGroups;
    if (slotCount === 1) {
      statementGroups = [opts.statements || []];
    } else {
      statementGroups = opts.statements || [[], []];
      if (!Array.isArray(statementGroups[0])) statementGroups = [statementGroups, []];
    }

    // 1) top contents 측정
    const topWidths = topContents.map((c) => measureContent(c, FONT_SIZE));
    const topContentsW = topWidths.reduce((a, b) => a + b, 0)
                       + Math.max(0, topContents.length - 1) * CONTENT_GAP;
    const topInnerW = SIDE_PAD + topContentsW + SIDE_PAD;

    // 2) middle contents 측정 (이중 슬롯)
    let middleWidths = [];
    let middleInnerW = 0;
    if (slotCount === 2) {
      middleWidths = middleContents.map((c) => measureContent(c, FONT_SIZE));
      const mW = middleWidths.reduce((a, b) => a + b, 0)
               + Math.max(0, middleContents.length - 1) * CONTENT_GAP;
      middleInnerW = SIDE_PAD + mW + SIDE_PAD;
    }

    // 3) statement groups: 각 자식 블록 measure (renderBlock 호출)
    const groupSvgs = statementGroups.map((group) =>
      group.map((blockOpts) => renderBlock(blockOpts))
    );
    const groupHeights = groupSvgs.map((group) =>
      group.length === 0
        ? CBLOCK_INNER_MIN_H
        : group.reduce((a, sv) => a + parseFloat(sv.getAttribute('height')), 0)
    );
    const groupMaxW = groupSvgs.map((group) =>
      group.length === 0 ? 0 : Math.max(...group.map((sv) => parseFloat(sv.getAttribute('width'))))
    );

    // 4) 전체 폭
    const bodyW = Math.max(
      topInnerW,
      slotCount === 2 ? middleInnerW : 0,
      CBLOCK_INDENT + Math.max(0, ...groupMaxW) + SIDE_PAD
    );
    const W = Math.max(bodyW, MIN_WIDTH);

    // 5) 본체 섹션 높이
    const topH    = BODY_H;
    const middleH = slotCount === 2 ? BODY_H : 0;
    const bottomH = CBLOCK_BOTTOM_H;
    const totalH  = topH + groupHeights[0] + middleH + (groupHeights[1] || 0) + bottomH + TRI_H;

    // 6) 본체 path (ㄷ자, 슬롯 수에 따라)
    const d = cblockPath(W, topH, middleH, bottomH, groupHeights);
    const svg = makeSvg(W, totalH);
    addPath(svg, d, color);

    // 7) top contents 배치
    let cx = SIDE_PAD;
    topContents.forEach((c, i) => {
      renderContent(svg, c, cx, topH / 2, color);
      cx += topWidths[i] + (i < topContents.length - 1 ? CONTENT_GAP : 0);
    });

    // 8) statement 자식 블록 배치
    let yCursor = topH;
    groupSvgs.forEach((group, gi) => {
      let y = yCursor;
      group.forEach((childSvg) => {
        const g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('transform', `translate(${CBLOCK_INDENT},${y})`);
        g.appendChild(childSvg);
        svg.appendChild(g);
        y += parseFloat(childSvg.getAttribute('height'));
      });
      yCursor += groupHeights[gi];
      // 다음 슬롯 사이 middle 띠
      if (slotCount === 2 && gi === 0) {
        let mx = SIDE_PAD;
        middleContents.forEach((c, i) => {
          renderContent(svg, c, mx, yCursor + middleH / 2, color);
          mx += middleWidths[i] + (i < middleContents.length - 1 ? CONTENT_GAP : 0);
        });
        yCursor += middleH;
      }
    });

    return svg;
  }

  function cblockPath(W, topH, middleH, bottomH, groupHeights) {
    const r = topH / 2;          // 오른쪽 캡슐 반지름 (작은 r은 별도)
    const rb = bottomH / 2;
    const cL = TRI_CX - TRI_W / 2;
    const cR = TRI_CX + TRI_W / 2;
    const indent = CBLOCK_INDENT;
    // 안쪽 슬롯 윗가장자리에 들어가는 ▽ (자식 stack의 ∇이 박힐 자리, 본체 입장에선 볼록)
    const innerCL = indent + TRI_CX - TRI_W / 2;
    const innerCR = indent + TRI_CX + TRI_W / 2;
    const innerCX = indent + TRI_CX;

    const parts = [
      `M 0,0`,
      // 위 ∇ 들어가는 자리
      `H ${cL}`, `L ${TRI_CX},${TRI_H}`, `L ${cR},0`,
      `H ${W - r}`,
      `A ${r},${r} 0 0,1 ${W},${r}`,
      `V ${topH - r}`,
      `A ${r},${r} 0 0,1 ${W - r},${topH}`,
    ];

    // === 첫 번째 슬롯 ===
    let y = topH;
    // 본체 아래쪽 → 안쪽 슬롯 윗가장자리 (오른쪽→왼쪽)
    parts.push(`H ${innerCR + 4}`);
    // 안쪽 ▽ (자식 입장에서 위쪽 ∇이 박힐 자리)
    parts.push(`L ${innerCX + 4 - TRI_W / 2},${y + TRI_H}`); // 어색함 — 일단 단순화: 안쪽 슬롯 위 직선
    // (단순화) 안쪽 슬롯 위 직선만 그림
    parts.length = parts.length - 2; // 위 2줄 취소
    parts.push(`H ${indent}`);
    parts.push(`V ${y + groupHeights[0]}`);
    parts.push(`H ${W - rb}`);
    parts.push(`A ${rb},${rb} 0 0,1 ${W},${y + groupHeights[0] + rb}`);

    if (middleH > 0) {
      // === middle 띠 ===
      const my = y + groupHeights[0];
      parts.push(`V ${my + middleH - rb}`);
      parts.push(`A ${rb},${rb} 0 0,1 ${W - rb},${my + middleH}`);
      // === 두 번째 슬롯 ===
      const y2 = my + middleH;
      parts.push(`H ${indent}`);
      parts.push(`V ${y2 + groupHeights[1]}`);
      parts.push(`H ${W - rb}`);
      parts.push(`A ${rb},${rb} 0 0,1 ${W},${y2 + groupHeights[1] + rb}`);
      y = y2 + groupHeights[1];
    } else {
      y = y + groupHeights[0];
    }

    // === 아래쪽 본체 ===
    const totalBeforeBottom = y;
    parts.push(`V ${totalBeforeBottom + bottomH - rb}`);
    parts.push(`A ${rb},${rb} 0 0,1 ${W - rb},${totalBeforeBottom + bottomH}`);

    // === 아래 ▽ ===
    parts.push(`H ${cR}`, `L ${TRI_CX},${totalBeforeBottom + bottomH + TRI_H}`, `L ${cL},${totalBeforeBottom + bottomH}`);
    parts.push(`H 0`);
    parts.push('z');
    return parts.join(' ');
  }

  /* ----------------------------------------------------------
   * SVG 헬퍼
   * ---------------------------------------------------------- */
  function makeSvg(W, H) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('xmlns', SVG_NS);
    svg.classList.add('entry-block-svg');
    return svg;
  }

  function addPath(svg, d, color) {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', color.fill);
    path.setAttribute('stroke', color.stroke);
    path.setAttribute('stroke-width', '1');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
  }

  /* ----------------------------------------------------------
   * renderBlock — 모든 모양 진입점
   * ---------------------------------------------------------- */
  function renderBlock(opts) {
    const shape = opts.shape || 'stack';
    const category = opts.category || 'START';
    const color = COLORS[category] || COLORS.START;
    const def = SHAPE_DEFS[shape];
    if (!def) throw new Error('Unsupported shape: ' + shape);
    return def.render(Object.assign({}, opts, { shape, category }), color);
  }

  /* ----------------------------------------------------------
   * Public API
   * ---------------------------------------------------------- */
  function render(target, opts) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) {
      console.warn('[EntryBlocks] target not found:', target);
      return null;
    }
    const svg = renderBlock(opts);
    el.appendChild(svg);
    return svg;
  }

  function init(selector) {
    // 1) 단일 블록 (.entry-block)
    document.querySelectorAll(selector || '.entry-block').forEach((el) => {
      if (el.dataset.rendered === 'true') return;
      let opts;
      try {
        opts = JSON.parse(el.dataset.block || '{}');
      } catch (e) {
        el.textContent = '[EntryBlock JSON 오류] ' + e.message;
        console.error('[EntryBlocks]', e, el);
        return;
      }
      try {
        el.appendChild(renderBlock(opts));
        el.dataset.rendered = 'true';
      } catch (e) {
        el.textContent = '[EntryBlock 렌더 오류] ' + e.message;
        console.error('[EntryBlocks]', e, el);
      }
    });

    // 2) 코드 묶음 (.entry-code, 여러 블록을 위아래로 쌓고 note 함께 표시)
    document.querySelectorAll('.entry-code').forEach((el) => {
      if (el.dataset.rendered === 'true') return;
      let blocks;
      try {
        blocks = JSON.parse(el.dataset.blocks || '[]');
      } catch (e) {
        el.textContent = '[EntryCode JSON 오류] ' + e.message;
        console.error('[EntryBlocks]', e, el);
        return;
      }
      blocks.forEach((blockOpts, i) => {
        const row = document.createElement('div');
        row.className = 'entry-code-row';
        if (i > 0) row.style.marginTop = '-' + TRI_H + 'px';  // ∇/▽ 정렬 (-6px)
        try {
          row.appendChild(renderBlock(blockOpts));
        } catch (e) {
          row.textContent = '[블록 오류] ' + e.message;
          console.error('[EntryBlocks]', e, blockOpts);
        }
        if (blockOpts.note) {
          const note = document.createElement('span');
          note.className = 'entry-note';
          note.textContent = blockOpts.note;
          row.appendChild(note);
        }
        el.appendChild(row);
      });
      el.dataset.rendered = 'true';
    });
  }

  /* ----------------------------------------------------------
   * 스타일 자동 주입 (.entry-code / .entry-code-row / .entry-note)
   * ---------------------------------------------------------- */
  (function injectStyles() {
    const STYLE_ID = 'entry-blocks-styles';
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .entry-code { display: flex; flex-direction: column; align-items: flex-start; }
      .entry-code-row { display: flex; align-items: flex-start; gap: 14px; }
      .entry-note {
        font-family: 'Nanum Gothic', '맑은 고딕', 'Malgun Gothic', sans-serif;
        font-size: 12.5px; color: #555;
        align-self: center;
        line-height: 1.4;
      }
      .entry-block, .entry-block svg { display: block; }
      .entry-block-svg { vertical-align: top; }
    `;
    document.head.appendChild(style);
  })();

  function autoInit() {
    const fire = () => init();
    if (document.fonts && document.fonts.ready) {
      Promise.race([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, 1000)),
      ]).then(fire);
    } else {
      setTimeout(fire, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  global.EntryBlocks = { render, init, COLORS, ICONS, CATEGORY_TO_MARKER };
})(window);
