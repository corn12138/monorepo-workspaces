// const top = require('../top');
import top from '../top';
//
describe('top function test', () => {
    // 测试用例
    test('it should be summary result below 10', () => {
        // 测试内容
        const input = {
            number:9,
            sum:1
        }

        // 预期
        const output = 10

        expect(top(input.number,input.sum)).toBe(output);//toBe是jest的断言方法
    });
}); 