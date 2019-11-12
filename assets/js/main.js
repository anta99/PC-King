$(document).ready(function(){
    navWrite(menu);
    slider(1);
    aboutWrite(about);
    bestSellersWrite("#wrapper",bestSellers,"bestSeler");
    bestSellersWrite("#wrapperProduct",bestSellers2,"product");
    
   $("#menu li:nth-child(3)").on("click",function(){
       $("#podmeni").slideToggle();
   });
   $("#responsive").on("click",function(){
    $("#menu").slideToggle();
});
$(".textAbout").on("click",function(e){
        $(e.currentTarget).find("p").slideToggle();
        //$(e.currentTarget).find("img").slideToggle(); 
        $(e.currentTarget).find(".plus").toggleClass("plusActive");   
});
  });
const menu=[{title:"Home",link:"#home"},{title:"About",link:"#about"},{title:"Products",link:"#products"},{title:"Contact",link:"#contact"}];
const bestSellers=[{name:"PC King Energy MAX",price:"700$",img:"assets/images/bestseller1.png"},{name:"ASUS ROG Strix SCAR II",price:"1300$",img:"assets/images/bestseller2.jpg"},{name:"HP Gaming Pavilion",price:"900$",img:"assets/images/bestseller3.png"},{name:"PC King Prime Pro",price:"950$",img:"assets/images/bestseller4.png"}];
const bestSellers2=[{name:"0ASUS ROG Strix SCAR II",price:"1300$",img:"assets/images/bestseller2.jpg"},{name:"1HP Gaming Pavilion",price:"900$",img:"assets/images/bestseller3.png"},{name:"2PC King Prime Pro",price:"950$",img:"assets/images/bestseller4.png"},{name:"3PC King Energy MAX",price:"700$",img:"assets/images/bestseller1.png"},{name:"4ASUS ROG Strix SCAR II",price:"1300$",img:"assets/images/bestseller2.jpg"},{name:"5HP Gaming Pavilion",price:"900$",img:"assets/images/bestseller3.png"},{name:"6PC King Prime Pro",price:"950$",img:"assets/images/bestseller4.png"}]
const submenu=[{title:"Best sellers",link:"#bestSellers"},{title:"All Products",link:"#products"}];
const sliderImages=["assets/images/slide1.jpg","assets/images/slide2.jpg","assets/images/slide3.jpg","assets/images/slide4.jpg","assets/images/slide5.jpg"];
const messages=["Ovde ide neki naslov","Ovde ide neki naslov1","Ovde ide neki naslov2","Ovde ide neki naslov3","Ovde ide neki naslov4"];
const about=[{heading:"Who are we?",text:"PC King is one of the top rated European suppliers of computers and laptops. PC King has one of the best PC and laptop configurations for all users and purposes. Whether you are a gamer, content creator or just a regular user, PC King will find you the best machine for your need for best price you can find"},
{heading:"What we are offer?",text:"PC King offer best PC ready configurations,all tested in the most demanding environments, confirming the quality of our computers.We are We cooperate with leading manufacturers of computer components,like:AMD, GIGABAYTE, ASUS, MSI, BIOSTAR, KINGSTON and others. All our products come with a 2-year warranty!"},
{heading:"Where you can find us?",text:"You can find us in more than 15 countries in Europe.We have our shops in:UK, Germany, France, Italy, Poland, Serbia, Croatia, Spain...And we still growing!"}]
let slideIndex=-1;
let k=1;
let interval=setInterval(()=>{
    slider(1);
},5000);
function navWrite(array){
    for(let i=0;i<array.length;i++){
        const nav=document.querySelector("#menu");
        if(array[i].title=="Products"){
            nav.innerHTML+="<li><a href="+array[i].link+"'>"+array[i].title+" <i class='fa fa-angle-down'></i>"+"</a></li>";
            const li=document.querySelectorAll("li");
            const element=document.createElement("ul");
            element.setAttribute("id","podmeni");
            for(let i=0;i<submenu.length;i++){
                element.innerHTML+=`<li><a href="${submenu[i].link}">${submenu[i].title}</a></li>`;
    }
            li[i].appendChild(element);
        }
        else{
            nav.innerHTML+="<li><a href="+array[i].link+">"+array[i].title+"</a></li>";
        }
    }
}
const img=document.createElement("img");
img.setAttribute("class","slika");
document.querySelector("#slideImg").appendChild(img);
function slider(n){
    const slideImage=document.querySelector(".slika");
    const slideMessage=document.querySelector(".message");
    if(n){
        slideIndex++;
        if(slideIndex>sliderImages.length-1){
             slideIndex=0;
        }
    slideImage.src=sliderImages[slideIndex];
    slideImage.alt=`slide ${slideIndex+1}`;
    slideMessage.querySelector("h1").innerHTML=messages[slideIndex];
    }
    else{
        slideIndex--;
        if(slideIndex<0){
             slideIndex=sliderImages.length-1;
        }
    slideImage.src=sliderImages[slideIndex];
    slideImage.alt=`slide ${slideIndex+1}`;
    slideMessage.querySelector("h1").innerHTML=messages[slideIndex];
    }
    slideImage.classList.add("slideFade");
    slideMessage.classList.add("slideMessage");
    setTimeout(function(){
        slideImage.classList.remove("slideFade");
        
    },801)
    setTimeout(function(){
        slideMessage.classList.remove("slideMessage");
    },1601)
    clearInterval(interval);
    interval=setInterval(()=>{
        slider(1);
    },5000);
}
next.addEventListener("click",()=>{
    slider(1);
})
prev.addEventListener("click",()=>{
    slider(0);
})
function aboutWrite(array){
    let subIndex=4;
    const aboutDiv=document.querySelector("#textAbout");
    for(let i=0;i<array.length;i++){
    aboutDiv.innerHTML+=`<div class="textAbout"><h2><span class="colorHeading">${array[i].heading.substring(0,subIndex)}</span>${array[i].heading.substring(subIndex++)}</h2>
        <p>${array[i].text}</p>
        <span class="plus"><i class='fa fa-angle-down'></i></span>
    </div>`;
    }
}
function bestSellersWrite(target,array,identificator){
    const targetDiv=document.querySelector(target);
    for(let i in array){
        const article=document.createElement("article");
        article.setAttribute("class",identificator);
        article.innerHTML+=`<img src="${array[i].img}" alt="bestSeller" />
        <h3>${array[i].name}</h3>
        <span>${array[i].price}</span>`
        const div=document.createElement("div");
        div.setAttribute("class","options")
        div.innerHTML+=`<button class="buynow">Buy Now</button>
        <button class="details">Details</button>`
        article.appendChild(div);
        targetDiv.appendChild(article);
    }
    const elements=document.querySelectorAll(`.${identificator}`);
    console.log(elements);   
    for(let i=0;i<elements.length;i++){
        elements[i].addEventListener("click",function(){
            bodyOpacity().appendChild(detailsDiv(array,i));
            //document.querySelector("body").appendChild(detailsDiv(array,i));
        })
    }
    const closeBtns=document.getElementsByClassName("close");
}
function bodyOpacity(){
    const coverDiv=document.createElement("div");
    coverDiv.setAttribute("id","coverDiv");
    document.querySelector("body").classList.add("bodyAcitve");
    document.querySelector("body").appendChild(coverDiv);
    return coverDiv;
}
function bodyOpacityRemove(){
    document.querySelector("body").classList.remove("bodyAcitve");
}
function detailsDiv(array,i){
    var fixedDiv=document.createElement("div");
    fixedDiv.setAttribute("class","fixedDiv");
    fixedDiv.innerHTML+=`<div class="detaliName"><h2>${array[i].name}</h2></div>
    <div class="detailImg"><img src="${array[i].img}" alt="Product image" /></div>
    <span class="close">Close</span>`;
    console.log(`Clicked on element with index:${i}`);
    return fixedDiv;
}
const filterButtons=document.querySelectorAll(".filterbtn");
for(let i=0; i< filterButtons.length;i++){
    filterButtons[i].addEventListener("click",(e)=>{
        for(let i=0; i< filterButtons.length;i++){
            filterButtons[i].classList.remove("filterActive");
        }
        e.target.classList.add("filterActive");
        
    })
}
function filter(targetDiv,con){
    const target=document.querySelectorAll(targetDiv);
    if(con==''){
        console.log("Prikazi sve");
    }
    else if(con=='laptops'){
        console.log("prikazi samo lapotopove");
    }
    else{
        console.log("Prikazi Pc-jeve");
    }
    //console.log(target);
}


