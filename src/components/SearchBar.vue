<script setup lang="ts">
import { ref } from 'vue';
import IconSearch from './icons/IconSearch.vue';
import IconClose from './icons/IconClose.vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const searchInput = ref<HTMLInputElement | null>(null);

function clearSearch() {
  emit('update:modelValue', '');
  searchInput.value?.focus();
}
</script>

<template>
  <div data-testid="search-bar" class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <IconSearch class="h-5 w-5 text-gray-400" />
    </div>
    <input
      ref="searchInput"
      data-testid="search-bar_input"
      type="text"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="Search notes..."
      class="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <button
      v-if="props.modelValue"
      data-testid="clear-search-button"
      @click="clearSearch"
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
      aria-label="Clear search"
    >
      <IconClose />
    </button>
  </div>
</template>
