/*jshint esversion: 8 */
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // S L I D E R S

    let slideIndex = 1;
    let offset = 0;
    let slider = document.querySelectorAll(slide);
    const allSlider = document.querySelector(container);
    const ArrowNextSlider = document.querySelector(nextArrow);
    const ArrowPrevSlider = document.querySelector(prevArrow);

    let totalSlider = document.querySelector(totalCounter);
    let currentSlider = document.querySelector(currentCounter);
    const sliderWrapper = document.querySelector(wrapper); 
    const width = window.getComputedStyle(sliderWrapper).width; // width, т.к метод вернет объект со стилями
    const sliderInner = document.querySelector(field);

    if (slider.length < 10) {
        totalSlider.textContent = `0${slider.length}`;
        currentSlider.textContent = `0${slideIndex}`;
    } else {
        totalSlider.textContent = slider.length;
        currentSlider.textContent = slideIndex;
    }

    sliderInner.style.width = 100 * slider.length + '%'  ;

    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden'; // скрывает элементы, которые не попадают в обл. видимости

    slider.forEach( (slide) => {
        slide.style.width = width;
    });

    allSlider.style.position = 'relative'; // для навигации точек 

    const dots = document.createElement('ol');
    const dotsMassive = [];

    dots.classList.add('carousel-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;`;

    allSlider.append(dots);

    for (let i = 0; i < slider.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        dots.append(dot);
        dotsMassive.push(dot);
        if ( i == 0) { dot.style.opacity = '1'; }
    }

    function deleteNotDigits (str) {
        return +str.replace(/\D/g,'');
    }
    
    ArrowNextSlider.addEventListener( 'click', () => {
        if (offset == deleteNotDigits(width) * (slider.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        } 
        
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if ( slideIndex == slider.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if ( slideIndex < 10) {
            currentSlider.textContent = `0${slideIndex}`;
        } else {
            currentSlider.textContent = slideIndex;
        }

        dotsMassive.forEach( dot => {
            dot.style.opacity = '.5';
        });
        dotsMassive[slideIndex - 1].style.opacity = '1';
    });

    ArrowPrevSlider.addEventListener( 'click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slider.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        } 
        
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if ( slideIndex == 1) {
            slideIndex = slider.length;
        } else {
            slideIndex--;
        }
        
        if ( slideIndex < 10) {
            currentSlider.textContent = `0${slideIndex}`;
        } else {
            currentSlider.textContent = slideIndex;
        }

        dotsMassive.forEach( dot => {
            dot.style.opacity = '.5';
        });
        dotsMassive[slideIndex - 1].style.opacity = '1';
    });

    dotsMassive.forEach( dot => {
        dot.addEventListener('click', (e) => {
            const slideIndexDot = e.target.getAttribute('data-slide-to');
            slideIndex = slideIndexDot;

            offset = deleteNotDigits(width) * (slideIndexDot - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;

            if ( slideIndex < 10) {
                currentSlider.textContent = `0${slideIndex}`;
            } else {
                currentSlider.textContent = slideIndex;
            }

            dotsMassive.forEach( dot => {
                dot.style.opacity = '.5';
            });
            dotsMassive[slideIndex - 1].style.opacity = '1';
        });
    });
     
    //--------------------------------------------------------------------------------------
    // 1 СПОСОБ СЛАЙДЕРА 
    //--------------------------------------------------------------------------------------

    // function hideSlide (i) {
    //     slider[i].classList.remove('show');
    //     slider[i].classList.add('hide');
    // }
    
    // function showSlide (i) {
    //     slider[i].classList.remove('hide');
    //     slider[i].classList.add('show');
    // }

    // ArrowNextSlider.addEventListener('click', () => {
    //     console.log(index);

        
    //     if ( index >= 3 ) {
    //         hideSlide(index);
    //         index = 0;
    //         showSlide(index);
    //         currentSlider.innerHTML = '01';
    //     } else {
    //         hideSlide(index);
    //         index = index + 1;
    //         showSlide(index);
    //         currentSlider.innerHTML = '0' + (parseInt(currentSlider.innerHTML) + 1);
    //     }
    // });
    
    // ArrowPrevSlider.addEventListener('click', () => {
    //     console.log(index);
    //     if ( index == 0) {
    //         hideSlide(index);
    //         index = 3;
    //         showSlide(index); 
    //         currentSlider.innerHTML = '04';
    //     } else {
    //         hideSlide(index);
    //         index = index - 1;
    //         showSlide(index); 
    //         currentSlider.innerHTML = '0' + (parseInt(currentSlider.innerHTML) - 1);
    //     }
    // });

    //--------------------------------------------------------------------------------------
    // 2 СПОСОБ СЛАЙДЕРА 
    //--------------------------------------------------------------------------------------
    
    // showSlide(slideIndex);

    // if (slider.length < 10) {
    //     totalSlider.textContent = `0${slider.length}`;
    // } else {totalSlider.textContent = slider.length}
    
    // function showSlide (i) {
    //     if ( i > slider.length) {
    //         slideIndex = 1;
    //     }
    //     if (i < 1) {
    //         slideIndex = slider.length;
    //     }
    //     slider.forEach (item => {
    //         item.classList.remove('show');
    //         item.classList.add('hide'); 
    //     });
    //     slider[slideIndex - 1].classList.remove('hide');
    //     slider[slideIndex - 1].classList.add('show');
    //     if (slider.length < 10) {
    //         currentSlider.textContent = `0${slideIndex}`;
    //     } else { currentSlider.textContent = slideIndex}
    // }
    // function plusSlide (n) {
    //     showSlide( slideIndex += n );
    // }

    // ArrowNextSlider.addEventListener('click', () => {
    //     plusSlide(1);
    // });
    // ArrowPrevSlider.addEventListener('click', () => {
    //     plusSlide(-1);
    // });

    //--------------------------------------------------------------------------------------
    // 3 СПОСОБ СЛАЙДЕРА (см. выше)
    //--------------------------------------------------------------------------------------
}

export default slider;
