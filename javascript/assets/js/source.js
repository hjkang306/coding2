//source
const sourceBtn = document.querySelector(".source__btn");
const sourceClose = document.querySelector(".source__close");
const sourceCont = document.querySelector(".source__cont");

sourceBtn.addEventListener("click", () => {
    sourceCont.classList.add("show");
    sourceCont.classList.remove("hide");
});
sourceClose.addEventListener("click", () => {
    sourceCont.classList.add("hide");
});


//탭메뉴
const tabBtn = document.querySelectorAll(".source__box .tabs > div");
const tabCont = document.querySelectorAll(".source__box .cont > div");

tabBtn.forEach( (el, i) => {
    el.addEventListener("click", (event) => {
        event.preventDefault();
        
        tabBtn.forEach((li)=>{
            li.classList.remove('active');
        });
        el.classList.add("active");
        
        tabCont.forEach((div) => {
            div.style.display = "none";
        });

        tabCont[i].style.display = "block";
    });
});