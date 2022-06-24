
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon= ()=>{

const {isCartOpen,setIsCartOpen,cartItemCount} = useContext(CartContext);

const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
console.log(isCartOpen);

    return(
      
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-container' />
      <span className='item-count'>{cartItemCount}</span>

    </div>
    )
}
export default CartIcon;