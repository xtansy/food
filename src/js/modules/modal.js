/*jshint esversion: 8 */
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // или 'auto'; 
}
function openModal (modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';   
    clearInterval(modalTimerId);     
}

function modal (triggerSelector, modalSelector, modalTimerId) {
        // M O D A L

    //     const modalTrigger = document.querySelectorAll('[data-modal');
    //     const modalClose = document.querySelector('[data-close]');

    //    modalTrigger.forEach ( (item)=> {
    //         item.addEventListener('click', () => {
    //             document.querySelector('.modal').style.display = 'block';
    //         });
    //    });

    //    modalClose.addEventListener('click', () => {
    //         document.querySelector('.modal').style.display = 'none';
    //    });

    const modalTrigger = document.querySelectorAll(triggerSelector);
    // const modalClose = document.querySelector('[data-close]');
    const modal = document.querySelector(modalSelector);



    modalTrigger.forEach( (item) => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId) );
    });

    // modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal, openModal};
