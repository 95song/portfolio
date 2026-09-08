document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("cycloidSvg");
  if (!svg) return;

  const lineCount = 45;      // SVG 정원 선 개수
  const center = 400;        // SVG viewBox 기준 중심점 (400, 400)
  const baseRadius = 120;    // 기본 반지름
  const paths = [];

  // 1. SVG 동적 Path 생성
  for (let i = 0; i < lineCount; i++) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    
    // 투명도 레이어드 설정
    const opacity = 0.12 + (i / lineCount) * 0.45;
    path.setAttribute("class", "cycloid-path");
    path.setAttribute("stroke-opacity", opacity);
    
    svg.appendChild(path);
    paths.push({
      element: path,
      radiusOffset: i * 2.2,
      phaseOffset: i * 0.04
    });
  }

  // 2. 정원 베지어 곡선(d 속성) 계산 함수
  function createCirclePathD(cx, cy, r, time, phase) {
    // 정원을 이루는 4개의 베지어 제어점 수식
    const wave = Math.sin(time + phase) * 3.5;
    const currentR = r + wave;
    const k = currentR * 0.552284749831; // 원을 베지어로 그리기 위한 상수 (Magic Number)

    return `
      M ${cx} ${cy - currentR}
      C ${cx + k} ${cy - currentR}, ${cx + currentR} ${cy - k}, ${cx + currentR} ${cy}
      C ${cx + currentR} ${cy + k}, ${cx + k} ${cy + currentR}, ${cx} ${cy + currentR}
      C ${cx - k} ${cy + currentR}, ${cx - currentR} ${cy + k}, ${cx - currentR} ${cy}
      C ${cx - currentR} ${cy - k}, ${cx - k} ${cy - currentR}, ${cx} ${cy - currentR}
      Z
    `;
  }

  // 3. GSAP Ticker로 프레임 애니메이션 실행
  let progress = 0;

  gsap.ticker.add(() => {
    progress += 0.02;

    paths.forEach((p) => {
      const dAttr = createCirclePathD(
        center,
        center,
        baseRadius + p.radiusOffset,
        progress,
        p.phaseOffset
      );
      
      // SVG path 속성 직접 업데이트
      p.element.setAttribute("d", dAttr);
    });
  });
});


const g = document.querySelector('g')
const path = document.querySelector('path')

for (let i=0; i<50; i++){
  const clone = path.cloneNode()
  g.append(clone)
}

const spread = gsap.timeline({paused:true})
.to(g, { svgOrigin:'5 5.5', rotate:-180 })
.to('path', {
  svgOrigin:'5 5.5',
  rotate:-180,
  scale:0.15,
  attr:{'stroke-width':0},
  ease:'power1.in',
  stagger:{ amount:.5, ease:'sine.in' }
}, 0)

const tl = gsap.to(spread, {
  duration:6,
  ease:'power2.inOut',
  progress:0.5,
  yoyo:true,
  repeat:-1
})

gsap.set('rect', {rotate:45, svgOrigin:'5 5'})
gsap.set('.svg-container.line svg', {opacity:1})

window.onclick =()=> gsap.to(tl, {timeScale:(tl.isActive()?0:1)});