$(document).ready(function(){
    const loc=window.location.href;
    navWrite(menu);
    footWrite(menu);
    socialWrite(additional);
    socialWrite(social);
    $("#menu li").on("click",function(){
        $(this).find("ul").slideToggle();
    });
    $("#responsive").on("click",function(){
     $("#menu").slideToggle();
 });
    //Sprecava da meni prilikom promene velicine browser-a ostane display:none
    $(window).resize(function(){
        if($(this).width()>800 && $("#menu").css("display")=="none"){
            $("#menu").show();
        }
        if($(this).width()<800 && $("#menu").css("display")=="block"){
            $("#menu").hide();
        }
    })
 
     //Kod za contact.html stranu
     if(loc.indexOf("contact.html")>-1){
        //Objekti forme
        const cardField=document.querySelector("#cardNumber");
        const paymentRadioButtons=document.getElementsByName("paymethod");
        const nameField=document.querySelector("#fullname");
        const mailField=document.querySelector("#mail");
        const cityField=document.querySelector("#city");
        const termOfUse=document.querySelector("#terms");
        const termsMessage=document.querySelector("#finish p");
        const mobileFields=document.querySelectorAll(".mobile");
        const pay=document.querySelector("#pay");
        const zipField=document.querySelector("#zip");
        const addressField=document.querySelector("#address");
        const cards=["Visa","MasterCard","Discover"];
        $("#cardNumber").addClass("hide");
        $("#creditCard").addClass("hide");
        $("#additional label").addClass("hide");
        for(let i=0;i<paymentRadioButtons.length;i++){
            paymentRadioButtons[i].addEventListener("click",payMethods);
        }
        $("#submit").click(function(){
            finishOrder();
        });
        $("#add").click(function(event){
            event.preventDefault();
        })
        function nameConstraint(){
            //Regex provera ime i prezime(moguce imati vise prezimena)
            const nameRegex=/^[A-Z][a-z]{2,}(\s[A-Z][a-z]{3,})+$/;
            if(nameRegex.test(nameField.value)){
                nameField.classList.remove("inputError");
                return 1;
            }
            else{
                nameField.classList.add("inputError");
                return 0;
            }
        }
        function emailConstraint(){
            //Regex provera mejlove koji pripadaju gmail-u ili yahoo-u
            const mailRegex=/^[a-z\?\.\,\!\&0-9]{5,}\@(gmail|yahoo)\.com$/;
            if(mailRegex.test(mailField.value)){
                mailField.classList.remove("inputError");
                return 1;
            }
            else{
                mailField.classList.add("inputError");
                return 0;
            }
        }
        function cityConstraint(){
            //Regex dozvoljava unos grada od dve reci sa pocetnim velikim slovom prve reci
            const cityRegex=/^[A-Z][a-z]{2,}(\s[A-z]{3,})*$/;
            
            if(cityRegex.test(cityField.value)){
                cityField.classList.remove("inputError");
                return 1;
            }
            else{
                cityField.classList.add("inputError");
                return 0;
            }
        }
        function zipConstraint(){
            //Regex provera da li je kod unet u formatu AA9A 9AA ili A9 9AA
            const zipRegex=/^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s[0-9][A-Z]{1,2}$/;
            
            if(zipRegex.test(zipField.value)){
                zipField.classList.remove("inputError");
                return 1;
            }
            else{
                zipField.classList.add("inputError");
                return 0;
            }
        }
        function addressConstraint(){
            const addresspRegex=/^[A-Z][a-z]{3,}(\s[A-z0-9]{1,})*$/;
            
            if(addresspRegex.test(addressField.value)){
                addressField.classList.remove("inputError");
                return 1;
            }
            else{
                addressField.classList.add("inputError");
                return 0;
            }
        }
        function mobileConstraint(){
            //Regex vrsi prvoeru za brojeve mobilnih telefona vazecih za Ujedinjeno Kraljevstvo
            const mobileRegex=/^07[1-57-9]\s[0-9]{8,9}$/;
            for(let i=0;i<mobileFields.length;i++){
                if(mobileRegex.test(mobileFields[i].value)){
                    mobileFields[i].classList.remove("inputError");
                }
                else{
                    mobileFields[i].classList.add("inputError");
                    return 0;
                }
            }
            return 1;
        }
        function payMethods(){
            for(let i=0;i<paymentRadioButtons.length;i++){
                if(paymentRadioButtons[i].checked){
                    const select=document.querySelector("#creditCard");
                    if(paymentRadioButtons[i].id=="card"){
                        select.innerHTML=`<option value="">Choose your credit card</option>`
                        for(let i of cards){
                            select.innerHTML+=`<option value=${i.toLowerCase()}>${i}</option>`
                        }
                        select.addEventListener("change",creditCard);
                        select.classList.remove("hide"); 
                    }
                    else{
                        select.classList.add("hide");
                        document.querySelector("#cardNumber").classList.add("hide");
                        document.querySelector("#additional label").classList.add("hide");
                    }
                }
            }
        }
        function payConstraint(){
            const cardNumberRegex=/^([0-9]{4}\s){3}[0-9]{4}$/;
            for(let i=0;i<paymentRadioButtons.length;i++){
                if(paymentRadioButtons[i].checked){
                if(paymentRadioButtons[i].id=="card"){
                    if(creditCard()){
                        if(cardNumberRegex.test(cardField.value)){
                            cardField.classList.remove("inputError");
                            pay.classList.remove("pay");
                            return 1;
                        }
                        else{
                            cardField.classList.add("inputError");
                            return 0;
                        }
                    }
                   else{
                    pay.classList.add("pay");
                    return 0;
                   }
                }
                pay.classList.remove("pay");
                return 1;
            }
        }
            pay.classList.add("pay");
            return 0; 
        }
        function creditCard(){
            const creditCards=document.querySelector("#creditCard");
            if(creditCards.value!=""){
                document.querySelector("#cardNumber").classList.remove("hide");
                document.querySelector("#additional label").classList.remove("hide");
                return 1;
            }
            else{
                document.querySelector("#cardNumber").classList.add("hide");
                document.querySelector("#additional label").classList.add("hide");
                return 0;
            }
        }
        function finishOrder(){
           const finishMessage=document.querySelector("#finishMessage");
           const messageHeading=document.querySelector("#finishMessage h2");
           let ok=1;
           if(!nameConstraint()){
               ok=0;
           }
           if(!emailConstraint()){
            ok=0;
           }
           if(!addressConstraint()){
            ok=0;
           }
           if(!payConstraint()){
            ok=0;
           }
           if(!cityConstraint()){
            ok=0;
           }
           if(!zipConstraint()){
               ok=0;
           }
           if(!mobileConstraint()){
               ok=0;
           }
           if(!termOfUse.checked){
               ok=0;
                $(termsMessage).fadeIn();
           }
           else{
            $(termsMessage).fadeOut();
           }
           
           if(ok){
                messageHeading.innerHTML="Your order was successfully sent!";
                finishMessage.classList.remove("finishWrong");
                finishMessage.classList.add("finishCorrect");
                return 1;
           }
           else{
                messageHeading.innerHTML="Please,fill out the form correctly!";
                finishMessage.classList.remove("finishCorrect");
                finishMessage.classList.add("finishWrong");
           }
            
        }
    } //Kraj koda za contact.html
 //Kod za index.html stranu
    else{
        const bestSellers=[{name:"PC King Energy MAX",price:"700$",img:"assets/images/bestseller1.png",spec:{Processor:"AMD Ryzen 5 2600",Motherboard:"ASUS A320M-K",GPU:"AMD Radeon RX 590",RAM:"8GB DDR4 2666MHZ",SSD:"512GB",PSU:"FSP HYPER K 500W",Case:"MS SPECTRUM"}},
        {name:"ASUS ROG Strix SCAR II",price:"1300$",img:"assets/images/RogStrix.png",spec:{Display:"17.3\" 16:9, 1920 x 1080 pixel",Processor:"INTEL Core i7-8750H",Motherboard:"INTEL Cannon Lake HM370",GPU:"NVIDIA GeForce RTX 2070 8GB GDDR6",RAM:"16GB DDR4 2666MHZ",SSD:"INTEL SSD 512GB NVMe",HDD:"1TB"}},
        {name:"HP Gaming Pavilion",price:"900$",img:"assets/images/bestseller3.png",spec:{Display:"15.6\" diagonal FHD IPS anti-glare micro-edge WLED-backlit (1920 x 1080)",Processor:"INTEL Core™ i5 8300H",Motherboard:"INTEL Cannon Lake HM370",GPU:"NVIDIA GeForce GTX 1050TI 4GB GDDR5",RAM:"8GB DDR4 2666MHZ",HDD:"1TB",PSU:"150 W AC power adapter"}},
        {name:"PC King Prime Pro",price:"950$",img:"assets/images/bestseller4.png",spec:{Processor:"INTEL Core™ i5-9400F 2.9 GHz",Motherboard:"GIGABYTE B360M H",GPU:"GeForce RTX 2060 6GB GDDR6",RAM:"8GB DDR4 2666MHZ",SSD:"512GB",HDD:"1TB 7200RPM",PSU:"IG-MAX 2650 600W",Case:"Cooler Master MasterBox MB600L"}}];

        const products=[{name:"ACER Predator Helios 300",price:"1000$",img:"assets/images/helios300.png",type:"laptop",spec:{Display:"17.3\" diagonal LED IPS(1920 x 1080) 144Hz refresh rate",Processor:"INTEL Core i7 8750H / 2.2 GHz",Motherboard:"Mobile Intel HM370",GPU:"NVIDIA GeForce RTX 2060 6GB GDDR5",RAM:"2X16GB DDR4 2666MHZ",HDD:"1TB",SSD:"256 GB"}}
        ,{name:"PC King Lider",price:"500$",img:"assets/images/lider.png",type:"pc",spec:{Processor:"AMD Ryzen 5 2400G with RadeonRX Vega 11",Motherboard:"ASUS PRIME A320M-K",GPU:"NVIDIA GeForce GTX 1650 4GB GDDR5",RAM:"8GB DDR4 2666MHZ",HDD:"1TB",SSD:"256 GB",Case:"IG-MAX LED STRIPE ",PSU:"500W"}},
        {name:"PC King Starter",price:"850$",img:"assets/images/starter.png",type:"pc",spec:{Processor:"AMD Ryzen 7 2700",Motherboard:"	GIGABYTE B450 GAMING X",GPU:"NVIDIA GeForce GTX 1660 4GB GDDR5",RAM:"16GB DDR4 3000MHZ",HDD:"1TB",SSD:"480GB",Case:"NZXT H500 Midi Tower",PSU:"COOLER MASTER 500W ELITE V3"}},
        {name:"PC King Eagle",price:"800$",img:"assets/images/eagle.png",type:"pc",spec:{Processor:"AMD Ryzen 5 2600",Motherboard:"Biostar AM4 B450MH",GPU:"AMD Radeon RX 580 4GB GDDR5",RAM:"16GB DDR4 2666MHZ",HDD:"1TB",SSD:"240GB",Case:"Alexander Weiss Serpico",PSU:"750W Falcon Gaming FGC-750"}},
        {name:"HP Gaming Pavilion",price:"900$",img:"assets/images/bestseller3.png",spec:{Display:"15.6\" diagonal FHD IPS anti-glare micro-edge WLED-backlit (1920 x 1080)",Processor:"INTEL Core™ i5 8300H",Motherboard:"INTEL Cannon Lake HM370",GPU:"NVIDIA GeForce GTX 1050TI 4GB GDDR5",RAM:"8GB DDR4 2666MHZ",HDD:"1TB",PSU:"150 W AC power adapter"}},
        {name:"Lenovo Legion Y540",price:"1300$",img:"assets/images/legion.png",type:"laptop",spec:{Display:"17.3\" FHD (1920 x 1080) IPS anti-glare 300 nits 144Hz",Processor:"Intel Core™ i5-9300H Quad Core",GPU:"GeForce GTX GTX 1660Ti 6GB GDDR6",RAM:"16GB DDR4 0MHz",HDD:"1TB",SSD:"256GB",Battery:"3 Cell 57Wh(up to 5 hours)",OS:"Windows 10 Pro"}},
        {name:"ASUS TUF FX505DU",price:"1100$",img:"assets/images/tuf.png",type:"laptop",spec:{Display:"15.6\" diagonal LED IPS(1920 x 1080),Anti-Glare",Processor:"AMD Ryzen R7-3750H Quad Core 2.3GHz",GPU:"NVIDIA GeForce GTX 1660TI 6GB GDDR5",RAM:"16GB DDR4 2666MHZ",SSD:"512 GB",Camera:"HD 720p with mic"}},
        {name:"PC King Edge III",price:"1250$",img:"assets/images/edge.png",type:"pc",spec:{Processor:"Intel Core i7-8700 3.2GHz",Cooler:"Antec A30 LED",Motherboard:"Biostar LGA1151 B360GT5S",GPU:"AMD Radeon RX 5700 8GB GDDR6",RAM:"2X16GB DDR4 3200MHz",HDD:"1TB",SSD:"512GB",Case:"Cooler Master MasterBox K500L LED Window",PSU:"Corsair RM750x 750W"}}]

        const sliderImages=["assets/images/slide1.jpg","assets/images/slide2.jpg","assets/images/slide3.jpg","assets/images/slide4.jpg","assets/images/slide5.jpg"];
        const messages=["PC KING","Laptops for all","Reliable components","Best PC configurations","Rule every game"];
        const submessages=["Pc and laptop vendor","Laptops for all your needs","Components of top tier vendors","High-end configurations","Amazing playing experience"];
        const about=[{heading:"Who are we?",text:"PC King is one of the top rated European suppliers of computers and laptops. PC King has one of the best PC and laptop configurations for all users and purposes. Whether you are a gamer, content creator or just a regular user, PC King will find you the best machine for your need for best price you can find"},
        {heading:"What we are offer?",text:"PC King offer best PC ready configurations, all tested in the most demanding environments, confirming the quality of our computers. We are We cooperate with leading manufacturers of computer components,like: AMD GIGABAYTE, ASUS, MSI, BIOSTAR, KINGSTON, INTEL and others. All our products come with a 2-year warranty!"},
        {heading:"Where you can find us?",text:"Our headquarters are in London,but you can find us in more than 15 countries in Europe. We have our shops in:UK, Germany, France, Italy, Poland, Serbia, Croatia, Spain... And we still growing!"}];
        let slideIndex=-1;
        let k=1;
        let interval=setInterval(()=>{
            slider(1);
        },5000);
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
            slideImage.setAttribute("src",sliderImages[slideIndex]);
            slideImage.setAttribute("alt",`slide ${slideIndex+1}`);
            slideMessage.querySelector("h1").innerHTML=messages[slideIndex];
            slideMessage.querySelector("h2").innerHTML=submessages[slideIndex];
            }
            else{
                slideIndex--;
                if(slideIndex<0){
                    slideIndex=sliderImages.length-1;
                }
            slideImage.setAttribute("src",sliderImages[slideIndex]);
            slideImage.setAttribute("alt",`slide ${slideIndex+1}`);
            slideMessage.querySelector("h1").innerHTML=messages[slideIndex];
            slideMessage.querySelector("h2").innerHTML=submessages[slideIndex];
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
                if(target[i].dataset.type!=con){
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
            const mailregex=/^[a-z][a-z\d]{4,}@(gmail|yahoo).com$/;
            if(mailregex.test(input.value)){
                message.innerHTML="Thanks for subscribing on our newsleter";
                return;
            }
            else{
                message.innerHTML="Please,enter mail in valid format";
                return;
            }
        }
        function specifications(array){
            let list=`<ul>`;
            for(let i in array){
                list+=`<li>${i}:${array[i]}</li>`;
            }
            list+=`</ul>`;
            return list;
        }
        slider(1);
        $("#next").click(function(){
            slider(1);
        })
        $("#prev").click(function(){
            slider(0);
        })
        aboutWrite(about);
        bestSellersWrite("#wrapper",bestSellers,"bestSeler");
        bestSellersWrite("#wrapperProduct",products,"product");
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
        $("#sign").click(function(){
            newsLetter();
        })
        $("#filterAll").click(function(){
            filter("");
        })
        $("#filterPc").click(function(){
            filter("pc");
        })
        $("#filterLaptop").click(function(){
            filter("laptop");
        });
        $(".bestSeler").hover(function(){
            $(this).find(".options").toggleClass("optionsOpacity");
        })
        $(".product").hover(function(){
            $(this).find(".options").toggleClass("optionsOpacity");
        });
        
    } //Kraj koda za index.html stranu
  });

