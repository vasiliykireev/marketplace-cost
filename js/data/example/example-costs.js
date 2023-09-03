'use strict';

// Расходы и прибыль
// id: порядковый номер, число
// name: Наименование, строка
// type: percent - процент от оптовой цены, fix - фиксированное значение
// percent - значение процента от оптовой цены, число
// value - значение расхода или прибыли, число

export let exampleCosts = [{   
    id: "cost-0",
    name: "Прибыль",
    type: "percent",
    percent: 20
},
{
    id: "cost-1",
    name: "Расходы",
    type: "fix",
    value: 500
}]

/*export function exampleCosts() {
    return [{   
        id: 1,
        name: "Прибыль",
        type: "percent",
        percent: 20
    },
    {
        id: 2,
        name: "Персонал 1",
        type: "fix",
        value: 200
    },
    {
        id: 3,
        name: "Персонал 2",
        type: "fix",
        value: 300
    },
    {
        id: 4,
        name: "Маркетинг 1",
        type: "percent",
        percent: 3
    }];
} */