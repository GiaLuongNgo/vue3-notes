<script setup lang="ts">
import { ref } from 'vue';
import IconSort from './icons/IconSort.vue';

const emit = defineEmits<{
  (e: 'update:sortOrder', value: 'asc' | 'desc'): void;
}>();

const sortOrder = ref<'asc' | 'desc'>('desc');

function toggleSort() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  emit('update:sortOrder', sortOrder.value);
}
</script>

<template>
  <button
    data-testid="sort-control"
    @click="toggleSort"
    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
  >
    <span data-testid="sort-control_label" class="text-gray-700">Sort by Date</span>
    <IconSort class="text-gray-600" :class="{ 'transform rotate-180': sortOrder === 'asc' }" />
  </button>
</template>
