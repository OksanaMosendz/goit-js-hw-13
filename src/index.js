import './sass/main.scss';
import photoCard from './templates/photo-card.hbs'
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

const API={
  url:'https://pixabay.com/api/',
  key:'22611406-1fc8dc647f338efc8b1d9d866',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 3,
  createURLtoFetch(){return `${this.url}?key=${this.key}&q=${this.q}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.per_page}`
},
}

const xs=()=>{
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
  
  .then(cards =>{
    gallery.insertAdjacentHTML('beforeend', photoCard(cards.hits));
    console.log(cards.hits);

  if(cards.hits.length===0){
  Notiflix.Notify.failure( "Sorry, there are no images matching your search query. Please try again.")
  }
  console.log(cards);})

  .catch(error => console.log(error))
  .finally(input.value='');
}

const loadMore=()=>{
  API.page=API.page+1;
  fetchImages();
}


loadMoreBtn.addEventListener('click',loadMore);
submitBtn.addEventListener('click',xs);


