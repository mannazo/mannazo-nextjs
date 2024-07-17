import { ShoppingCart } from '@/_model/shoppingCart'

export interface Order {
  uuid: string,
  name: string,                           // 구매자 이름
  tel: string,                     // 구매자 전화번호
  email: string,               // 구매자 이메일
  addr: string,                    // 구매자 주소
  postcode: string,
  merchant_uid: string,   // 주문번호
  cartItems: ShoppingCart;
  amount: number,
  order_status: 'Pending' | 'Success' | 'Failure',
}
