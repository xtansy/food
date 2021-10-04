/*jshint esversion: 8 */
import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms (formSelector, modalTimerId) {
   // F O R M S (post)

   const forms = document.querySelectorAll(formSelector);

   const message = {
       loading: 'img/spinner.svg',
       success: 'Спасибо! Скоро мы с Вами свяжемся',
       failure: 'Что-то пошло не так...'
   };

   forms.forEach( item=> {
       bindPostData(item);
   });



   function bindPostData(form) {
       form.addEventListener('submit', (e)=> {
           e.preventDefault();

           let statusMessage = document.createElement('img');
           statusMessage.src = message.loading;
           statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;
           `;
           // form.append(statusMessage);
           form.insertAdjacentElement('afterend', statusMessage);

           // const request = new XMLHttpRequest();
           // request.open('POST', 'server.php');


           // request.setRequestHeader('Content-type', 'multipart/formd-data');
           // request.setRequestHeader('Content-type', 'application/json'); // json

           // const formData = new FormData(form);
           // const object = {};
           // formData.forEach( function(value, key) {
           //     object[key] = value;
           // });
           const formData = new FormData(form);

           const json = JSON.stringify(Object.fromEntries(formData.entries()));

           // request.send(json);
           // fetch('server.php', {
           //     method: "POST",
           //     headers: {
           //         'Content-type': 'application/json'
           //     },
           //     body: JSON.stringify(object)
           // })
           postData('http://localhost:3000/requests', json)
           .then(data => {
               console.log(data);
               showModalThx(message.success);
               statusMessage.remove();
           }).catch( ()=> {
               showModalThx(message.failure);
           }).finally( ()=> {
               form.reset();
           });

           // request.addEventListener('load', ()=> {
           //     if (request.status === 200) {
           //         console.log(request.response);
           //         showModalThx(message.success);
           //         statusMessage.remove();
           //         form.reset();
           //     } else {
           //         showModalThx(message.failure);
           //     }
           // });
       });
   }
   function showModalThx(text) {
       const prevModal = document.querySelector('.modal__dialog');
       prevModal.classList.add('hide');
       openModal('.modal', modalTimerId);
       const thxModal = document.createElement('div');
       thxModal.classList.add('modal__dialog');
       thxModal.innerHTML = `
           <div class ="modal__content">
               <div class ="modal__close" data-close>×</div>
               <div class ="modal__title">${text}</div>
           </div>
       `;
       document.querySelector('.modal').append(thxModal);
       setTimeout(() => { 
           thxModal.remove();
           prevModal.classList.add('show');
           prevModal.classList.remove('hide');
           closeModal('.modal');
       }, 4000);
   }
   // fetch('https://jsonplaceholder.typicode.com/posts', {
   //     method: "POST",
   //     body: JSON.stringify({name: 'Alex'}),
   //     headers: {
   //         'Content-type':'application/json'
   //     }
   // })
   //     .then(response => response.json())
   //     .then(json => console.log(json));

   fetch('http://localhost:3000/menu')
       .then (data => data.json())
       .then (res => console.log(res));
}

export default forms;

