document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------
  // 1. 점(Dots) - Cycloid 원형 애니메이션 (#cycloidSvg)
  // -------------------------------------------------------------
  const cycloidSvgs = document.querySelectorAll(".cycloidSvg, #cycloidSvg");

  cycloidSvgs.forEach((svg) => {
    if (!svg || svg.children.length > 0) return;

    const lineCount = 45;
    const center = 400;
    const baseRadius = 120;
    const paths = [];

    for (let i = 0; i < lineCount; i++) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
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

    function createCirclePathD(cx, cy, r, time, phase) {
      const wave = Math.sin(time + phase) * 3.5;
      const currentR = r + wave;
      const k = currentR * 0.552284749831;

      return `
        M ${cx} ${cy - currentR}
        C ${cx + k} ${cy - currentR}, ${cx + currentR} ${cy - k}, ${cx + currentR} ${cy}
        C ${cx + currentR} ${cy + k}, ${cx + k} ${cy + currentR}, ${cx} ${cy + currentR}
        C ${cx - k} ${cy + currentR}, ${cx - currentR} ${cy + k}, ${cx - currentR} ${cy}
        C ${cx - currentR} ${cy - k}, ${cx - k} ${cy - currentR}, ${cx} ${cy - currentR}
        Z
      `;
    }

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
        p.element.setAttribute("d", dAttr);
      });
    });
  });

  // -------------------------------------------------------------
  // 2. 선(Lines) - 정삼각형 회전 구조 (#linesCodePenGroup)
  // -------------------------------------------------------------
  const linesGroup = document.getElementById("linesCodePenGroup");
  if (linesGroup) {
    const numTriangles = 30;
    const center = 400;
    const baseSize = 220;
    const trianglePaths = [];

    for (let i = 0; i < numTriangles; i++) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("stroke-opacity", 0.3 + (i / numTriangles) * 0.6);
      linesGroup.appendChild(path);
      trianglePaths.push(path);
    }

    let time = 0;

    gsap.ticker.add(() => {
      time += 0.015;
      const wave = (Math.sin(time) + 1) / 2;

      trianglePaths.forEach((path, i) => {
        const indexFactor = i / numTriangles;
        const rotationOffset = indexFactor * wave * (Math.PI * 0.65);
        const scale = 1 - (indexFactor * wave * 0.45);

        const vertices = [];
        for (let j = 0; j < 3; j++) {
          const angle = -Math.PI / 2 + (j * (Math.PI * 2) / 3) + rotationOffset;
          const r = baseSize * scale;
          const x = center + Math.cos(angle) * r;
          const y = center + Math.sin(angle) * r;
          vertices.push({ x, y });
        }

        const d = `M ${vertices[0].x.toFixed(2)} ${vertices[0].y.toFixed(2)} ` +
                  `L ${vertices[1].x.toFixed(2)} ${vertices[1].y.toFixed(2)} ` +
                  `L ${vertices[2].x.toFixed(2)} ${vertices[2].y.toFixed(2)} Z`;

        path.setAttribute("d", d);
      });
    });
  }

  // -------------------------------------------------------------
  // 3. 연결(Connections) - 물결 SVG 파동 (#connectionsCodePenGroup)
  // -------------------------------------------------------------
  const connectionsGroup = document.getElementById("connectionsCodePenGroup");
  if (connectionsGroup) {
    const lineCount = 35;
    const pointsPerLine = 100;
    const paths = [];

    // viewBox 좌표계 기준 (800x800)
    const width = 800;
    const height = 800;
    const centerY = height / 2;

    for (let i = 0; i < lineCount; i++) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const opacity = 0.15 + (i / lineCount) * 0.45;

      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-width", "1.2");
      path.setAttribute("stroke-opacity", opacity);

      connectionsGroup.appendChild(path);
      paths.push(path);
    }

    let time = 0;

    gsap.ticker.add(() => {
      time += 0.01;

      for (let i = 0; i < lineCount; i++) {
        const lineOffset = i * 0.08;
        let d = "";

        for (let j = 0; j <= pointsPerLine; j++) {
          const progress = j / pointsPerLine;
          const x = progress * width;

          const angle = progress * Math.PI * 4 + time + lineOffset;
          const amplitude = Math.sin(progress * Math.PI) * 160;
          const y = centerY + Math.sin(angle) * amplitude * Math.cos(time * 0.5 + lineOffset);

          if (j === 0) {
            d += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
          } else {
            d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
          }
        }

        paths[i].setAttribute("d", d);
      }
    });
  }
});

