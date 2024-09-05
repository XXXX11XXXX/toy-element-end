<script setup lang="ts">
import { ErTooltip,ErButton } from 'toy-element';
</script>
<template>
  <er-tooltip placement="top">
    <template #content> multiple lines<br />second line </template>
    <er-button>Top center</er-button>
  </er-tooltip>
</template>