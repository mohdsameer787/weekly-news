const apikey= "18675a30b7714c94ba3a3072c49e9a94";
const url = "https://newsapi.org/v2/everything?q=";
var count=0;



window.addEventListener("load",()=>fetchapi("india"))
window.addEventListener("load",()=>search())

async function fetchapi(query){
   const rem= await fetch(`${url}${query}&apikey=${apikey}`)
    const data= await rem.json();
    console.log(data.articles);
    
    binddata(data.articles);
}



function binddata(articles){
    const cardcontaner = document.getElementById("card-container");
    const card = document.getElementById("temp");
    cardcontaner.innerHTML=`<template id="temp">
        <div class="card">
            <div id="imgq" class="img"><img src="logo.png" alt=""></div>
            <div class="info">
                <h3 id="h3">
                    This is title
                </h3>
                <h6> date 22/4/2024</h6>
                <p>this is a rendom paragrafhbrwifh frhufhaebkh  fafhbaenbafheargboya jrfah</p>
            </div>
        </div>
  
</template>`;
  
   articles.forEach(article => {
    if(!article.urlToImage) return;
    let cardclone = card.content.cloneNode(true)
   
 
const a =cardclone.querySelector(' img');
    a.src=article.urlToImage;
    const b =cardclone.querySelector('#h3');
    b.innerHTML=article.title;
    const dateElement = cardclone.querySelector('h6');
    dateElement.textContent = new Date(article.publishedAt).toLocaleDateString() || "No date available";

    const descriptionElement = cardclone.querySelector('p');
    descriptionElement.textContent = article.description || "No description available";
    
    cardcontaner.appendChild(cardclone)
    



});


}

function search(){
    let submit= document.querySelector('.button');
    let val= document.getElementById('text1');
    console.log(val);
    submit.addEventListener('click',()=>{
        let query=val.value;
        if(!query) return;
        
       fetchapi(query)
       count=count+1
       console.log(count);
    
    })}




