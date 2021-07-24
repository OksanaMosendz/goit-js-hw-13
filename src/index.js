import './sass/main.scss';
import photoCard from './templates/photo-card.hbs'
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
const axios = require('axios').default;

const input=document.querySelector('#search-form');
const submitBtn = document.querySelector('form.search-form button[type=submit]');
console.log(input);

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
},}


const x=()=>{
  API.q=input.value;
  console.log (input.value);
  console.log ('rkbr');
fetch(API.createURLtoFetch())
  .then(response => response.json())
  .then(cards =>{
    console.log(cards.hits);
    if(cards.hits.length===0){
      Notiflix.Notify.failure( "Sorry, there are no images matching your search query. Please try again.")
    }
    console.log(cards);
  }
  )
  .catch(error => console.log(error));
}
submitBtn.submit=function(event){
  event.preventDefault();
console.log('сабмит');  }


  submitBtn.addEventListener('click',x);


  console.log(submitBtn)

