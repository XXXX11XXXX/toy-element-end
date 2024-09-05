<script setup lang="ts">
import { ErPopconfirm } from 'toy-element';
import { ErButton } from 'toy-element';
</script>
<template>
  <er-popconfirm 
    width="220"
    confirm-button-text="Delete"
    cancel-button-text="No,Thanks"
    icon="trash"
    icon-color="#626aef"
    title="Are you sure to delete this item?"
  >
    <er-button>Delete</er-button>
  </er-popconfirm>
</template>