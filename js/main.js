const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
    searchEnabled: false
});



$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger,.nav-list').toggleClass('active');
    });
});

function setMenuListener() {
    const btnClassName = 'main-list__btn';
    const activeClassName = 'is-active';

    document.body.addEventListener('click', (evt) => {
        const activeElements = document.querySelectorAll(`.${activeClassName}`);

        if (activeElements.length && !evt.target.closest(`.${activeClassName}`)) {
            activeElements.forEach((current) => {
                current.classList.remove(activeClassName);
            });
        }

        if (evt.target.closest(`.${btnClassName}`)) {
            const btn = evt.target.closest(`.${btnClassName}`);
            const path = btn.dataset.path;
            const drop = document.querySelector(`[data-target="${path}"]`);

            btn.classList.toggle(activeClassName);
            drop.classList.toggle(activeClassName);
        }

    })

}



setMenuListener();


var swiper = new Swiper(".image-slider", {


    slidesPerView: 3,
    slidesPerColumn: 2,
    spaceBetween: 50,


    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        clickable: true,



    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },


    breakpoints: {

        320: {

            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
        },

        500: {

            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
        },

        541: {

            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
            slidesPerColumnFill: 'row',
        },

        768: {

            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 20,
        },

        1024: {

            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 20,
        },

        1300: {

            slidesPerView: 3,
            slidesPerColumn: 2,
            spaceBetween: 20,
        },


    },

    mobileFirst: false,
    appendArrows: $('.content')
});




document.addEventListener('DOMContentLoaded', function() {
    $(".js-tabs").tabs({
        show: { effect: "fadeIn", duration: 400 },
        hide: { effect: "fadeOut", duration: 300 },
        //active: 1
    });

    function setCustomTabs() {
        const customTabName = "js-custom-tab";
        const tabs = Array.from(document.querySelectorAll(`.${customTabName}[data-path]`));
        const content = Array.from(document.querySelectorAll(`.${customTabName}[data-target]`));

        content.forEach(function(el, i) {
            if (i !== 0) {
                el.classList.add('is-hidden');
            }
        });

        tabs.forEach(function(el) {
            el.addEventListener('click', function() {
                const path = this.dataset.path;

                content.forEach(function(el) {
                    if (path !== el.dataset.target) {
                        el.classList.add('is-hidden');
                    } else {
                        el.classList.remove('is-hidden');
                    }
                });
            });
        });
    }

    setCustomTabs();
});


document.addEventListener('DOMContentLoaded', function() {
    $(".js-tabs").tabs({
        show: {
            effect: "fadeIn",
            duration: 400
        },
        hide: {
            effect: "fadeOut",
            duration: 300
        }
    });
});

//accordion
$(function() {
    $(".js-accordion").accordion({

        collapsible: true,
        active: 0,
        icons: false,
        heightStyle: 'content'
    });
});
//events-slider
"use strict";

document.addEventListener("DOMContentLoaded", function() {
    /* Можно начинать копировать отсюда */

    function setCards() { // создаем главную функцию для всего этого дела, чтоб объединить весь нужный код внутрь нее

        /* эти константы меняйте под себя, в зависимости от того, где будет граница десктопа и мобильника */
        const MIN_DESKTOP = 960;
        const MIN_TABLET = 581;

        /* Функция устанавливающая количество карточек к изначальному просмотру и скрывающая остальные */
        function setHiddenCards(quantity, isResize) {
            const hidden = "is-hidden";
            const openAnimation = "fade-in";
            const closeAnimation = "fade-out";
            let isOpened = false;
            const showText = "Все события"; // текст кнопки в закрытом состоянии
            const hideText = "Скрыть Все события"; // текст кнопки в открытом состоянии
            const btn = document.querySelector(".events-btn");
            const cards = Array.from(document.querySelectorAll(".card"));

            if (quantity) {
                cards.forEach((el, i) => {
                    el.classList.remove(hidden);

                    if (i >= quantity) {
                        el.classList.add(hidden);
                        el.addEventListener("animationend", function() {
                            if (!isOpened && !isResize) {
                                this.classList.add(hidden);
                            }
                        });
                    }
                });

                btn.classList.remove(hidden);
            } else {
                cards.forEach((el, i) => {
                    el.classList.remove(hidden);
                });

                btn.classList.add(hidden);
            }

            btn.addEventListener("click", function(event) {
                isOpened = !isOpened;

                if (isOpened) {
                    btn.textContent = hideText;

                    cards.forEach((el, i) => {
                        el.classList.remove(hidden, closeAnimation);
                        el.classList.add(openAnimation);
                    });

                    cards[quantity].scrollIntoView({
                        block: "start",
                        behavior: "smooth"
                    });
                } else {
                    btn.textContent = showText;

                    cards.forEach((el, i) => {
                        if (i >= quantity) {
                            el.classList.remove(openAnimation);
                            el.classList.add(closeAnimation);
                        }
                    });

                    cards[0].scrollIntoView({ block: "start", behavior: "smooth" });
                }
            });
        }

        /* функция для проверки ширины страницы, она же обработчик события resize */
        function checkDisplay(evt) {
            let isResize;

            if (evt) {
                isResize = evt.type;
            }

            const width = Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth,
                document.body.clientWidth,
                document.documentElement.clientWidth
            );

            switch (true) {
                case width > MIN_DESKTOP:
                    setHiddenCards(3, isResize); // цифра означает количество карточек, которые будут показаны изначально
                    break;
                case width > MIN_TABLET && width <= MIN_DESKTOP:
                    setHiddenCards(2, isResize);
                    break;
                default:
                    setHiddenCards(false, isResize);
            }
        }

        checkDisplay(); // проверяем ширину экрана при первой загрузке страницы
        window.addEventListener("resize", checkDisplay); // проверяем ширину при ресайзе без перезагрузки
    }

    setCards(); // вызываем главную функцию для всего этого дела

    /* Здесь можно заканчивать копировать */
});



