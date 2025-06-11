import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Note } from '@/types/Note';

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([]);
  const searchQuery = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 12;
  const sortOrder = ref<'asc' | 'desc'>('desc');

  const filteredNotes = computed(() => {
    return notes.value
      .filter((note) => note.content.toLowerCase().includes(searchQuery.value.toLowerCase()))
      .sort((a, b) => {
        const comparison = a.createdAt.getTime() - b.createdAt.getTime();
        return sortOrder.value === 'asc' ? comparison : -comparison;
      });
  });

  const paginatedNotes = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredNotes.value.slice(start, end);
  });

  const totalPages = computed(() => Math.ceil(filteredNotes.value.length / itemsPerPage));

  function getRandomColor() {
    const colors = [
      '#fbbf24', // yellow
      '#34d399', // green
      '#60a5fa', // blue
      '#f472b6', // pink
      '#a78bfa', // purple
      '#f87171', // red
      '#38bdf8', // sky
      '#facc15', // amber
      '#6ee7b7', // teal
      '#fdba74', // orange
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function addNote(content: string) {
    const note: Note = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date(),
      color: getRandomColor(),
    };
    notes.value.push(note);
  }

  function removeNote(id: string) {
    notes.value = notes.value.filter((note) => note.id !== id);
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
    currentPage.value = 1;
  }

  function setPage(page: number) {
    currentPage.value = page;
  }

  function setSortOrder(order: 'asc' | 'desc') {
    sortOrder.value = order;
  }

  return {
    notes,
    searchQuery,
    currentPage,
    sortOrder,
    filteredNotes,
    paginatedNotes,
    totalPages,
    addNote,
    removeNote,
    setSearchQuery,
    setPage,
    setSortOrder,
  };
});
