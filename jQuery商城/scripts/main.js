//搜索框文字效果
$(function(){
    $("#inputSearch").focus(function(){
        if ($(this).val() == this.defaultValue) {
            $(this).val("");
        }
    }).blur(function(){
        if ($(this).val() == "") {
            $(this).val(this.defaultValue);
        }
    }).keyup(function(e){
        if (e.which == 13) {        //按下回车键则显示消息
            alert("回车提交表单");
        }
    });
});

//网页换肤

//导航效果
$(function(){
    $("#nav li").hover(function(){
        $(this).find(".jnNav").show();
    },function(){
        $(this).find(".jnNav").hide();
    });
});

//热销效果
$(function(){
    $(".jnCatainfo .promoted").append("<s class='hot'></s>");
});

//广告效果
$(function(){
	var $imgrolls = $("#jnImageroll div a");
	$imgrolls.css("opacity","0.7");
    var len  = $imgrolls.length;
	var index = 0;
	var adTimer = null;  //初始化
    
	$imgrolls.mouseover(function(){
		index = $imgrolls.index(this);
		showImg(index);
	}).eq(0).mouseover();
    
	$('#jnImageroll').hover(function(){
			if(adTimer){ 
				clearInterval(adTimer);
			}
		 },function(){
			adTimer = setInterval(function(){
			    showImg(index);
				index++;
				if (index==len) {
                    index=0;
                }
			} , 5000);
	}).trigger("mouseleave");
    
    function showImg(index){
	   var newhref = $imgrolls.eq(index).attr("href");
	   $("#JS_imgWrap").attr("href",newhref)
			           .find("img").eq(index).stop(true,true)
                       .fadeIn().siblings().fadeOut();
	   $imgrolls.removeClass("chos").css("opacity","0.6")
			    .eq(index).addClass("chos").css("opacity","1"); 
    }
});

//网页换肤
$(function(){
    var $li = $("#skin li");
    $li.click(function(){
        switchSkin(this.id);
    });
    var cookieSkin = $.cookie("MyCssSkin");
    if (cookieSkin) {
        switchSkin(cookieSkin);
    }
    
    function switchSkin (skinName) {
        $("#"+skinName).addClass("selected")
                       .siblings().removeClass("selected");
        $("#cssfile").attr("href","styles/skin/"+skinName+".css");
        $.cookie("MyCssSkin",skinName,{path:'/',expires:10});
    }
});


//活动横向滚动效果

$(function(){
    $("#jnBrandTab li a").click(function(){
        $(this).parent().addClass("chos")
               .siblings().removeClass("chos");
        var tabIndex = $("#jnBrandTab li a").index(this);
        showBrand (tabIndex);
        return false;
    }).eq(0).click();
    
    function showBrand (index) {
        var rollwidth = ($("#jnBrandList li").outerHeight())*4;
        $("#jnBrandList").stop(true,false).animate({left: -rollwidth*index},1000)
    }
});


$(function(){
	$('.jqzoom').jqzoom({
		zoomType: 'standard',
		lens:true,
		preloadImages: false,
		alwaysOn:false,
		zoomWidth: 340,
		zoomHeight: 340,
		xOffset:10,
		yOffset:0,
		position:'right'
    });
});

/* deatil.html部分  */

//放大镜效果
$(function(){
	$('.jqzoom').jqzoom({
		zoomType: 'standard',
		lens:true,
		preloadImages: false,
		alwaysOn:false,
		zoomWidth: 340,
		zoomHeight: 340,
		xOffset:10,
		yOffset:0,
		position:'right'
    });
});

//小图切大图
$(function(){
    $(".imgList li a").bind("click",function(){
        var imgSrc = $(this).find("img").attr("src");
        var i = imgSrc.lastIndexOf(".");
        var unit = imgSrc.substring(i);
        imgSrc = imgSrc.substring(0,i);
        var imgSrc_big = imgSrc + "_big" +unit;
        $("#thickImg").attr("href",imgSrc_big);
    });
});

//选项卡

$(function(){
    var $div_li = $(".tab_menu ul li");
    $div_li.click(function(){
        $(this).addClass("selected")
               .siblings().removeClass("selected");
        var index = $div_li.index(this);
        $("div.tab_box > div").eq(index).show()
                              .siblings().hide();
    }).hover(function(){
        $(this).addClass("hover");
    },function(){
        $(this).removeClass("hover");
    });
});

//换颜色

$(function(){
	$(".color_change ul li img").click(function(){    
		  $(this).addClass("hover").parent().siblings().find("img").removeClass("hover");
		  var imgSrc = $(this).attr("src");
		  var i = imgSrc.lastIndexOf(".");
		  var unit = imgSrc.substring(i);
		  imgSrc = imgSrc.substring(0,i);
		  var imgSrc_small = imgSrc + "_one_small"+ unit;
		  var imgSrc_big = imgSrc + "_one_big"+ unit;
		  $("#bigImg").attr({"src": imgSrc_small });
		  $("#thickImg").attr("href", imgSrc_big);
		  var alt = $(this).attr("alt");
		  $(".color_change strong").text(alt);
		  var newImgSrc = imgSrc.replace("images/pro_img/","");
		  $("#jnProitem .imgList li").hide();
		  $("#jnProitem .imgList").find(".imgList_"+newImgSrc).show();
		  
		  $("#jnProitem .imgList").find(".imgList_"+newImgSrc).eq(0).find("a").click();
	});
});

//尺寸
$(function(){
    $(".pro_size li").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        $(".pro_size strong").text($(this).text());
    });
});

//价格联动
$(function(){
    var $span = $(".pro_price strong");
    var price = $span.text();
    $("#num_sort").change(function(){
        var num = $(this).val();
        $span.text(num*price);
    }).change();
});

//星级
$(function(){
    $("ul.rating li a").click(function(){
        var liClass = $(this).parent().attr("class");
        $(this).parent().parent()
               .removeClass().addClass("rating "+liClass+"star");
        $(this).blur();
        return false;
    });
});

//购物车

$(function(){
    var $product = $(".jnProDetail");
	$("#cart a").click(function (e) {        
		var pro_name = $product.find("h4:first").text();
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color =  $(".color_change strong").text();
		var pro_num = $product.find("#num_sort").val();
	    var pro_price = $product.find(".pro_price strong").text();
		var dialog = "感谢您的购买。<div style='font-size:12px;font-weight:400;'>您购买的产品是："+pro_name+"；"+
				"尺寸是："+pro_size+"；"+
				"颜色是："+pro_color+"；"+
				"数量是："+pro_num+"；"+
				"总价是："+pro_price +"元。</div>";
		$("#jnDialogContent").html(dialog);
		$('#basic-dialog-ok').modal();
		return false;//避免页面跳转
	});
});









