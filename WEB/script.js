/* ======================================================
TYPE EFFECT
====================================================== */

const typingElement = document.querySelector(".typing");

const words = [
  "IT Specialist",
  "AI Engineer",
  "Software Developer",
  "Web Developer",
  "Network Engineer",
  "System Analyst",
  "Content Creator"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if(!deleting){

        typingElement.textContent = currentWord.substring(0,charIndex++);

        if(charIndex > currentWord.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;

        }

    }else{

        typingElement.textContent = currentWord.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 45 : 90);

}

typeEffect();

/* ======================================================
ACTIVE MENU
====================================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-200;

const height=section.clientHeight;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ======================================================
COUNTER
====================================================== */

const counters=document.querySelectorAll(".about-grid h4");

const speed=200;

counters.forEach(counter=>{

const update=()=>{

const target=parseInt(counter.innerText);

const count=parseInt(counter.getAttribute("data-count"))||0;

const increment=Math.ceil(target/speed);

if(count<target){

counter.setAttribute("data-count",count+increment);

counter.innerText=(count+increment)+"+";

requestAnimationFrame(update);

}else{

counter.innerText=target+"+";

}

};

update();

});

/* ======================================================
MOBILE MENU
====================================================== */

const menuBtn=document.querySelector(".menu-btn");

const nav=document.querySelector(".nav-links");

menuBtn.onclick=()=>{

nav.classList.toggle("show");

}

/* ======================================================
BACK TO TOP
====================================================== */

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 40){

        header.classList.add("active");

    }else{

        header.classList.remove("active");

    }

});

/* ======================================================
   DYNAMIC GREETING
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const greeting = document.getElementById("greeting");

    const hour = new Date().getHours();

    let message = "";

    if (hour >= 5 && hour < 12) {
        message = "☀️ Good Morning";
    } else if (hour >= 12 && hour < 17) {
        message = "🌤️ Good Afternoon";
    } else if (hour >= 17 && hour < 20) {
        message = "🌇 Good Evening";
    } else {
        message = "🌙 Good Night";
    }

    greeting.textContent = message;

});

/* ======================================================
   PROJECT FILTER
====================================================== */

const filterButtons = document.querySelectorAll(".project-filter button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelector(".project-filter .active")
            .classList.remove("active");

        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {

            card.style.transition = "all .35s ease";

            if (filter === "all" || card.classList.contains(filter)) {

                card.style.display = "block";

                requestAnimationFrame(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                });

            } else {

                card.style.opacity = "0";
                card.style.transform = "scale(.9)";

                setTimeout(() => {

                    card.style.display = "none";

                }, 300);

            }

        });

    });

});


/* ======================================================
   SCROLL REVEAL
====================================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

projectCards.forEach(card => {

    observer.observe(card);

});


/* ======================================================
   PARALLAX HOVER
====================================================== */

projectCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - .5) * 8;
        const rotateX = (y / rect.height - .5) * -8;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0)";

    });

});


/* ======================================================
   BUTTON RIPPLE
====================================================== */

filterButtons.forEach(btn => {

    btn.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});