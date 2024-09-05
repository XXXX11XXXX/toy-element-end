<script setup lang="ts">
import  ErTooltip  from '../Tooltip/Tooltip.vue';
import  ErButton  from '../Button/Button.vue';
import  ErIcon  from '../Icon/Icon.vue';
import { ref,computed } from 'vue';
import type {TooltipInstance} from '../Tooltip'
import type { PopconfirmProps,PopconfirmEmits } from './types';
import {addUnit}  from '@toy-element/utils'

defineOptions({
    name:"ErPopconfirm"
}) 
const tooltipRef=ref<TooltipInstance>();
const emits=defineEmits<PopconfirmEmits>();
const style =computed(()=>({width:addUnit(props.width)}))
const props=withDefaults(defineProps<PopconfirmProps>(),{
  title: "",
  confirmButtonType: "primary",
  icon: "question-circle",
  iconColor: "#f90",
  hideAfter: 200,
  width: 150,
  cancelButtonText:"no",
  confirmButtonText:"yes"
});
function hidePopper(){
    tooltipRef.value?.hide;
}
function confrim(e:MouseEvent){
    emits('confirm',e);
    hidePopper();
}
function cancel(e:MouseEvent){
    emits("cancel",e);
    hidePopper();
}

</script>
<template>
    <ErTooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
        <template #content>
            <div class="er-popconfirm" :style="style">
                <div class="er-popconfirm__main">
                    <er-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
                    {{ title }}
                </div>
            </div>
            <div class="erpopconfirm__action">
                <ErButton size="small" :type="cancelButtonType" @click="cancel">
                    {{cancelButtonText}}

                </ErButton>
                <ErButton size="small" :type="confirmButtonType" @click="confrim">
                    {{confirmButtonText}}
                </ErButton>
            </div>
        </template>
        <template v-if="$slots.default" #default>
            <slot name="default"></slot>
        </template>
        <template v-if="$slots.reference" #defaul>
            <slot name="default"></slot>
        </template>
    </ErTooltip>
</template>
<style scoped>
@import './style.css'
</style>