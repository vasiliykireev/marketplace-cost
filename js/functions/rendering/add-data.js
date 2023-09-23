'use strict';

/* Логи */
let logs = false; // true - выводим логи, false - не выводим логи

/* Импорт */
/* Переменные */
import { sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees } from '../../../script.js'; // Оптовая цена, расходы, комиссии и тарифы
import { displayRetailPriceInputFormControl } from '../../../script.js'; // Поле для вывода розничной цены
import { displayWholesalePriceInputFormControl } from '../../../script.js'; // Поле для ввода оптовой цены
// import { captions } from '../../../script.js'; // Подписи
/* Функции */
import { addElement } from './add-element.js'; // Добавление элемента
import { retailPrice } from '../logic/retail-price.js'; // Расчет розничной цены
import { deleteObject } from '../logic/delete-object.js'; // Удаление объекта
import { addName } from './add-name.js'; // Вывод называния
import { removeData } from './remove-data.js'; // Убрать данные

/* Отобразить данные
parent - родительский элемент
type - тип объекта: расход, комиссия, тариф
object - объект
*/
export function addData(parent, type, object) {
    if (logs) {
        console.log('');
        console.log('function addData:');
        console.log(parent);
        console.log(type);
        console.log(object);
    }

    let displayValues = []; // Показываемые группы

    /* Основное значение */
    const displayValueBlockInputGroup = addElement( // Группа ввода основного значения
        parent,
        'div',
        [type + '__input-group', type + '__input-group' + '_type_' + object.type, 'input-group']
    );
    const displayValueElementFormFloating = addElement( // Плавающая подпись основного значения
        displayValueBlockInputGroup,
        'div',
        [type + '__form-floating', type + '__form-floating'  + '_type_' + object.type , 'form-floating']
    );
    const displayValueInputFormControl = addElement( // Поле для ввода основного значения
        displayValueElementFormFloating,
        'input',
        [type + '__form-control', type + '__form-control' + '_type_' + object.type, 'form-control'],
        {
            'type': 'number',
            'min': 0,
            'step': 0.01,
            'placeholder': null,
            'id': 'data-' + object.id,
            'name': 'data-' + object.id
        });
    const displayValueLabelFormControl = addElement(displayValueElementFormFloating, 'label', type + '__label', {'for': 'data-' + object.id}); // Подпись для поля ввода основого значения
    displayValues.push(displayValueBlockInputGroup); // В показываемые группы добавляем группу для ввода основного значения

    switch (object.type) { // В зависимости от типа объекта
        case 'fix': // Если фиксированная цена
            displayValueInputFormControl.value = object.value; // В поле для ввода основого значения добавляем значение объекта 
            displayValueLabelFormControl.innerText = object.name + ', ' + ' руб.'; // В подпись для поля ввода основого значения записываем название объекта и валюту для ввода значения
            displayValueInputFormControl.addEventListener('input', function (event) { // Полю для ввода основного значения добавляем отслеживание событий по вводу текста
                object.value = Number(displayValueInputFormControl.value).toFixed(2); // В значение объекта записываем значение поля для ввода основного значения
                displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // В поле для отображения розничной цены выводим расчет розничной цены
            })
        break;
        case 'percent': // Если процент от оптовой цены
            displayValueInputFormControl.value = object.percent; // В поле для ввода значения записываем процент объекта
            displayValueLabelFormControl.innerText = object.name + ', %'; // В подпись для поля ввода основного значения записываем название объекта и процента
            const displayPercentValueBlockInputGroup = addElement(parent, 'div', [type + '__input-group', type + '__input-group_type_percent', 'input-group']); // Группа для вывода значения от процентов
            const displayPercentValueBlockFormFloating = addElement(displayPercentValueBlockInputGroup, 'div', [type + '__-form-floating', type + '__-form-floating_type_percent', 'form-floating']); // Плавающая подпись для вывода значения от процентов
            const displayPercentValueInputFormControl = addElement( // Поле для вывода значения от процентов
            displayPercentValueBlockFormFloating,
                'input',
                [type + '__form-control-plaintext', type + '__form-control-plaintext_type_percent', 'form-control-plaintext'],
                {
                    'type': 'number',
                    'min': 0,
                    'step': 0.01,
                    'placeholder': null,
                    'id': 'value-' + object.id,
                    'readonly': true
                });
            const displayPercentValueLabelFormControl = addElement(displayPercentValueBlockFormFloating, 'label', [type + '__value-label', type + '__value-label_type_percent'], {'for': 'value-' + object.id}); // Подпись для поля вывода значения от процентов
            displayPercentValueInputFormControl.value = object.value; // В поле для вывода значения от процентов записываем значение объекта
            displayPercentValueLabelFormControl.innerText = object.name + ', ' + ' руб.'; // В подпись для поля вывода значения от процентов записываем подпись из названия объекта и валюты для ввода значения
            displayValues.push(displayPercentValueBlockInputGroup); // В показываемые группы добавляем группу для вывода значения от процентов
            displayValueInputFormControl.addEventListener('input', function (event) { // Полю для ввода основного значения добавляем отслеживание событий по вводу текста
                object.percent = Number(displayValueInputFormControl.value).toFixed(2); // В процент объекта записываем значение поля для ввода значения 
                displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // В поле для отображения розничной цены выводим расчет розничной цены
                displayPercentValueInputFormControl.value = object.value; // В поле для вывода значения от процентов записываем значение объекта 
            })
            displayWholesalePriceInputFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода оптовой цены
                object.percent = Number(displayValueInputFormControl.value).toFixed(2); // В процент объекта записываем значение поля для ввода значения 
                displayPercentValueInputFormControl.value = object.value; // В поле для вывода значения от процентов записываем значение объекта 
            })
        break;
        case 'commission': // Если комиссия
            displayValueInputFormControl.value = object.percent; // В поле для ввода основного значения записываем процент объекта 
            displayValueLabelFormControl.innerText = object.name + ', %'; // В подпись для поля ввода основого значения записываем название объекта и процент
            displayValueInputFormControl.addEventListener('input', function (event) { // Полю для ввода основного значения добавляем отслеживание событий по вводу текста
                object.percent = Number(displayValueInputFormControl.value).toFixed(2); // В процент объекта записываем число с точностью до сотых из поля для ввода основного значения
                displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // В поле для отображения розничной цены выводим расчет розничной цены
            })
        break;
        case 'fee': // Если тариф
            displayValueInputFormControl.value = object.value; // В поле для ввода основного значения записываем значение объекта
            displayValueLabelFormControl.innerText = object.name + ', ' + ' руб.'; // Подпись для поля ввода основого значения записываем название объекта и валюту для ввода значения
            displayValueInputFormControl.addEventListener('input', function (event) { // Полю для ввода основного значения добавляем отслеживание событий по вводу текста
                object.value = Number(displayValueInputFormControl.value).toFixed(2); // В значение объекта записываем число с точностью до сотых из поля для ввода основного значения
                displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // В поле для отображения розничной цены выводим расчет розничной цены
            })
        break;
        default: // Если другое 
            console.warn('Unknown object');
    }
    displayValueInputFormControl.focus(); // Фокусируемся на поле для ввода основного значения

    /* Выпадающий список */
    const displayValueButtonDropdown = addElement( // Кнопка выпадающего списка
        displayValueBlockInputGroup,
        'button', [type + '__dropdown-options', 'btn', 'btn-secondary', 'dropdown-toggle'],
        {
            'data-bs-toggle': 'dropdown',
            'aria-label': 'Изменить',
            'aria-expanded': 'false'
        }
        );
    const displayValueUlDropdownMenu = addElement( // Маркированный список выпадающего списка
        displayValueBlockInputGroup,
        'ul',
        [type + '__dropdown-menu', 'dropdown-menu', 'dropdown-menu-end']
    );
    let displayValueLiDropdownMenuItemFix; // Элемент фиксированной стоимости
    let displayValueLiDropdownMenuItemPercent; // Элемент процента от оптовой цены
    let displayValueLiDropdownMenuHr; // Элемент разделителя

    /* Элементы выпадающего списка для расходов */
    if (object.type === 'fix' || object.type === 'percent') { // Если тип объекта фиксированная стоимость или процент
        displayValueLiDropdownMenuItemFix = addElement( // Элемент фиксированной стоимости
            displayValueUlDropdownMenu,
            'li',
            type + '__dropdown-menu-item-fix'
        );
        const displayValueLiDropdownMenuItemFixLink = addElement( // Ссылка элемента фиксированной стоимости
            displayValueLiDropdownMenuItemFix,
            'button',
            [type + '__dropdown-menu-item-fix-link', 'dropdown-item', 'btn', 'btn-light'],
            {
                'type': 'button'
            }
        );
        displayValueLiDropdownMenuItemFixLink.innerText = 'Фиксированная стоимость'; // В ссылке элемента фиксированной стоимости записываем фиксированную стоимость
        if (object.type === 'fix') { // Если тип объекта фиксированная стоимость
            displayValueLiDropdownMenuItemFixLink.setAttribute('disabled', 'true'); // Ссылке элемента фиксированной стоимости устанавливаем атрибут выключен
        }
        displayValueLiDropdownMenuItemFixLink.addEventListener('click', function (event) { // Ссылке элемента фиксированной стоимости добавляем отслеживание событий по клику
            removeData(displayValues); // Удаляем показываемые группы
            object.type = 'fix';
            displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // В поле для отображения розничной цены выводим расчет розничной цены
            addData(parent, type, object); // Отображаем данные заново
        });
        displayValueLiDropdownMenuItemPercent = addElement( // Элемент процента от оптовой цены
            displayValueUlDropdownMenu,
            'li',
            type + '__dropdown-menu-item-percent'
        );
        const displayValueLiDropdownMenuItemPercentLink = addElement( // Ссылка элемента процента от оптовой цены
            displayValueLiDropdownMenuItemPercent,
            'button',
            [type + '__dropdown-menu-item-percent-link', 'dropdown-item', 'btn', 'btn-light'],
            {
                'type': 'button'
            }
        );
        displayValueLiDropdownMenuItemPercentLink.innerText = 'Процент от оптовой цены'; // В ссылке элемента процента от оптовой цены записываем процент от оптовой цены
        if (object.type === 'percent') { // Если тип объекта процент
            displayValueLiDropdownMenuItemPercentLink.setAttribute('disabled', 'true'); // Ссылке элемента процента от оптовой цены устанавливаем атрибут выключен
        }
        displayValueLiDropdownMenuItemPercentLink.addEventListener('click', function (event) { // Ссылке элемента процента от оптовой цены добавляем отслуживание событий по клику
            removeData(displayValues); // Удаляем группы, которые были добавлены
            object.type = 'percent';
            displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // В поле для отображения розничной цены выводим расчет розничной цены
            addData(parent, type, object); // Отображаем данные заново
        });

        /* Разделитель */
        displayValueLiDropdownMenuHr = addElement( // Элемент разделителя
            displayValueUlDropdownMenu,
            'li',
            type + '__dropdown-menu-item-hr'
        );
        const displayValueLiDropdownMenuHrDivider = addElement( // Горизонтальная линия разделителя
            displayValueLiDropdownMenuHr,
            'hr',
            'dropdown-divider'
        )
    }

    /* Переименовать */
    const displayValueLiDropdownMenuItemRename = addElement( // Элемент переименования
        displayValueUlDropdownMenu,
        'li',
        type + '__dropdown-menu-item-rename'
    );
    const displayValueLiDropdownMenuItemRenameLink = addElement( // Ссылка элемента переименования
        displayValueLiDropdownMenuItemRename,
        'button',
        [type + '__dropdown-menu-item-rename-link', 'dropdown-item', 'btn', 'btn-light'],
        {
            'type': 'button'
        }
    );
    displayValueLiDropdownMenuItemRenameLink.innerText = 'Переименовать'; // В ссылке элемента переименования записываем переименовать
    displayValueLiDropdownMenuItemRenameLink.addEventListener('click', function (event) { // Ссылке элемента переименования добавляем отслеживание событий по клику 
        addName(parent, type, object); // Добавляем название для данных
        removeData(displayValues); // Удаляем группы, которые были добавлены
    });

    /* Удалить */
    const displayValueLiDropdownMenuItemDelete = addElement( // Элемент удаления
        displayValueUlDropdownMenu,
        'li',
        type + '__dropdown-menu-item-delete'
    );
    const displayValueLiDropdownMenuItemDeleteLink = addElement( // Ссылка элемента удаления
        displayValueLiDropdownMenuItemDelete,
        'button',
        [type + '__dropdown-menu-item-delete-link', 'dropdown-item', 'text-danger', 'btn', 'btn-light'],
        {
            'type': 'button'
        }
    );
    displayValueLiDropdownMenuItemDeleteLink.innerText = 'Удалить'; // В ссылке элемента удаления записываем удалить
    displayValueLiDropdownMenuItemDeleteLink.addEventListener('click', function (event) { // Ссылке элемента удаления добавляем отслеживание событий по клику
        deleteObject(object); // Удаляем объект
        parent.remove(); // Удаляем родительский элемент
        displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // В поле для отображения розничной цены выводим расчет розничной цены
    })

    if (logs) {console.log('displayValues:'); console.log(displayValues);}
    if (logs) {console.log('addData done!');}
}