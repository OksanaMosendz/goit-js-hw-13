const setFormStyle=(el)=>{
  el.backgroundColor='blue';
  el.padding='20px';
  el.display='flex';
  el.justifyContent='center';
  el.fontSize='15px';
}

const setGalleryStyle=(el)=>{
el.display='flex';
el.flexWrap='wrap';
el.marginTop='-10px';
el.marginLeft='-10px';
el.padding='10px';
}

const setImgStyle=(imgs)=>{
  imgs.forEach(el => {
  el.style.display='block';
  el.style.width='100%';
  el.style.marginRight='10px';
  el.style.height='200px';
});
}

const setInfoStyle=(info)=>{
  info.forEach(el => {
  el.style.display='flex';
  el.style.justifyContent='space-around';
});
}

const setInfoItemStyle=(infoItems)=>{
  infoItems.forEach(el => {
  el.style.display='flex';
  el.style.fontSize='15px';
  el.style.flexDirection='column';
});
}

const setPhotoCardStyle=(photoCards)=>{
  photoCards.forEach(el=> {
  el.style.marginTop='10px';
  el.style.marginLeft='10px';
  el.style.flexBasis=`calc(100% / 4 - 10px)`;
  el.style.height='100%';
  el.style.border='solid 1px grey';
  el.style.borderRadius='5px';
});
}

const setLoadBtnStyle=(el)=>{
  el.display='flex';
  el.marginLeft='auto';
  el.marginRight='auto';
  el.marginTop='10px';
  el.padding='10px';
  el.fontSize='15px';
  el.backgroundColor='blue';
  el.color='white';
  el.borderRadius='5px';
}

const loadMoreBtn=document.querySelector('.load-more');

const setMarkUpStyles=(data)=>{
  const info=document.querySelectorAll('.info');
  const photoCards=document.querySelectorAll('.photo-card');
  const imgs=document.querySelectorAll('.photo-card img');
  const infoItems=document.querySelectorAll('.info-item');
  
  setPhotoCardStyle(photoCards);
  setImgStyle(imgs);
  setInfoItemStyle(infoItems);
  setInfoStyle(info);
  
  if (photoCards.length>0&&photoCards.length===data.totalHits){
    loadMoreBtn.style.display='none';
    Notiflix.Notify.info( "We're sorry, but you've reached the end of search results.");
  } else setLoadBtnStyle(loadMoreBtn.style);
}

export {setMarkUpStyles, setFormStyle, setGalleryStyle}  
