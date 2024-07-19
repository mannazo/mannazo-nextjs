export interface OrderItem {
  productId: number
  quantity: number
}
export interface Order {
  userId: string
  name: string // 구매자 이름
  tel: string // 구매자 전화번호
  email: string // 구매자 이메일
  addr: string // 구매자 주소
  postcode: string
  merchantUid: string // 주문번호
  orderItems: OrderItem[]
  // amount: number
  totalPrice: number
  orderStatus: 'Pending' | 'Success' | 'Failure'

}
