$(document).ready(function(){
    slider(1);
    $("#next").click(function(){
        slider(1);
    })
    $("#prev").click(function(){
        slider(0);
    })
    aboutWrite(about);
    bestSellersWrite("#wrapper",bestSellers,"bestSeler");
    bestSellersWrite("#wrapperProduct",bestSellers2,"product");
$(".textAbout").on("click",function(){
        $(this).find("p").slideToggle();
        $(this).find(".plus").toggleClass("plusActive");   
});
    $(window).scroll(function(){
        if($(this).scrollTop()>600){
            $("#scrollTop").fadeIn();
        }
        else{
            $("#scrollTop").fadeOut();
        }
    })
    $("#scrollTop").click(function(){
        $("html,body").animate({scrollTop:0},800);
    });
  });

const bestSellers=[{name:"PC King Energy MAX",price:"700$",img:"assets/images/bestseller1.png",spec:{Processor:"AMD Ryzen 5 2600",Motherboard:"ASUS A320M-K",GPU:"AMD Radeon RX 590",RAM:"8GB DDR4 2666MHZ",SSD:"512GB",PSU:"FSP HYPER K 500W",Case:"MS SPECTRUM"}},
{name:"ASUS ROG Strix SCAR II",price:"1300$",img:"assets/images/bestseller2.jpg",spec:{Display:"17.3\" 16:9, 1920 x 1080 pixel",Processor:"Intel Core i7-8750H",Motherboard:"Intel Cannon Lake HM370",GPU:"NVIDIA GeForce RTX 2070 8GB GDDR6",RAM:"16GB DDR4 2666MHZ",SSD:"Intel SSD 512GB NVMe",HDD:"1TB"}},
{name:"HP Gaming Pavilion",price:"900$",img:"assets/images/bestseller3.png",spec:{Display:"15.6\" diagonal FHD IPS anti-glare micro-edge WLED-backlit (1920 x 1080)",Processor:"Intel Core™ i5 8300H",Motherboard:"Intel Cannon Lake HM370",GPU:"NVIDIA GeForce GTX 1050TI 4GB GDDR5",RAM:"8GB DDR4 2666MHZ",HDD:"1TB",PSU:"150 W AC power adapter"}},
{name:"PC King Prime Pro",price:"950$",img:"assets/images/bestseller4.png",spec:{Processor:"Intel Core™ i5-9400F 2.9 GHz",Motherboard:"GIGABYTE B360M H",GPU:"GeForce RTX 2060 6GB GDDR6",RAM:"8GB DDR4 2666MHZ",SSD:"512GB",HDD:"1TB 7200RPM",PSU:"IG-MAX 2650 600W",Case:"Cooler Master MasterBox MB600L"}}];
const bestSellers2=[{name:"0ASUS ROG Strix SCAR II",price:"1300$",img:"assets/images/bestseller2.jpg",type:"laptop"},{name:"1HP Gaming Pavilion",price:"900$",img:"assets/images/bestseller3.png",type:"laptop"},{name:"2PC King Prime Pro",price:"950$",img:"assets/images/bestseller4.png",type:"pc"},{name:"3PC King Energy MAX",price:"700$",img:"assets/images/bestseller1.png",type:"pc"},{name:"4ASUS ROG Strix SCAR II",price:"1300$",img:"assets/images/bestseller2.jpg",type:"laptop"},{name:"5HP Gaming Pavilion",price:"900$",img:"assets/images/bestseller3.png",type:"laptop"},{name:"6PC King Prime Pro",price:"950$",img:"assets/images/bestseller4.png",type:"pc"}]

