// components/ShoppingCartIcon.tsx
import React from 'react'
import { Badge, Button } from '@nextui-org/react'
import { ShoppingCart } from '../../_model/shoppingCart'
import { FaShoppingCart } from 'react-icons/fa'

interface ShoppingCartIconProps {
  cart: ShoppingCart
}

const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({ cart }) => {
  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0)
  // console.log(cart)
  return (
    <button>
      <FaShoppingCart size={24} />
      {itemCount > 0 && (
        <Badge color="primary" className="absolute right-0 top-0 rounded-full">
          {itemCount}
        </Badge>
      )}
    </button>
  )
}

export default ShoppingCartIcon
