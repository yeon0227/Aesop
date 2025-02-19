
// lenis
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// scroll
// window.addEventListener('load', function () {
//   window.scrollTo(0, 0); 
//   gsap.to(window, { duration: 1 }); 
// });

// header background color 
let lastScroll = 0;
$(window).scroll(function () { 
  curr = $(this).scrollTop();

  if (curr > lastScroll && curr > 30) {
    $('#header .header-inner').addClass('bg');
  } else {
    $('#header .header-inner').removeClass('bg');
  }
});
// link
$('#header .preorder-link').click(function () {
  const orderOffset = $('.sc-order1 .group-order .order-box').offset().top;

  window.scrollTo({
    top: orderOffset,
    behavior: "smooth"
  });
});

// header nav mobile
$('#header .header-inner .btn-toggle').click(function (e) { 
  e.preventDefault();
  $('#header .nav-mo').addClass('active');
  navMobile.play();
});
$('#header .nav-mo .close-svg').click(function (e) { 
  e.preventDefault();
  $('#header .nav-mo').removeClass('active');
  navMobile.reverse();
});

const navMobile = gsap.timeline({
  scrollTrigger: {
    trigger: '#header .nav-mo', 
    start: "top top",
    end: "100% 100%",
    // markers: true,
  },
  paused: true, 
})
navMobile
  .from('#header .nav-mo .group-nav .nav-item',1, { opacity: 0, y: 40, stagger:0.3, },'>-=1')
  .from('#header .nav-mo .group-btn',1, { opacity: 0, },'>-=1')
  .from('#header .nav-mo .group-policy .policy',1, { opacity: 0, y: 40, stagger:0.3, },'>-=1')

// .sc-product .group-product
// let scrollPosition = 0;

// const blockScroll = () => {
//   scrollPosition = window.pageYOffset; // 현재 스크롤 위치 저장
//   document.body.style.position = 'fixed';
//   document.body.style.top = `-${scrollPosition}px`; // 스크롤 고정
//   document.body.style.width = '100%'; // 페이지가 흔들리지 않도록 설정
// };

// const allowScroll = () => {
//   document.body.style.position = ''; // 스크롤 고정 해제
//   document.body.style.top = ''; // 원래 위치로 복원
//   window.scrollTo(0, scrollPosition); // 저장된 위치로 스크롤 복원
// };

const percent = document.querySelector('.percent');
const visual = gsap.timeline({
  // onStart: blockScroll, // 애니메이션 시작 시 스크롤 차단
  // onComplete: allowScroll // 애니메이션 완료 후 스크롤 복원
});

visual
  .to('#header .percent', { autoAlpha: 1 }, 'a') 
  .to({ value: 0 }, {
    value: 100,
    duration: 2,
    onUpdate: function () {
      percent.textContent = Math.round(this.targets()[0].value) + "%";
    }
  })
  .to('.sc-product .group-product .bg-area img', { scale: 1, },'a')
  .to('.sc-product .logo-area', {  autoAlpha: 1, },'a') 
  .to('#header .line',{ x:0, },'a')
  .to('.sc-product .group-product .title-area',{ autoAlpha:1, },'b')
  .from('.sc-product .group-product .title',{ 
    y:100,
    opacity: 0,
    stagger: {
      // from:'end',
      each:0.1,
    }
   },'b+=0.3')
  .to('.sc-product .group-product .img-area',{ y:0, },'b')
  .to('.sc-product .logo-area',{ autoAlpha: 0, },'b')
  .to('.sc-product .group-product .prod1',{ autoAlpha:1 },'b+=0.5')
  .to('#header .percent',{ autoAlpha: 0, },'b+=0.5')
  .to('#header .header-inner',{ y:0, },'b+=0.5')
  .to('.sc-product .group-product .sub-title-area',1,{ autoAlpha: 1, y:0,},'c-=0.5')
  .to($('.sc-product .group-product .perform-item'),1,{ 
    autoAlpha: 1,
    y: 0,
    stagger: 0.2,
  },'c')
  .to('.sc-product .group-product .desc',1,{ autoAlpha: 1, y: 0, stagger: 0.2, },'c+=0.5')
  .to('.sc-product .group-product .scroll-area',1,{ autoAlpha: 1, },'c+=0.5');

