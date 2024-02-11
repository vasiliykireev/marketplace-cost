'use strict';

import { Commission } from "./commission.js";
import { CommissionPercent } from "./commission-percent.js";
import { roundToHundredths } from "../functions/round-to-hundredths.js";

/**
 * Логи
 * @type {boolean} true: выводить, false: не выводить
 */
let logs = true;
if(logs){console.log('commission.js');}

/**
 * Фиксированная комиссия
 */
// export class CommissionValue extends Commission {
//         /**
//      * Создает фиксированную комиссию. Выводит комиссию, но если не заполнено имя, выводит редактирование затраты.
//      * @param {Object} unit Объект юнита для расчета экономики
//      * @param {Object} expenditure Объект типа комиссии
//      * @param {String} name Название комиссии
//      * @param {Number} value Процент комиссии
//      */
//         constructor(unit, expenditure, name, replace, value){
//             super(unit, expenditure, name);
//             this.commission.type = 'commission-value';
//             this.value = roundToHundredths(value);

//             if(replace == false) {this.create(this.type);}
//             if(this.name == null) {
//                 this.edit();
//             } else {
//                 this.show();
//             }
//         }
    
//         /** Процент комиссии */
//         value = new Number;

//         showContent() {
//             this.showChangeType(this.commission.type);
//             this.showValue();
//         }
//         removeContent() {
//             // Удалить
//             this.removeChangeType();
    
//             // Удалить переключение типа комиссии
//             this.removeValue();
//         }

//         // Переключение комиссий
//         replaceCommissionPercent() {
//             this.storage.splice(this.storage.indexOf(this), 1, new CommissionPercent(this.unit, this.expenditure, this.name, true, this.percent));

//             // this.element.block.remove();
    
//             this.unit.marketplacePrice.change(this.unit);
//         }
// }