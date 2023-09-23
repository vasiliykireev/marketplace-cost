'use strict';

/* Логи */
let logs = true; // true - выводим логи, false - не выводим логи
if (logs) {console.log('add-name.js');}

import { addElement } from './add-element.js';
import { addData } from './add-data.js';
import { sourceCosts, sourceCommissions, sourceFees } from '../../../script.js';
import { deleteObject } from '../logic/delete-object.js';

/* Вывод названия
parent - родительский элемент
type - тип объекта: расход, комиссия, тариф
object - объект
*/
export function addName(parent, type, object) {
    if (logs) {
        console.log('');
        console.log('function addName');
        console.log(object);
        console.log(type);
        console.log(object);
    }
    /* Ввод имени */
    const displayNameBlockInputGroup = addElement(parent, 'div', [type + '__input-group', 'input-group']); // Группа для ввода имени
    const displayNameElementFormFloating = addElement(displayNameBlockInputGroup, 'div', [type + '__form-floating', 'form-floating']); // Плавающая подпись ввода имени
    const displayNameInputFormControl = addElement( // Поле для ввода имени
        displayNameElementFormFloating,
        'input',
        [type + '__form-control', 'form-control'],
        {
            'placeholder': undefined,
            'id': 'name-' + object.id,
            'name': 'name-' + object.id,
        });
    const displayNameLabelFormContol = addElement(displayNameElementFormFloating, 'label', type + '__label', {'for': 'name-' + object.id}); // Подпись для поля ввода имени
    if (object.name === undefined) { // Если имя объекта не определено
        displayNameLabelFormContol.innerText = 'Введите название'; // В подписи для поля ввода имени заполнить Введите название
    } else { // Иначе
        displayNameInputFormControl.value = object.name; // В поле для ввода имени заполнить название объекта
        displayNameLabelFormContol.innerText = 'Переименовать'; // В подписи для поля ввода имени заполнить Переименовать
    }
    displayNameInputFormControl.focus(); // Сфокусироваться на поле для ввода имени

    /* Сохранение имени */
    const displayNameButtonSave = addElement( // Кнопка сохранения имени
        displayNameBlockInputGroup,
        'button',
        [type + '__save', 'btn', 'btn-primary'],
        {
            'type': 'button',
            'aria-label': 'Сохранить'
    });
    if (object.name === undefined) { // Если имя объекта не определено
        displayNameButtonSave.setAttribute('disabled','true'); // Кнопке сохранения имени добавляем атрибут disabled
    }
    displayNameButtonSave.innerHTML = '<i class="bi bi-check"></i>'; // В кнопке сохранения имени записываем иконку галочки
    displayNameButtonSave.addEventListener('click', function(event) { // Кнопке сохранения имени добавляем отслеживание событий по клику
        object.name = displayNameInputFormControl.value; // В имя объекта записываем значение поля для ввода имени
        const displayTypeElement = addData(parent, type, object);
        displayNameBlockInputGroup.remove(); // Убираем группу для ввода имени
    })

    /* Удаление имени */
    if (object.name === undefined) { // Если имя объекта не определено
        const displayNameButtonRemove = addElement( // Кнопка удаления имени
            displayNameBlockInputGroup,
            'button',
            [type + '__remove', 'btn', 'btn-light', 'btn-outline-danger'],
            {
                'type': 'button',
                'aria-label': 'Удалить'
        });
        displayNameButtonRemove.innerHTML = '<i class="bi bi-trash"></i>'; // В кнопке удаления имени записываем иконку корзины
        displayNameButtonRemove.addEventListener('click', function(event) { // Кнопке удаления имени добавляем отслеживание событий по клику
            deleteObject(object);  // Удаляем объект
            displayNameBlockInputGroup.remove(); // Убираем группу для ввода имени
        })
    }

    /* Отображение кнопок */
    let displayNameButtonSaveShow; // Нужно ли будет показывать кнопку сохранить
    if (object.name === undefined) { // Если имя объекта не определено
        displayNameButtonSaveShow = true; // Нужно будет показывать кнопку сохранить
    } else { // Иначе
        displayNameButtonSaveShow = false; // Не нужно будет показывать кнопку сохранить
    }
    displayNameInputFormControl.addEventListener('input', function(event) { // Полю для ввода имени добавляем отслеживание события ввод текста
        if (displayNameButtonSaveShow) { // Если нужно будет показывать кнопку сохранить
            displayNameButtonSave.removeAttribute('disabled', 'true'); // У кнопки сохранить удаляем атрибут disabled
            displayNameButtonSaveShow = false; // Не нужно будет показывать кнопку сохранить
        }
        if (displayNameInputFormControl.value.length === 0) { // Если поле для ввода имени пустое
            displayNameButtonSave.setAttribute('disabled', 'true'); // Кнопки сохранить добавляем атрибут disabled
            displayNameButtonSaveShow = true; // Нужно будет показывать кнопку сохранить
        }
    })
    displayNameInputFormControl.addEventListener('keypress', function(event) { // Полю для ввода имени добавляем отслеживание события нажатия клавиши
        if (displayNameInputFormControl.value.length !== 0) { // Если название не пустое
            if (event.key === 'Enter') { // Если нажата клавиша ввода
                object.name = displayNameInputFormControl.value; // В название объекта записываем значение поля для ввода имени
                const displayTypeElement = addData(parent, type, object); // В элемент типа записываем отобразить данные
                displayNameBlockInputGroup.remove(); // Убираем группу для ввода имени
            }
        }
    })
    if (logs) {console.log('addName done!');}
    return displayNameBlockInputGroup; // Возвращаем группу для ввода имени
}