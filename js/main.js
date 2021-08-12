const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
  searchEnabled: false
});

//search-input 1024
$(".search-top__btn").click(function () {
  $(".search-top__input").addClass("search-top__input-active")
})

$(document).ready(function () {
  $('.header__burger').click(function (event) {
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

//gallery

let gallerySlider = new Swiper(".gallery-swiper", {
  slidesPerColumnFill: "row",
  slidesPerView: 1,
  slidesPerColumn: 1,
  spaceBetween: 20,
  pagination: {
    el: ".gallery .gallery-pagination",
    type: "fraction"
  },
  navigation: {
    nextEl: ".gallery-next",
    prevEl: ".gallery-prev"
  },

  breakpoints: {
    581: {
      slidesPerView: 2,
      slidesPerColumn: 2,
      spaceBetween: 30
    },

    1024: {
      slidesPerView: 2,
      slidesPerColumn: 2,
      spaceBetween: 34
    },

    1200: {
      slidesPerView: 3,
      slidesPerColumn: 2,
      spaceBetween: 50
    }
  },



  on: {
    /* исправляет баг с margin-top остающимся при смене брейкпоинта */
    beforeResize: function () {
      this.slides.forEach((el) => {
        el.style.marginTop = "";
      });
    }
  }
});




//

document.addEventListener('DOMContentLoaded', function () {
  $(".js-tabs").tabs({
    show: { effect: "fadeIn", duration: 400 },
    hide: { effect: "fadeOut", duration: 300 },
    //active: 1
  });

  function setCustomTabs() {
    const customTabName = "js-custom-tab";
    const tabs = Array.from(document.querySelectorAll(`.${customTabName}[data-path]`));
    const content = Array.from(document.querySelectorAll(`.${customTabName}[data-target]`));

    content.forEach(function (el) {
      if (!el.classList.contains('active')) {
        el.classList.add('is-hidden');
      }
    });

    tabs.forEach(function (el) {
      el.addEventListener('click', function () {
        const path = this.dataset.path;

        content.forEach(function (el) {
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


document.addEventListener('DOMContentLoaded', function () {
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
$(function () {
  $(".js-accordion").accordion({

    collapsible: true,
    active: 0,
    icons: false,
    heightStyle: 'content'
  });
});

"use strict";
//events-slider

let eventsSlider = new Swiper(".events-container", {
  slidesPerColumnFill: "row",
  slidesPerView: 1,
  slidesPerColumn: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets"
  },


  breakpoints: {
    581: {
      slidesPerView: 2,
      slidesPerColumn: 2,
      spaceBetween: 30
    },



    1200: {
      slidesPerView: 3,
      slidesPerColumn: 2,
      spaceBetween: 50
    },


  },

  a11y: false,

  on: {
    /* исправляет баг с margin-top остающимся при смене брейкпоинта */
    beforeResize: function () {
      this.slides.forEach((el) => {
        el.style.marginTop = "";
      });
    }
  }
});


//cards

"use strict";

document.addEventListener("DOMContentLoaded", function setCards() {
  /* Можно начинать копировать отсюда */

  class Cards {
    isOpened = false;

    get current() {
      return this;
    }

    params = {
     
      MIN_DESKTOP: 960,
      MIN_TABLET: 581,
      DESKTOP_CARDS: 3,
      TABLET_CARDS: 2,
      MOBILE_CARDS: false,

      cardsWrapName: "js-cards-wrap",
      paginationClassName: "pagination",
      btn: "cards-btn",
      card: "card",
      hidden: "is-hidden",
      interaction: "interaction",
      openAnimation: "fade-in",
      closeAnimation: "fade-out",
      showText: "Показать",
      hideText: "Скрыть"
    };

    constructor() {
      this.setCards();
    }

    cardsWrap = document.querySelector(`.${this.params.cardsWrapName}`);
    btn = this.cardsWrap.querySelector(`.${this.params.btn}`);
    cards = Array.from(this.cardsWrap.querySelectorAll(`.${this.params.card}`));

    setHiddenCards(quantity, isResize) {
      if (quantity) {
        this.cards.forEach((el, i) => {
          el.classList.remove(
            this.params.hidden,
            this.params.interaction,
            this.params.openAnimation,
            this.params.closeAnimation
          );

          if (i >= quantity) {
            el.classList.add(this.params.hidden, this.params.interaction);
          }

          const currentCards = this;

          el.addEventListener("animationend", function (evt) {
            if (
              !currentCards.isOpened &&
              evt.target.classList.contains(currentCards.params.interaction)
            ) {
              evt.target.classList.add(currentCards.params.hidden);
              evt.target.classList.remove(
                currentCards.params.closeAnimation,
                currentCards.params.openAnimation
              );
            }
          });

          this.isOpened = false;
          this.btn.textContent = this.params.showText;

          if (isResize === "resize") {
            this.isOpened = false;
            this.btn.textContent = this.params.showText;
          }
        });

        this.btn.classList.remove(this.params.hidden);
      } else {
        this.cards.forEach((el) => {
          el.classList.remove(this.params.hidden);
        });

        this.btn.classList.add(this.params.hidden);
      }

      this.setBtnListener(quantity);
    }

    setBtnListener(quantity) {
      const currentCards = this.current;

      this.btn.outerHTML = this.btn.outerHTML;
      this.btn = this.cardsWrap.querySelector(`.${this.params.btn}`);

      this.btn.addEventListener("click", function () {
        currentCards.isOpened = !currentCards.isOpened;

        if (currentCards.isOpened) {
          currentCards.btn.textContent = currentCards.params.hideText;

          currentCards.cards.forEach((el) => {
            el.classList.remove(
              currentCards.params.hidden,
              currentCards.params.closeAnimation
            );
            el.classList.add(currentCards.params.openAnimation);
          });

          currentCards.cards[quantity].scrollIntoView({
            block: "start",
            behavior: "smooth"
          });
        } else {
          currentCards.btn.textContent = currentCards.params.showText;

          currentCards.cards.forEach((el, i) => {
            if (el.classList.contains(currentCards.params.interaction)) {
              el.classList.add(currentCards.params.closeAnimation);
            }
          });

          currentCards.cards[0].scrollIntoView({
            block: "start",
            behavior: "smooth"
          });
        }
      });
    }

    checkDisplay(evt, currentObj) {
      let isResize;

      if (evt) {
        isResize = evt.type;
      }

      this.windowWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );

      switch (true) {
        case this.windowWidth > currentObj.params.MIN_DESKTOP:
          this.setHiddenCards(currentObj.params.DESKTOP_CARDS, isResize); // цифра означает количество карточек, которые будут показаны изначально
          break;
        case this.windowWidth > currentObj.params.MIN_TABLET &&
          this.windowWidth <= currentObj.params.MIN_DESKTOP:
          this.setHiddenCards(currentObj.params.TABLET_CARDS, isResize);
          break;
        default:
          this.setHiddenCards(currentObj.params.MOBILE_CARDS, isResize);
      }
    }

    setCards() {
      const cards = this.current;

      cards.checkDisplay(false, cards);
      cards.setSlider(cards);

      window.addEventListener("resize", (evt) => {
        cards.checkDisplay(evt, cards);
        cards.setSlider(cards);
      });
    }

    setSlider(cards) {
      if (
        this.windowWidth < cards.params.MIN_TABLET &&
        (!cards.cardsSlider || cards.cardsSlider.destroyed)
      ) {
        const pagination = document.createElement("div");
        pagination.classList.add(cards.params.paginationClassName);
        cards.cardsWrap.append(pagination);

        cards.cardsWrap.classList.add("swiper-container");
        cards.cardsWrap.children[0].classList.add("swiper-wrapper");


        cards.cardsSlider = new Swiper(`.${cards.params.cardsWrapName}`, {
          slidesPerColumnFill: "row",
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerView: 1,
          spaceBetween: 20,

          pagination: {
            el: `.${cards.params.cardsWrapName} .${cards.params.paginationClassName}`,
          },

          on: {
            beforeInit() {
              document
                .querySelectorAll(`.${cards.params.card}`)
                .forEach((el) => {
                  el.classList.add("swiper-slide");
                });
            },
            beforeDestroy() {
              this.slides.forEach((el) => {
                el.classList.remove("swiper-slide");
                el.removeAttribute("role");
                el.removeAttribute("aria-label");
              });

              this.pagination.el.remove();
            }
          }
        });
      } else if (
        this.windowWidth >= cards.params.MIN_TABLET &&
        cards.cardsSlider
      ) {
        cards.cardsSlider.destroy();
        cards.cardsWrap.classList.remove("swiper-container");
        cards.cardsWrap.children[0].classList.remove("swiper-wrapper");
        cards.cardsWrap.children[0].removeAttribute("aria-live");
        cards.cardsWrap.children[0].removeAttribute("id");
      }
    }
  }

  const cards = new Cards();


});



//edition slider
document.addEventListener('DOMContentLoaded', function () {

  //Слайдер
  let gallerySlider = new Swiper(".edition-swiper", {
    slidesPerColumnFill: "row",
    slidesPerView: 1,
    slidesPerColumn: 1,
    spaceBetween: 10,

   


    pagination: {
      el: ".edition-section, .edition-pagination",
      type: "fraction"
    },

    navigation: {
      nextEl: ".edition-next",
      prevEl: ".edition-prev"
    },


    breakpoints: {
      320: {
         slidesPerColumnFill: "row",
    slidesPerView: 2,
    slidesPerColumn: 4,
        spaceBetween: 30,
   
      },
      481: {
        slidesPerView: 2,
        slidesPerColumn: 1,
        spaceBetween: 30
      },

      1024: {
        slidesPerView: 2,
        slidesPerColumn: 1,
        spaceBetween: 34
      },

      1200: {
        slidesPerView: 3,
        slidesPerColumn: 1,
        spaceBetween: 50,
      }
    },

    on: {
     
      beforeResize: function () {
        this.slides.forEach((el) => {
          el.style.marginTop = "";
        });
      }
    }
  });

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
  slidesPerView: 1,
  slidesPerColumn: 1,
  spaceBetween: 50,
  pagination: {
    el: ".swiper-pagination-3",
    clickable: true,
  },

 //Бесконечное листание страниц
    speed: 2000, //Интервал ожидания

    autoplay: {
      delay: 13000, //Интервал ожидания
      disableOnInteraction: false,
    },


  navigation: {
    nextEl: '.slider3-swiper-button-next',
    prevEl: '.slider3-swiper-button-prev',
  },




  breakpoints: {
    581: {
      slidesPerView: 2,
      slidesPerColumn: 1,
      spaceBetween: 34
    },


    1024: {
      slidesPerView: 2,
      slidesPerColumn: 1,
      spaceBetween: 50
    },

    1200: {
      slidesPerView: 3,
      slidesPerColumn: 1,
      spaceBetween: 50,
    }
  },


  on: {
    /* исправляет баг с margin-top остающимся при смене брейкпоинта */
    beforeResize: function () {
      this.slides.forEach((el) => {
        el.style.marginTop = "";
      });
    }
  }
});


ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    center: [55.765, 37.6],
    zoom: 14,
    controls: []
  },
    {superessMapOpenBlock: true
    
  });



  var myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: [55.76, 37.6]
    }
  });

  var myPlacemark = new ymaps.Placemark([55.76, 37.6], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/12-png.png',
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

//form
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


