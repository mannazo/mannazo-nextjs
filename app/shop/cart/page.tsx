'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart } from '@/_model/shoppingCart'
import {Product } from '@/_model/product'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from '@nextui-org/react'


export default function Page() {
  const [cart,setCart] = useState<ShoppingCart>({ items:[] })
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '{"items": []}');
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.product.product_id !== productId);
      const updatedCart = { ...prevCart, items: updatedItems };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return(
    <>
    <h1>Shopping Cart</h1>
      {cart.items.length > 0 ? (
        <Table aria-label="Shopping Cart" shadow={false} lined headerLined>
          <Table.Header>
            <Table.Column>PRODUCT</Table.Column>
            <Table.Column>DESCRIPTION</Table.Column>
            <Table.Column>PRICE</Table.Column>
            <Table.Column>QUANTITY</Table.Column>
            <Table.Column>ACTION</Table.Column>
          </Table.Header>
          <Table.Body>
            {cart.items.map(({ product, quantity }) => (
              <Table.Row key={product.product_id}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>{quantity}</Table.Cell>
                <Table.Cell>
                  <Button flat color="error" onPress={() => removeFromCart(product.product_id)}>
                    Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan={4} css={{ textAlign: 'right' }}>
                <h4>Total: ${totalPrice.toFixed(2)}</h4>
              </Table.Cell>
              <Table.Cell>

                <Button auto color="primary">
                  Proceed to Checkout
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      ) : (
        <h3>Your cart is empty.</h3>
      )}
    </>
  )
}