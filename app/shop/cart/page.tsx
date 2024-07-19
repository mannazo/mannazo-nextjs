'use client'

import React, { useEffect, useState } from 'react'
import { ShoppingCart } from '@/_model/shoppingCart'
import {
  Button,
  Input,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'


declare global {
  interface Window {
    IMP: any // Replace 'any' with the specific type if known
  }
}

export default function Page() {
  const [cart, setCart] = useState<ShoppingCart>({ items: [] })
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'))
    setCart(storedCart)
    console.log(storedCart)
    setLoading(false)
  }, [])

  function removeFromCart(product_id: number) {
    setCart((prevState) => {
      const updatedItems = prevState.items.filter(
        (item) => item.product.productId !== product_id

      )
      const updatedCart = { ...prevState, items: updatedItems }
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    })
  }
  function decreaseQuantity(product_id: number) {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product.productId === product_id

      )

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove item if quantity is 1
          const updatedItems = prevCart.items.filter(
            (item) => item.product.productId !== product_id
          )
          const updatedCart = { ...prevCart, items: updatedItems }
          localStorage.setItem('cart', JSON.stringify(updatedCart))
          return updatedCart
        } else {
          // Decrease quantity
          const updatedItems = prevCart.items.map((item) =>
            item.product.productId === product_id

              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          const updatedCart = { ...prevCart, items: updatedItems }
          localStorage.setItem('cart', JSON.stringify(updatedCart))
          return updatedCart
        }
      } else {
        // Item not in cart, return previous state
        return prevCart
      }
    })
  }

  function increaseQuantity(product_id: number) {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.product.productId === product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      const updatedCart = { ...prevCart, items: updatedItems }
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  const total = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)
  return (
    <div className="container mx-auto max-w-screen-md px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart </h1>
      {!loading ? (
        <>
          <Table aria-label="Shopping cart">
            <TableHeader>
              <TableColumn>Product</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            {cart.items.length > 0 ? (
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.product.productId}>
                    <TableCell>{item.product.productName}</TableCell>
                    <TableCell>
                      <div className="flex max-w-[200px] items-center">
                        <Button
                          onPress={() =>
                            decreaseQuantity(item.product.productId)
                          }
                        >
                          -
                        </Button>
                        <Input
                          value={item.quantity.toString()}
                          readOnly
                          // width="10px"
                          className="text-center"
                        />
                        <Button
                          onPress={() =>
                            increaseQuantity(item.product.productId)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{item.product.price}</TableCell>
                    <TableCell>
                      {/*<Button onPress={()=> removeFromCart(item.product.product_id)}>Remove</Button>*/}

                      <Button
                        color="danger"
                        variant="bordered"
                        onPress={() => removeFromCart(item.product.productId)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody emptyContent={'Your cart is empty'}>{[]}</TableBody>
            )}
          </Table>
          <div className="mt-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
            {status === 'unauthenticated' ? (
              <div>
                <p>Login to Checkout</p>
                <Button color="primary" isDisabled>
                  Checkout
                </Button>
              </div>
            ) : (
              <Link href="/shop/cart/checkout">
                <Button color="primary">Checkout</Button>
              </Link>
            )}
          </div>
        </>
      ) : (
        <p></p>
      )}
    </div>
  )
}
