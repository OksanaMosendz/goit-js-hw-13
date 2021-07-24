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

let allCards=[];

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
    if(cards.hits.length===0){
  Notiflix.Notify.failure( "Sorry, there are no images matching your search query. Please try again.")
  }
  gallery.insertAdjacentHTML('beforeend', photoCard(cards.hits));
    console.log(cards.hits);
  allCards=cards;
  input.value='';
  loadMoreBtn.style.display='block';
   console.log(allCards);})
  .catch(error => console.log(error))
}


const loadMore=()=>{
  API.page=API.page+1;
  fetchImages();
  if (document.querySelectorAll('.photo-card').length===allCards.totalHits){
    loadMoreBtn.style.display='none';
    Notiflix.Notify.failure( "We're sorry, but you've reached the end of search results.");
  }
}


loadMoreBtn.addEventListener('click',loadMore);
submitBtn.addEventListener('click',xs);


