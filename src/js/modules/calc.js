/*jshint esversion: 8 */
function calc () {
    // calculator
    let result = document.querySelector('.calculating__result span');
    let sex , height, weight, age, ratio;
    
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else { 
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else { 
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initElements (selector, activeClass) {
        const elem = document.querySelectorAll(selector);
        elem.forEach (item => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }
    initElements('#gender div', 'calculating__choose-item_active');
    initElements('.calculating__choose_big div', 'calculating__choose-item_active');
  
    function getResult () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '___';
            return;
        } 
        if (sex == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else { 
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticElements (parentSelector, activeClass) {
        const element = document.querySelectorAll(`${parentSelector} div`);
        element.forEach( elem => {
            elem.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
    
                element.forEach ( item => {
                    item.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass);
                getResult();
            });
        });
    }
    getStaticElements('#gender', 'calculating__choose-item_active');
    getStaticElements('.calculating__choose_big', 'calculating__choose-item_active');


    function getDynamicElements (selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {input.style.border = 'none';}
            switch (input.getAttribute('id')) {
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight': 
                    weight = +input.value;
                    break;    
                case 'age': 
                    age = +input.value;
                    break;
            }
            getResult();
        });
    }
    getDynamicElements('#height');
    getDynamicElements('#weight');
    getDynamicElements('#age');
}

export default calc;