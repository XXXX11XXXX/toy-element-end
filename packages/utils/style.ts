import { isNumber,isString } from "lodash-es";
const iStringNumber=(val:string):boolean=>{
    if(!isString(val)){
        return false;
    }
    return !Number.isNaN(Number(val));
}
export function addUnit(val:string|number,defaultUnit="px"){
    if(!val) return '';
    if(isNumber(val)||iStringNumber(val)) {
        return `${val}${defaultUnit}`
    }
    if(isString(val)){
        return val;
    }
}