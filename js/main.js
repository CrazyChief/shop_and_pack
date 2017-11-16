	// При загрузке страницы получаем поля по ум.
	function getShippingCosts() {
		//Тянем текущие значения
		var country = $("#calc-country option:selected").val();
		var city = $("#calc-city option:selected").val();
		var weight = $(".calc__weight-btns input").val();
		var unit = $("#weightsel option:selected").val();

		//Запрос в php - передаю текущие параметры - ответ в json - при ответе - меняю цены в html
		$.ajax({
			type: "POST",
			url: "/php/getShippingCosts.php",
			data: "country=" + country + "&city=" + city + "&weigth=" + weight + "&unit=" + unit,
			cache: false,
			success: function (answer) {
				var data = $.parseJSON(answer);
				$("#price-shoppack").text("$ " + data.SHOPPACK);
				$("#price-usps").text("$ " + data.USPS);
				$("#price-ems").text("$ " + data.EMS);
				$("#price-fedex").text("$ " + data.Fedex);
			}
		})
	}






$( document ).ready(function() {


	svg4everybody();
	//Получаем цены с параметрами по ум.
	getShippingCosts();

	// При изменении любого из параметров - шлем запрос
	$("#calc-country,#calc-city,.calc__weight-btns input,#weightsel").change(function (e) {
		getShippingCosts();
	})

   var a = 0;
$('.menu-toggle').click(function(){
    a++;
    if(a>1){
        a=0;
        $('.top-menu-mobile').animate({'right':'-100%'},500);
        $('#m1').removeClass('turn45left');
        $('#m2').removeClass('shiftleft');
        $('#m3').removeClass('turn45right');
    }else{
        $('.top-menu-mobile').animate({'right':'0'},500);
        $('#m1').addClass('turn45left');
        $('#m2').addClass('shiftleft');
        $('#m3').addClass('turn45right'); 
        
    }
   
    return false;
});




	var vW = $(window).width();
			if (vW < 768) {
				$('body').addClass('mobile');
			}
				else if (vW > 768){
				$('body').removeClass('mobile');
			}


// click functions

$('.header__menu-top--search').on('click', function (e) {
		e.preventDefault();
		$("#search").show();
		
	});

$('#search .close').on('click', function () {
		$("#search").hide();
		
	});




$('.show-all a').on('click', function (e) {
		e.preventDefault();
  	$('.about p').toggleClass('show');
  $(this).text(($(this).text() == 'Свернуть текст') ? 'Показать весь текст' : 'Свернуть текст');
});





	$('.why-pagination li').on('click', function () {
		var id = $(this).attr('data-id');
		whySwiper.slideTo(id)
	});

	var wrapper = $('.delivery__line .wrapper');

	$('.delivery__tabs li a').on('click', function (e) {
		e.preventDefault();
		var id = $(this).closest('li').attr('data-id');
		$('.delivery__tabs li').removeClass('active')
		$(this).closest('li').addClass('active')
		$(wrapper).hide()
		$(wrapper[id]).show();
	});



	
  	$('#lang-switcher').hover(function(){
			$(this).toggleClass('active');
		});

$("#lang-switcher").mouseleave(function(){
   $(this).removeClass('active');
});

		  	$('#mobile-lang-switcher').hover(function(){
			$(this).toggleClass('active');
		});

$("#mobile-lang-switcher").mouseleave(function(){
   $(this).removeClass('active');
});




//slider init

	var whySwiper = new Swiper('.why .swiper-container', {
		pagination: '.why-pagination',
		paginationType: 'custom',
		nextButton: '.why-slider__right',

		prevButton: '.why-slider__left',
		paginationClickable: true,
		paginationCustomRender: function (swiper, current) {

			$('.why-pagination li').each(function (i, el) {
				$(el).attr('data-id', i)
				if (current == i + 1) {
					$('.why-pagination li').removeClass('active');
					$(el).addClass('active');
					$(el).attr('data-id')

				}
			})
		}

	});


	var feedSwiper = new Swiper('.feedback .swiper-container', {
		spaceBetween: 50,
		nextButton: '.feedback-next',
		slidesPerView: 'auto',
visibilityFullFit: true,
autoResize: false,
		prevButton: '.feedback-prev'

	})




// wow init


	var wow = new WOW({
		mobile: false
	});
	wow.init();














    var header = $("header");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 20) {
            header.addClass("whiteHeader");
        } else {
            header.removeClass("whiteHeader");
        }
    });

    if ($(window).height()>20) {
    	      header.addClass("whiteHeader");
        } else {
            header.removeClass("whiteHeader");
        }

// resize
$(window).resize(function(){
    var header = $("header");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 20) {
            header.addClass("whiteHeader");
        } else {
            header.removeClass("whiteHeader");
        }
    });
    
	var vW = $(window).width();
			if (vW < 768) {
				$('body').addClass('mobile');
			}
			else if (vW > 768){
				$('body').removeClass('mobile');
			}

    if ($(window).height()>20) {
    	      header.addClass("whiteHeader");
        } else {
            header.removeClass("whiteHeader");
        }


});

});

