// components/ShoppingCartIcon.tsx
import React from 'react';
import { Badge, Button } from '@nextui-org/react';
import { ShoppingCart } from '../../../_model/shoppingCart';
import { FaShoppingCart } from 'react-icons/fa';

interface ShoppingCartIconProps {
  cart: ShoppingCart;
}

const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({ cart }) => {
  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="relative">
      <Button auto flat color="primary" icon={<FaShoppingCart size="1.5em" />} />
      {itemCount > 0 && (
        <Badge color="error" className="absolute top-0 right-0 rounded-full" content={itemCount} />
      )}
    </div>
  );
};

export default ShoppingCartIcon;
