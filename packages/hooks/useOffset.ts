import { type Ref, computed } from "vue";

interface UseOffsetOptions {
  offset: number;
  boxHeight: Ref<number>;
  getLastBottomOffset(): number;
}

interface UseOffsetResult {
  topOffset: Ref<number>;
  bottomOffset: Ref<number>;
}

export function useOffset(opts: UseOffsetOptions): UseOffsetResult {
  const lastBottomOffset = computed(() => opts.getLastBottomOffset());
  //算最后一个元素的底部偏移量
  const topOffset = computed(() => opts.offset + lastBottomOffset.value);
// 计算当前元素的顶部偏移量
  const bottomOffset = computed(() => topOffset.value + opts.boxHeight.value);

  return {
    topOffset,
    bottomOffset,
  };
}

export default useOffset;