import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeContainer from '../welcome/welcome_container';
import Phone from '../../../app/assets/images/mate_30.jpg'
import FooterContianer from '../welcome/footer_container';


class ProductShow extends React.Component {
      componentDidMount() {
            this.props.fetchProduct(this.props.match.params.productId)
      }

      render() {
            const { product } = this.props;
            // let price = product.productPrice;
            if (product === undefined) return null 
                  return(
                  <div>
                        <header><WelcomeContainer/></header>
                        <div className="container-show">
                              <img className="show-image" src={product.photoUrl}></img>
                              <div className="grid-show-1">
                                    <p className="product-show-name">{product.productName}</p>
                                    <p className="show-rating">⭐️⭐️⭐️</p>
                                    <p className="product-show-lprice">List Price: <span>${((product.productPrice * 1.2).toFixed(2)) }</span></p>
                                    <p className="product-show-price">Price: <span>${(product.productPrice * 1).toFixed(2)}</span></p>
                                    <p className="product-description">{product.productDescription}</p>
                              </div>
                              <div className="grid-show-2">
                                    <p className="product-show-price"><span>${product.productPrice}</span></p>
                                    <p className="free-return">& FREE Return</p>
                                    <p><span className="free-return">FREE delivery</span></p>
                                    <p>Fast delivery: <span className="fast-delivery">Tomorrow</span></p>
                                    <p className="deliver-to"><i className="fa fa-map-marker"></i>Deliver to { this.props.currentUser.username}</p>
                                    <p className="product-show-invetory">{product.productInventory} Items left.</p>
                                    <div className="buttons">
                                          <button className="show-button-1">Add to Cart</button>
                                          <button className="show-button-2">Buy Now</button>
                                    </div>
                                    <p className="regular-font">Ships from and sold by amaZone.com</p>
                              </div>
                        </div>
                        <FooterContianer/>
                  </div>
            )

      }
}

export default ProductShow;