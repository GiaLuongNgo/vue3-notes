<script setup lang="ts">
import { ref } from 'vue';
import { useNotesStore } from '@/stores/notes';
import NoteCard from '@/components/NoteCard.vue';
import CreateNoteModal from '@/components/CreateNoteModal.vue';
import SortControl from '@/components/SortControl.vue';
import SearchBar from '@/components/SearchBar.vue';
import PaginationControl from '@/components/PaginationControl.vue';

const store = useNotesStore();
const showModal = ref(false);
const backgroundStyle = ref({});
const searchQuery = ref('');

function handleAddNote(content: string) {
  store.addNote(content);
  showModal.value = false;
}

function handleSortOrderChange(order: 'asc' | 'desc') {
  store.setSortOrder(order);
}

function handleSearch(query: string) {
  searchQuery.value = query;
  store.setSearchQuery(query);
}
</script>

<template>
  <div class="min-h-screen p-4" :style="backgroundStyle">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">My Notes</h1>
      <button
        data-testid="create-note-button"
        @click="showModal = true"
        class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl shadow-lg hover:bg-blue-600 z-50"
        aria-label="Create Note"
      >
        +
      </button>
    </div>
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col justify-between md:flex-row gap-4 mb-6">
        <SearchBar v-model="searchQuery" @update:modelValue="handleSearch" />
        <SortControl @update:sort-order="handleSortOrderChange" />
      </div>

      <div
        data-testid="note-items"
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-4"
      >
        <NoteCard
          v-for="note in store.paginatedNotes"
          :key="note.id"
          :note="note"
          @delete="store.removeNote"
        />
      </div>

      <PaginationControl
        :total-pages="store.totalPages"
        :current-page="store.currentPage"
        @page-change="store.setPage"
      />
    </div>
    <CreateNoteModal :open="showModal" @add="handleAddNote" @close="showModal = false" />
  </div>
</template>
