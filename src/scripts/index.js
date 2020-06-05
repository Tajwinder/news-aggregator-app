
//call the searchkeyword function when "enter" clicked in search input
let keyword="";
function checkEnterClick(e){
   if(e.keyCode == 13 ){
       keyword=document.getElementById('search').value;
       if(keyword!=""){
         searchkeyword();
       }
      
   

   }

   

}

// reseting to original state i.e top headlines on clearing the search input
function reset(){
   
   keyword=document.getElementById('search').value;
   if(keyword==""){
      
      let body= document.querySelector("body");
     if( body.classList.contains("body_dark")){
        
       darkbg();
        document.querySelector('.not-found').style.display='none'; 
        fetchTopHeadlines();
        

     }
      else{
         document.querySelector('.not-found').style.display='none'; 
         fetchTopHeadlines();
      }
     
     
   }
  
}

//  function with async/await
async function fetchTopHeadlines(){
   // document.querySelector('.not-found').innerHTML=""; 
   document.querySelector('.loader').style.display='block';
    let output='';
    var url ='https://newsapi.org/v2/top-headlines?country=in&apiKey=e854eeb8b1964674b3f6db6fe2f78ef4';
         
         let response=await fetch(url);

         //retrieving json from response
         let jsonResponse=await response.json();

         //retrieving articles from json
         let articles= await jsonResponse.articles;

         //preparing html from data
         output+= prepareHtmlFromData(articles);
         
         //appending output to html file
         document.querySelector('.loader').style.display='none';
         document.getElementById('news-articles').innerHTML=output;

       
      }


// fetchTopHeadlines function with promises

// function fetchTopHeadlines(){
   
//    let output='';
//    var url ='https://newsapi.org/v2/top-headlines?country=in&apiKey=e854eeb8b1964674b3f6db6fe2f78ef4';
        
//         let response= fetch(url)
//          .then(Response=>Response.json())
//          .then(function(result){
//             return result.articles;
//          })
//          .then(function(articles){
//           output+= prepareHtmlFromData(articles);
            
                 
          
             
//            document.getElementById('news-articles').innerHTML=output;
      
           
//          })
       

           
        
        
       
// }
 
 fetchTopHeadlines();


 //formatting author name
 function getAuthor(name){
    
    let author=""
    if(name==null){
       return author;
    }
    else{
      if(name.includes("|")){
         let index=name.indexOf("|");
         author+=name.slice(0,index-1);
      }
      else{
         author+=name;
      }
    }
    
    return " - "+author;
 }


 //function to converting json to HTML format
 let prepareHtmlFromData= function(DataArray){
    let finalHtml='';
    let htmlString=''
    DataArray.forEach( function(article){
      let title=article.title;
      let desc=  article.description;
      let image=article.urlToImage;
      let url=article.url;
      let authorName=article.author;
      let author=getAuthor(authorName) ;

// Store the headlines as an unordered list(ul) with id "news-articles" and list elements(li) with class name "article"

// Each "article" element should have:

// article image (img element with class name "article-img")
// article title (h2 element with class name "article-title")
// article description(p element with class name "article-description")
// article author (span element with class name "article-author")
// article link (a element with class name "article-link")
     
       htmlString=`
       <a href=" ${url}" target="_blank"> 
          <li class="article" id="card_light">
          <div class="img"> 
         <img class="article-img" src="${image}" style="width:100%;" >
         
         </div>
         <div class="container">
           <h2 class="article-title">
           ${title.slice(0,70)}...
           </h2>
           
           <p class="article-description">
           ${desc}...
           </p>  
           
           <span class="article-author">
              ${author}
           </span>
         
           <span href="${url}"  id="urlLink" ></span>
         
           </div>
         
           </li>
           </a>

       `

finalHtml=finalHtml+htmlString;
    })
    return finalHtml ;
 }



//function for responding to invalid searches e.g. "jkfgfjg"
  
let checkNoArticle=(jsonResponse)=>{
   if(jsonResponse.totalResults==0){
      document.querySelector('.loader').style.display='none'; 
     document.querySelector('.not-found').style.display='block'; 
      
     return 0;
      
   }
   else{
     
      // document.querySelector('.not-found').style.display='none'; 
      return jsonResponse.articles;
   }
 }
 

 // function for fetching news related to the searched keyword

 async function searchkeyword(){
   // document.querySelector('.not-found').innerHTML=""; 
  document.querySelector('.loader').style.display='block';
   let output='';
   let newurl='https://newsapi.org/v2/everything?q='+keyword+'&apiKey=e854eeb8b1964674b3f6db6fe2f78ef4';
        
   let response= await fetch(newurl);
   let jsonResponse=await response.json();
  
   
   let articles= await checkNoArticle(jsonResponse);
  
  
      if(articles===0){
         document.getElementById('news-articles').innerHTML=output;
         
        
         return;
      }
       
      output+=prepareHtmlFromData(articles);
      
      document.querySelector('.loader').style.display='none';
      document.getElementById('news-articles').innerHTML=output;
 
 
 
 
  
  }
  
  let clickCount=0;
  // function to called on dark-mode button click
const darkbg=()=>{
  let modeChange=document.getElementById('toggleBtn');
  if(modeChange.innerHTML=="Dark-Mode"){
     modeChange.innerHTML="Light-Mode";
  }
  else{
     modeChange.innerHTML="Dark-Mode";
  }
   let body=document.querySelector("#mybody");
   body.classList.toggle("body_dark");

   let notFound=document.querySelector('.not-found');
   notFound.classList.toggle("body_dark");

   let search=document.querySelector('#search');
   search.classList.toggle("search_dark");

   let siteTitle=document.querySelector('.site-title');
   siteTitle.classList.toggle("site-title_dark");
   
   let card=document.getElementsByClassName("article");
   
   clickCount++;
   for(let i=0;i<card.length;i++){;
     
      card[i].setAttribute("id", clickCount % 2 === 0 ? "card_light" : "card_dark");
      
  
   }
   
   
 }
document.getElementById('toggleBtn').addEventListener('click',darkbg);