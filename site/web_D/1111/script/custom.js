//탭메뉴
let tabMenu = $(".notice");

tabMenu.find("ul > li > ul").hide();
tabMenu.find("ul > li.active > ul").show();

function tabList(e){
    e.preventDefault();
    let target = $(this);
    target.next().show().parent("li").addClass("active").siblings("li").removeClass("active").find("ul").hide();
};

tabMenu.find("ul > li > a").click(tabList).focus(tabList);

//팝업
$(".ad").click(function(){
    $(".layer_bg").css("display","block");
});
$(".layer .close").click(function(){
    $(".layer_bg").css("display","none");
});
