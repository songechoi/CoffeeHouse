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