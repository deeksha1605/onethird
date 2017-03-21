// Dropdown-menu for languages
        if ($.find("[data-toggle='lang-dropdown']")[0]){
            $("[data-toggle='lang-dropdown']").click(function(e){
                e.stopPropagation();
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open');
                }else{
                    $(this).addClass('open');
                };
            });
        }
        $('html').click(function(){
            if ($("[data-toggle='lang-dropdown']").hasClass('open')) {
                $("[data-toggle='lang-dropdown']").removeClass('open');
            };
        });

        // Navigation bar for mobile
        if ($.find(".nav-toggle")[0]){
            var mobileMenuHeight = 0;
            $('.nav-mobile ul').each(function(n) {
                mobileMenuHeight += $(this).height() + parseFloat($(this).css("margin-bottom")) + parseFloat($(this).css("padding-bottom") + parseFloat($(this).css("padding-top")));
            });
            $( window ).resize(function() {
                mobileMenuHeight = 0;
                $('.nav-mobile ul').each(function(n) {
                    mobileMenuHeight += $(this).height() + parseFloat($(this).css("margin-bottom")) + parseFloat($(this).css("padding-bottom") + parseFloat($(this).css("padding-top")));
                });
            });
            $(".nav-toggle").click(function(e){
                e.stopPropagation();
                if ($('.nav-mobile').hasClass('open')) {
                    $('.nav-mobile.open').css('height', 0);
                    $('.nav-mobile').removeClass('open');
                    if ($('body').hasClass('home')) {
                    $('.nav-mobile').parent().removeClass('open');
                    }
                }else{
                    $('.nav-mobile').addClass('open');
                    if ($('body').hasClass('home')) {
                    $('.nav-mobile').parent().addClass('open');
                    }
                    $('.nav-mobile.open').css('height', mobileMenuHeight);
                };
            });
        }

        // Making subnav ( second header ) fixed on top page
        if ($.find(".subnav")[0]){
            $('.subnav li a').click(function(e){
                if ($(this).attr('href')[0] == '#') {
                    e.preventDefault();
                    var href = $.attr(this, 'href');
                    scrollToOffeset = 50;

                    $('html, body').animate({scrollTop: $(href).offset().top - scrollToOffeset}, 1000, function () {
                        if(history.pushState) {
                            history.pushState(null, null, href);
                        }
                        else {
                            location.hash = href;
                        }
                    });
                }
            });

            var listOfHomepageSections = [];
            $('.subnav li a').each(function(){
                if ($(this).attr('href')[0] == '#') {
                    listOfHomepageSections.push($(this).attr('href'));
                };
            });

            var subnavPos = $('.subnav').offset().top;
            $(window).on('resize', function(){
                if ($(window).width() < 992) {
                    subnavPos = $('.subnav').offset().top-89;
                    if ($('.subnav').hasClass('fixed')) {
                        $('.subnav').removeClass('fixed');
                    };
                }else{
                    if (!$('.subnav').hasClass('fixed')) {
                        subnavPos = $('.subnav').offset().top;
                    };
                };
            });

            var lastActiveElem = listOfHomepageSections[0];
            $(window).scroll(function() {
                for(var i = 0; i < listOfHomepageSections.length; i++){
                    if ($('' + listOfHomepageSections[i]).offset().top - $(window).scrollTop() <= 150){
                        if (listOfHomepageSections[i] != lastActiveElem) {
                            $('#a-' + lastActiveElem.replace('#', '')).removeClass('active');
                            $('#a-' + listOfHomepageSections[i].replace('#', '')).addClass('active');
                            lastActiveElem = listOfHomepageSections[i];
                        };
                    };
                }
                if ($(window).width() >= 992) {
                    if ($(window).scrollTop() >= subnavPos) {
                        $('.subnav').addClass('fixed');
                    }else{
                        $('.subnav').removeClass('fixed');
                    };
                }
            });
        }

        //displaying stars
        $.fn.stars = function() {
            return $(this).each(function() {
                var rating = $(this).data("rating");
                var numStars = $(this).data("numStars");
                var fullStar = new Array(Math.floor(rating + 1)).join('<i class="fa fa-star"></i>');
                var halfStar = ((rating%1) !== 0) ? '<i class="fa fa-star-half-empty"></i>': '';
                var noStar = new Array(Math.floor(numStars + 1 - rating)).join('<i class="fa fa-star-o"></i>');
                $(this).html(fullStar + halfStar + noStar);
            });
        }
        $( document ).ready(function() {
            $('span.stars').stars();
        });