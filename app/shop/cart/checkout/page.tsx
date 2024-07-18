'use client'

import React, { useEffect, useState } from 'react'
import { Button, Progress } from '@nextui-org/react'
import AddressCheckout from '@/components/shop/AddressCheckout'
import PaymentCheckout from '@/components/shop/PaymentCheckout'
import ReviewCheckout from '@/components/shop/ReviewCheckout'
import { ShoppingCart } from '@/_model/shoppingCart'
import { Order, OrderItem } from '@/_model/order'
import { useSession } from 'next-auth/react'

export default function Page() {
  const [value, setValue] = React.useState(0)
  const [cart, setCart] = useState([])
  const [active, setActive] = React.useState(0)
  const [orderStatus, setOrderStatus] = React.useState('Pending')
  const [order, setOrder] = useState<Order>({
    userId: 'f6f6b416-393f-4ce8-adb4-97ffcaa57ab',
    name: '', // 구매자 이름
    tel: '', // 구매자 전화번호
    email: '', // 구매자 이메일
    addr: '', // 구매자 주소
    postcode: '',
    merchantUid: ``, // 주문번호
    orderItems: [],
    totalPrice: 0,
    orderStatus: 'Pending',
  })

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    // console.log(userId)
    if (storedCart) {
      const cartData: ShoppingCart = JSON.parse(storedCart)

      // Calculate total amount
      const totalAmount = cartData.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity
      }, 0)

      const orderItems = cartData.items.map((item) => ({
        // userId: userId,
        productId: item.product.productId, // Assuming shop_id is the product ID
        quantity: item.quantity,
      }))

      // Update order state
      setOrder((prevOrder) => ({
        ...prevOrder,
        orderItems: orderItems,
        totalPrice: totalAmount, // Set total amount
      }))
    } else {
      alert('Cart is empty')
    }
  }, [])

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressCheckout
            address={order}
            setAddress={setOrder}
            handleNext={handleNext}
          />
        )
      case 1:
        return (
          <PaymentCheckout
            order={order}
            setOrder={setOrder}
            onPaymentSuccess={onPaymentSuccess}
          />
        )
      case 2:
        return <ReviewCheckout order={order} />
    }
  }
  function handleNext() {
    console.log('at handlenext', order)
    setActive((prevStep) => prevStep + 1)
  }

  function handleBack() {
    setActive((prevStep) => prevStep - 1)
  }

  function onPaymentSuccess() {
    // postOrder()
    alert('On Payment success')
    handleNext()
  }

  return (
    <>
      <div className="container mx-auto max-w-screen-md px-4 py-8">
        <Progress
          aria-label="Checkout progress"
          size="lg"
          value={((active + 1) / 3) * 100}
          color="success"
          // showValueLabel={true}
          className="max-w-screen-md"
        />

        {getStepContent(active)}

        <div className="mt-4 flex justify-between">
          {active === 1 && <Button onPress={handleBack}>Back</Button>}
          {/*{active<2 && <Button onPress={handleNext}>Next</Button>}*/}
        </div>
      </div>
    </>
  )
}
