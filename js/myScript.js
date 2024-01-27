let elBody = document.querySelector('body');   
let elBtnNav = document.getElementById('btn-nav');
let elGnbWrap = document.getElementById('gnb-wrap');
let arrBanners = document.querySelectorAll('.banner');
let elBaner01 = document.getElementById('banner01');
let elBaner02 = document.getElementById('banner02');
let elBaner03 = document.getElementById('banner03');
let arrPagination = document.querySelectorAll('.pagination span');
let arrPagiLength = arrPagination.length;
let elPager = document.getElementsByClassName('pager');
let arrSlidItems = document.querySelectorAll('.banner');    
let currentIndex = 0;      
let elHeader = document.querySelector('.header');
let elMainNav = document.querySelector('.main-nav');
let arrMenuTit = document.querySelectorAll('.menu-tit span');
// 해더
elBtnNav.onclick = function(event){
  if(this.classList.contains('active')){
    fnHide(elGnbWrap);
    fnModalOff();
    elBtnNav.classList.remove('active');
  }else{
    fnShow(elGnbWrap);
    fnModalOn();
    elBtnNav.classList.add('active');        
  }   
  event.preventDefault();
}
elMainNav.onmouseenter = function(){
  elHeader.classList.add('active');
}
elMainNav.onmouseleave = function(){
  elHeader.classList.remove('active');
}
// 2024-01-27
let nowTop = 0;
window.onscroll = function(){
  let scrTop = this.scrollY;
  console.log(scrTop);
  if(scrTop === 0) {
    elHeader.style.display = 'block';
  } else if(scrTop > nowTop) {
    elHeader.style.display = 'none';
  } else {    
    elHeader.style.display = 'block';
  }
  nowTop = scrTop;
}
// 메인배너
for(let item of elPager){
  item.onclick=function(event){
    const thisId = this.getAttribute('id');
    fnEliMainBanner(arrBanners);
    fnEliMainBanner(arrPagination);
    if(thisId == 'pager01'){
      fnShow(elBaner01);
      fnShow(this);
      currentIndex=1;
    }else if(thisId == 'pager02'){
      fnShow(elBaner02);
      fnShow(this);
      currentIndex=2;
    }else if(thisId == 'pager03'){
      fnShow(elBaner03);
      fnShow(this);
      currentIndex=0;
    }        
  }
}  
let setItem = setInterval(function(){
  if(currentIndex>2){
    currentIndex=0;
  }
  for(let item of arrSlidItems){
    fnHide(item);
  }
  for(let item of arrPagination){
    fnHide(item);
  }
  arrSlidItems[currentIndex].classList.add('active');
  arrPagination[currentIndex++].classList.add('active');
},4000)
// menu swiper      
let innerWidth = window.innerWidth;
let mySwiper = undefined;
function initSwiper(){
  if(innerWidth < 780 && mySwiper == undefined){
    mySwiper = new Swiper(".swiper", {
      slidesPerView: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on:{
        slideChange:function(){
          let actIdx = mySwiper.activeIndex;                
          for(let items of arrMenuTit){
            items.classList.remove('active');
          }
          arrMenuTit[actIdx].classList.add('active');                
        }
      }
    });
  }else if (innerWidth >= 780 && mySwiper != undefined){
    mySwiper.destroy();
    mySwiper = undefined;
  }
}
initSwiper();
window.onresize=function(){
  innerWidth = window.innerWidth;
  initSwiper();
}
 
// 터치 잠금
// menuImgSwiper.allowTouchMove=false;
// menuPagiSwiper.allowTouchMove=false;
// 메뉴 슬라이더/페이지네이션 동기화
// menuImgSwiper.controller.control = menuPagiSwiper;
// menuPagiSwiper.controller.control = menuImgSwiper;

// 함수
function fnShow(el){
  el.classList.add('active');
}
function fnHide(el){
  el.classList.remove('active');
}
function fnEliMainBanner(el){
  for(let idx=0;idx<arrPagiLength;idx++){
    el[idx].classList.remove('active');
  }      
}
function fnModalOn(){
  elBody.style.overflow = 'hidden';
}
function fnModalOff(){
  elBody.style.overflow = 'auto';
}