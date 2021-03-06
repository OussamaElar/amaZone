import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from "../actions/product_actions";

const ProductsReducer = (state = {}, action) => {
      Object.freeze(state);
      const nextState = Object.assign({}, state);
      switch (action.type) {
            case RECEIVE_PRODUCTS:
                  return action.products;
            case RECEIVE_PRODUCT:
                  nextState[action.product.id] = action.product
                  return nextState;
            default:
                  return state;
           
      }
}

export default ProductsReducer;