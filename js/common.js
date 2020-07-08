$(function() {

	$('.phone-mobail-n').click(function() {
		$('.mobail-phone').slideToggle();
	});

	$('.menu-mobail').click(function() {
		$('ul.menu-mob').slideToggle();
	});


	$("nav, footer, .item-work-s").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});

	$('.select').each(function() {
		const _this = $(this),
		selectOption = _this.find('option'),
		selectOptionLength = selectOption.length,
		selectedOption = selectOption.filter(':selected'),
		duration = 450;
		_this.hide();
		_this.wrap('<div class="select"></div>');
		$('<div>', {
			class: 'new-select',
			text: _this.children('option:disabled').text()
		}).insertAfter(_this);

		const selectHead = _this.next('.new-select');
		$('<div>', {
			class: 'new-select__list'
		}).insertAfter(selectHead);

		const selectList = selectHead.next('.new-select__list');
		for (let i = 1; i < selectOptionLength; i++) {
			$('<div>', {
				class: 'new-select__item',
				html: $('<span>', {
					text: selectOption.eq(i).text()
				})
			})
			.attr('data-value', selectOption.eq(i).val())
			.appendTo(selectList);
		}

		const selectItem = selectList.find('.new-select__item');
		selectList.slideUp(0);
		selectHead.on('click', function() {
			if ( !$(this).hasClass('on') ) {
				$(this).addClass('on');
				selectList.slideDown(duration);

				selectItem.on('click', function() {
					let chooseItem = $(this).data('value');

					$('select').val(chooseItem).attr('selected', 'selected');
					selectHead.text( $(this).find('span').text() );

					selectList.slideUp(duration);
					selectHead.removeClass('on');
				});

			} else {
				$(this).removeClass('on');
				selectList.slideUp(duration);
			}
		});
	});


	$('.owl-carousel').owlCarousel({
		items:3,
		loop:true,
		nav:true,
		autoHeight:true,
		autoplay: true,
		margin:10,
		merge:true,
		responsive:{
			0:{
				items:1
			},
			1000:{
				items:3
			}
		}
	});



	$("form").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", 
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
