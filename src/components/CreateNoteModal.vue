<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits<{
  (e: 'add', content: string): void;
  (e: 'close'): void;
}>();

const noteContent = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);

watch(
  () => props.open,
  (val) => {
    if (val) {
      nextTick(() => textareaRef.value?.focus());
      noteContent.value = '';
    }
  }
);

function handleAdd() {
  if (noteContent.value.trim()) {
    emit('add', noteContent.value.trim());
    noteContent.value = '';
  }
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    data-testid="create-note-modal"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
      <h2 class="text-2xl font-bold mb-4">Create a Note</h2>
      <textarea
        ref="textareaRef"
        data-testid="note-textarea"
        v-model="noteContent"
        class="w-full border border-gray-300 rounded-lg p-2 mb-4 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your note..."
        @keydown.enter.prevent="handleAdd"
      ></textarea>
      <div class="flex justify-end gap-2">
        <button
          @click="handleAdd"
          data-testid="add-note-button"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add a Note
        </button>
        <button
          @click="$emit('close')"
          data-testid="create-note-modal_cancel"
          class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
