import { mount } from '@vue/test-utils';
import HelloWorld from '../components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('正确渲染组件', () => {
    const wrapper = mount(HelloWorld);

    // 检查传递的 prop 是否正确渲染
    // expect(wrapper.find('h1').text()).toBe('Hello Jest');

    // // 检查 mockData 是否显示
    // expect(wrapper.text()).toContain('zhaowa jest mock data');

    // 检查 zhaowaNumber 是否计算正确
    expect(wrapper.text()).toContain('then number is: 18');
  });
});