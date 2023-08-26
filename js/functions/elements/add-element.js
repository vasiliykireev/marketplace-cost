export function addElement(place, tag, classes, attributes) { // Добавить элемент: где, какой, классы — массив, атрибуты — объект
    const element = document.createElement(tag); // Создаем элемент
    switch(typeof(classes)) { // В зависимости от переданных классов
        case 'string': // Если строка
            element.classList.add(classes); // Добавляем в элемент название класса
            break;
        case 'object': // Если объект
            classes.forEach(className => { // Для каждого элемента
                element.classList.add(className); // Добавляем в элемент названия классов
            })
            break;
        default: console.warn("Классы не добавлены!")
    }
    if (typeof(attributes) === 'object') { // Если атрибуты переданы через объект
        let attributesKeys = Object.keys(attributes); // Создаем массив с данными в ключах объекта
        let attributesValues = Object.values(attributes); // Создаем массив с данными в значениях объекта
        let attributesIndex; // Создаем индекс для перебора массивов
        for (attributesIndex = 0; attributesIndex < attributesKeys.length; ++attributesIndex) { // Пока индекс меньше количества элементов в массиве с ключами
            element.setAttribute(attributesKeys[attributesIndex], attributesValues[attributesIndex]); // Добавляем атрибуты из ключа и значения под номером индекса
        }
    }
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}