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
// my function
function fnShow(el){
  el.classList.add('active');
}
function fnHide(el){
  el.classList.remove('active');
}
function fnModalOn(){
  elBody.style.overflow = 'hidden';
}
function fnModalOff(){
  elBody.style.overflow = 'auto';
}
// header
elBtnNav.addEventListener("click",function(){
  if(!this.classList.contains('active')){
    fnShow(elGnbWrap);
    fnShow(elBtnNav);
    fnModalOn();
  }else{    
    fnHide(elGnbWrap);
    fnHide(elBtnNav);
    fnModalOff();
  }
});
elMainNav.addEventListener("mouseenter",function(){
  fnShow(elHeader);
});
elMainNav.addEventListener("mouseleave",function(){
  fnHide(elHeader);
});
// 01-27-2024
let nowTop = 0;
function onscroll(){
  let scrTop = this.scrollY;
  if(innerWidth > 780) {
    if(scrTop === 0) {
      elHeader.style.display = 'block';
    } else if(scrTop > nowTop) {
      elHeader.style.display = 'none';
    } else {    
      elHeader.style.display = 'block';
    }
    nowTop = scrTop;
  }  
}
window.addEventListener("scroll",onscroll);
window.addEventListener("resize",onscroll);

// banner
function fnEliMainBanner(el){
  for(let idx=0;idx<arrPagiLength;idx++){
    el[idx].classList.remove('active');
  }      
}
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
window.onresize = function(){
  innerWidth = window.innerWidth;
  initSwiper();
}