import Swiper from "swiper";
import { Pagination } from 'swiper/modules';

Swiper.use([Pagination])

const resizableSwiper = (breakpoint, swiperClass, swiperSettings) => {
  let swiper;
  
  breakpoint = window.matchMedia(breakpoint);
  
  const enableSwiper = function(className, settings) {
    swiper = new Swiper(className, settings);
  }
  
  const checker = function() {
    if (breakpoint.matches) {
      return enableSwiper(swiperClass, swiperSettings);
    } else {
      if (swiper !== undefined) swiper.destroy(true, true);
        return;
    }
};
  
  breakpoint.addEventListener('change', checker);
  checker();
}
  
resizableSwiper(
  '(max-width: 767px)',
  '.brand__swiper',
  {
    spaceBetween: 15,
    slidesPerView: "auto",
    pagination: {
      el: '.brand__swiper-pagination'
    }
  },
);
resizableSwiper(
  '(max-width: 767px)',
  '.technique__swiper',
  {
    spaceBetween: 15,
    slidesPerView: "auto",
    pagination: {
      el: '.technique__swiper-pagination'
    }
  },
);
resizableSwiper(
  '(max-width: 767px)',
  '.price__swiper',
  {
    spaceBetween: 15,
    slidesPerView: "auto",
    pagination: {
      el: '.price__swiper-pagination'
    }
  },
);

let body = document.querySelector('.body');

let brandExpand = document.querySelector('.brand__expand');
let brandList = document.querySelector('.brand__list');

let aboutExpand = document.querySelector('.about__expand');
let aboutContent = document.querySelector('.about__content');

let techniqueExpand = document.querySelector('.technique__expand');
let techniqueList = document.querySelector('.technique__list');

let header = document.querySelector('.header');
let headerInner = document.querySelector('.header__inner');
let headerExpand = document.querySelector('.header__burger');
let closeBurger = document.querySelector('.header__close');

let communication = document.querySelector('.page__communication');
let communicationInner = document.querySelector('.communication__inner');
let communicationClose = document.querySelector('.communication__close');
let communicationExpand = document.querySelector('.feedback__message');

let call = document.querySelector('.page__call');
let callInner = document.querySelector('.call__inner');
let callExpand = document.querySelector('.feedback__phone');
let callClose = document.querySelector('.call__close');



function Expanded(expandClass, ariaExpand, expandWraper){
  const expandChildren = expandClass.children  
  if (ariaExpand === 'false'){
      expandWraper.setAttribute('aria-Expanded', 'true');
      expandChildren[0].classList.add('expand__icon--active');
      expandChildren[1].textContent = 'Скрыть';
      expandWraper.classList.add(`${expandClass.getAttribute('aria-controls')}--active`);
    }else{
      expandWraper.setAttribute('aria-Expanded', 'false');
      expandChildren[0].classList.remove('expand__icon--active');
      if (expandWraper.className === aboutContent.className){
        expandChildren[1].textContent = 'Читать далее';
      }else{
        expandChildren[1].textContent = 'Показать все';
      }
      expandWraper.classList.remove(`${expandClass.getAttribute('aria-controls')}--active`);
    }
}

aboutExpand.addEventListener('click', event => {
  Expanded(aboutExpand, aboutContent.ariaExpanded, aboutContent)
})

brandExpand.addEventListener('click', event => {
  Expanded(brandExpand, brandList.ariaExpanded, brandList)
})

techniqueExpand.addEventListener('click', event => {
  Expanded(techniqueExpand, techniqueList.ariaExpanded, techniqueList)
})

function modalExpand(expandButton, expandWraper, wraperInner){
  expandWraper.setAttribute('aria-Expanded', 'true');
  expandWraper.classList.add(`${expandButton.getAttribute('aria-controls')}--active`);
  setTimeout(()=>
  wraperInner.classList.add(`${wraperInner.className}--active`), 50)
  if(body.className !== 'body body--scroll-lock'){
    body.classList.add('body--scroll-lock')
  }
}
function closeModal(expandButton, expandWraper, wraperInner){
  expandWraper.setAttribute('aria-Expanded', 'false');
  setTimeout(()=>
  expandWraper.classList.remove(`${expandButton.getAttribute('aria-controls')}--active`),500)
  wraperInner.classList.remove(`${wraperInner.classList[1]}`)
  if(call.ariaExpanded === 'false' && 
     communication.ariaExpanded === 'false' &&
     header.ariaExpanded === 'false'){
    body.classList.remove('body--scroll-lock')
  }
}

headerExpand.addEventListener('click', event=>{
  modalExpand(headerExpand, header, headerInner)
})
communicationExpand.addEventListener('click', event =>{
  modalExpand(communicationExpand, communication, communicationInner)
})
callExpand.addEventListener('click', event =>{
  modalExpand(callExpand, call, callInner)
})

closeBurger.addEventListener('click', event=>{
  closeModal(closeBurger, header, headerInner)
})
communicationClose.addEventListener('click', event =>{
  closeModal(communicationClose, communication, communicationInner)
})
callClose.addEventListener('click', event =>{
  closeModal(callClose, call, callInner)
})

header.addEventListener('click', (e) =>{
  const clickHeaderInner = e.composedPath().includes(headerInner);
  if (!clickHeaderInner){
    closeModal(closeBurger, header, headerInner)
  }
})
communication.addEventListener('click', e => {
  const clickCommunicationInner = e.composedPath().includes(communicationInner)
  if (!clickCommunicationInner){
    closeModal(communicationClose, communication, communicationInner)
  }
})
call.addEventListener('click', e => {
  const clickCallInner = e.composedPath().includes(callInner)
  if (!clickCallInner){
    closeModal(callClose, call, callInner)
  }
})




