import clients from './clients.js';

/*
 * Написать класс Clients по работе с массивом клиентов.
 * Для инициализации класс должен получать объект настроек с массивом клиентов (clients) и ссылку на список из DOM (listRef).
 * В классе должны быть реализованы методы:
 *   1. normalizeData() - готовит и возвращает массив клиентов для рендера:
 *     - страны должны быть в верхнем регистре
 *     - из полей fullname или username создать общее - name, в котором должно быть или имя клиента (если есть) или его ник
 *   2. createMarkup(preparedData) - получает массив подготовленный для рендера, создает и возвращает разметку по шаблону из index.html:
 *     - если имейла нет, выводить строку "No email"
 *     - лишка должна быть окрашена только если в поле shouldColor стоит true
 *   3. render() - с помощью метода normalizeData() готовит данные, с помощью метода createMarkup(preparedData) создает разметку и добавляет ее в список на странице.
 *   4. handleClick(e) - обработчик события 'Click' по списку (делегирование):
 *     - если клик был по кнопке удалить, удаляет клиента из массива и перерендерит весь список
 *     - если клик был по кнопке color, окрашивает всю лишку в нужный цвет, а в массиве меняет значение поля shouldColor этого клиента на true
 *
 * После этого получить ссылку на список и создать экземпляр класса (myClients).
 * Зарендерить массив на страницу.
 * На список повесить слушатель события с обработчиком handleClick.
 */

class Clients {
  constructor({ clients, listRef }) {
    this.clients = clients;
    this.listRef = listRef;
  }

  handlClick(e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }
    const btn = e.target;
    const liItem = btn.closest("li");
    const idToDelete = Number(liItem.dataset.id); 

  if (btn.dataset.action === 'delete') {
    const updateClients = this.clients.filter(
      client => client.id !== idToDelete);
    this.clients = updateClients;   
    this.render();
  }


    if (btn.dataset.action === 'color') {
      const updateClients = this.clients.map(client => ({
        ...client,
      shouldColor: client.id === id ? !client.shouldColor : client.shouldColor,
      }));
    this.clients = updateClients;   
    this.render();
    }
}


  render() {
    const normalizedData = this.normalizedData();
    const markup = this.createMarkup(normalizedData);
    this.listRef.innerHTML = markup;  
  }
    
  normalizeData() {
    return this.clients.map(client => {
      return {
        ...client,
        country: client.country.toUpperCase(),
        name: client.fullname?.first_name ?? client.username ?? 'Anonimus',
      };
    });
  }

  createMarkup(preparedData){
    return preparedData.map(({ id, avatar, name, email, gender, country, color, shouldColor }) => `<li data-id="${id} style="background-color: ${shouldColor ? color : 'none'}> <div>
    <img src="${avatar}" alt="Avatar" width="100"/>
    </div>
    <div>
    <p>Name:${name}</p>
    <p>Email:${email ?? 'No email'}</p> 
    <p>Gender:${gender}</p> 
    <p>Country:${country}</p> 
    <button data-action="color">Color me${shouldColor ? 'not' : ''}</button>
    <button data-action="delete""Delete</button>`).join('');
  }



};



const listRef = document.querySelector('.clients');

const myClients = new Clients({ clients, listRef });

console.log(myClients.normalizeData());



listRef.addEventListener('click', myClients.handlClick.bind(myClients));