// sc-product .group-product .img-area
$(document).mousemove(function(e){
  xVal = e.clientX - window.innerWidth/2;
  yVal = e.clientY - window.innerHeight/2;

  gsap.to('.sc-product .group-product .prod', {
    x:xVal/100,
    y:yVal/100,
  })
});

// sc-product .group-product
const product = gsap.timeline({
  scrollTrigger:{
    trigger:'.sc-product .group-product',
    start:'0% 0%',
    end:'100% 0%',
    // markers: true,
    scrub: 0,
  }
})
product
  .to('.sc-product .group-product > *',{
    ease:'none',
    y:280
  },'a')

// sc-product .group-desc background scale
gsap.to('.sc-product .group-desc .bg', {
  scale: 1.2,
  ease: 'none',
  scrollTrigger: {
    trigger: '.sc-product .group-product',
    start: '100% 50%',
    endTrigger: '.sc-product .group-desc',
    end: '100% 100%',
    scrub: true,
  }
});

// sc-product .group-desc
gsap.set('.sc-product .group-desc .txt', { yPercent:108, })

const desc = gsap.timeline({
  scrollTrigger:{
    trigger:'.sc-product .group-product',
    start:'100% 50%',
    endTrigger:'.sc-product .group-desc',
    end:'100% 100%',
    // markers: true,
    scrub: 0,
    onUpdate: function(self){
      gsap.set('.sc-product .group-desc',{ '--progress': self.progress })
    }
  }
})
desc
  .to('.sc-product .group-desc .text-item:nth-child(1) .txt',{
    yPercent: 0,
  })
  .to('.sc-product .group-desc .text-item:nth-child(1) .txt',{
    yPercent: -108,
  },'a')
  .to('.sc-product .group-desc .desc-item',{
    yPercent: -100,
    ease: "none",
  },'a')

  .to('.sc-product .group-desc .text-item:nth-child(2) .txt',{
    yPercent: 0,
  })
  .to('.sc-product .group-desc .text-item:nth-child(2) .txt',{
    yPercent: -108,
  },'b')
  .to('.sc-product .group-desc .desc-item',{
    yPercent: -200,
    ease: "none",
  },'b')

  .to('.sc-product .group-desc .text-item:nth-child(3) .txt',{
    yPercent: 0,
  })
  .to('.sc-product .group-desc .text-item:nth-child(3) .txt',{
    yPercent: -108,
  },'c')
  .to('.sc-product .group-desc .desc-item',{
    yPercent: -300,
    ease: "none",
  },'c')

  .to('.sc-product .group-desc .text-item:nth-child(4) .txt',{
    yPercent: 0,
  })

// sc-product .group-performance
const performance = gsap.timeline({
  scrollTrigger:{
    trigger:'.sc-product .group-performance',
    start:'0% 0%',
    end:'100% 100%',
    // markers: true,
    scrub: 0,
    onUpdate: function(self){
      gsap.set('.sc-product .group-performance',{ '--progress': self.progress })
    }
  }
})
performance
  .to('.sc-product .group-performance .desc-item', 1,{
    yPercent: -100,
    ease: "none",
  },'a')
  .to('.sc-product .group-performance .perform-item:nth-child(2)', 1, {
    yPercent: -100,
  },'a')
  .to('.sc-product .group-performance .connect-svg',{
    'top': '41%',
    'left': '37.5%',
  },'a')
  .to('.sc-product .group-performance .desc-item',1,{
    yPercent: -200,
    ease: "none",
  },'b')
  .to('.sc-product .group-performance .perform-item:nth-child(3)',1, {
    yPercent: -200,
  },'b')
  .to('.sc-product .group-performance .connect-svg',{
    'top': '53%',
    'left': '28%',
  },'b')
  .to('.sc-product .group-performance .perform-item:nth-child(4)',1, {
    yPercent: -300,
  },'c')
  .to('.sc-product .group-performance .desc-item',1,{
    yPercent: -300,
    ease: "none",
  },'c')
  .to('.sc-product .group-performance .connect-svg',{
    'top': '24%',
    'left': '48%',
  },'c')

