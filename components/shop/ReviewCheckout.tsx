import { Button, Card, Link } from '@nextui-org/react'
import React from 'react'

export default function ReviewCheckout({ order }) {

  return (
    <Card className="p-8 shadow-md">
      <h1 className="mb-8 text-center text-3xl font-bold">Order Receipt</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Order Information</h2>
          <p>
            <strong>Order Number:</strong> {order.merchantUid}
          </p>
          <p>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <p>{order.addr}</p>
          <p>{order.postcode}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <p>{order.name}</p>

          <p>{order.tel}</p>
          <p>{order.email}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>₩{order.totalPrice}</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Payment Information</h2>
          <p>
            <strong>Status:</strong> {order.orderStatus}

          </p>
          {/* Add more payment details here if available */}
        </div>
        <div className="mt-8 text-center">
          <p>Thank you for your purchase!</p>
          <p>
            If you have any questions, please contact us at mannazu@gmail.com.
          </p>
        </div>
        <Link href="/">
          <Button className="w-full bg-blue-500 text-white">Home</Button>
        </Link>
      </div>
    </Card>
  )
}
