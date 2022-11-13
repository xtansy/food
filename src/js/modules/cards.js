/*jshint esversion: 8 */
import {getResource} from '../services/services';

function cards () {
    // C L A S S E S
    class MenuItem {
        constructor (img, subtitle, descr, price, parentSelector, alt, ...elements) {
            this.img = img;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.alt = alt;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
            this.elements = elements;
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const div = document.createElement('div');
            if (this.elements.length === 0) {
                this.elements = 'menu__item';
                div.classList.add('menu__item');
            } else { this.elements.forEach( item => {div.classList.add(item)})};
            div.innerHTML = `
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
            this.parent.append(div);
        }
    }
    // const div = new MenuItem();
    // div.render();


    getResource('http://localhost:3000/menu')
        .then (data => {
            data.forEach (({img, altimg, title, descr, price})=> {
                new MenuItem (img, title, descr, price, '.menu__field .container', altimg).render();
            });
        });

    // axios.get('http://localhost:3000/menu')
    //     .then (data => {
    //         data.data.forEach (({img, altimg, title, descr, price})=> {
    //             new MenuItem (img, title, descr, price, '.menu__field .container', altimg).render();
    //         });
    //     });

    // new MenuItem(
    //     "img/tabs/vegy.jpg",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu__field .container',
    //     'vegy'
    // ).render();

    // new MenuItem(
    //     "img/tabs/elite.jpg",
    //     'Меню "Премиум"',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     9,
    //     '.menu__field .container',
    //     'elite'
    // ).render();

    // new MenuItem(
    //     "img/tabs/post.jpg",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     9,
    //     '.menu__field .container',
    //     'post'
    // ).render();
}

export default cards;