// .sc-order1
gsap.set('.sc-order1 .group-mask',{ 'mask-size': '200px', })

const order1 = gsap.timeline({
  scrollTrigger:{
    trigger: '.sc-order1',
    start: '0% 50%',
    end: '100% 100%',
    // markers: true,
    scrub: 0,
  }
})
order1
  .to('.sc-order1 .group-mask', {
    'mask-size': '800px',
    duration: 0.5, 
    ease: "power2.out"
  })
  .to('.sc-order1 .group-mask', {
    'mask-size': '7300px',
    duration: 0.3, 
    ease: "power3.out" 
  },'order')
  .to('.sc-order1 .group-order', {
    yPercent: -100,
  },'order+=0.1')
  .to('.sc-order1 .group-order', {
    yPercent: -200,
  },'percent')
  .to('.sc-order1 .group-persent', {
    yPercent: -200,
  },'percent')
  .to('.sc-order1 [data-circle]:nth-of-type(1)', 0.2,{
    transform: 'scale(1.25, 1.25)',
    opacity: 1
  },'circle')
  .to('.sc-order1 [data-circle]:nth-of-type(2)', 0.4,{
    transform: 'scale(1.25, 1.25)',
    opacity: 1
  },'circle')
  .to('.sc-order1 [data-circle]:nth-of-type(3)', 1,{
    transform: 'scale(1.25, 1.25)',
    opacity: 1
  },'circle')
  .to({ value: 80 },1, {
    value: 99.95,             
    duration: 0.5,         
    ease: "linear",  
    onUpdate: function () { 
      document.querySelector(".font-mono").textContent = 
        this.targets()[0].value.toFixed(2) + "%"; 
    }
  },'circle');

// order-box color-list 
$(".sc-order1 .order-box .color-item:first-child .color").addClass("active");
$(".sc-order1 .order-box .color-item:first-child").addClass("opacity");

$(".sc-order1 .order-box .color-item").on("click", function () {
    $(this).siblings().find(".color").removeClass("active");  
    $(this).find(".color").addClass("active");
    $(this).addClass("opacity").siblings().removeClass("opacity");
});

// .sc-info1 dark 
const darkMode1 = gsap.timeline({
  scrollTrigger:{
    trigger: '.sc-info1',
    start: '0% 5%',
    end: '100% 100%',
    // markers:true,
    toggleClass: {
      targets: '#header',
      className: 'dark',
    }
  }
});

// .sc-info1 .group-info1 timeline
const info1 = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-info1 .group-info1', 
    start: "0% 80%",
    end: "100% 100%", 
    scrub: 0, 
    // markers: true,
  },
})
info1
  .from('.sc-info1 .group-info1 .head-number', { opacity: 0, y: 40 },'a')
  .from('.sc-info1 .group-info1 .head-title', { opacity: 0, y: 40 },'a')
  .from('.sc-info1 .group-info1 .title', { opacity: 0, y: 40 }, 'a+=0.1')
  .from('.sc-info1 .group-info1 .dl-desc', { opacity: 0, y: 40, stagger: 0.2 }, 'a+=0.2')
  .from('.sc-info1 .group-info1 .point-item', { opacity: 0, y: 40, stagger: 0.2 }, 'a')
  .from('.sc-info1 .group-info1 .point-btn', { opacity: 0, y: 40 }, 'a+=0.8');

