import { Model } from "../mongo";

const schema = {
    page_id: String,
    components:{} // 这里是一个对象，存放页面的组件
}

const pageModel = Model('page', schema);

export default pageModel;