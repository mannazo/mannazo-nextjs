'use client'
import React from 'react'


export default function PaymentCheckout({order, setOrder, onPaymentSuccess}) {
  function onClickPayment() {
    const { IMP } = window;
    IMP.init('imp10772502');

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'kakaopay',                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
      amount: parseFloat(order.amount),                                 // 결제금액
      name: '아임포트 결제 데이터 분석',                  // 주문명
      buyer_name: order.name,                           // 구매자 이름
      buyer_tel: order.tel,                     // 구매자 전화번호
      buyer_email: order.email,               // 구매자 이메일
      buyer_addr: order.addr,                    // 구매자 주소
      buyer_postcode: order.postcode,                      // 구매자 우편번호
    };
    console.log(data)
    setOrder(prevOrder => ({ ...prevOrder, merchant_uid:  data.merchant_uid}))

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { success, error_msg } = response;

    if (success) {
      setOrder(prevOrder => {
        const updatedOrder = { ...prevOrder, order_status: 'Success' };
        alert('결제 성공');

        fetch('http://localhost:3001/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedOrder)
        }).then(response => {
          if (response.ok) {
            alert('Order saved successfully!');
            localStorage.removeItem('cart')
            onPaymentSuccess();
          } else {
            alert('Failed to save order.');
          }
        });

        return updatedOrder;
      });
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }


  return(
    <>
      <h1>Payment page</h1>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  )
}