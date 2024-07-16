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
  Input,
  Card,
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { ShoppingCart } from '@/_model/shoppingCart'
import { Order } from '@/_model/order'

export default function ReviewCheckout({ order }) {
  console.log(order.cartItems)
  return (
    <Card className="p-8 shadow-md">
      <h1 className="mb-8 text-center text-3xl font-bold">Review Your Order</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <p>{order.name}</p>
          <p>{order.addr}</p>
          <p>{order.postcode}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <p>{order.tel}</p>
          <p>{order.email}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Order Summary</h2>
          {order.cartItems.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.product.name}</span>
              <span>
                {item.quantity} x ${item.product.price}
              </span>
            </div>
          ))}
          <div className="mt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${order.amount}</span>
          </div>
        </div>
        <Button className="w-full bg-blue-500 text-white">Place Order</Button>
      </div>
    </Card>
  )
}
