import './sass/main.scss';
import photoCardTempl from './templates/photo-card.hbs'
import {setPhotoCardStyle, setImgStyle, setInfoItemStyle, setInfoStyle, setFormStyle, setGalleryStyle, setLoadBtnStyle}  from './js/styles.js';
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
const axios = require('axios').default;

const input=document.querySelector('[name=searchQuery]');
const submitBtn=document.querySelector('[type=submit]');
const seachForm=document.querySelector('.search-form');
const gallery=document.querySelector('.gallery');
const loadMoreBtn=document.querySelector('.load-more');

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
  fetchImages();
}}


const fetchImages=()=>{
  axios.get(API.createURLtoFetch())
  .then(response => response.json())
  .then(cards =>{
    if(cards.totalHits===0){
      Notiflix.Notify.failure( "Sorry, there are no images matching your search query. Please try again.");
    return;}
    else { gallery.insertAdjacentHTML('beforeend', photoCardTempl(cards.hits));
          if(API.page===1){Notiflix.Notify.success( `Hooray! We found ${cards.totalHits} images.`);}

      const info=document.querySelectorAll('.info');
      const photoCards=document.querySelectorAll('.photo-card');
      const imgs=gallery.querySelectorAll('img');
      const infoItems=document.querySelectorAll('.info-item');
      
      setPhotoCardStyle(photoCards);
      setImgStyle(imgs);
      setInfoItemStyle(infoItems);
      setInfoStyle(info);
      
      if (photoCards.length===cards.totalHits){
        loadMoreBtn.style.display='none';
        Notiflix.Notify.info( "We're sorry, but you've reached the end of search results.");
      } else setLoadBtnStyle(loadMoreBtn.style);
    }
  })
  .catch(error => console.log(error))
  .finally(input.value='');
}

const loadMore=()=>{
  API.page=API.page+1;
  fetchImages();
}

setGalleryStyle(gallery.style);
setFormStyle(seachForm.style);

loadMoreBtn.addEventListener('click',loadMore);
submitBtn.addEventListener('click',seachImages);


