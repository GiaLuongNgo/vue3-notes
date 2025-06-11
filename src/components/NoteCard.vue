<script setup lang="ts">
import type { Note } from '@/types/Note';
import IconClose from './icons/IconClose.vue';

defineProps<{
  note: Note;
}>();

const emit = defineEmits<{
  (e: 'delete', id: string): void;
}>();
</script>

<template>
  <div
    :style="{ background: note.color }"
    class="rounded-xl shadow-md p-3 pb-8 relative min-h-[140px] flex flex-col"
    data-testid="note-card"
  >
    <button
      @click="emit('delete', note.id)"
      class="absolute right-0 pr-3 flex items-center text-white hover:text-gray-600"
      aria-label="Delete Note"
    >
      <IconClose />
    </button>
    <p class="text-black font-normal whitespace-pre-wrap mb-auto">{{ note.content }}</p>
    <span class="absolute bottom-2 right-3 text-black font-bold text-base">
      {{ new Date(note.createdAt).toDateString() }}
    </span>
  </div>
</template>
