'use strict';

import { Expenditure } from "./expenditure.js";
import { roundToHundredths } from "../functions/utilities/round-to-hundredths.js";


/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = false;
if(logs){console.log('cost.js');}

/**
 * Расход
 */
export class Cost extends Expenditure {
/**
 * Создает расход. Выводит расход, но если не заполнено имя, выводит редактирование затраты.
 * @param {Object} unit Объект юнита для расчета экономики
 * @param {Object} expenditure Объект типа затраты
 * @param {String} name Название расхода
 * @param {String} value Значение расхода
 */
    constructor(unit, expenditure, name, value){
        super(unit, expenditure, name);
        this.type = 'cost';
        this.value = roundToHundredths(value);

        Object.defineProperties(this.element.name, {
            newTitle: {value: 'Новый расход'},
            editTitle: {value: 'Редактировать расход'},
        });

        this.create(this.type);
        if(this.name == null) {
            this.edit();
        } else {
            this.show();
        }
    }
    /** Значение расхода */
    value = new Number();

    /**
     * Вывести затрату
     * - Убирает кнопку удаления затраты
     * - Добавляет заголовок
     * - Добавляет кнопку редактирования затраты
     * - Добавляет значение
     */
    show() {
        if(logs){
            console.log('expenditure show');
            console.log(this.name);
        }

        this.removeHeaderDeleteButton();
        this.showHeading();
        this.showHeaderEditButton();
        this.showContent();

        if(logs){console.log('');}
    }
}