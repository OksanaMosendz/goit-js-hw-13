import './sass/main.scss';
import photoCardTempl from './templates/photo-card.hbs'
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
const axios = require('axios').default;

const input=document.querySelector('[name=searchQuery]');
const submitBtn=document.querySelector('[type=submit]');
const seachForm=document.querySelector('.search-form');
const gallery=document.querySelector('.gallery');
const loadMoreBtn=document.querySelector('.load-more');

let fetchedCards=[];

seachForm.addEventListener("submit", function(event){
  event.preventDefault()
});

loadMoreBtn.style.display='none';


const API={
  url:'https://pixabay.com/api/',
  key:'22611406-1fc8dc647f338efc8b1d9d866',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
  createURLtoFetch(){return `${this.url}?key=${this.key}&q=${this.q}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.per_page}`},
}

const seachImages=()=>{
  if (input.value===''){
    return;
  }
  else { 
  gallery.innerHTML='';
  API.q=input.value;
  API.page=1;
  console.log (input.value);
  fetchImages();
}}


const fetchImages=()=>{
  fetch(API.createURLtoFetch())
  .then(response => response.json())
  .then(cards =>{API.createURLtoFetch()
     
    if(cards.totalHits===0){
      Notiflix.Notify.failure( "Sorry, there are no images matching your search query. Please try again.");
    return;}
      else if(API.page===1){
      Notiflix.Notify.failure( `Hooray! We found ${cards.totalHits} images.`);
    }
      
      gallery.insertAdjacentHTML('beforeend', photoCardTempl(cards.hits));
      const info=document.querySelectorAll('.info');
      const photoCards=document.querySelectorAll('.photo-card');
      const imgs=gallery.querySelectorAll('img');
      setInfoStyle(info);
      setPhotoCardStyle(photoCards);
      console.log(imgs);
      setImgStyle(imgs);

      loadMoreBtn.style.display='block';
      fetchedCards=cards;
  })
  .catch(error => console.log(error))
  .finally(input.value='');
}

const loadMore=()=>{
  API.page=API.page+1;
  fetchImages();
  if (photoCards.length===fetchedCards.totalHits){
    loadMoreBtn.style.display='none';
    Notiflix.Notify.failure( "We're sorry, but you've reached the end of search results.");
  }
}

const setFormStyle=(el)=>{
  el.backgroundColor='blue';
  el.padding='20px';
  el.display='flex';
  el.justifyContent='center';
}

const setGalleryStyle=(el)=>{
el.display='flex';
el.flexWrap='wrap';
el.marginTop='-20px';
el.marginLeft='-20px';
}

const setImgStyle=(imgs)=>{
  imgs.forEach(el => {
  el.style.display='block';
  el.style.width='100%';
  
  // el.style.height='250px';
});
}

const setInfoStyle=(info)=>{
  info.forEach(el => {
    el.style.padding='20px';
  el.style.display='flex';
  el.style.justifyContent='space-beetween';
  });
}

const setPhotoCardStyle=(photoCards)=>{
  photoCards.forEach(el=> {
  el.style.marginTop='20px';
  el.style.marginLeft='20px';
  el.style.flexBasis=`calc(100% / 4 - 20px)`;
  el.style.height='250px';
});
}

setGalleryStyle(gallery.style);
setFormStyle(seachForm.style);
// setFormStyle(loadMoreBtn.style);


loadMoreBtn.addEventListener('click',loadMore);
submitBtn.addEventListener('click',seachImages);


