<template>
  <div v-if="totalPages > 1" class="mt-8 flex justify-center gap-2">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('page-change', page)"
      :class="[
        'px-4 py-2 rounded-lg',
        currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300',
      ]"
      :data-testid="`pagination-button-${page}`"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalPages: number;
  currentPage: number;
}>();

defineEmits<{
  (e: 'page-change', page: number): void;
}>();
</script>
