'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart } from '@/_model/shoppingCart'
import { Product } from '@/_model/product'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Link,
} from '@nextui-org/react'


export default function Page() {
  const [cart,setCart] = useState<ShoppingCart>({ items:[] })
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    setCart(storedCart);
    console.log(storedCart)
    setLoading(false)
  }, []);

  function removeFromCart(product_id: number) {
    setCart(prevState => {
      const updatedItems = prevState.items.filter(item => item.product.product_id !== product_id);
      const updatedCart = { ...prevState, items: updatedItems };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    })
  }

  const total = cart.items.reduce(( total, item ) => {return total + item.product.price * item.quantity},0)
  return(
    <div className="container mx-auto px-4 py-8">
    <h1>Shopping Cart</h1>
      {!loading ? (
        <>
        <Table aria-label="Shopping cart">
          <TableHeader>
            <TableColumn>Product</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          {cart.items.length>0 ? (
            <TableBody>
            {cart.items.map((item) =>(
              <TableRow>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.product.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell><Button onPress={()=> removeFromCart(item.product.product_id)}>Remove</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
          ):(
            <TableBody emptyContent={"Your cart is empty"}>{[]}</TableBody>
          )}
        </Table>
        <h3>Total: {total}</h3>
        <Link href="/shop/checkout">
          <Button>Checkout</Button>
        </Link>

        </>
      ):(<p></p>)}


    </div>
  )
}