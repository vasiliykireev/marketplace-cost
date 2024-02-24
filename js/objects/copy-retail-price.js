'use strict';

/* Логи */
let logs = false; // true - выводим логи, false - не выводим логи
if (logs) {console.log('add-type.js')};

/* Импорт */
/* Данные */
import { displayRetailPriceInputFormControl } from '../../script.js';

/* Копирование цены */
export const displayRetailPriceButtonCopy = document.querySelector(".retail-price__copy"); // Кнопка копирования цены
displayRetailPriceButtonCopy.addEventListener('click', function (event) { // Добавляем отслеживание событий по нажатию на кнопку копирования цены
    window.navigator.clipboard.writeText(displayRetailPriceInputFormControl.value); // Копируем цены в буфер обмена
    //.then(() => console.log(this)); // Обратная связь
})