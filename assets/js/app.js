class ItcAccordion {
    constructor(target, config) {
        this._el = typeof target === 'string' ? document.querySelector(target) : target;
        const defaultConfig = {
            alwaysOpen: true,
            duration: 450
        };
        this._config = Object.assign(defaultConfig, config);
        this.addEventListener();
    }
    addEventListener() {
        this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.accordion__header');
            if (!elHeader) {
                return;
            }
            if (!this._config.alwaysOpen) {
                const elOpenItem = this._el.querySelector('.accordion__item_show');
                if (elOpenItem) {
                    elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
                }
            }
            this.toggle(elHeader.parentElement);
        });
    }
    show(el) {
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
            return;
        }
        elBody.style['display'] = 'block';
        const height = elBody.offsetHeight;
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.add('collapsing');
        el.classList.add('accordion__item_slidedown');
        elBody.offsetHeight;
        elBody.style['height'] = `${height}px`;
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }
    hide(el) {
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
            return;
        }
        elBody.style['height'] = `${elBody.offsetHeight}px`;
        elBody.offsetHeight;
        elBody.style['display'] = 'block';
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.remove('collapse');
        el.classList.remove('accordion__item_show');
        elBody.classList.add('collapsing');
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }
    toggle(el) {
        el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tabs').forEach(tabsContainer => {
        const tabLinks = tabsContainer.querySelectorAll('.tab-link');
        const tabContents = tabsContainer.querySelectorAll('.tab-content');

        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const targetId = link.dataset.tab;

                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                link.classList.add('active');
                const targetContent = tabsContainer.querySelector(`#${targetId}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    });



});


document.querySelectorAll('.accordion').forEach((accordion) => {
    new ItcAccordion(accordion, {
        alwaysOpen: false
    });
});



function openVideo() {
    $('.video-popup').addClass('active');
    $('body').addClass('no-scroll');
}

function closeVideo() {
    $('.video-popup').removeClass('active');
    $('body').removeClass('no-scroll');
}

$('.video-popup__close-btn').on('click', closeVideo);

$('.video-page__item__play').on('click', openVideo);


function openFeedback() {
    $('.feedback-popup').addClass('active');
    $('.popup_background').addClass('active');
    $('body').addClass('no-scroll');
}

function closeFeedback() {
    $('.feedback-popup').removeClass('active');
    $('.popup_background').removeClass('active');
    $('body').removeClass('no-scroll');
}

$('.feedback-popup__close').on('click', closeFeedback);

$('.feedback-popup__open').on('click', openFeedback);


function openFilter() {
    $('.popup-filter').addClass('active');
    $('.popup_background').addClass('active');
    $('body').addClass('no-scroll');
}

function closeFilter() {
    $('.popup-filter').removeClass('active');
    $('.popup_background').removeClass('active');
    $('body').removeClass('no-scroll');
}

$('.popup-filter__close').on('click', closeFilter);

$('.popup-filter__open').on('click', openFilter);



const news_page__swiper = new Swiper('.news-page__swiper', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 12,

    speed: 600,

    navigation: {
        nextEl: '.news-page__swiper__next',
        prevEl: '.news-page__swiper__prev',
    },

    breakpoints: {
        768: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    }

});

const landscape_section__swiper = new Swiper('.landscape-section__swiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,

    speed: 600,

    navigation: {
        nextEl: '.landscape-section__swiper__next',
        prevEl: '.landscape-section__swiper__prev',
    },

    on: {
        init: function () {
            const navEl = document.querySelector('.landscape-section__swiper__navigation');
            updateNavigation(this, navEl);
        },
        slideChange: function () {
            const navEl = document.querySelector('.landscape-section__swiper__navigation');
            updateNavigation(this, navEl);
        }
    }

});

const two_section__swiper = new Swiper('.two-section__swiper', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 20,

    speed: 600,

    simulateTouch: true,
    allowTouchMove: true,

    mousewheel: true,

    breakpoints: {
        768: {
            slidesPerView: 1,
            spaceBetween: 60,
            simulateTouch: false,
            allowTouchMove: false,

            mousewheel: false,
        },
    }

});

const product_slider__swiper = new Swiper('.product-slider__swiper', {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 12,

    speed: 600,

    navigation: {
        nextEl: '.product-slider__swiper__next',
        prevEl: '.product-slider__swiper__prev',
    },

    breakpoints: {
        768: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    }

});

document.querySelectorAll('.product-advantages__tab-content').forEach((tabContent, index) => {
    const sliderEl = tabContent.querySelector('.product-advantages__swiper');
    const navEl = tabContent.querySelector('.product-advantages__slider-navigation');
    const prevBtn = tabContent.querySelector('.product-advantages__swiper__prev');
    const nextBtn = tabContent.querySelector('.product-advantages__swiper__next');

    if (!sliderEl || !navEl || !prevBtn || !nextBtn) return;

    const swiper = new Swiper(sliderEl, {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        speed: 800,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
        on: {
            init: function () {
                updateNavigation(this, navEl);
            },
            slideChange: function () {
                updateNavigation(this, navEl);
            }
        }
    });


});
document.querySelectorAll('.finishing-section__tab-content').forEach((tabContent, index) => {
    const sliderEl = tabContent.querySelector('.finishing-section__swiper');
    const navEl = tabContent.querySelector('.finishing-section__slider-navigation');
    const prevBtn = tabContent.querySelector('.finishing-section__swiper__prev');
    const nextBtn = tabContent.querySelector('.finishing-section__swiper__next');

    if (!sliderEl || !navEl || !prevBtn || !nextBtn) return;

    const swiper = new Swiper(sliderEl, {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        speed: 800,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
        on: {
            init: function () {
                updateNavigation(this, navEl);
            },
            slideChange: function () {
                updateNavigation(this, navEl);
            }
        }
    });


});

document.querySelectorAll('.sliderzoom-section__all').forEach((tabContent, index) => {
    const sliderEl = tabContent.querySelector('.sliderzoom-section__swiper');
    const navEl = tabContent.querySelector('.sliderzoom-section__slider-navigation');
    const prevBtn = tabContent.querySelector('.sliderzoom-section__swiper__prev');
    const nextBtn = tabContent.querySelector('.sliderzoom-section__swiper__next');

    if (!sliderEl || !navEl || !prevBtn || !nextBtn) return;

    const swiper = new Swiper(sliderEl, {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        speed: 800,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
        on: {
            init: function () {
                updateNavigation(this, navEl);
            },
            slideChange: function () {
                updateNavigation(this, navEl);
            }
        }
    });


});

document.querySelectorAll('.slide-section').forEach((tabContent, index) => {
    const sliderEl = tabContent.querySelector('.slide-section__swiper');
    const navEl = tabContent.querySelector('.slide-section__slider-navigation');
    const prevBtn = tabContent.querySelector('.slide-section__swiper__prev');
    const nextBtn = tabContent.querySelector('.slide-section__swiper__next');

    if (!sliderEl || !navEl || !prevBtn || !nextBtn) return;

    const swiper = new Swiper(sliderEl, {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        speed: 800,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
        on: {
            init: function () {
                updateNavigation(this, navEl);
            },
            slideChange: function () {
                updateNavigation(this, navEl);
            }
        }
    });


});

function updateNavigation(swiperInstance, navElement) {
    const current = swiperInstance.realIndex + 1;
    const total = swiperInstance.el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;

    const formattedCurrent = current.toString().padStart(2, '0');
    const formattedTotal = total.toString().padStart(2, '0');

    navElement.textContent = `${formattedCurrent}-${formattedTotal}`;
}



document.querySelectorAll('.catalog__filter__sort').forEach(sortBlock => {
    const btn = sortBlock.querySelector('.catalog__filter__sort__btn');
    const radios = sortBlock.querySelectorAll('input[type="radio"]');

    btn.addEventListener('click', () => {
        document.querySelectorAll('.catalog__filter__sort.active').forEach(activeBlock => {
            if (activeBlock !== sortBlock) {
                activeBlock.classList.remove('active');
            }
        });
        sortBlock.classList.toggle('active');
    });

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                btn.textContent = radio.value;
                sortBlock.classList.remove('active');
            }
        });
    });
});

document.addEventListener('click', (e) => {
    document.querySelectorAll('.catalog__filter__sort').forEach(sortBlock => {
        if (!sortBlock.contains(e.target)) {
            sortBlock.classList.remove('active');
        }
    });
});


document.querySelectorAll('.choosing-header__slider').forEach((sliderBlock) => {
    const rangeInput = sliderBlock.querySelectorAll(".range-input input"),
        priceInput = sliderBlock.querySelectorAll(".price-input span"),
        range = sliderBlock.querySelector(".slider .progress");

    const priceGap = 1;

    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minVal = parseInt(rangeInput[0].value),
                maxVal = parseInt(rangeInput[1].value),
                minRange = parseInt(rangeInput[0].min),
                maxRange = parseInt(rangeInput[0].max);

            if (maxVal - minVal < priceGap) {
                if (e.target.classList.contains("range-min")) {
                    rangeInput[0].value = maxVal - priceGap;
                    minVal = maxVal - priceGap;
                } else {
                    rangeInput[1].value = minVal + priceGap;
                    maxVal = minVal + priceGap;
                }
            }

            priceInput[0].textContent = minVal;
            priceInput[1].textContent = maxVal;
            range.style.left = ((minVal - minRange) / (maxRange - minRange)) * 100 + "%";
            range.style.right = 100 - ((maxVal - minRange) / (maxRange - minRange)) * 100 + "%";
        });
    });
});
