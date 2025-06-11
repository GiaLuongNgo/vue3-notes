import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SortControl from '../SortControl.vue';

describe('SortControl', () => {
  it('renders properly', () => {
    const wrapper = mount(SortControl);
    expect(wrapper.find('[data-testid="sort-control"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="sort-control_label"]').text()).toBe('Sort by Date');
    expect(wrapper.find('[data-testid="icon-sort"]').exists()).toBe(true);
  });

  it('emits update:sortOrder event when clicked', async () => {
    const wrapper = mount(SortControl);
    await wrapper.find('[data-testid="sort-control"]').trigger('click');
    expect(wrapper.emitted('update:sortOrder')).toBeTruthy();
    expect(wrapper.emitted('update:sortOrder')?.[0]).toEqual(['asc']);
  });
});
