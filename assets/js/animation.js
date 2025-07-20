document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function () {
        $(".title__animation .title").lettering();
    });

    const wrap = document.querySelector('.parking-section__wrap');

    if (window.innerWidth <= 768 && wrap && wrap.scrollWidth > wrap.clientWidth) {
        wrap.scrollLeft = (wrap.scrollWidth - wrap.clientWidth) / 2;
    }

    let percent = 0;
    const percentEl = document.getElementById("preloader-percent");
    const preview = document.querySelector(".preloader");

    const heroImage = document.querySelector(".hero__background");
    // const heroTitle = document.querySelector(".hero__title");


    const headerBtn = document.querySelector(".main-header__btn");
    const headerTel = document.querySelector(".main-header__tel");

    setTimeout(() => {
        const interval = setInterval(() => {
            percent++;
            percentEl.textContent = `${percent}%`;

            if (percent >= 100) {
                clearInterval(interval);

                setTimeout(() => {
                    preview.classList.add("hide");

                    setTimeout(() => {
                        heroImage.classList.add("zoomed");
                        headerBtn.classList.add("visible");
                        headerTel.classList.add("visible");
                        animation(slides[currentSlide], 'down');
                    }, 1400);

                }, 400);
            }
        }, 25);
    }, 200);

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isAnimating = false;

    function lockScroll() {
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
    }

    function unlockScroll() {
        window.removeEventListener('wheel', preventScroll, { passive: false });
        window.removeEventListener('touchmove', preventScroll, { passive: false });
    }

    function preventScroll(e) {
        e.preventDefault();
    }


    function updateURL(slideIndex, scrollTop = 0) {
        const url = new URL(window.location);
        url.searchParams.set('slide', slideIndex);
        url.searchParams.set('scroll', Math.round(scrollTop));
        window.history.replaceState(null, '', url.toString());
    }

    function zoomIn(slide) {
        const img = slide.querySelector('.imgzoom__img-animation');
        const text = slide.querySelector('.imgzoom__text-animation');
        const title = slide.querySelector('.imgzoom__title-animation');

        if (!img) return Promise.resolve();

        slide.dataset.zoomedImg = 'true';

        return new Promise((resolve) => {
            gsap.to(img, {
                duration: 1,
                width: '100vw',
                height: '100vh',
                ease: 'none'
            });

            gsap.to([text, title], {
                duration: 1,
                opacity: 0,
                ease: 'power1.out',
                onComplete: () => {
                    if (text) text.style.pointerEvents = 'none';
                    if (title) title.style.pointerEvents = 'none';
                    resolve();
                }
            });
        });
    }

    function zoomOut(slide) {
        const img = slide.querySelector('.imgzoom__img-animation');
        const text = slide.querySelector('.imgzoom__text-animation');
        const title = slide.querySelector('.imgzoom__title-animation');

        if (!img) return Promise.resolve();

        if (text) text.style.pointerEvents = '';
        if (title) title.style.pointerEvents = '';

        const targetWidth = img.dataset.width;
        const targetHeight = img.dataset.height;

        return new Promise((resolve) => {
            gsap.to(img, {
                duration: 1,
                width: targetWidth,
                height: targetHeight,
                ease: 'none',
                onComplete: () => {
                    slide.dataset.zoomedImg = 'false';
                    resolve();
                }
            });

            gsap.to([text, title], {
                duration: 1,
                opacity: 1,
                ease: 'power1.out',
            });
        });
    }


    function resetZoom(slide) {
        const img = slide.querySelector('.imgzoom__img-animation');
        const text = slide.querySelector('.imgzoom__text-animation');
        const title = slide.querySelector('.imgzoom__title-animation');

        if (img) {
            const targetWidth = img.dataset.width;
            const targetHeight = img.dataset.height;
            gsap.set(img, { width: targetWidth, height: targetHeight });
        }

        if (text) {
            text.style.opacity = '1';
            text.style.pointerEvents = '';
        }
    }


    function zoomSliderIn(slide) {
        const slider = slide.querySelector('.sliderzoom__slider-animation');
        const subtitle = slide.querySelector('.sliderzoom__subtitle-animation');
        const content = slide.querySelector('.sliderzoom__content-animation');
        const nav = slide.querySelector('.sliderzoom__nav-animation');

        if (!slider) return Promise.resolve();

        slide.dataset.sliderZoomed = 'true';

        return new Promise((resolve) => {
            const tl = gsap.timeline({ onComplete: resolve });

            tl.to(slider, {
                duration: 1,
                width: '100vw',
                height: '100vh',
                ease: 'power1.inOut'
            });

            tl.to([subtitle, content], {
                duration: 0.8,
                opacity: 0,
                ease: 'power1.out',
                onStart: () => {
                    if (subtitle) subtitle.style.pointerEvents = 'none';
                    if (content) content.style.pointerEvents = 'none';
                }
            }, '<');

            tl.to(nav, {
                duration: 0.6,
                opacity: 1,
                ease: 'power1.out',
                onStart: () => {
                    if (nav) nav.style.pointerEvents = 'auto';
                }
            });
        });
    }


    function zoomSliderOut(slide) {
        const slider = slide.querySelector('.sliderzoom__slider-animation');
        const subtitle = slide.querySelector('.sliderzoom__subtitle-animation');
        const content = slide.querySelector('.sliderzoom__content-animation');
        const nav = slide.querySelector('.sliderzoom__nav-animation');

        if (!slider) return Promise.resolve();

        const targetWidth = slider.dataset.width;
        const targetHeight = slider.dataset.height;

        return new Promise((resolve) => {
            const tl = gsap.timeline({
                onComplete: () => {
                    slide.dataset.sliderZoomed = 'false';
                    resolve();
                }
            });

            tl.to(nav, {
                duration: 0.5,
                opacity: 0,
                ease: 'power1.in',
                onComplete: () => {
                    if (nav) nav.style.pointerEvents = 'none';
                }
            });

            tl.to(slider, {
                duration: 1,
                width: targetWidth,
                height: targetHeight,
                ease: 'power1.inOut'
            });

            tl.to([subtitle, content], {
                duration: 0.6,
                opacity: 1,
                ease: 'power1.out',
                onStart: () => {
                    if (subtitle) subtitle.style.pointerEvents = '';
                    if (content) content.style.pointerEvents = '';
                }
            }, '<');
        });
    }



    function resetSliderZoom(slide) {
        const slider = slide.querySelector('.sliderzoom__slider-animation');
        const subtitle = slide.querySelector('.sliderzoom__subtitle-animation');
        const content = slide.querySelector('.sliderzoom__content-animation');
        const nav = slide.querySelector('.sliderzoom__nav-animation');

        if (slider) {
            const targetWidth = slider.dataset.width;
            const targetHeight = slider.dataset.height;
            gsap.set(slider, { width: targetWidth, height: targetHeight });
        }


        if (content) {
            content.style.display = '';
            content.style.opacity = '1';
            content.style.pointerEvents = '';
        }

        if (nav) {
            nav.style.opacity = '0';
            nav.style.pointerEvents = 'none';
        }
    }


    function zoomSliderIn2(slide) {
        const slider = slide.querySelector('.sliderzoom__slider-animation2');
        const subtitle = slide.querySelector('.sliderzoom__subtitle-animation2');
        const content = slide.querySelector('.sliderzoom__content-animation2');
        const navs = slide.querySelectorAll('.sliderzoom__nav-animation2');

        if (!slider) return Promise.resolve();

        slide.dataset.sliderZoomed2 = 'true';

        return new Promise((resolve) => {
            const tl = gsap.timeline({ onComplete: resolve });

            tl.to(slider, {
                duration: 1,
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                ease: 'power1.inOut',
                onStart: () => {
                    slider.style.pointerEvents = 'auto';
                }
            });

            tl.to([subtitle, content], {
                duration: 0.8,
                opacity: 0,
                ease: 'power1.out',
                onStart: () => {
                    if (subtitle) subtitle.style.pointerEvents = 'none';
                    if (content) content.style.pointerEvents = 'none';
                }
            }, '<');

            tl.to(navs, {
                duration: 0.6,
                opacity: 1,
                ease: 'power1.out',
                onStart: () => {
                    navs.forEach(nav => {
                        nav.style.pointerEvents = 'auto';
                    });
                }
            });
        });
    }


    function zoomSliderOut2(slide) {
        const slider = slide.querySelector('.sliderzoom__slider-animation2');
        const subtitle = slide.querySelector('.sliderzoom__subtitle-animation2');
        const content = slide.querySelector('.sliderzoom__content-animation2');
        const navs = slide.querySelectorAll('.sliderzoom__nav-animation2');

        if (!slider) return Promise.resolve();

        const targetLeft = slider.dataset.left || '';
        const targetTop = slider.dataset.top || '';
        const targetRight = slider.dataset.right || '';
        const targetBottom = slider.dataset.bottom || '';
        const targetWidth = slider.dataset.width || '';
        const targetHeight = slider.dataset.height || '';

        return new Promise((resolve) => {
            const tl = gsap.timeline({
                onComplete: () => {
                    slide.dataset.sliderZoomed2 = 'false';
                    resolve();
                }
            });

            tl.to(navs, {
                duration: 0.5,
                opacity: 0,
                ease: 'power1.in',
                onComplete: () => {
                    navs.forEach(nav => {
                        nav.style.pointerEvents = 'none';
                    });
                }
            });

            tl.to(slider, {
                duration: 1,
                left: targetLeft,
                top: targetTop,
                right: targetRight,
                bottom: targetBottom,
                width: targetWidth,
                height: targetHeight,
                ease: 'power1.inOut',
                onComplete: () => {
                    slider.style.pointerEvents = 'none';
                }
            });

            tl.to([subtitle, content], {
                duration: 0.6,
                opacity: 1,
                ease: 'power1.out',
                onStart: () => {
                    if (subtitle) subtitle.style.pointerEvents = 'auto';
                    if (content) content.style.pointerEvents = 'auto';
                }
            }, '<');
        });
    }


    function resetSliderZoom2(slide) {
        const slider = slide.querySelector('.sliderzoom__slider-animation2');
        const subtitle = slide.querySelector('.sliderzoom__subtitle-animation2');
        const content = slide.querySelector('.sliderzoom__content-animation2');
        const navs = slide.querySelectorAll('.sliderzoom__nav-animation2');

        if (slider) {
            const targetLeft = slider.dataset.left || '';
            const targetTop = slider.dataset.top || '';
            const targetRight = slider.dataset.right || '';
            const targetBottom = slider.dataset.bottom || '';
            const targetWidth = slider.dataset.width || '';
            const targetHeight = slider.dataset.height || '';

            gsap.set(slider, {
                left: targetLeft,
                top: targetTop,
                right: targetRight,
                bottom: targetBottom,
                width: targetWidth,
                height: targetHeight
            });

            slider.style.pointerEvents = 'none';
        }


        if (content) {
            content.style.display = '';
            content.style.opacity = '1';
            content.style.pointerEvents = 'auto';
        }

        navs.forEach(nav => {
            nav.style.opacity = '0';
            nav.style.pointerEvents = 'none';
        });
    }

    function goToSlide(nextIndex, direction) {
        if (isAnimating || nextIndex === currentSlide || nextIndex < 0 || nextIndex >= slides.length) return;

        isAnimating = true;
        lockScroll();

        const current = slides[currentSlide];
        const next = slides[nextIndex];

        if (next.querySelector('.imgzoom-section__animation') && next.dataset.zoomedImg !== 'true') {
            resetZoom(next);
        }

        if (next.querySelector('.sliderzoom-section__animation') && next.dataset.zoomedSlider !== 'true') {
            resetSliderZoom(next);
        }
        if (next.querySelector('.sliderzoom-section__animation2') && next.dataset.zoomedSlider2 !== 'true') {
            resetSliderZoom2(next);
        }

        if (direction === 'down') {
            gsap.set(next, {
                position: 'fixed',
                top: '100vh',
                left: 0,
                width: '100%',
                zIndex: 20,
                pointerEvents: 'auto'
            });

            next.scrollTop = 0;

            gsap.set(current, {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 10,
                pointerEvents: 'none'
            });

            gsap.to(next, {
                duration: 1,
                top: 0,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.set(current, { zIndex: 0 });
                    currentSlide = nextIndex;
                    updateURL(currentSlide, next.scrollTop);
                    isAnimating = false;
                    unlockScroll();
                    ScrollTrigger.refresh(true);
                    animation(next, direction);
                }
            });

        } else {
            gsap.set(next, {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 10,
                pointerEvents: 'auto'
            });

            next.scrollTop = next.scrollHeight - next.clientHeight;

            gsap.set(current, {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 20,
                pointerEvents: 'none'
            });

            gsap.to(current, {
                duration: 1,
                top: '100vh',
                ease: 'power2.out',
                onComplete: () => {
                    gsap.set(current, { zIndex: 0 });
                    currentSlide = nextIndex;
                    updateURL(currentSlide, next.scrollTop);
                    isAnimating = false;
                    unlockScroll();
                    ScrollTrigger.refresh(true);
                }
            });
        }
    }
    document.querySelectorAll('.slide').forEach(slide => {
        const sections = slide.querySelectorAll('.section-count__animation');

        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 80%',
                once: true,
                scroller: slide,
                onEnter: () => {
                    section.querySelectorAll('.item-count__animation .value').forEach(el => {
                        const finalValue = parseInt(el.dataset.value, 10);
                        el.textContent = '0';

                        gsap.fromTo(el,
                            { innerText: 0 },
                            {
                                innerText: finalValue,
                                duration: 2.5,
                                ease: 'expo.out',
                                snap: { innerText: 1 },
                                onUpdate() {
                                    el.textContent = Math.floor(el.innerText);
                                }
                            }
                        );
                    });
                }
            });
        });
    });
    if (window.innerWidth > 768) {
        ScrollTrigger.config({
            ignoreMobileResize: true
        });













        window.addEventListener('load', () => {
            const params = new URLSearchParams(window.location.search);
            const slideParam = parseInt(params.get('slide'), 10);
            const scrollParam = parseInt(params.get('scroll'), 10);

            currentSlide = (!isNaN(slideParam) && slideParam >= 0 && slideParam < slides.length) ? slideParam : 0;

            slides.forEach((slide, idx) => {
                if (idx === currentSlide) {
                    gsap.set(slide, {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 10,
                        pointerEvents: 'auto'
                    });
                    if (!isNaN(scrollParam)) {
                        slide.scrollTop = scrollParam;
                    }
                } else {
                    gsap.set(slide, {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 0,
                        pointerEvents: 'none'
                    });
                }
                const titles = slide.querySelectorAll('.title__animation');
                if (titles.length) {
                    if (idx < currentSlide) {
                        titles.forEach(title => {
                            title.style.opacity = '1';
                            title.style.pointerEvents = 'auto';
                        });
                    } else {
                        titles.forEach(title => {
                            title.style.opacity = '0';
                            title.style.pointerEvents = 'none';
                        });
                    }
                }
                const zoom = slide.querySelector('.imgzoom-section__animation');
                if (zoom) {
                    if (idx < currentSlide) {
                        slide.dataset.zoomedImg = 'true';
                        const img = slide.querySelector('.imgzoom__img-animation');
                        if (img) gsap.set(img, { width: '100vw', height: '100vh' });
                        const text = slide.querySelector('.imgzoom__text-animation');
                        const title = slide.querySelector('.imgzoom__title-animation');
                        if (text) {
                            text.style.opacity = '0';
                            text.style.pointerEvents = 'none';
                        }
                        if (title) {
                            title.style.opacity = '0';
                            title.style.pointerEvents = 'none';
                        }
                    } else {
                        slide.dataset.zoomedImg = 'false';
                        resetZoom(slide);
                    }
                }

                const zoomSlider = slide.querySelector('.sliderzoom-section__animation');
                if (zoomSlider) {
                    if (idx < currentSlide) {
                        slide.dataset.zoomedSlider = 'true';
                        const slider = slide.querySelector('.sliderzoom__slider-animation');
                        if (slider) gsap.set(slider, { width: '100vw', height: '100vh' });
                        const subtitle = slide.querySelector('.sliderzoom__subtitle-animation');
                        const content = slide.querySelector('.sliderzoom__content-animation');
                        const nav = slide.querySelector('.sliderzoom__nav-animation');
                        if (subtitle) {
                            subtitle.style.opacity = '0';
                            subtitle.style.pointerEvents = 'none';
                        }
                        if (content) {
                            content.style.opacity = '0';
                            content.style.pointerEvents = 'none';
                        }
                        if (nav) gsap.set(nav, { opacity: 1 });
                    } else {
                        slide.dataset.zoomedSlider = 'false';
                        resetSliderZoom(slide);
                    }
                }
                const zoomSlider2 = slide.querySelector('.sliderzoom-section__animation2');
                if (zoomSlider2) {
                    if (idx < currentSlide) {
                        slide.dataset.zoomedSlider2 = 'true';
                        const slider2 = slide.querySelector('.sliderzoom__slider-animation2');
                        if (slider2) gsap.set(slider2, { width: '100vw', height: '100vh' });
                        const subtitle2 = slide.querySelector('.sliderzoom__subtitle-animation2');
                        const content2 = slide.querySelector('.sliderzoom__content-animation2');
                        const nav2 = slide.querySelector('.sliderzoom__nav-animation2');
                        if (subtitle2) {
                            subtitle2.style.opacity = '0';
                            subtitle2.style.pointerEvents = 'none';
                        }
                        if (content2) {
                            content2.style.opacity = '0';
                            content2.style.pointerEvents = 'none';
                        }
                        if (nav2) gsap.set(nav2, { opacity: 1 });
                    } else {
                        slide.dataset.zoomedSlider2 = 'false';
                        resetSliderZoom2(slide);
                    }
                }

                const slickSlider = slide.querySelector('.slickSlider-section__swiper');

                if (slickSlider) {
                    if (idx < currentSlide) {
                        slide.dataset.slickSlider = 'true';

                        requestAnimationFrame(() => {
                            if (slickSlider.swiper) {
                                const lastIndex = slickSlider.swiper.slides.length - 1;
                                slickSlider.swiper.slideTo(lastIndex, 0);
                            }
                        });
                    } else {
                        slide.dataset.slickSlider = 'false';

                        requestAnimationFrame(() => {
                            if (slickSlider.swiper) {
                                slickSlider.swiper.slideTo(0, 0);
                            }
                        });
                    }
                }


            });

            updateURL(currentSlide, slides[currentSlide].scrollTop);

        });


        window.addEventListener('wheel', (e) => {

            if (isAnimating) {
                e.preventDefault();
                return;
            }

            const current = slides[currentSlide];
            if (!current) {
                return;
            }

            const deltaY = e.deltaY;

            const scrollTop = current.scrollTop;
            const scrollHeight = current.scrollHeight;
            const offsetHeight = current.offsetHeight;

            const isScrollable = scrollHeight > offsetHeight;

            const isZoomImg = current.querySelector('.imgzoom-section__animation') !== null;
            const isZoomSlider = current.querySelector('.sliderzoom-section__animation') !== null;
            const isZoomSlider2 = current.querySelector('.sliderzoom-section__animation2') !== null;

            const isZoomedImg = current.dataset.zoomedImg === 'true';
            const isZoomedSlider = current.dataset.zoomedSlider === 'true';
            const isZoomedSlider2 = current.dataset.zoomedSlider2 === 'true';

            const swiperInstance = current.querySelector('.slickSlider-section__swiper')?.swiper;

            if (deltaY > 0) {

                if (swiperInstance && isScrollable && (scrollTop + offsetHeight < scrollHeight - 5)) {
                    return;
                }

                if (swiperInstance && !swiperInstance.isEnd) {
                    isAnimating = true;
                    e.preventDefault();

                    const current = slides[currentSlide];
                    if (current) {
                        current.style.overflowY = 'hidden';
                    }

                    swiperInstance.slideNext();

                    setTimeout(() => {
                        isAnimating = false;
                        const current = slides[currentSlide];
                        if (current) {
                            current.style.overflowY = 'scroll';
                        }
                        updateURL(currentSlide, current.scrollTop);
                    }, swiperInstance.params.speed + 50);

                    return;
                }

                if (isZoomImg && !isZoomedImg) {
                    isAnimating = true;
                    lockScroll();
                    e.preventDefault();
                    zoomIn(current).then(() => {
                        current.dataset.zoomedImg = 'true';
                        isAnimating = false;
                        unlockScroll();
                        updateURL(currentSlide, current.scrollTop);
                    });
                    return;
                }

                if (isZoomSlider && !isZoomedSlider) {
                    isAnimating = true;
                    lockScroll();
                    e.preventDefault();
                    zoomSliderIn(current).then(() => {
                        current.dataset.zoomedSlider = 'true';
                        isAnimating = false;
                        unlockScroll();
                        updateURL(currentSlide, current.scrollTop);
                    });
                    return;
                }

                if (isZoomSlider2 && !isZoomedSlider2 && scrollTop + offsetHeight >= scrollHeight - 5) {
                    isAnimating = true;
                    lockScroll();
                    e.preventDefault();
                    zoomSliderIn2(current).then(() => {
                        current.dataset.zoomedSlider2 = 'true';
                        isAnimating = false;
                        unlockScroll();
                        updateURL(currentSlide, current.scrollTop);
                    });
                    return;
                }

                if (isScrollable && scrollTop + offsetHeight < scrollHeight - 5) {
                    return;
                } else {
                    goToSlide(currentSlide + 1, 'down');
                    animation(slides[currentSlide]);
                }
            }

            if (deltaY < 0) {

                if (swiperInstance) {
                    if (!swiperInstance.isBeginning) {
                        e.preventDefault();
                        isAnimating = true;

                        const current = slides[currentSlide];
                        if (current) {
                            current.style.overflowY = 'hidden';
                        }

                        swiperInstance.slidePrev();

                        setTimeout(() => {
                            isAnimating = false;
                            const current = slides[currentSlide];
                            if (current) {
                                current.style.overflowY = 'scroll';
                            }
                            updateURL(currentSlide, current.scrollTop);
                        }, swiperInstance.params.speed + 50);

                        return;
                    }

                    if (scrollTop > 5) {
                        return;
                    }
                }


                if (isZoomImg && isZoomedImg) {
                    isAnimating = true;
                    lockScroll();
                    e.preventDefault();
                    zoomOut(current).then(() => {
                        current.dataset.zoomedImg = 'false';
                        isAnimating = false;
                        unlockScroll();
                        updateURL(currentSlide, current.scrollTop);
                    });
                    return;
                }

                if (isZoomSlider && isZoomedSlider) {
                    isAnimating = true;
                    lockScroll();
                    e.preventDefault();
                    zoomSliderOut(current).then(() => {
                        current.dataset.zoomedSlider = 'false';
                        isAnimating = false;
                        unlockScroll();
                        updateURL(currentSlide, current.scrollTop);
                    });
                    return;
                }

                if (isZoomSlider2 && isZoomedSlider2) {
                    isAnimating = true;
                    lockScroll();
                    e.preventDefault();
                    zoomSliderOut2(current).then(() => {
                        current.dataset.zoomedSlider2 = 'false';
                        isAnimating = false;
                        unlockScroll();
                        updateURL(currentSlide, current.scrollTop);
                    });
                    return;
                }

                if (isScrollable && scrollTop > 5) {
                    return;
                } else {
                    goToSlide(currentSlide - 1, 'up');
                }
            }
        }, { passive: false });





        slides.forEach((slide, index) => {
            slide.addEventListener('scroll', () => {
                if (index === currentSlide) {
                    updateURL(currentSlide, slide.scrollTop);
                }
            });
        });




        const infoBox = document.querySelector(".floor-section__info");
        const paths = document.querySelectorAll(".floor-section__floor svg path");

        paths.forEach(path => {
            path.addEventListener("mouseenter", (e) => {
                infoBox.style.display = "block";
            });

            path.addEventListener("mousemove", (e) => {
                const offsetX = 10;
                const offsetY = 20;
                infoBox.style.left = `${e.pageX + offsetX}px`;
                infoBox.style.top = `${e.pageY + offsetY}px`;
            });

            path.addEventListener("mouseleave", () => {
                infoBox.style.display = "none";
            });
        });
    }

    function animation(slide, direction) {
        if (slide.dataset.animated === 'true' || direction !== 'down') return;

        const heroTitles = slide.querySelectorAll(".title__animation");
        if (heroTitles.length) {
            heroTitles.forEach(title => {
                gsap.to(title, { opacity: 1, duration: 0 });
            });
        }

        heroTitles.forEach(title => {
            const titleSpans = title.querySelectorAll("span");
            if (titleSpans.length) {
                const titleTimeline = new TimelineMax();
                titleTimeline.staggerFromTo(
                    titleSpans,
                    0.5,
                    { ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80 },
                    { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 },
                    0.05
                );
            }
        });

        slide.dataset.animated = 'true';
    }

    const block = document.querySelector('.product-hero__left__content');
    const openBtn = document.querySelector('.product-hero__left__open-btn');
    const closeBtn = document.querySelector('.product-hero__left__close-btn');

    let isFullscreen = false;
    let rect = null;
    let originalStyles = {};

    function openFullscreen() {
        rect = block.getBoundingClientRect();

        originalStyles = {
            position: block.style.position,
            top: block.style.top,
            left: block.style.left,
            width: block.style.width,
            height: block.style.height,
            padding: block.style.padding,
        };

        block.style.position = 'fixed';
        block.style.top = rect.top + 'px';
        block.style.left = rect.left + 'px';
        block.style.width = rect.width + 'px';
        block.style.height = rect.height + 'px';

        block.classList.add('fullscreen');
        document.body.classList.add('no-scroll');

        openBtn.style.display = 'none';
        closeBtn.style.display = 'flex';

        requestAnimationFrame(() => {
            block.style.top = '0';
            block.style.left = '0';
            block.style.width = '100vw';
            block.style.height = '100vh';
            block.style.padding = '2.5rem 8.75rem 5.625rem';
        });

        isFullscreen = true;
    }

    function closeFullscreen() {
        block.style.padding = originalStyles.padding;

        block.style.top = rect.top + 'px';
        block.style.left = rect.left + 'px';
        block.style.width = rect.width + 'px';
        block.style.height = rect.height + 'px';

        document.body.classList.remove('no-scroll');

        closeBtn.style.display = 'none';
        openBtn.style.display = 'flex';

        setTimeout(() => {
            block.classList.remove('fullscreen');

            block.style.position = originalStyles.position;
            block.style.top = originalStyles.top;
            block.style.left = originalStyles.left;
            block.style.width = originalStyles.width;
            block.style.height = originalStyles.height;
            block.style.padding = originalStyles.padding;

            isFullscreen = false;
        }, 600);
    }

    openBtn.addEventListener('click', openFullscreen);
    closeBtn.addEventListener('click', closeFullscreen);



});