// .sc-info2 
const info2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-info1 .group-info2', 
    start: "0% 80%",
    end: "100% 100%",
    scrub: 0, 
    // markers: true,
  },
})
info2
  .from('.sc-info1 .group-info2 .head-number',1, { opacity: 0, y: 40 },'a')
  .from('.sc-info1 .group-info2 .head-title',1, { opacity: 0, y: 40 },'a')
  .from('.sc-info1 .group-info2 .img-wrap video',1, { opacity: 0, y: 40, },'b+=1')
  .from('.sc-info1 .group-info2 .order',1, { opacity: 0, scale: 0, },'b+=2')

// .sc-order2
const order2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-order2', 
    start: "0% 80%",
    end: "100% 100%",
    scrub: 0, 
    // markers: true,
    ease: "none",
  },
})
order2
  .to(".sc-order2", { backgroundPosition: "center -300px", })
  .from('.sc-order2 .title',1, { opacity: 0, yPercent: 100, stagger:0.1 },'a-=2')
  .from('.sc-order2 .group-product .product-inner',0.5, { autoAlpha: 0, y: 200 },'b-=1.5')
  .to('.sc-order2 .group-product .product-inner img',1, { y: 306 },'b')

// order-box color-list 
$(".sc-order2 .order-box .color-item:first-child .color").addClass("active");
$(".sc-order2 .order-box .color-item:first-child").addClass("opacity");

$(".sc-order2 .order-box .color-item").on("click", function () {
  $(this).siblings().find(".color").removeClass("active");  
  $(this).find(".color").addClass("active");
  $(this).addClass("opacity").siblings().removeClass("opacity");
});

// .sc-info2 .group-info3
const info3 = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-info2 .group-info3', 
    start: "0% 80%",
    end: "100% 100%",
    scrub: 0, 
    // markers: true,
  },
})
info3
  .from('.sc-info2 .group-info3 .head-number',0.5, { opacity: 0, y: 40 },'a')
  .from('.sc-info2 .group-info3 .head-title',0.5, { opacity: 0, y: 40 },'a')
  .from('.sc-info2 .group-info3 .info-title .title',0.1, { opacity: 0, stagger:0.1, },'b')
  .from('.sc-info2 .group-info3 .desc',0.1, { opacity: 0, stagger:0.1, },'b')
  .from('.sc-info2 .group-info3 .info-img-wrap',0, { opacity: 0, },'b')
  .from('.sc-info2 .group-info3 .point-link',0.1, { opacity: 0, },'b+=0.3')
  .to('.sc-info2 .group-info3 .info-img',1, { y:50, },'c')

// .sc-info2 .group-benefit
const benefit = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-info2 .group-benefit', 
    start: "0% 90%",
    end: "100% 100%",
    scrub: 0, 
    // markers: true,
  },
})
benefit
  .from('.sc-info2 .group-benefit .info-title', { opacity: 0, y: 40 },'a')
  .from('.sc-info2 .group-benefit .benefit-list', { opacity: 0, y: 40 },'a')
  .from('.sc-info2 .group-benefit .point-btn', { opacity: 0, y: 40 },'a+=0.5')

// .sc-info2 .group-design 
const design = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-info2 .group-design', 
    start: "0% 90%",
    end: "100% 100%",
    scrub: 0, 
    // markers: true,
  },
})
design
  .from('.sc-info2 .group-design .info-title', { opacity:0, y: 40, },'a')
  .from('.sc-info2 .group-design .dl-desc', { opacity: 0, y: 40, stagger: 0.2, },'b')
  .from('.sc-info2 .group-design .info-order-short', { opacity: 0, y: 40, },'b+=1')
  .from('.sc-info2 .group-design .text-inner', { opacity: 0, },'c')


