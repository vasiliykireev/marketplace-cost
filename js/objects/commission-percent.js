'use strict';

import { Commission } from "./commission.js";
import { CommissionValue } from "./commission-value.js";
import { roundToHundredths } from "../functions/round-to-hundredths.js";

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('commission.js');}

/**
 * Процентная комиссия
 */
export class CommissionPercent extends Commission {
        /**
     * Создает процентную комиссию. Выводит комиссию, но если не заполнено имя, выводит редактирование затраты.
     * @param {Object} unit Объект юнита для расчета экономики
     * @param {Object} expenditure Объект типа комиссии
     * @param {String} name Название комиссии
     * @param {Number} percent Процент комиссии
     */
        constructor(unit, expenditure, name, percent){
            super(unit, expenditure, name);
            this.type = 'commission-percent';
            this.percent = roundToHundredths(percent);

            this.create(this.type);
            if(this.name == null) {
                this.edit();
            } else {
                this.show();
            }
        }
    
        /** Процент комиссии */
        percent = new Number;

        showContent() {
            this.showChangeType(this.type);
            this.showPercent();
        }
        removeContent() {
            // Удалить
            this.removeChangeType();
    
            // Удалить переключение типа комиссии
            this.removePercent();
        }

        // Переключение комиссий
        replaceCommissionValue() {
            this.storage.splice(this.storage.indexOf(this), 1, new CommissionValue(this.unit, this.expenditure, this.name, this.value));

            this.element.block.remove();
    
            this.unit.marketplacePrice.change(this.unit);
        }
}