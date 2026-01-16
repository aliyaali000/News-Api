const API_KEY="c4727b0854fd456ea1a104e9948d9ee9";
// const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("pakistan"));
function reload(){
  window.location.reload();
}

// async function fetchNews(query){
//   const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
//   const data= await res.json();

//   console.log(data);
//   bindData(data.articles);
// }
async function fetchNews(query){
  try {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

    if(data.status !== "ok"){
      alert("News not available right now");
      return;
    }

    bindData(data.articles);
  } catch(error){
    console.error(error);
  }
}


















function bindData(articles){
  const cardsContainer=document.getElementById("cards-container");
  const NewsCardTemplate=document.getElementById("template-news-card");

  cardsContainer.innerHTML="";
  articles.forEach(article => {
     if(!article.urlToImage) return
     const cardClone=NewsCardTemplate.content.cloneNode(true);
     fillDataInCard(cardClone,article);
     cardsContainer.appendChild(cardClone);
  })
}

function fillDataInCard(cardClone,article){
  const newsImg=cardClone.querySelector("#news-img");
  const newsTitle=cardClone.querySelector("#news-title");
  const newsSource=cardClone.querySelector("#news-source");
  const newsDesc=cardClone.querySelector("#news-desc");

  newsImg.src=article.urlToImage;
  newsTitle.innerHTML=article.title;
  newsDesc.innerHTML=article.description;

  const date=new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
  });
   newsSource.innerHTML=`${article.source.name} . ${date}`;
   cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank")
   })
}


let currentSelectNav=null;
function onNavItemClick(id){
  fetchNews(id);

  // const navItem=document.getElementById("id");
  const navItem = document.getElementById(id);

  currentSelectNav?.classList.remove('active');
  currentSelectNav=navItem;
  currentSelectNav.classList.add('active')
}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("news-input");

searchButton.addEventListener("click",()=>{
  const query=searchText.value;
    if(!query) return;
    fetchNews(query);


    currentSelectNav?.classList.remove('active');
    currentSelectNav=null;
})

































