'use client'
import React from 'react'
import { createCommunityPost, createOrder } from '@/services/api'
import { Button, Card } from '@nextui-org/react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { router } from 'next/client'

export default function PaymentCheckout({ order, setOrder, onPaymentSuccess }) {
  function onClickPayment() {
    const { IMP } = window
    IMP.init('imp10772502')

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'kakaopay', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: parseFloat(order.totalPrice), // 결제금액
      name: '아임포트 결제 데이터 분석', // 주문명

      buyer_name: order.name, // 구매자 이름
      buyer_tel: order.tel, // 구매자 전화번호
      buyer_email: order.email, // 구매자 이메일
      buyer_addr: order.addr, // 구매자 주소
      buyer_postcode: order.postcode, // 구매자 우편번호
    }
    console.log(order)
    // setOrder((prevOrder) => ({
    //   ...prevOrder,
    //   merchant_uid: data.merchant_uid,
    // }))
    const updatedOrder = {
      ...order,
      merchantUid: data.merchant_uid,
    }
    setOrder(updatedOrder)
    // postOrder(JSON.stringify(updatedOrder))
    // postOrder(updatedOrder)
    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback)
  }

  const postOrder = async (order) => {
    console.log('Creating post:', order)
    try {
      const response = await createOrder(order)
      if (response.status >= 200 && response.status < 300) {
        // router.refresh()
        toast.success('Post created successfully!')
      } else {
        toast.error('Failed to create post. Please try again.')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating post:', error.response?.data)
        toast.error(
          error.response?.data?.message ||
            'An error occurred. Please try again.'
        )
      } else {
        console.error('Unexpected error:', error)
        toast.error('An unexpected error occurred. Please try again.')
      }
    }
  }
  // function postOrder(updatedOrder) {
  //   console.log(updatedOrder)
  //   const response = await createOrder(updatedOrder)
  //   // .then((response) => {
  //   //   alert('Order saved successfully!')
  //   // })
  //   // .catch(() => {
  //   //   alert('Failed to save order.')
  //   // })
  // }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { success, error_msg } = response

    if (success) {
      const updatedOrder = { ...order, orderStatus: 'Success' }
      setOrder(updatedOrder) // Update the state with the updated order
      alert('결제 성공')
      postOrder(updatedOrder) // Post the updated order
      onPaymentSuccess()
    } else {
      alert(`결제 실패: ${error_msg}`)
    }
  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Payment </h1>
      <Card className="p-8 shadow-md">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Review Your Order
        </h1>
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
            {/*{order.orderItems.m}*/}
            <div className="mt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>₩{order.totalPrice}</span>
            </div>
          </div>
          <Button
            onClick={onClickPayment}
            className="w-full bg-blue-500 text-white"
          >
            Place Order with KakaoPay
          </Button>
        </div>
      </Card>
      {/*<Button onClick={onClickPayment}>결제하기</Button>*/}
    </>
  )
}