//Zajednicki podaci i funkcije za obe strane
const menu=[{title:"Home",link:"index.html"},{title:"About",link:"index.html#about"},{title:"Products",link:"#"},{title:"Contact",link:"index.html#contact"}];
const additional=[{link:"https://djordjeportofolio.netlify.com/",title:"Author"},{link:"Dokumentacija.pdf",title:"Documentation"}];
const submenu=[{title:"Best sellers",link:"index.html#bestSellers"},{title:"All Products",link:"index.html#products"}];
const social=[{title:'<i class="fa fa-facebook-official"></i>',link:"https://www.facebook.com/"},
{title:'<i class="fa fa-instagram"></i>',link:'https://www.instagram.com/'},
{title:'<i class="fa fa-twitter"></i>',link:'https://twitter.com/'},
{title:'<i class="fa fa-youtube-play"></i>',link:'https://www.youtube.com/'}];
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
function footWrite(array){
    const target=document.querySelector("footer");
    const footnav=document.createElement("div");
    footnav.setAttribute("id","footnav");
    const ul=document.createElement("ul");
    for(let i in array){
        ul.innerHTML+=`<li><a href="${array[i].link}">${array[i].title}</a></li>`;
    }
    footnav.appendChild(ul);
    target.appendChild(footnav);
}
function socialWrite(array){
    const target=document.querySelector("footer");
    const footnav=document.createElement("div");
    footnav.setAttribute("class","social");
    const ul=document.createElement("ul");
    for(let i in array){
        ul.innerHTML+=`<li><a href="${array[i].link}" target="_blank">${array[i].title}</a></li>`;
    }
    footnav.appendChild(ul);
    target.appendChild(footnav);
}
