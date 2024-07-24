// 独立模块 的 rěducer 代码
interface ProductState {
    products: string[];
}
const initialState: ProductState = {
    products: []
};

//定义action类型
const ADD_PRODUCT = 'ADD_PRODUCT';

export function addProduct(product: string) {
    return {
        type: ADD_PRODUCT,
        payload: product
    }
}

function productReducer(state = initialState, action: any): ProductState {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state, products: [...state.products, action.payload]
            }
        default:
            return state;
    }
}
export default productReducer; 