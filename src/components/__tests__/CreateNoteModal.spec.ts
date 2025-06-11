import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CreateNoteModal from '../CreateNoteModal.vue';

describe('CreateNoteModal', () => {
  it('renders when open prop is true', () => {
    const wrapper = mount(CreateNoteModal, {
      props: {
        open: true,
      },
    });

    expect(wrapper.find('[data-testid="create-note-modal"]').exists()).toBe(true);
  });

  it('does not render when open prop is false', () => {
    const wrapper = mount(CreateNoteModal, {
      props: {
        open: false,
      },
    });

    expect(wrapper.find('[data-testid="create-note-modal"]').exists()).toBe(false);
  });

  it('emits close event when Cancel button is clicked', async () => {
    const wrapper = mount(CreateNoteModal, {
      props: {
        open: true,
      },
    });

    await wrapper.find('[data-testid="create-note-modal_cancel"]').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('clears content when modal is opened', async () => {
    const wrapper = mount(CreateNoteModal, {
      props: {
        open: true,
      },
    });

    const textarea = wrapper.find('textarea');
    await textarea.setValue('Some content');

    await wrapper.setProps({ open: false });
    await wrapper.setProps({ open: true });
    expect(wrapper.find('textarea').element.value).toBe('');
  });
});
