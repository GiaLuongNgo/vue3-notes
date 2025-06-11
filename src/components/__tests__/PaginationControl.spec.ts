import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PaginationControl from '../PaginationControl.vue';

describe('PaginationControl', () => {
  it('renders nothing when totalPages is 1', () => {
    const wrapper = mount(PaginationControl, {
      props: {
        totalPages: 1,
        currentPage: 1,
      },
    });
    expect(wrapper.find('div').exists()).toBe(false);
  });

  it('renders correct number of page buttons', () => {
    const totalPages = 5;
    const wrapper = mount(PaginationControl, {
      props: {
        totalPages,
        currentPage: 1,
      },
    });
    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(totalPages);
  });

  it('highlights current page correctly', () => {
    const currentPage = 3;
    const wrapper = mount(PaginationControl, {
      props: {
        totalPages: 5,
        currentPage,
      },
    });
    const buttons = wrapper.findAll('button');
    buttons.forEach((button, index) => {
      const pageNumber = index + 1;
      if (pageNumber === currentPage) {
        expect(button.classes()).toContain('bg-blue-500');
      } else {
        expect(button.classes()).toContain('bg-gray-200');
      }
    });
  });
});