// -------------------------------------------------------------
// 4. jQuery 확장 및 스크롤 로더 제어
// -------------------------------------------------------------
$.fn.addActive = function() {
  var winTop = $(window).scrollTop();
  var winBottom = winTop + $(window).height();

  return this.each(function() {
    var $el = $(this);
    var elTop = $el.offset().top;
    var triggerPoint = winBottom - ($el.outerHeight() * 0.2); 

    if (elTop < triggerPoint) {
      $el.addClass('active');
    }
  });
};

var loader = {
  $html: null,
  activeFn: function() {
    $(window).on('scroll.scrollEffect', function() {
      $('.scrollEffect').addActive();
      $('.dashed_wrap, .contactNumber').addActive();
      $('[class^=figure]').addActive();
      $('.imgEffect').addActive();
      $('.mainFullArea').addActive();
      $('.process_wrap .dash').addActive();
      $('.onFrame').addActive();
    }).trigger('scroll.scrollEffect');
  },
  init: function() {
    var $t = this,
        url = document.location.href,
        urlFlag = url.indexOf('pc/main'),
        urlFlag2 = url.indexOf('pc/projects/20'),
        urlFlag3 = url.indexOf('?preload=0');

    $t.$html = '<div id="preloader"><span>Loading...</span></div>';

    if (urlFlag === -1 && urlFlag2 === -1 && urlFlag3 === -1) {
      if ($("#preloader").length === 0) {
        $("body").prepend($t.$html);
      }
      setTimeout(function() {
        $("#preloader").fadeOut(function() {
          $t.activeFn();
        });
      }, 1000);
    } else {
      $t.activeFn();
    }
  }
};

$(document).ready(function() {
  loader.init();
});

// -------------------------------------------------------------
// fixed 조정용
// -------------------------------------------------------------

$(window).on('scroll resize', function() {
  var scrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();

  // 1. Section 1 타이틀 제어
  var $sec1 = $('#section1');
  var $title1 = $('#is-fixed1');

  if ($sec1.length && $title1.length) {
    var sec1Top = $sec1.offset().top;
    var sec1Height = $sec1.outerHeight();
    var targetTop = windowHeight * 0.3; // 화면 30% 지점

    var fixedStart = sec1Top - targetTop;
    var fixedEnd = sec1Top + sec1Height - $title1.outerHeight() - targetTop;

    if (scrollTop < fixedStart) {
      // 고정 시작 전: absolute 기본 위치
      $title1.removeClass('is-fixed is-absolute-bottom');
    } else if (scrollTop >= fixedStart && scrollTop < fixedEnd) {
      // 화면 30% 위치에 fixed 고정
      $title1.addClass('is-fixed').removeClass('is-absolute-bottom');
    } else {
      // Section 1 영역이 끝나면 하단으로 자연스럽게 밀려 올라감
      $title1.removeClass('is-fixed').addClass('is-absolute-bottom');
    }
  }

  // 2. Section 2 타이틀 제어 (#section2 스크롤 시 화면 중앙 30%에 도달하면 fixed로 변경)
  var $sec2 = $('#section2');
  var $title2 = $('#is-fixed2');

  if ($sec2.length && $title2.length) {
    var sec2Top = $sec2.offset().top;
    var sec2Target = sec2Top - (windowHeight * 0.3); // 화면 중앙 30% 위치 연산

    if (scrollTop >= sec2Target) {
      $title2.addClass('is-fixed');
    } else {
      $title2.removeClass('is-fixed');
    }
  }
}).trigger('scroll');