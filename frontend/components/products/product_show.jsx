import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeContainer from '../welcome/welcome_container';
import Phone from '../../../app/assets/images/mate_30.jpg'
import FooterContianer from '../welcome/footer_container';
import ReviewsIndexContainer from '../reviews/reviews_index_container';
import StarRatingComponent from 'react-star-rating-component'
import { withRouter } from 'react-router';




class ProductShow extends React.Component {
      constructor(props) {
            super(props)
            this.state = {
                  quantity: 1,
                  overAllRating: 5,
                  reviews: this.props.reviews
            }
            this.qtyChange = this.qtyChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
            this.cartHasItems = this.cartHasItems.bind(this)
      }
      componentDidMount() {
            this.props.fetchProduct(this.props.match.params.productId);
            this.props.fetchReviews(this.props.match.params.productId)
            if (this.props.loggedIn) {

                  this.props.fetchCartItems();
            }
            
      }


      componentDidUpdate(nextProps){
            if (nextProps.reviews.length !== this.props.reviews.length) {
                
                  this.setState({overAllRating: this.renderRating()})
            }
            
      }

      componentWillUnmount() {
            location.reload()
      }
      
      
      qtyChange(e) {
            e.preventDefault();
            this.setState({quantity: e.target.value})
      }
      
      cartHasItems() {
           return this.props.cartItems.some((cartItem) => (cartItem.productId === this.props.product.id))                             
      }
      
      handleSubmit(e) {
            e.preventDefault();
            if (!this.props.loggedIn) {
                  this.props.history.push("/login");
            } else {
                  const cartItem = {
                        user_id: this.props.currentUser.id,
                        product_id: this.props.product.id,
                        quantity: parseInt(this.state.quantity)
                  };

                  let cartItemId;
                  this.props.cartItems.forEach((cartItem) => {
                        if (cartItem.productId === this.props.product.id) {
                        cartItemId = cartItem.id
                  }
                  });

                  const currentItem = this.props.cartItems.filter(
                        (cartItem) => cartItem.id === cartItemId
                  );

                  const currentQuantity = currentItem.length > 0 ? currentItem[0].quantity : 0;
          
                  const updatedCartItem = {
                        quantity: currentQuantity + parseInt(this.state.quantity),
                        product_id: this.props.product.id,
                        user_id: this.props.currentUser.id,
                        id: cartItemId
                  }

                  if (this.cartHasItems()) {
                        this.props.updateCartItem(updatedCartItem).then(() => this.props.history.push('/cart'))
                  } else {
                        this.props.createCartItem(cartItem).then(() => this.props.history.push('/cart'));
                  }
            }
            

      }

      handleBuy(e) {
            e.preventDefault()
            this.props.history.push('/success');
      }

      renderRating() {
            // let productRating;
            const { product, reviews } = this.props;
            let totalRating = 0;
            let overAllRating = 1;
            if (reviews.length !== 0) {

                  reviews.forEach(review => {
                        if (review.rating !== undefined) {
                              
                              totalRating += review.rating;
                        }
                  });
                  overAllRating = Math.round(totalRating / reviews.length)
                  // productRating = <ReactStars count={5} value={overAllRating} size={20} edit={false} isHalf={true} activeColor="#ffd700" />
                 
            }
            return overAllRating
      }


     

      render() {
            const { product, reviews } = this.props;
            if (product === undefined) return null
            // let productRating = (<ReactStars count={5} value={this.renderRating()} size={20} edit={false} isHalf={true} activeColor="#ffd700" />)
            // if (!this.renderRating()) {
            //      productRating.push(<ReactStars count={5} value={this.renderRating()} size={20} edit={false} isHalf={true} activeColor="#ffd700" />)
            // }
            // let productRating;
            // let totalRating = 0;
            // let overAllRating = 1;
            // if (reviews !== undefined) {

            //       reviews.forEach(review => {
            //             if (review.rating !== undefined) {
            //                  
            //                   totalRating += review.rating;
            //             }
            //       });
            //       overAllRating = Math.round(totalRating / reviews.length)
            //       productRating = <ReactStars count={5} value={overAllRating} size={20} edit={false} isHalf={true} activeColor="#ffd700" />
            //       
            // }
            
                  return(
                  <div>
                        <header><WelcomeContainer/></header>
                        <div className="container-show">
                              <img className="show-image" src={product.photoUrl}></img>
                              <div className="grid-show-1">
                                    <p className="product-show-name">{product.productName}</p>
                                    <div className=" show-rating">
                                                <StarRatingComponent name="rate1" starCount={5} value={this.state.overAllRating} editing={false} />
                                    </div>
                                    <p className="product-show-lprice">List Price: <span>${((product.productPrice * 1.2).toFixed(2)) }</span></p>
                                    <p className="product-show-price">Price: <span>${(product.productPrice * 1).toFixed(2)}</span></p>
                                    <p className="product-description">{product.productDescription}</p>
                              </div>
                              <div className="grid-show-2">
                                    <p className="product-show-price"><span>${product.productPrice}</span></p>
                                    <p className="free-return">& FREE Return</p>
                                    <p><span className="free-return">FREE delivery</span></p>
                                    <p>Fast delivery: <span className="fast-delivery">Tomorrow</span></p>
                                    <p className="deliver-to"><i className="fa fa-map-marker"></i>Deliver to { this.props.loggedIn ? this.props.currentUser.username : null }</p>
                                    <p className="product-show-invetory">{product.productInventory} Items left.</p>
                                    <form className="buttons" onSubmit={this.handleSubmit}>
                                          <div>
                                                <label className="qty" htmlFor="qty">    
                                                      <select id="qty" onChange={this.qtyChange} value={this.state.quantity }> 
                                                            <option value={1}>Qty: 1</option>
                                                            <option value={2}>Qty: 2</option>
                                                            <option value={3}>Qty: 3</option>
                                                            <option value={4}>Qty: 4</option>
                                                            <option value={5}>Qty: 5</option>
                                                            <option value={6}>Qty: 6</option>
                                                            <option value={7}>Qty: 7</option>
                                                      </select>
                                                </label> 
                                          </div>
                                          <button type="submit" className="show-button-1">Add to Cart</button>
                                    </form>
                                          <button className="show-button-2" onClick={(e) => this.handleBuy(e)}>Buy Now</button>
                                    <p className="regular-font">Ships from and sold by amaZone.com</p>
                              </div>
                        </div>
                              <ReviewsIndexContainer product={this.props.product} key={ this.state.key}/>
                        {/* <Link to={`/products/${product.id}/reviews/create`}><button>Add a Review</button></Link>   */}
                        <FooterContianer/>
                  </div>
            )

      }
}

export default withRouter(ProductShow);