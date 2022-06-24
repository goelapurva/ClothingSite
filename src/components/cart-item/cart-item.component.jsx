
import './cart-item.styles.scss';
import {ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartItem= ({cartItem})=>{
 const {name, quantity,imageUrl,price} = cartItem;

    return(
      <div className='cart-item-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='item-details'>
        <span className='name'>{name}</span>
        <br></br>
        <span className='price'>{quantity} x ${price}</span>
        </div>
      </div>
   
    )
}
export default CartItem;