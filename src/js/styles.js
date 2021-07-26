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
  el.style.height='100%';
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
  el.style.fontSize='10px';
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

export {setPhotoCardStyle, setImgStyle, setInfoItemStyle, setInfoStyle, setFormStyle, setGalleryStyle, setLoadBtnStyle}  
