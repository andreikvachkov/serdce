document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function () {
        $(".title").lettering();
    });

    let percent = 0;
    const percentEl = document.getElementById("preloader-percent");
    const preview = document.querySelector(".preloader");

    const heroImage = document.querySelector(".hero__background");
    const heroTitle = document.querySelector(".hero__title");


    const headerLogo = document.querySelector(".main-header__logo");
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
                        animation();

                        headerLogo.classList.add("visible");
                        headerBtn.classList.add("visible");
                        headerTel.classList.add("visible");
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
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
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
        const img = slide.querySelector('.imgzoom-section__img');
        const text = slide.querySelector('.imgzoom-section__text');
        const title = slide.querySelector('.imgzoom-section__title');

        if (!img) return Promise.resolve();

        slide.dataset.zoomed = 'true';

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
        const img = slide.querySelector('.imgzoom-section__img');
        const text = slide.querySelector('.imgzoom-section__text');
        const title = slide.querySelector('.imgzoom-section__title');

        if (!img) return Promise.resolve();

        if (text) text.style.pointerEvents = '';
        if (title) title.style.pointerEvents = '';

        return new Promise((resolve) => {
            gsap.to(img, {
                duration: 1,
                width: '54.4375rem',
                height: '35.4375rem',
                ease: 'none',
                onComplete: () => {
                    slide.dataset.zoomed = 'false';
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
        const img = slide.querySelector('.imgzoom-section__img');
        const text = slide.querySelector('.imgzoom-section__text');
        const title = slide.querySelector('.imgzoom-section__title');

        if (img) gsap.set(img, { width: '54.4375rem', height: '35.4375rem' });
        if (text) text.style.display = '';
        if (title) title.style.display = '';
    }

    function goToSlide(nextIndex, direction) {
        if (isAnimating || nextIndex === currentSlide || nextIndex < 0 || nextIndex >= slides.length) return;

        isAnimating = true;
        lockScroll();

        const current = slides[currentSlide];
        const next = slides[nextIndex];

        if (next.dataset.zoomed !== 'true') {
            resetZoom(next);
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
                }
            });
        }
    }



    


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

            const zoom = slide.querySelector('.imgzoom-section');
            if (zoom && idx < currentSlide) {
                slide.dataset.zoomed = 'true';
                const img = slide.querySelector('.imgzoom-section__img');
                if (img) gsap.set(img, { width: '100vw', height: '100vh' });
                const text = slide.querySelector('.imgzoom-section__text');
                const title = slide.querySelector('.imgzoom-section__title');
                if (text) text.style.display = 'none';
                if (title) title.style.display = 'none';
            } else {
                slide.dataset.zoomed = 'false';
                resetZoom(slide);
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
        const deltaY = e.deltaY;

        const scrollTop = current.scrollTop;
        const scrollHeight = current.scrollHeight;
        const offsetHeight = current.offsetHeight;

        const isScrollable = scrollHeight > offsetHeight;
        const isZoomSlide = current.querySelector('.imgzoom-section') !== null;
        const isZoomed = current.dataset.zoomed === 'true';

        if (deltaY > 0) {
            if (isZoomSlide && !isZoomed) {
                isAnimating = true;
                lockScroll();
                e.preventDefault();
                zoomIn(current).then(() => {
                    isAnimating = false;
                    unlockScroll();
                    updateURL(currentSlide, current.scrollTop);
                });
                return;
            }

            if (isScrollable && scrollTop + offsetHeight < scrollHeight - 5) return;

            goToSlide(currentSlide + 1, 'down');

        } else if (deltaY < 0) {
            if (isZoomSlide && isZoomed) {
                isAnimating = true;
                lockScroll();
                e.preventDefault();
                zoomOut(current).then(() => {
                    isAnimating = false;
                    unlockScroll();
                    updateURL(currentSlide, current.scrollTop);
                });
                return;
            }

            if (isScrollable && scrollTop > 5) return;

            goToSlide(currentSlide - 1, 'up');
        }
    });
    

    slides.forEach((slide, index) => {
        slide.addEventListener('scroll', () => {
            if (index === currentSlide) {
                updateURL(currentSlide, slide.scrollTop);
            }
        });
    });






    document.querySelectorAll('.section-count__animation').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                section.querySelectorAll('.item-count__animation .value').forEach(el => {
                    const finalValue = parseInt(el.dataset.value, 10);

                    el.textContent = '0';

                    gsap.fromTo(el,
                        { innerText: 0 },
                        {
                            innerText: finalValue,
                            duration: 4.5,
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


function animation() {
    const heroTitle = document.querySelector(".hero__title");
    gsap.to(heroTitle, { opacity: 1, duration: 0 });

    var title1 = new TimelineMax();

    title1.staggerFromTo(".title span", 0.5,
        { ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80 },
        { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 },
        0.05
    );
}











// const SWIPE_THRESHOLD = 30;
// const mainSections = Array.from(document.querySelectorAll('.section-animation'));
// const lastSection = mainSections[mainSections.length - 1];
// let touchStartY = 0;
// let lastTouchY = 0;
// let touchDirection = 0;
// let isSnapping = false;
// let currentSnapTween = null;
// let snapTweenStartTime = null;
// let currentTargetIndex = -1;
// let snapperActive = true;

// function isMobileDevice() {
//     return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
// }

// function setViewportHeight() {
//     const vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty('--vh', vh + 'px');
//     ScrollTrigger.refresh();
//     if (isSnapping && currentTargetIndex >= 0) touchSnapToTarget(currentTargetIndex);
// }

// function touchSnapToTarget(targetIndex) {
//     const panelTops = mainSections.map(section => section.offsetTop);
//     if (targetIndex == null) {
//         const scroll = Math.round(window.scrollY);
//         let currentIndex = panelTops.findIndex(top => scroll < top);
//         if (currentIndex == -1) {
//             currentIndex = panelTops.length;
//             if (touchDirection > 0 || scroll > lastSection.offsetTop + lastSection.offsetHeight) {
//                 return;
//             }
//         }

//         currentIndex--;
//         targetIndex = Math.min(Math.max(currentIndex + touchDirection, 0), panelTops.length - 1);
//     }

//     currentTargetIndex = targetIndex;
//     const target = panelTops[currentTargetIndex];
//     if (target !== scroll) {
//         snapTo(target, 0.3, 0, true);
//     }
// }

// function snapTo(targetY, duration, resetDelay, blockOverflow = false, pauseScrollTrigger = false) {
//     if (currentSnapTween?.isActive()) {
//         currentSnapTween.kill();
//         duration = Math.max(0, duration - (Date.now() - snapTweenStartTime) / 1000);
//     }

//     isSnapping = true;
//     const isForward = targetY > window.scrollY;
//     if (blockOverflow) {
//         document.body.style.overflow = 'hidden';
//         setTimeout(() => {
//             document.body.style.overflow = '';
//         }, duration);
//     }

//     if (pauseScrollTrigger) ScrollTrigger.disable();
//     snapTweenStartTime = Date.now();
//     currentSnapTween = gsap.to(window, {
//         scrollTo: targetY,
//         duration: duration,
//         ease: 'power1.inOut',
//         onComplete: () => {
//             if (pauseScrollTrigger) {
//                 ScrollTrigger.enable();
//             }

//             setTimeout(() => {
//                 isSnapping = false;
//             }, resetDelay * 1000);
//         }
//     });
// }

// if (isMobileDevice()) {
//     setViewportHeight();
//     window.addEventListener('resize', setViewportHeight);
//     window.addEventListener('orientationchange', setViewportHeight);
// }

// window.addEventListener('touchstart', (e) => {
//     if (isSnapping) {
//         if (e.cancelable) e.preventDefault();
//         return;
//     }
//     touchStartY = lastTouchY = e.touches[0].clientY;
//     touchDirection = 0;
// }, { passive: false });

// window.addEventListener('touchmove', (e) => {
//     const currentY = e.touches[0].clientY;
//     const delta = lastTouchY - currentY;
//     if (Math.abs(delta) > 5) {
//         touchDirection = delta > 0 ? 1 : 0;
//     }

//     lastTouchY = currentY;
//     if (isSnapping && e.cancelable) e.preventDefault();
// }, { passive: false });

// window.addEventListener('touchend', (e) => {
//     if (isSnapping) {
//         if (e.cancelable) e.preventDefault();
//         return;
//     }

//     const deltaY = touchStartY - e.changedTouches[0].clientY;
//     if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
//     touchSnapToTarget();
// }, { passive: false });

// window.addEventListener('keydown', (e) => {
//     if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) {
//         const panelTops = mainSections.map(section => section.offsetTop);
//         const scroll = Math.round(window.scrollY);
//         const direction = e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 :
//             e.key === 'ArrowUp' || e.key === 'PageUp' ? -1 :
//                 e.key === 'Home' ? -Infinity :
//                     e.key === 'End' ? Infinity : 0;
//         let currentIndex = panelTops.findIndex(top => scroll + (direction > 0 ? 0 : -1) < top);
//         if (currentIndex === -1) {
//             snapperActive = false;
//             return;
//         }

//         e.preventDefault();
//         let targetIndex;
//         if (!snapperActive) {
//             snapperActive = true;
//             targetIndex = currentIndex;
//         }

//         else {
//             if (direction > 0) {
//                 currentIndex--;
//             }

//             if (direction === Infinity) {
//                 targetIndex = panelTops.length - 1;
//             } else if (direction === -Infinity) {
//                 targetIndex = 0;
//             } else {
//                 targetIndex = Math.min(Math.max(currentIndex + direction, 0), panelTops.length - 1);
//             }
//         }

//         snapTo(panelTops[targetIndex], 0.6, 0);
//     }
// }, { passive: false });

// window.addEventListener('wheel', (e) => {
//     if (isSnapping) {
//         e.preventDefault();
//         return;
//     }

//     const scroll = Math.round(window.scrollY);
//     const direction = e.deltaY > 0 ? 1 : -1;
//     const panelTops = mainSections.map(section => section.offsetTop);
//     let currentIndex = panelTops.findIndex(top => scroll + (direction > 0 ? 0 : -1) < top);
//     if (currentIndex == -1) {
//         currentIndex = panelTops.length;
//         if (direction > 0 || scroll > lastSection.offsetTop) {
//             snapperActive = false;
//             return;
//         }
//     }

//     e.preventDefault();
//     let targetIndex;
//     if (!snapperActive) {
//         snapperActive = true;
//         targetIndex = currentIndex
//     }

//     else {
//         if (direction > 0) {
//             currentIndex--;
//         }
//         targetIndex = Math.min(Math.max(currentIndex + direction, 0), panelTops.length - 1);
//     }

//     const target = panelTops[targetIndex];
//     if (target !== scroll) {
//         snapTo(target, 0.6, 0.3);
//     }
// }, { passive: false });