const sliderImages=["assets/images/slide1.jpg","assets/images/slide2.jpg","assets/images/slide3.jpg","assets/images/slide4.jpg","assets/images/slide5.jpg"];
const messages=["Ovde ide neki naslov","Ovde ide neki naslov1","Ovde ide neki naslov2","Ovde ide neki naslov3","Ovde ide neki naslov4"];
const about=[{heading:"Who are we?",text:"PC King is one of the top rated European suppliers of computers and laptops. PC King has one of the best PC and laptop configurations for all users and purposes. Whether you are a gamer, content creator or just a regular user, PC King will find you the best machine for your need for best price you can find"},
{heading:"What we are offer?",text:"PC King offer best PC ready configurations,all tested in the most demanding environments, confirming the quality of our computers.We are We cooperate with leading manufacturers of computer components,like:AMD, GIGABAYTE, ASUS, MSI, BIOSTAR, KINGSTON and others. All our products come with a 2-year warranty!"},
{heading:"Where you can find us?",text:"Our headquarters are in London,but you can find us in more than 15 countries in Europe.We have our shops in:UK, Germany, France, Italy, Poland, Serbia, Croatia, Spain...And we still growing!"}];
let slideIndex=-1;
let k=1;
let interval=setInterval(()=>{
    slider(1);
},5000);
function navWrite(array){
    for(let i=0;i<array.length;i++){
        const nav=document.querySelector("#menu");
        if(array[i].title=="Products"){
            nav.innerHTML+="<li><a href='#'>"+array[i].title+" <i class='fa fa-angle-down'></i>"+"</a></li>";
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
/*next.addEventListener("click",()=>{
    slider(1);
})*/
/*prev.addEventListener("click",()=>{
    slider(0);
})*/
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
        article.setAttribute("data-type",array[i].type);
        article.innerHTML+=`<img src="${array[i].img}" alt="bestSeller" />
        <h3>${array[i].name}</h3>
        <span>${array[i].price}</span>`
        const div=document.createElement("div");
        div.setAttribute("class","options")
        div.innerHTML+=`<button class="buynow" onclick="window.location='contact.html'">Buy Now</button>
        <button class="details">Details</button>`
        article.appendChild(div);
        targetDiv.appendChild(article);
    }
    const elements=document.getElementsByClassName(identificator);  
    for(let i=0;i<elements.length;i++){
        elements[i].addEventListener("click",function(){
            bodyOpacity().appendChild(detailsDiv(array,i));
            //document.querySelector("body").appendChild(detailsDiv(array,i));
            close();
        })
    }
}
function bodyOpacity(){
    const coverDiv=document.createElement("div");
    coverDiv.setAttribute("id","coverDiv");
    document.querySelector("body").classList.add("bodyAcitve");
    document.querySelector("body").appendChild(coverDiv);
    return coverDiv;
}
function detailsDiv(array,i){
    var fixedDiv=document.createElement("div");
    fixedDiv.setAttribute("class","fixedDiv");
    fixedDiv.innerHTML+=`<div class="detaliName"><h2>${array[i].name}</h2>${specifications(array[i].spec)}<button class="buynow" onclick="window.location='contact.html'">Buy Now</button></div>
    <div class="detailImg"><img src="${array[i].img}" alt="Product image" /></div>
    <span class="close"><i class="fa fa-close"></i></span>`;
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
function filter(con){
    const target=document.querySelectorAll(".product");
    for(let i=0;i<target.length;i++){
        if(con==""){
            target[i].style.display="block";
            continue;
        }
        if(target[i].getAttribute("data-type")!=con){
            target[i].style.display="none";  
        }
        else{
            target[i].style.display="block";
        }
    }
}
function close(){
    const closeBtns=document.querySelector(".close");
    const fixedDiv=document.querySelector(".fixedDiv");
    const coverDiv=document.querySelector("#coverDiv");
        closeBtns.addEventListener("click",function(){
            fixedDiv.remove();
            coverDiv.remove();
            document.querySelector("body").classList.remove("bodyAcitve");
        });
}
function newsLetter(){
    const input=document.querySelector("#mail");
    const message=document.querySelector("#newsMessage");
    const mailregex=/^[A-z][A-z\d]{4,}@(gmail|yahoo).com$/;
    if(mailregex.test(input.value)){
        message.innerHTML="Thanks for subscribe on our newsleter";
        console.log("mail je dobar");
        return true;
    }
    else{
        message.innerHTML="Enter mail in valid format";
        return false;
    }
}
function footWrite(array){
    const target=document.querySelector("footer");
    const footnav=document.createElement("div");
    footnav.setAttribute("id","footnav");
    const ul=document.createElement("ul");
    for(let i in menu){
        ul.innerHTML+=`<li><a href="${array[i].link}">${array[i].title}</a></li>`;
    }
    footnav.appendChild(ul);
    target.appendChild(footnav);
}
function socialWrite(array){
    const target=document.querySelector("footer");
    const footnav=document.createElement("div");
    footnav.setAttribute("id","social");
    const ul=document.createElement("ul");
    for(let i in menu){
        ul.innerHTML+=`<li><a href="${array[i].link}" target="_blank">${array[i].title}</a></li>`;
    }
    footnav.appendChild(ul);
    target.appendChild(footnav);
}
function specifications(array){
    let list=`<ul>`;
    for(let i in array){
        list+=`<li>${i}:${array[i]}</li>`;
    }
    list+=`</ul>`;
    return list;
}