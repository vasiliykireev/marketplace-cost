'use strict';

// Тарифы
// id: порядковый номер, число
// name: Наименование, строка
// type: fee - тариф маркетплейса
// value - значение расхода или прибыли, число

export let exampleFees = [{
        id: 1,
        name: "Обработка",
        type: "fee",
        value: 20
    },
    {
        id: 2,
        name: "Логистика",
        type: "fee",
        value: 300
    },
    {
        id: 3,
        name: "Последняя миля",
        type: "fee",
        value: 500
    }];