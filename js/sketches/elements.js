"use strict";

function addInputGroup(className, place) { // Функция добавления группы ввода с переданным именем класса и местом
    const element = document.createElement("div"); // Создаем элемент
    element.classList.add(className, "input-group"); // Добавляем в него названия классов
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function addFormFloating(className, place) { // Функция добавления плавающей формы с переданным именем класса и местом
    const element = document.createElement("div"); // Создаем элемент
    element.classList.add(className, "form-floating"); // Добавляем в него названия классов
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function addFormControl(className, place) { // Функция добавления поля для ввода с переданным именем класса и местом
    const element = document.createElement("input"); // Создаем поле для ввода
    element.classList.add(className, "form-control"); // Добавляем в него названия классов
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function setFormControlNumber(element, min, step) { // Функция преобразование поля для ввода только для чисел с переданным элементом, минимальным значением и шагом 
    element.setAttribute("type", "number"); // Устанавливаем тип число
    element.setAttribute("min", min); // Устанавливаем минимальное значение
    element.setAttribute("step", step); // Устанавливаем шаг
    return element; // Возвращаем элемент
}

function addFormControlLabel(className, place, label) { // Функция добавления подписи с переданным именем класса, местом и подписью
    const element = document.createElement("label"); // Создаем подпись
    element.classList.add(className); // Добавляем в него названия классов
    element.innerText = label; // Добавляем подпись
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function addButton(className, place) { // Функция добавления кнопки с переданным именем класса, местом и стилистикой
    const element = document.createElement("button"); // Создаем кнопку
    element.classList.add(className, "btn"); // Добавляем в него названия классов
    element.setAttribute("type", "button"); // Устанавливаем тип кнопка
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function addNameButtonDelete(className, place) { // Функция добавления кнопки удаления названия с переданным именем класса и местом
    const element = addButton(className + "__button-delete", place); // Добавляем кнопку
    element.classList.add("btn-danger"); // Добавляем красный фон
    element.setAttribute("aria-label", "Удалить"); // Добавляем подпись для доступности
    element.innerHTML = '<i class="bi bi-trash-fill"></i>'; // Добавляем иконку корзины
    return element; // Возвращаем кнопку
}
function addNameButtonSave(className, place) { // Функция добавления кнопки добавления названия с переданным с именем класса и местом
    const element = addButton(className + "__button-save", place); // Добавляем кнопку
    element.classList.add("btn-primary"); // Добавляем основной фон
    element.setAttribute("aria-label", "Сохранить"); // Добавляем подпись для доступности
    element.innerHTML = '<i class="bi bi-check"></i>'; // Добавляем иконку галочки
    return element;
}

function addDataButtonActions(className, place) { // Функция добавляения кнопки изменения данных с переданным именем класса и местом
    const element = addButton(className + "__button-actions", place);
    element.classList.add("btn-primary", "dropdown-toggle"); // Добавляем основной фон и выпадающий треугольник
    element.setAttribute("data-bs-toggle", "dropdown"); // Добавляем логику выдадающего меню
    element.setAttribute("aria-expanded", "false"); // Добавляем информацию для доступности
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
    
}

function addDataButtonOptionRename(className, place, name) { // Функция добавляения кнопки изменения данных с переданным именем класса, местом и именем

}

function addDataButtonOptionDelete (className, place, name) { // Функция добавляения кнопки удаления данных с переданным именем класса, местом и именем

}

function addBlock(className, place) { // Функция добавления нового элемента с переданным именем класса и местом
    const element = document.createElement("div"); // Создаем элемент
    element.classList.add(className); // Добавляем нужный класс и отступ снизу
    place.append(element); // Размещаем элемент
    return element; // Возвращаем элемент
}