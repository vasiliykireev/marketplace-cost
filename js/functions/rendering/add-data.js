'use strict';

import { addElement } from './add-element.js'; // Импортируем функцию добавления элемента
import { wholesalePrice, costs, commissions, fees } from '../../../script.js'; // Импортируем оптовую цену, расходы, комиссии и тарифы
import { inputRetailPrice } from '../../../script.js'; // Импортируем объект поля для ввода розничной цены
import { inputWholesalePrice } from '../../../script.js'; // Импортируем объект поля для ввода оптовой цены
import { retailPrice } from '../logic/retail-price.js'; // Импортируем функцию расчета розничной цены
import { deleteObject } from '../logic/delete-object.js'; // Импортируем функцию удаления объекта
import { addName } from './add-name.js'; // Импортируем функцию добавления названия
import { captions } from '../../../script.js'; // Импортируем подписи
import { deleteData } from './delete-data.js';

/* Логи */
let logs = true; // true - выводим логи, false - не выводим логи

export function addData(place, parentClass, type, object) { // Добавить данные: родительский элемент, класс, тип, объект
    let dataGroup = []; // Определяем все группы, которые будут добавлены
    const dataInputGroup = addElement( // Добавляем группу ввода основного значения
        place,
        'div',
        [parentClass + '__input-group', parentClass + '__input-group' + '_type_' + type, 'input-group']
    );
    const dataFormFloating = addElement( // Добавляем плавающие подписи
        dataInputGroup,
        'div',
        [parentClass + '__form-floating', parentClass + '__form-floating'  + '_type_' + type , 'form-floating']
    );
    const dataFormControl = addElement( // Добавляем поле для ввода значения
        dataFormFloating,
        'input',
        [parentClass + '__form-control', parentClass + '__form-control' + '_type_' + type, 'form-control'],
        {
            'type': 'number',
            'min': 0,
            'step': 0.01,
            'placeholder': null,
            'id': 'data-' + object.id,
            'name': 'data-' + object.id
        });
    const dataFormControlLabel = addElement(dataFormFloating, 'label', parentClass + '__label', {'for': 'data-' + object.id}); // Добавляем подпись для поля для ввода значения
    dataGroup.push(dataInputGroup); // Добавляем группу для ввода основного значения в добавленные данные
    let percentInputGroup; // Определяем группу для вывода значения от процентов
    switch (object.type) { // В зависимости от типа объекта
        case 'fix': // Если фиксированная цена
            dataFormControl.value = object.value; // Добавляем значение объекта в поле для ввода значения
            dataFormControlLabel.innerText = object.name + ', ' + captions.currency; // Добавляем подпись из названия объекта и валюты для ввода значения
            dataFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода
                object.value = Number(dataFormControl.value).toFixed(2); // Записываем значение поля для ввода в значение объекта
                inputRetailPrice.value = retailPrice(wholesalePrice, costs, commissions, fees); // Считаем розничную цену и выводим ее в поле для вывода
            })
        break;
        case 'percent': // Если процент от оптовой цены
            dataFormControl.value = object.percent; // Добавляем процент объекта в поле для ввода значения
            dataFormControlLabel.innerText = object.name + ', %'; // Добавляем подпись из названия объекта и процента
            percentInputGroup = addElement(place, 'div', [parentClass + '__input-group', parentClass + '__input-group_type_percent', 'input-group']); // Добавляем группу для вывода значения от процентов
            const percentFormFloating = addElement(percentInputGroup, 'div', [parentClass + '__-form-floating', parentClass + '__-form-floating_type_percent', 'form-floating']); // Добавляем плавающие подписи
            const percentFormControl = addElement( // Добавляем поле для вывода значения от процентов
                percentFormFloating,
                'input',
                [parentClass + '__form-control-plaintext', parentClass + '__form-control-plaintext_type_percent', 'form-control-plaintext'],
                {
                    'type': 'number',
                    'min': 0,
                    'step': 0.01,
                    'placeholder': null,
                    'id': 'value-' + object.id,
                    'readonly': true
                });
            const percentFormControlLabel = addElement(percentFormFloating, 'label', [parentClass + '__value-label', parentClass + '__value-label_type_percent'], {'for': 'value-' + object.id}); // Добавляем подпись для вывода значения от процентов
            percentFormControl.value = object.value; // Добавляем значение объекта в поле для вывода значения от процентов
            percentFormControlLabel.innerText = object.name + ', ' + captions.currency; // Добавляем подпись из названия объекта и валюты для ввода значения
            dataGroup.push(percentInputGroup);
            dataFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода
                object.percent = Number(dataFormControl.value).toFixed(2); // Записываем значение поля для ввода в процент объекта
                inputRetailPrice.value = retailPrice(wholesalePrice, costs, commissions, fees); // Считаем розничную цену и выводим ее в поле для вывода
                percentFormControl.value = object.value; // Записываем значение объекта в поле для вывода значения от процентов
            })
            inputWholesalePrice.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода оптовой цены
                object.percent = Number(dataFormControl.value).toFixed(2); // Записываем значение поля для ввода в процент объекта
                percentFormControl.value = object.value; // Добавляем значение объекта в поле для вывода значения от процентов
            })
        break;
        case 'commission': // Если комиссия
            dataFormControl.value = object.percent; // Добавляем процент объекта в поле для ввода значения
            dataFormControlLabel.innerText = object.name + ', %'; // Добавляем подпись из названия объекта и процента
            dataFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в подпись для поля для ввода значения
                object.percent = Number(dataFormControl.value).toFixed(2); // Заполняем процент числом из поля для ввода значения с копейками
                inputRetailPrice.value = retailPrice(wholesalePrice, costs, commissions, fees); // Считаем розничную цену и выводим ее в поле для вывода
            })
        break;
        case 'fee': // Если тариф
            dataFormControl.value = object.value; // Добавляем значение объекта в поле для ввода значения
            dataFormControlLabel.innerText = object.name + ', ' + captions.currency; // Добавляем подпись из названия объекта и валюты для ввода значения
            dataFormControl.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода
                object.value = Number(dataFormControl.value).toFixed(2); // Записываем значение поля для ввода в значение объекта
                inputRetailPrice.value = retailPrice(wholesalePrice, costs, commissions, fees); // Считаем розничную цену и выводим ее в поле для вывода
            })
        break;
    }
    dataFormControl.focus();
    const dataDropdown = addElement(
        dataInputGroup,
        'button', [parentClass + '__dropdown-options', 'btn', 'btn-secondary', 'dropdown-toggle'],
        {
            'data-bs-toggle': 'dropdown',
            'aria-label': 'Изменить',
            'aria-expanded': 'false'
        }
        );
    const dataDropdownMenu = addElement(
        dataInputGroup,
        'ul',
        [parentClass + '__dropdown-menu', 'dropdown-menu', 'dropdown-menu-end']
    );
    let dataDropdownMenuItemFix;
    let dataDropdownMenuItemPercent;
    let dataDropdownMenuHr;

    /* Фиксированная стоимость */
    if (object.type === 'fix' || object.type === 'percent') {
        dataDropdownMenuItemFix = addElement(
            dataDropdownMenu,
            'li',
            parentClass + '__dropdown-menu-item-fix'
        );
        const dataDropdownMenuItemFixLink = addElement(
            dataDropdownMenuItemFix,
            'button',
            [parentClass + '__dropdown-menu-item-fix-link', 'dropdown-item', 'btn', 'btn-light'],
            {
                'type': 'button'
            }
        );
        dataDropdownMenuItemFixLink.innerText = 'Фиксированная стоимость';
        if (object.type === 'fix') {
            dataDropdownMenuItemFixLink.setAttribute('disabled', 'true');
        }
        dataDropdownMenuItemFixLink.addEventListener('click', function (event) {
            deleteData(dataGroup); // Удаляем группы, которые были добавлены
            object.type = 'fix';
            inputRetailPrice.value = retailPrice(wholesalePrice, costs, commissions, fees); // Считаем розничную цену и выводим ее в поле для вывода
            addData(place, parentClass, type, object); // Добавляем данные заново
        });

        /* Процент от оптовой цены */
            dataDropdownMenuItemPercent = addElement(
                dataDropdownMenu,
                'li',
                parentClass + '__dropdown-menu-item-percent'
            );
            const dataDropdownMenuItemPercentLink = addElement(
                dataDropdownMenuItemPercent,
                'button',
                [parentClass + '__dropdown-menu-item-percent-link', 'dropdown-item', 'btn', 'btn-light'],
                {
                    'type': 'button'
                }
            );
            dataDropdownMenuItemPercentLink.innerText = 'Процент от оптовой цены';
            if (object.type === 'percent') {
                dataDropdownMenuItemPercentLink.setAttribute('disabled', 'true');
            }
            dataDropdownMenuItemPercentLink.addEventListener('click', function (event) {
                deleteData(dataGroup); // Удаляем группы, которые были добавлены
                object.type = 'percent';
                inputRetailPrice.value = retailPrice(wholesalePrice, costs, commissions, fees); // Считаем розничную цену и выводим ее в поле для вывода
                console.log(object);
                addData(place, parentClass, type, object); // Добавляем данные заново
            });

        /* Разделитель */
        dataDropdownMenuHr = addElement(
            dataDropdownMenu,
            'li',
            parentClass + '__dropdown-menu-item-hr'
        );
        const dataDropdownMenuHrDivider = addElement(
            dataDropdownMenuHr,
            'hr',
            'dropdown-divider'
        )
        }

    /* Переименовать */
    const dataDropdownMenuItemRename = addElement(
        dataDropdownMenu,
        'li',
        parentClass + '__dropdown-menu-item-rename'
    );
    const dataDropdownMenuItemRenameLink = addElement(
        dataDropdownMenuItemRename,
        'button',
        [parentClass + '__dropdown-menu-item-rename-link', 'dropdown-item', 'btn', 'btn-light'],
        {
            'type': 'button'
        }
    );
    dataDropdownMenuItemRenameLink.innerText = 'Переименовать';
    dataDropdownMenuItemRenameLink.addEventListener('click', function (event) {
        addName(place, parentClass, type, object); // Добавляем название для данных
        deleteData(dataGroup); // Удаляем группы, которые были добавлены
    });

    /* Удалить */
    const dataDropdownMenuItemDelete = addElement(
        dataDropdownMenu,
        'li',
        parentClass + '__dropdown-menu-item-delete'
    );
    const dataDropdownMenuItemDeleteLink = addElement(
        dataDropdownMenuItemDelete,
        'button',
        [parentClass + '__dropdown-menu-item-delete-link', 'dropdown-item', 'text-danger', 'btn', 'btn-light'],
        {
            'type': 'button'
        }
    );
    dataDropdownMenuItemDeleteLink.innerText = 'Удалить';
    dataDropdownMenuItemDeleteLink.addEventListener('click', function (event) {
        deleteObject(object); // Удаляем объект
        place.remove(); // Удаляем родительский элемент
        inputRetailPrice.value = retailPrice(wholesalePrice, costs, commissions, fees); // Считаем розничную цену и выводим ее в поле для вывода
    })
}