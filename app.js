const API_KEY="c4727b0854fd456ea1a104e9948d9ee9";
const url = "https://newsapi.org/v2/everything?";

window.addEventListener("load", ()=> fetchNews("pakistan"));
function reload(){
  window.location.reload();
}

async function fetchNews(query, isSearch = false) {
  showLoader(); // 🔄 loader start

  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - 30);
  const from = fromDate.toISOString().split("T")[0];

  try {
    const res = await fetch(
      `${url}q=${encodeURIComponent(query)}&searchIn=title,description&sortBy=publishedAt&language=en&from=${from}&apiKey=${API_KEY}`
    );
    const data = await res.json();
    bindData(data.articles);
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader(); // ✅ loader stop (success ya error dono me)
  }
}

function bindData(articles){
  const cardsContainer=document.getElementById("cards-container");
  const NewsCardTemplate=document.getElementById("template-news-card");
  cardsContainer.innerHTML="";
  if(!articles || articles.length === 0){
    cardsContainer.innerHTML = "No news found";
    return;
  }
  articles.forEach(article => {
    if (!article.urlToImage) return;
    const img = new Image();
    img.src = article.urlToImage;

    img.onload = () => {
      const cardClone = NewsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone, article);
      cardsContainer.appendChild(cardClone);
    };
      img.onerror = () => {};
  });
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
    timeZone:"Asia/Karachi"
  });
   newsSource.innerHTML=`${article.source.name} . ${date}`;
   cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank")
   })
}

let currentSelectNav=null;
function onNavItemClick(id){
  fetchNews(id);

  const navItem = document.getElementById(id);
  currentSelectNav?.classList.remove('active');
  currentSelectNav=navItem;
  currentSelectNav.classList.add('active')
}
const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("news-input");
searchButton.addEventListener("click", () => {
  const query = searchText.value.trim();
  if (!query) return;
  fetchNews(query, true); // search = true
  currentSelectNav?.classList.remove("active");
  currentSelectNav = null;
});

// LOADER//
const loader = document.getElementById("loader");
function showLoader() {
  loader.style.display = "flex";
}
function hideLoader() {
  loader.style.display = "none";
}



