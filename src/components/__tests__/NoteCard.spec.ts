import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NoteCard from '../NoteCard.vue';
import type { Note } from '@/types/Note';

describe('NoteCard', () => {
  const mockNote: Note = {
    id: '1',
    content: 'Test note content',
    color: '#ffffff',
    createdAt: new Date('2024-01-01'),
  };

  it('renders note content correctly', () => {
    const wrapper = mount(NoteCard, {
      props: {
        note: mockNote,
      },
    });

    expect(wrapper.find('[data-testid="note-card"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test note content');
    expect(wrapper.text()).toContain('Jan 01 2024');
  });

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(NoteCard, {
      props: {
        note: mockNote,
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
  });
});
