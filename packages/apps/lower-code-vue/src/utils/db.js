import Dexie from 'dexie'; // 引入dexie -- 一个indexDB的封装库
const db = new Dexie('lower-code-db'); // 实例化一个dexie对象，构造函数的参数是数据库名称

db.version(1).stores({ // 定义数据库的数据结构
    pages: '++id,page_id,step,components',
});
// 获取页面列表
export async function findLatest(page_id) {
    return await db.pages.where({ page_id }).last();
}
// 添加页面
export async function addPage(page_id, components) {
    // 保存页面的时候，先查找最新的记录
    const record = await findLatest(page_id);
    // 如果有最新的记录，就在最新的记录上加一步
    const step = record && record.step ? record.step + 1 : 1;
    return await db.pages.add({ page_id, components, step });
}
// 删除页面
export async function removePage(page_id) {
    return await db.pages.where({ page_id }).delete();
}