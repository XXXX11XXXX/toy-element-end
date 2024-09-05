import type { Placement,Options } from "@popperjs/core";
export interface TooltipProps{
    content?:string;
    trigger?:'hover'|'click'|'context'//触发方式
    placement?:Placement;
    manual?:boolean;//手动触发
    popperOptions?:Partial<Options>;
    transition?:string;
    showTimeout?:number;
    hideTimeout?:number;//延时防止距离计算节点不包含在内导致的消失
    disabled?: boolean;
}
export interface TooltipEmits {
    (e: "visible-change", value: boolean): void;
    (e: "click-outside"): void;
  }
  
  export interface TooltipInstance {
    show(): void;
    hide(): void;
  }