// .sc-info2 .group-design drag
Draggable.create('.cursor-grab', {
  type: 'y', // Y축으로만 드래그 가능
  bounds: '.sc-info2 .group-design .drag-svg', // 드래그 범위 제한
  onDrag: function () {
    const boundsElement = document.querySelector('.sc-info2 .group-design .drag-svg'); // 실제 DOM 요소 가져오기
    const handle = this.target.getBoundingClientRect(); // 드래그 요소 위치 가져오기

    if (!boundsElement) return; // bounds 요소가 없으면 실행하지 않음

    const bounds = boundsElement.getBoundingClientRect(); // 드래그 가능 범위 좌표 가져오기

    const minY = bounds.top; // 최소 Y값
    const maxY = bounds.bottom - handle.height; // 최대 Y값
    const currentY = handle.top; // 현재 Y값

    const progress = (currentY - minY) / (maxY - minY); // 진행도 (0 ~ 1)

    console.log(`진행도: ${(progress).toFixed(2)}%`);

    gsap.to('.sc-info2 .group-design .lightOff', {
      opacity: 1 - progress, // progress에 따라 1에서 0으로
      duration: 0, // 즉시 반영 (실시간 업데이트)
    });
  }
});

// order-box color-list 
$(".sc-info2 .order-box .color-item:first-child .flav").addClass("active");
$(".sc-info2 .order-box .color-item:first-child").addClass("opacity");

$(".sc-info2 .order-box .color-item").on("click", function () {
  $(this).siblings().find(".flav").removeClass("active");  
  $(this).find(".flav").addClass("active");
  $(this).addClass("opacity").siblings().removeClass("opacity");
});

// .sc-goodpoint
gsap.set('.sc-goodpoint .text-item:not(:nth-child(1))', { opacity: 0 });

const goodpoint = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-goodpoint', 
    start: "0% 0%",
    end: "100% 100%",
    scrub: 0, 
    // markers: true,
    onUpdate: function(a) {
      console.log(a.progress);

      if (a.progress >= 0.2) {
        gsap.to('.sc-goodpoint .text-item:nth-child(1)', { opacity: 0, duration: 0 });
        gsap.to('.sc-goodpoint .text-item:nth-child(2)', { opacity: 1, duration: 0 });
      } else if (a.progress < 0.2) {
        gsap.to('.sc-goodpoint .text-item:nth-child(1)', { opacity: 1, duration: 0 });
        gsap.to('.sc-goodpoint .text-item:nth-child(2)', { opacity: 0, duration: 0 });
      }

      if (a.progress >= 0.7) {
        gsap.to('.sc-goodpoint .text-item:nth-child(2)', { opacity: 0, duration: 0 });
        gsap.to('.sc-goodpoint .text-item:nth-child(3)', { opacity: 1, duration: 0 });
      } else if (a.progress < 0.7 && a.progress >= 0.2) {
        gsap.to('.sc-goodpoint .text-item:nth-child(3)', { opacity: 0, duration: 0 });
        gsap.to('.sc-goodpoint .text-item:nth-child(2)', { opacity: 1, duration: 0 });
      }
    }
  }
})
goodpoint
 .to($('.sc-goodpoint .img-item')[2],1,{ 'clip-path': 'inset(0% 0% 100% 0%)' },'a')
 .to($('.sc-goodpoint .img-item')[1],1,{ 'clip-path': 'inset(0% 0% 100% 0%)' },'b');

// .sc-info3 .group-info4
const info4 = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-info3 .group-info4', 
    start: "0% 70%",
    end: "100% 100%",
    scrub: 0, 
    // markers: true,
  },
})
info4
  .from('.sc-info3 .group-info4 .head-number',1, { opacity: 0, y: 40, },'a')
  .from('.sc-info3 .group-info4 .head-title',1, { opacity: 0, y: 40, },'a')
  .from('.sc-info3 .group-info4 .info-btn',1, { opacity: 0, },'b+=0.5')
  .from('.sc-info3 .group-info4 .title',1, { opacity: 0, y: 40, stagger:0.3 },'c')
  .from('.sc-info3 .group-info4 .text',1, { opacity: 0, y: 40, },'d');


