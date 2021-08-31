$(document).ready(function () {

    /*--Overflow scroll glitch fix---*/

    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    /*--CHECK BROWSERS FUNCTION---*/

    let checkBrowser = (ifChromeCb=() => {}, ifOthersCb=() => {}) => {
        let isChromium = window.chrome;
        let winNav = window.navigator;
        let vendorName = winNav.vendor;
        let isOpera = typeof window.opr !== "undefined";
        let isIEedge = winNav.userAgent.indexOf("Edge") > -1;


        if (
            isChromium !== null &&
            typeof isChromium !== "undefined" &&
            vendorName === "Google Inc." &&
            isOpera === false &&
            isIEedge === false
        ) {
            ifChromeCb();
        } else {
            ifOthersCb();
        }

    }

    /*------ MODALS ---------*/
    let renderClickableBG = (isDark, elementToClose, renderParent=$('body'), blockScroll=true) => {
        renderParent.append('<div class="clickable-bg"></div>');
        if (blockScroll) {
            $('body').css({
                'padding-right': scrollWidth,
                'overflow-y': 'hidden',

            });
        }
        if (isDark) {
            $('.clickable-bg').addClass('clickable-bg--dark').fadeOut(1).fadeIn(400);
        }
        $('.clickable-bg').on('click', function () {
            $(this).remove();
            if (elementToClose) {
                elementToClose.removeClass('opened');
                if (blockScroll) {
                    $('body').css({
                        'padding-right': 0,
                        'overflow-y': 'auto',
                    });
                }
            }
        })
    }

    $('.js-open-modal').on('click', function (e) {
        e.preventDefault();
        let modalToOpen = $(this).attr('data-modal');
        $(`#${modalToOpen}`).addClass('opened').fadeOut(1).fadeIn(400);
        renderClickableBG(true, $(`#${modalToOpen}`), $(`#${modalToOpen}`))
    })

    $('.js-close-modal').on('click', function () {
        let modalToClose = $(this).parents('.modal');
        modalToClose.removeClass('opened');
        $('body').css({
            'padding-right': 0,
            'overflow-y': 'auto',
        });
        modalToClose.find(('.clickable-bg')).remove();
    })

    /*------ SLIDERS ---------*/

    $('.js-main-slider').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: $('.main-block-wrapper .pretty-arrow--prev'),
        nextArrow: $('.main-block-wrapper .pretty-arrow--next'),
    });


    $('.js-history-slider').slick({
        infinite: false,
        prevArrow: $('.history-slider__wrapper .history-slider__arrow-wrapper--prev'),
        nextArrow: $('.history-slider__wrapper .history-slider__arrow-wrapper--next'),
        speed: 350,
        adaptiveHeight: true,
    });

    $('.js-history-slider').on('afterChange', function(){
        let currentSlide = $('.slick-current');
        let nextYear = currentSlide.next().find('.history-slider__slide-year').text();
        let prevYear = currentSlide.prev().find('.history-slider__slide-year').text();
        $('.history-slider__arrow-wrapper--prev .history-slider__side-year').text(prevYear);
        $('.history-slider__arrow-wrapper--next .history-slider__side-year').text(nextYear);

    });


    let slideWidth = $('.filters__datepicker-day').outerWidth();
    let sliderWidth = $('.js-datepicker-day-slider').outerWidth();
    let slidesNum = Math.round(sliderWidth / slideWidth);

    $('.js-datepicker-day-slider').slick({
        infinite: false,
        slidesToShow: slidesNum,
        slidesToScroll: 7,
        swipe: false,
        prevArrow: $('.filters__datepicker-wrapper .common-arrow--prev'),
        nextArrow: $('.filters__datepicker-wrapper .common-arrow--next'),
        responsive: [
            {
                breakpoint: 599,
                settings: {
                    slidesToScroll: 1,
                    swipe: true,
                    prevArrow: null,
                    nextArrow: null,
                    swipeToSlide: true,
                }
            },
        ],
    });

    $('.js-gallery-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        swipeToSlide: true,
        touchThreshold: 10,
        prevArrow: $('.gallery-slider-wrapper .pretty-arrow--prev'),
        nextArrow: $('.gallery-slider-wrapper .pretty-arrow--next'),
        responsive: [
            {
                breakpoint: 599,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                    centerMode: true,
                }
            },
        ],
    })



    /*------ MOBILE MENU ---------*/
    $('.js-open-mobile-menu').on('click', function () {
        $('.mobile-menu').addClass('opened');
        renderClickableBG(true, $('.mobile-menu'))
    })

    $('.js-close-mobile-menu').on('click', function () {
        $('.mobile-menu').removeClass('opened');
        $('.clickable-bg').remove();
        $('body').css({
            'padding-right': scrollWidth,
            'overflow-y': 'auto',
        });
    })

    /*--MAPS--*/
    function loadScript(url, callback){

        var script = document.createElement("script");

        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function(){
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    //Айдишники и параметры карт для загрузки
    let mapsToLoad = [
        {
            id: 'map-single',
        },
        {
            id: 'map-multi',
        },
    ]

    function init(){
        // Создание карт.
        function prepareMap (mapId) {
            let mapJsonPath = $('#' + mapId).attr('data-json');
            let myGeoObjects = [];
            let pointCenterCoords = [0, 0];
            $.getJSON(mapJsonPath, function(data) {
                let pointsNum = data.length;
                data.forEach(point => {
                    let balloonInner =
                        `<div class="custom-balloon">
                                <div class="custom-balloon__text"><b>${point.name}</b></div>
                                <div class="custom-balloon__text">${point.address}</div>
                         </div>`

                    let placemark = new ymaps.Placemark(point.coords, {
                            balloonContent: balloonInner,
                        },
                        {
                            iconLayout: 'default#image',
                            iconImageHref: 'img/svg/point.svg',
                            iconImageSize: [50, 60],
                            iconOffset: [-15, -30],
                            balloonOffset: [-2, -65],
                            hideIconOnBalloonOpen: false,
                        }
                    );

                        myGeoObjects.push(placemark)
                        pointCenterCoords[0] +=Number(point.coords[0]);
                        pointCenterCoords[1] +=Number(point.coords[1]);
                })

                pointCenterCoords[0] = pointCenterCoords[0] / pointsNum;
                pointCenterCoords[1] = pointCenterCoords[1] / pointsNum;
                let myMap = new ymaps.Map(mapId, {
                    center: pointCenterCoords,
                    zoom: pointsNum === 1 ? 16 : 10,
                    controls: ['zoomControl'],
                });

                myGeoObjects.forEach(item => {
                    myMap.geoObjects.add(item);
                })
                myMap.behaviors.disable('scrollZoom');
            });
        }

        mapsToLoad.forEach(item => {
            if ($('#' + item.id).length > 0) {
                prepareMap(item.id)
            }
        })
    }


    let check_if_load = false;
    const checkLoadMap = () => {
        if (!check_if_load) {
            check_if_load = true;
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=04709a29-6f21-442a-9cb5-272b39900456&lang=ru_RU", function(){
                ymaps.ready(init);
            });
        }
    }

    if ($('.map-container').length > 0) {
        checkLoadMap();
    }

    /*--END Maps--*/


    /*------ MISC ---------*/
    $('.js-unfold-nav').on('click', function () {
        $('.header__secondary-nav-wrapper').slideToggle().toggleClass('opened');
        $(this).toggleClass('opened');
    });

    if (screen.width >= 991) {
        let foldingPart = $('.header__secondary-nav-wrapper')
        let header = $('.header');
        let headerHeight = header.height();
        let foldedHeight = headerHeight - foldingPart.height();

        $(document).on('scroll', function () {
            if ($(document).scrollTop() >= headerHeight && !header.hasClass('folded')) {
                header.addClass('folded');
                headerHeight = foldedHeight;
                checkBrowser(undefined, function () {
                    $('.header__logo-box').css({
                        'height': headerHeight,
                    })

                })
                if (!foldingPart.hasClass('opened')) {
                    foldingPart.hide();
                }
            }
            else if ($(document).scrollTop() < headerHeight && header.hasClass('folded')) {
                header.removeClass('folded');
                headerHeight = header.height();
                checkBrowser(undefined, function () {
                    $('.header__logo-box').css({
                        'height': headerHeight,
                    })
                })
                foldingPart.show();
            }
        })
    }
    if (screen.width <= 600) {
        if ($('.history-slider').length > 0) {
            $('.history-slider__arrow-wrapper').css('top', $('.history-slider__img').position().top + $('.history-slider__img').height() - 20)
            $(window).on('resize', function () {
                clearTimeout(window.resizedFinished);
                window.resizedFinished = setTimeout(function () {
                    $('.history-slider__arrow-wrapper').css('top', $('.history-slider__img').position().top + $('.history-slider__img').height() + 65)
                }, 250);
            })
        }
    }

    let circleText = (elementId, radius, radiusMob) => {
        if (document.getElementById(elementId) != null) {
            const circleType = new CircleType(document.getElementById(elementId)).radius(radius);
            if (screen.width < 768) {
                circleType.radius(radiusMob);
            }
        }
    }

    circleText('js-circle-text', 155, 140);
    $('#js-circle-text').css('transform', 'rotate(-30deg)');

    circleText('js-show-more-circle', 60, 60);


    let moveElement = (element, target, screenSize, append=true, after=false) => {
        if (screen.width < screenSize) {
            if (after) {
                for (let i = 0; i < $(element).length; i++) {
                    $(target).eq(i).after($(element).eq($(target).length === 1 ? 0 : i))
                }
            } else {
                if (append) {
                    for (let i = 0; i < $(element).length; i++) {
                        $(element).eq(i).appendTo($(target).eq($(target).length === 1 ? 0 : i))
                    }
                } else {
                    for (let i = 0; i < $(element).length; i++) {
                        $(element).eq(i).prependTo($(target).eq($(target).length === 1 ? 0 : i))
                    }
                }
            }
        }
    }

    moveElement('.main-block__infobox', '.main-block__item-content', 768);
    moveElement('.events-item__type', '.events-item__bottom', 600, false);
    moveElement('.events-item__duration', '.events-item__title', 600, false, true);
    moveElement('.filters__item.mobile-move', '.filters__dropdown.mobile-only .filters__dropdown-box-inner', 600);
    moveElement('.filters__events-num', '.filters__bottom-right', 600, false);
    moveElement('.labels--main-block', '.main-block__item-img', 767);
    moveElement('.main-block--event .labels--static', '.main-block__item-img', 767);
    moveElement('.main-block--event .main-block__infobox-price', '.main-block__infobox-duration', 767, false, true);
    if (screen.width < 992) {
        $('.events-item--horizontal .events-item__left').each(function () {
            $(this).removeClass('events-item__left').addClass('events-item__top-content');
            moveElement($(this), $(this).parents('.events-item').find('.events-item__img'), 991, false, true);
        })
    }
    moveElement('.events-item--horizontal .events-item__bottom-right .events-item__inner', '.events-item--horizontal .events-item__top-content', 991, true );
    moveElement('.events-item--horizontal .events-item__additional-dates', '.events-item--horizontal .events-item__bottom', 991, true );
    moveElement('.events-item--horizontal .common-btn--blue', '.events-item--horizontal .events-item__bottom-box', 991, true );
    moveElement('.main-person__dignity', '.main-person__info', 991, false );
    moveElement('.main-block__infobox-duration', '.main-block__infobox-top', 767, true );
    moveElement('.history-slider__slide-year', '.history-slider__img', 991, false, true );
    moveElement('.event-info__artists', '.event-info__programm', 991, false, true );


    let checkVisible = (elem, eventName, callback) => {
        let i = 0;
        let elemsNum = elem.length;

        $(document).on(`scroll.${eventName}`, function () {
            elem.each(function () {
                i = callback($(this), i);
                if (i >= elemsNum) {
                    $(document).off(`scroll.${eventName}`);
                }
            });
        });
    }
    if (screen.width > 1199) {
        checkVisible($('.infoblock__img'),'scroll.infoblock',  function (vThis, i) {
            if (vThis.visible(true) && !vThis.hasClass('visible')) {
                vThis.parents('.infoblock__img-wrapper').find('.infoblock__img').addClass('visible');
                i += 2;
            }
            return i;
        });
    }

    checkVisible($('.big-links-block--style2 .big-links__item'),'scroll.biglinks',  function (vThis, i) {
        if (vThis.visible(true) && !vThis.hasClass('visible')) {
            vThis.addClass('visible');
            i++;
        }
        return i;
    });


    let playlists = $('.playlists__item');
    checkBrowser(
        function () {
            playlists.each(function () {
                let iframe = $(this).find('iframe');
                iframe.attr('src', iframe.attr('data-src'));
            })
         },
        function () {
            checkVisible(playlists, 'scroll.playlist', function (vThis, i) {
                if (vThis.visible(true)) {
                    let iframe = vThis.find('iframe');
                    if (iframe.attr('src') === undefined) {
                        iframe.attr('src', iframe.attr('data-src'));
                    }
                    i++;
                }
                return i;
            })
        }
    )


    if (screen.width <= 600) {
        $('.js-footer-dropdown').on('click', function () {
            let element = $(this).next('.footer__nav--mobile-folded')
            $(this).next('.footer__nav--mobile-folded').slideToggle({
                start: function () {
                    $(this).css('display', 'block')
                }
            }).toggleClass('opened');
            element.css('display', 'block');
            $(this).toggleClass('opened');
        })
    }

    $('.js-open-dropdown').on('click', function () {
        $('.js-open-dropdown').removeClass('opened');
        let dropdown = $(this).parent().find('.js-dropdown');
        if (dropdown.hasClass('opened')) {
            dropdown.removeClass('opened')
            $('.clickable-bg').remove();
        }
        else {
            $('.js-dropdown.opened').removeClass('opened');
            dropdown.toggleClass('opened');
            $('.clickable-bg').remove();
            renderClickableBG(false, dropdown, $('body'), false);
        }

    })

    $('.js-toggle-active').on('click', function () {
        if ($(this).parent().hasClass('js-toggle-active-one-minimum')) {
            if (!$(this).hasClass('active') || $(this).parent().find('.js-toggle-active.active').length !== 1) {
                $(this).toggleClass('active');
                $(this).parent().find('.js-toggle-active-all').removeClass('active');
            }
        }
        else {
            $(this).toggleClass('active');
        }
    });

    $('.js-toggle-active-all').on('click', function () {
        $(this).parent().find('.js-toggle-active').removeClass('active');
        $(this).toggleClass('active');
    });

    $('.filters__view').on('click', function () {
        $('.filters__view').removeClass('active');
        $(this).addClass('active');
    });

    $('.js-clear').on('click', function () {
        $('.filters__item, .filters__datepicker-month-item').removeClass('active');
        $('.filters__datepicker-day').removeClass('selected in-range start-date end-date');
    });

    let isStartDateExist = false;
    let isEndDateExist = false;
    $('.filters__datepicker-day:not(".filters__datepicker-day--breaker")').on('click', function () {
        if (isEndDateExist) {
            $('.filters__datepicker-day').removeClass('selected in-range start-date end-date');
            isStartDateExist = false;
            isEndDateExist = false;
        }
        if (!$(this).hasClass('selected')) {
            $(this).addClass('selected')
            if (!isStartDateExist) {
                $(this).addClass('start-date');
                isStartDateExist = true;
            }
            else {
                $(this).addClass('end-date');
                isEndDateExist = true;
                let startSlide =$('.filters__datepicker-day.start-date').parents('.slick-slide');
                let thisSlide = $(this).parents('.slick-slide');

                if (Number(startSlide.attr('data-slick-index')) < Number(thisSlide.attr('data-slick-index'))) {
                    startSlide.nextUntil(thisSlide).each(function () {
                        $(this).find($('.filters__datepicker-day')).addClass('in-range');
                    });
                } else {
                    startSlide.prevUntil(thisSlide).each(function () {
                        $(this).find($('.filters__datepicker-day')).addClass('in-range');
                    });
                }
            }
        }
        else {
            $(this).removeClass('selected')
        }
    });
    let initialBtnText;
    let initialStartHeight;
    $('.js-read-more-toggle').on('click', function () {
        let initHeight = $(this).prev('.js-read-more-wrapper').find($('.js-read-more-container')).height();
        if (!$(this).hasClass('opened')) {
            initialBtnText = $(this).text();
            initialStartHeight = $(this).prev('.js-read-more-wrapper').height();
            $(this).prev('.js-read-more-wrapper').animate({
                height: initHeight
            }, 300);
            $(this).addClass('opened');
            $(this).text('Скрыть');
        } else {
            $(this).prev('.js-read-more-wrapper').animate({
                height: initialStartHeight,
            }, 300);
            $(this).removeClass('opened');
            $(this).text(initialBtnText);
        }
    });

    function swipeScroll(element) {
        const item = document.querySelector(element);
        if(item !== null) {
            item.style.cursor = 'grab';
            let mouseMove = false;

            let pos = {top: 0, left: 0, x: 0, y: 0};

            const mouseDownHandler = function (e) {
                item.style.cursor = 'grabbing';
                item.style.userSelect = 'none';

                pos = {
                    left: item.scrollLeft,
                    top: item.scrollTop,
                    x: e.clientX,
                    y: e.clientY,
                };

                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            };

            const mouseMoveHandler = function (e) {
                const dx = e.clientX - pos.x;
                const dy = e.clientY - pos.y;

                item.scrollTop = pos.top - dy;
                item.scrollLeft = pos.left - dx;
                mouseMove = true;
            };

            const mouseUpHandler = function (e) {
                item.style.cursor = 'grab';
                item.style.removeProperty('user-select');

                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };


            item.querySelectorAll(element + '> *').forEach(function (elem) {
                elem.addEventListener('click', function (e) {
                    if (mouseMove) {
                        e.preventDefault();
                    }
                    mouseMove = false;
                })

            });

            $(element).on("dragstart", function() {
                return false;
            });

            item.addEventListener('mousedown', mouseDownHandler);
        }
    }

    if (screen.width > 1199) {
        $('.js-swipe-scroll').each(function () {
            swipeScroll(`.${$(this).attr("class").split(/\s+/)[0]}`);
        })
        $('.js-swipe-scroll > *').attr('draggable', 'false');
        $('.js-swipe-scroll img').attr('draggable', 'false');
    }

    let vTour = $('#virtual-tour-box');
    if (vTour.length > 0) {
        loadScript('data/virtual-tour/tour.js', function () {
            let swf = vTour.attr('data-swf');
            let xml = vTour.attr('data-xml');
            embedpano({swf:swf, xml:xml, target:"virtual-tour-box", html5:"auto", passQueryParameters:true});
        });
    }

    $('.js-scroll-to').on('click', function (e) {
        e.preventDefault();
        let elemToScroll = $(this).attr('href');
        $([document.documentElement, document.body]).animate({
            scrollTop: $(elemToScroll).offset().top - $('header').height()
        }, 1000);
    });

    $('.js-checkbox').on('click',function (e) {
        if (e.target.tagName.toLowerCase() !== 'a') {
            e.preventDefault()
            let isChecked = $(this).find('.custom-checkbox').prop('checked');
            $(this).toggleClass('checked').find('.custom-cb-badge').toggleClass('checked');
            $(this).find('.custom-checkbox').prop('checked', !isChecked);
        }
    });

    let watchScroll = (element) => {
        $(window).on("scroll", function() {
            var currentPos = $(window).scrollTop();
            element.each(function() {
                var sectionLink = $(this);

                var navHeight = $('.header').outerHeight() + 1;
                var section = $(sectionLink.attr('href'));
                if(section.position().top - navHeight  <= currentPos && sectionLink.offset().top + section.height() > currentPos) {
                    element.removeClass('current');
                    sectionLink.addClass('current');
                } else {
                    sectionLink.removeClass('current');
                }
            });
        });
    }
    if ($('.js-scroll-watch').length > 0) {
        watchScroll($('.js-scroll-watch'));
    }

    $('.js-close-cookie').on('click', function () {
       $('.cookies-disclaimer').removeClass('show');
    });

    let elements = document.querySelectorAll("input[type='tel']");
    elements.forEach(function (element) {
        let dynamicMask = IMask(element, {
            mask: [
                {
                    mask: '+{7}(#00)000-00-00',
                    definitions: {
                        '#': /[12345690]/
                    }
                },
                {
                    mask: '{#}(000)000-00-00',
                    definitions: {
                        '#': /[8]/
                    }
                },{
                    mask: '{+#}(000)000-00-00',
                    definitions: {
                        '#': /[+7]/
                    }
                },
            ]
        });
    })
});


