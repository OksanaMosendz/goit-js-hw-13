import './sass/main.scss';
import photoCardTempl from './templates/photo-card.hbs'
import {setMarkUpStyles, setFormStyle, setGalleryStyle} from './js/styles.js';
import Notiflix from "notiflix";
import SimpleLightbox from 'simplelightbox';
import '../node_modules/simplelightbox/dist/simple-lightbox.css';
const axios = require('axios').default;

const input=document.querySelector('[name=searchQuery]');
const submitBtn=document.querySelector('[type=submit]');
const seachForm=document.querySelector('.search-form');
const gallery=document.querySelector('.gallery');
const loadMoreBtn=document.querySelector('.load-more');

let galleryS = new SimpleLightbox('.gallery a');




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
  loadMoreBtn.style.display='none';
  if (input.value===''){
    return;
  }
  else { 
  gallery.innerHTML='';
  API.q=(input.value).trim();
  API.page=1;
 fetchImages().then(data=>{renderCardsMarkup(data)});
}}

async function fetchImages(){
 try {const response= await axios.get(API.createURLtoFetch());
   const data=await response.data;
   return data;
  } catch (error) {
  console.log("error", error);
}}

  const renderCardsMarkup=(data)=>{
      if(data.totalHits===0){
      Notiflix.Notify.failure( "Sorry, there are no images matching your search query. Please try again.");
    return;}
    else { gallery.insertAdjacentHTML('beforeend', photoCardTempl(data.hits));
      addScroll();
      setMarkUpStyles(data);
      galleryS.refresh();
      galleryS.on('show.simplelightbox', function () {
      });
      if(API.page===1){Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);}
    }
    input.value='';
 }

  const addScroll=()=>{
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });}

const loadMore=()=>{
  API.page=API.page+1;
  fetchImages().then(data=>{renderCardsMarkup(data)});
}

setGalleryStyle(gallery.style);
setFormStyle(seachForm.style);

loadMoreBtn.addEventListener('click',loadMore);
submitBtn.addEventListener('click',seachImages);
