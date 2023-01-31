import './styles.css';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let isInitialLoad = true;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


let count = 5;
const apikey = 'mnA3RkeUW_l7tkfzttItXkThp8AM98uN58t1CLFr658';
// Unsplash api
//let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
let apiURL = ''


function updateAPIURLWithNewCount (picCount) {
    apiURL = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${picCount}`;
}

//check if all images were laoded
function imgLoaded(){
    console.log('image loaded')
    imagesLoaded++;
    if (imagesLoaded===totalImages){
        ready = true;
        loader.hidden = true;                
    }
}

//Helper Function to Set Atributes on DOM Elements
function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements For Links & Photos, Add to Dom
function displayPhotos(){
    totalImages = photosArray.length;
    imagesLoaded = 0;
    console.log('Total Images', totalImages);
    photosArray.forEach((photo)=>{
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        })
        //Create <img> from photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title: photo.alt_description
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load',imgLoaded);
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}


// Get photos from unsplash API
async function getPhotos(){   
    if (isInitialLoad){
        updateAPIURLWithNewCount(5);
    }
    try{
        // loader.hidden=false;
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad){
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
            
        }
    }
    catch{

    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', ()=>{
    if (window.innerHeight  + window.scrollY >= document.body.offsetHeight-1000 && ready){
        // console.log('window.innerHeight:', window.innerHeight);
        // console.log('window.scrollY:', window.scrollY);
        // console.log('window.inenrHeight + scrolling', window.scrollY + window.innerHeight);
        // console.log('odcument.body.offsetHeight - 1000',document.body.offsetHeight-1000);
        ready = false;        
        getPhotos();
        console.log('load More');
    }
});
 
 
getPhotos();