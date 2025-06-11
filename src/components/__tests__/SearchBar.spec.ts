import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../SearchBar.vue';

describe('SearchBar', () => {
  it('renders properly', () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
    });
    expect(wrapper.find('[data-testid="search-bar"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="search-bar_input"]').exists()).toBe(true);
  });

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
    });
    await wrapper.find('[data-testid="search-bar_input"]').setValue('test search');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test search']);
  });

  it('shows clear button when there is input', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'test',
      },
    });
    expect(wrapper.find('[data-testid="clear-search-button"]').exists()).toBe(true);
  });

  it('hides clear button when there is no input', () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
    });
    expect(wrapper.find('[data-testid="clear-search-button"]').exists()).toBe(false);
  });

  it('clears input when clear button is clicked', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'test',
      },
    });
    await wrapper.find('[data-testid="clear-search-button"]').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
  });
});
