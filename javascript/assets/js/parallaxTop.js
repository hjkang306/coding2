let nowScroll = true;

function scrollProgress(){
    nowScroll = true;

    setInterval(() => {
        if(nowScroll){
            nowScroll = false;
            hasScroll();
        }
    }, 300);
}
function hasScroll(){
    let scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    let topbtn = document.querySelector("#parallax__top");
  
    if(scrollTop >= document.body.scrollHeight - window.innerHeight){
        topbtn.classList.add("show");
    } else {
        topbtn.classList.remove("show");
    }
  
    topbtn.addEventListener("click", ()=>{
        window.scroll({top: 0, behavior: "smooth"});
    });
  }
  
  window.addEventListener("scroll", scrollProgress);