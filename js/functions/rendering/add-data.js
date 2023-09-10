'use strict';

import { addElement } from './add-element.js'; // Импортируем функцию добавления элемента
import { sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees } from '../../../script.js'; // Импортируем оптовую цену, расходы, комиссии и тарифы
import { displayRetailPriceInputFormControl } from '../../../script.js'; // Импортируем объект поля для ввода розничной цены
import { displayWholesalePriceInputFormControl } from '../../../script.js'; // Импортируем объект поля для ввода оптовой цены
import { retailPrice } from '../logic/retail-price.js'; // Импортируем функцию расчета розничной цены
import { deleteObject } from '../logic/delete-object.js'; // Импортируем функцию удаления объекта
import { addName } from './add-name.js'; // Импортируем функцию добавления названия
import { captions } from '../../../script.js'; // Импортируем подписи
import { removeData } from './remove-data.js'; // Импортируем функцию стирания данных

/* Логи */
let logs = true; // true - выводим логи, false - не выводим логи

export function addData(parent, /*parentClass,*/ type, object) { // Добавить данные: родительский элемент, класс, тип, объект
    let displayValues = []; // Определяем все группы, которые будут добавлены
    const displayValueBlockInputGroup = addElement( // Добавляем группу ввода основного значения
        parent,
        'div',
        [type + '__input-group', type + '__input-group' + '_type_' + object.type, 'input-group']
    );
    const displayValueElementFormFloating = addElement( // Добавляем плавающие подписи
        displayValueBlockInputGroup,
        'div',
        [type + '__form-floating', type + '__form-floating'  + '_type_' + object.type , 'form-floating']
    );
    const displayValueInputFormControl = addElement( // Добавляем поле для ввода значения
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
    const displayValueLabelFormControl = addElement(displayValueElementFormFloating, 'label', type + '__label', {'for': 'data-' + object.id}); // Добавляем подпись для поля для ввода значения
    displayValues.push(displayValueBlockInputGroup); // Добавляем группу для ввода основного значения в добавленные данные
    // let percentInputGroup; // Определяем группу для вывода значения от процентов
    let displayPercentValueBlockInputGroup; // Определяем группу для вывода значения от процентов

    console.log('Before switch object type');
    console.log(object);

    switch (object.type) { // В зависимости от типа объекта
        case 'fix': // Если фиксированная цена
            displayValueInputFormControl.value = object.value; // Добавляем значение объекта в поле для ввода значения
            displayValueLabelFormControl.innerText = object.name + ', ' + captions.currency; // Добавляем подпись из названия объекта и валюты для ввода значения
            displayValueInputFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода
                object.value = Number(displayValueInputFormControl.value).toFixed(2); // Записываем значение поля для ввода в значение объекта
                displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // Считаем розничную цену и выводим ее в поле для вывода
            })
        break;
        case 'percent': // Если процент от оптовой цены
            displayValueInputFormControl.value = object.percent; // Добавляем процент объекта в поле для ввода значения
            displayValueLabelFormControl.innerText = object.name + ', %'; // Добавляем подпись из названия объекта и процента
            displayPercentValueBlockInputGroup = addElement(parent, 'div', [type + '__input-group', type + '__input-group_type_percent', 'input-group']); // Добавляем группу для вывода значения от процентов
            const displayPercentValueBlockFormFloating = addElement(displayPercentValueBlockInputGroup, 'div', [type + '__-form-floating', type + '__-form-floating_type_percent', 'form-floating']); // Добавляем плавающие подписи
            const displayPercentValueInputFormControl = addElement( // Добавляем поле для вывода значения от процентов
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
            const displayPercentValueLabelFormControl = addElement(displayPercentValueBlockFormFloating, 'label', [type + '__value-label', type + '__value-label_type_percent'], {'for': 'value-' + object.id}); // Добавляем подпись для вывода значения от процентов
            displayPercentValueInputFormControl.value = object.value; // Добавляем значение объекта в поле для вывода значения от процентов
            displayPercentValueLabelFormControl.innerText = object.name + ', ' + captions.currency; // Добавляем подпись из названия объекта и валюты для ввода значения
            displayValues.push(displayPercentValueBlockInputGroup);
            displayValueInputFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода
                object.percent = Number(displayValueInputFormControl.value).toFixed(2); // Записываем значение поля для ввода в процент объекта
                displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // Считаем розничную цену и выводим ее в поле для вывода
                displayPercentValueInputFormControl.value = object.value; // Записываем значение объекта в поле для вывода значения от процентов
            })
            displayWholesalePriceInputFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода оптовой цены
                object.percent = Number(displayValueInputFormControl.value).toFixed(2); // Записываем значение поля для ввода в процент объекта
                displayPercentValueInputFormControl.value = object.value; // Добавляем значение объекта в поле для вывода значения от процентов
            })
        break;
        case 'commission': // Если комиссия
            displayValueInputFormControl.value = object.percent; // Добавляем процент объекта в поле для ввода значения
            displayValueLabelFormControl.innerText = object.name + ', %'; // Добавляем подпись из названия объекта и процента
            displayValueInputFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в подпись для поля для ввода значения
                object.percent = Number(displayValueInputFormControl.value).toFixed(2); // Заполняем процент числом из поля для ввода значения с копейками
                displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // Считаем розничную цену и выводим ее в поле для вывода
            })
        break;
        case 'fee': // Если тариф
            displayValueInputFormControl.value = object.value; // Добавляем значение объекта в поле для ввода значения
            displayValueLabelFormControl.innerText = object.name + ', ' + captions.currency; // Добавляем подпись из названия объекта и валюты для ввода значения
            displayValueInputFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода
                object.value = Number(displayValueInputFormControl.value).toFixed(2); // Записываем значение поля для ввода в значение объекта
                displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // Считаем розничную цену и выводим ее в поле для вывода
            })
        break;
        default:
            console.warn('Unknown type');
            console.log(object);
    }
    displayValueInputFormControl.focus();
    const displayValueButtonDropdown = addElement(
        displayValueBlockInputGroup,
        'button', [type + '__dropdown-options', 'btn', 'btn-secondary', 'dropdown-toggle'],
        {
            'data-bs-toggle': 'dropdown',
            'aria-label': 'Изменить',
            'aria-expanded': 'false'
        }
        );
    const displayValueUlDropdownMenu = addElement(
        displayValueBlockInputGroup,
        'ul',
        [type + '__dropdown-menu', 'dropdown-menu', 'dropdown-menu-end']
    );
    let displayValueLiDropdownMenuItemFix;
    let displayValueLiDropdownMenuItemPercent;
    let displayValueUlDropdownMenuHr;

    /* Фиксированная стоимость */
    if (object.type === 'fix' || object.type === 'percent') {
        displayValueLiDropdownMenuItemFix = addElement(
            displayValueUlDropdownMenu,
            'li',
            type + '__dropdown-menu-item-fix'
        );
        const displayValueLiDropdownMenuItemFixLink = addElement(
            displayValueLiDropdownMenuItemFix,
            'button',
            [type + '__dropdown-menu-item-fix-link', 'dropdown-item', 'btn', 'btn-light'],
            {
                'type': 'button'
            }
        );
        displayValueLiDropdownMenuItemFixLink.innerText = 'Фиксированная стоимость';
        if (object.type === 'fix') {
            displayValueLiDropdownMenuItemFixLink.setAttribute('disabled', 'true');
        }
        displayValueLiDropdownMenuItemFixLink.addEventListener('click', function (event) {
            removeData(displayValues); // Удаляем группы, которые были добавлены
            object.type = 'fix';
            displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // Считаем розничную цену и выводим ее в поле для вывода
            addData(parent, type, object); // Добавляем данные заново
        });

        /* Процент от оптовой цены */
            displayValueLiDropdownMenuItemPercent = addElement(
                displayValueUlDropdownMenu,
                'li',
                type + '__dropdown-menu-item-percent'
            );
            const displayValueLiDropdownMenuItemPercentLink = addElement(
                displayValueLiDropdownMenuItemPercent,
                'button',
                [type + '__dropdown-menu-item-percent-link', 'dropdown-item', 'btn', 'btn-light'],
                {
                    'type': 'button'
                }
            );
            displayValueLiDropdownMenuItemPercentLink.innerText = 'Процент от оптовой цены';
            if (object.type === 'percent') {
                displayValueLiDropdownMenuItemPercentLink.setAttribute('disabled', 'true');
            }
            displayValueLiDropdownMenuItemPercentLink.addEventListener('click', function (event) {
                removeData(displayValues); // Удаляем группы, которые были добавлены
                object.type = 'percent';
                displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // Считаем розничную цену и выводим ее в поле для вывода
                console.log(object);
                addData(parent, type, object); // Добавляем данные заново
            });

        /* Разделитель */
        displayValueUlDropdownMenuHr = addElement(
            displayValueUlDropdownMenu,
            'li',
            type + '__dropdown-menu-item-hr'
        );
        const displayValueUlDropdownMenuHrDivider = addElement(
            displayValueUlDropdownMenuHr,
            'hr',
            'dropdown-divider'
        )
        }

    /* Переименовать */
    const displayValueUlDropdownMenuItemRename = addElement(
        displayValueUlDropdownMenu,
        'li',
        type + '__dropdown-menu-item-rename'
    );
    const displayValueUlDropdownMenuItemRenameLink = addElement(
        displayValueUlDropdownMenuItemRename,
        'button',
        [type + '__dropdown-menu-item-rename-link', 'dropdown-item', 'btn', 'btn-light'],
        {
            'type': 'button'
        }
    );
    displayValueUlDropdownMenuItemRenameLink.innerText = 'Переименовать';
    displayValueUlDropdownMenuItemRenameLink.addEventListener('click', function (event) {
        addName(parent, type, object); // Добавляем название для данных
        removeData(displayValues); // Удаляем группы, которые были добавлены
    });

    /* Удалить */
    const displayValueUlDropdownMenuItemDelete = addElement(
        displayValueUlDropdownMenu,
        'li',
        type + '__dropdown-menu-item-delete'
    );
    const displayValueUlDropdownMenuItemDeleteLink = addElement(
        displayValueUlDropdownMenuItemDelete,
        'button',
        [type + '__dropdown-menu-item-delete-link', 'dropdown-item', 'text-danger', 'btn', 'btn-light'],
        {
            'type': 'button'
        }
    );
    displayValueUlDropdownMenuItemDeleteLink.innerText = 'Удалить';
    displayValueUlDropdownMenuItemDeleteLink.addEventListener('click', function (event) {
        deleteObject(object); // Удаляем объект
        parent.remove(); // Удаляем родительский элемент
        displayRetailPriceInputFormControl.value = retailPrice(sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees); // Считаем розничную цену и выводим ее в поле для вывода
    })
}