//모달
const modalBtn = document.querySelector(".modal__btn");
const modalClose = document.querySelector(".modal__close");
const modalCont = document.querySelector(".modal__cont");

modalBtn.addEventListener("click", () => {
    modalCont.classList.add("show");
    modalCont.classList.remove("hide");
});
modalClose.addEventListener("click", () => {
    modalCont.classList.add("hide");
});


//탭메뉴
const tabBtn = document.querySelectorAll(".modal__box .tabs > div");
const tabCont = document.querySelectorAll(".modal__box .cont > div");

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