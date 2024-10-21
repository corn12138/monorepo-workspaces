describe('my-vue3 e2e', () => {
    it('always pass', () => {
        expect(true).to.equal(true);
    })
});
describe('my-vue3 web e2e',()=>{
    it('my-vue3 test',()=>{
        //访问一个页面
        cy.visit('http://localhost:3000');
        //获取页面元素
        cy.contains('zhaowa jest');
    })
})