// sc-order3 
const order3 = gsap.timeline({
  scrollTrigger:{
    trigger:'.sc-order3 .group-title',
    start:'0% 90%',
    end:'100% 100%',
    // markers: true,
    scrub: 0,
  }
})
order3
  .from('.sc-order3 .group-title',1, { opacity:0, y:40, },'a')
  .from('.sc-order3 .group-product .subtitle-area',1, { opacity:0, y:40, },'b+=3')
  .from('.sc-order3 .group-product .color-list',1, { opacity:0, y:40, },'c')
  .from('.sc-order3 .group-product .point-item',1, { opacity:0, y:40, stagger:0.2 },'c')

// sc-order3 group-product order-box1
$(".sc-order3 .group-product .color-item:first-child .flav").addClass("active");
$(".sc-order3 .group-product .color-item:first-child").addClass("opacity");

$(".sc-order3 .group-product .color-item").on("click", function () {
    $(this).siblings().find(".flav").removeClass("active");
  
    $(this).find(".flav").addClass("active");
    $(this).addClass("opacity").siblings().removeClass("opacity");

    tabName = $(this).data('tab');
    $(tabName).addClass('show').siblings().removeClass('show');

});

const order3prod = gsap.timeline({
  scrollTrigger:{
    trigger:'.sc-order3',
    start:'0% 0%',
    endTrigger:'.sc-order3 .group-product',
    end:'100% 100%',
    // markers: true,
    scrub: 0,
  }
})
order3prod.to('.sc-order3 .group-product .img-inner',{transform: 'translateY(0%) scale(1)'})

// sc-order3 group-order order-box2
$(".sc-order3 .order-box .color-item:first-child .color").addClass("active");
$(".sc-order3 .order-box .color-item:first-child").addClass("opacity");

$(".sc-order3 .order-box .color-item").on("click", function () {
  $(this).siblings().find(".color").removeClass("active");  
  $(this).find(".color").addClass("active");
  $(this).addClass("opacity").siblings().removeClass("opacity");
});

// .sc-info4 = info5
const info5 = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-info4', 
    start: "0% 70%",
    end: "100% 100%",
    scrub: 0, 
    // markers: true,
  },
})
info5
  .from('.sc-info4 .head-number',1, { opacity: 0, y: 40, },'a')
  .from('.sc-info4 .head-title',1, { opacity: 0, y: 40, },'a')
  .from('.sc-info4 .content-list .number-box',1, { opacity: 0, y: 40, stagger:1 },'b')
  .from('.sc-info4 .content-list .ask-box',1, { opacity: 0, y: 40, stagger:1 },'b')
  .from('.sc-info4 .content-list .question-box',1, { opacity: 0, y: 40, stagger:1 },'b')
  .from('.sc-info4 .point-btn',1, { opacity: 0, y: 40, stagger:1 },'c')

// sc-gallery swiper slide
const gallerySlide = new Swiper('.sc-gallery .swiper', {
  speed: 1000,
  freeMode: true,
  spaceBetween: 20,
  centeredSlides:true,
  loop: true,
  navigation: {
    nextEl: '.sc-gallery .next',
    prevEl: '.sc-gallery .prev',
  },
  breakpoints: {
    1280: {
      slidesPerView: 1.9, 
    },
    768: {
      slidesPerView: 1.2,
    },
    480: {
      slidesPerView: 1,
    },
  },
});
//// slide next, prev btn
$(".sc-gallery .swiper .btn.prev").hover(function () {
  $(this).addClass('move2');
}, function () {
  $(this).removeClass('move2');
}
);
$(".sc-gallery .swiper .btn.next").hover(function () {
  $(this).addClass('move2');
}, function () {
  $(this).removeClass('move2');
}
);

// .sc-promotion
const promotion = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-promotion', 
    start: "0% 70%",
    end: "100% 100%",
    scrub: 0, 
    // markers: true,
  },
})
promotion
  .from('.sc-promotion .bottom-inner .group-title',1, { opacity: 0, y: 40, },'a+=0.5')
  .from('.sc-promotion .group-text .text',1, { opacity: 0, y: 40, stagger:0.3 },'a+=0.5')
  .from('.sc-promotion .bottom-inner .group-round',1, { opacity: 0, y: 40,  },'a+=0.5');