//edition slider

var slider2 = new Swiper('.slider2-container', {
    slidesPerView: 3,
    slidesPerColumn: 1,
    spaceBetween: 50,
    pagination: {
        el: ".swiper-pagination-2",
        type: "fraction",
        effect: 'fade',
        clickable: true,



    },


    navigation: {
        nextEl: '.slider2-swiper-button-next',
        prevEl: '.slider2-swiper-button-prev',
    },

    breakpoints: {

        320: {

            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
        },

        500: {

            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
        },

        541: {

            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
        },

        768: {

            slidesPerView: 2,
            slidesPerColumn: 1,
            spaceBetween: 10,
        },

        1024: {

            slidesPerView: 2,
            slidesPerColumn: 1,
            spaceBetween: 10,
        },

        1300: {
            slidesPerView: 2,
            slidesPerColumn: 1,
            spaceBetween: 20,
        },

        1400: {
            slidesPerView: 3,
            slidesPerColumn: 1,
            spaceBetween: 50,
        },


    },

    mobileFirst: false,
    appendArrows: $('.content')
});



//tooltip


tippy('#myButton', {
    content: 'Пример современных тенденций - современная методология разработки ',
    maxWidth: 300,
});



tippy('#myButton2', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    maxWidth: 300,
});

tippy('#myButton3', {
    content: 'В стремлении повысить качество ',
    maxWidth: 300,
});





var slider3 = new Swiper('.slider3', {
    slidesPerView: 3,
    slidesPerColumn: 1,
    spaceBetween: 50,
    pagination: {
        el: ".swiper-pagination-3",
        clickable: true,



    },


    navigation: {
        nextEl: '.slider3-swiper-button-next',
        prevEl: '.slider3-swiper-button-prev',
    },



    breakpoints: {

        320: {

            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
        },

        500: {

            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
        },

        541: {

            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 0,
        },

        768: {

            slidesPerView: 2,
            slidesPerColumn: 1,
            spaceBetween: 10,
        },

        1024: {

            slidesPerView: 2,
            slidesPerColumn: 1,
            spaceBetween: 10,
        },

        1300: {
            slidesPerView: 2,
            slidesPerColumn: 1,
            spaceBetween: 20,
        },

        1400: {
            slidesPerView: 3,
            slidesPerColumn: 1,
            spaceBetween: 50,
        },


    },

    mobileFirst: false,
    appendArrows: $('.content')
});



ymaps.ready(init);

function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        center: [55.765, 37.6],
        zoom: 14
    });

    var myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [55.76, 37.6]
        }
    });

    var myPlacemark = new ymaps.Placemark([55.76, 37.6], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/12.png',
        iconImageSize: [20, 20],
        iconImageOffset: [-3, -42]
    });

    myMap.geoObjects.add(myPlacemark);
    // myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    // myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
}







// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.



//ymaps.ready(init);

//function init() {
// Создание карты.
// var myMap = new ymaps.Map("map", {
// Координаты центра карты.
// Порядок по умолчанию: «широта, долгота».
// Чтобы не определять координаты центра карты вручную,
// воспользуйтесь инструментом Определение координат.
//center: [55.76, 37.64],
// Уровень масштабирования. Допустимые значения:
// от 0 (весь мир) до 19.
//zoom: 7,
//controls: []
//}, {
// suppressMapOpenBlock: true
// });
//}




var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999)-999-99-99");

im.mask(selector);

new JustValidate('.form', {
    rules: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 30
        },
        tel: {
            required: true,
            function: (name, value) => {
                const phone = selector.inputmask.unmaskedvalue()
                console.log(phone)
                return Number(phone) && phone.length === 10
            }
        },
        mail: {
            required: true,
            email: true
        },
    },
    messages: {
        name: 'Как вас зовут?',
        tel: 'Недопустимый формат',

    },
});
