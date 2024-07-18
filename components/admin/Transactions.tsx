import { Avatar, Card, CardBody } from '@nextui-org/react'
import React from 'react'
import { Order } from '@/_model/order'
import { getRecentOrders } from '@/services/api'
const items = [
  {
    orderId: 'dec01bb4-93fc-46d7-8997-8b8ba918cc16',
    userId: '300e9115-f3c8-4236-8f30-bf2998746c59',
    name: '김동호',
    tel: '010-0000-0000',
    email: 'kdh96331@naver.com',
    addr: '한국',
    postcode: '0102-3020',
    merchantUid: 'jfdbsafd92bndfk-2jfdd',
    totalPrice: '9990000',
    createdAt: '2024-07-17T20:14:21.986545',
    orderItems: [
      {
        orderItemId: '89766b5d-d356-4c6c-8856-8e45d331ab45',
        productId: null,
        quantity: 4,
        price: '11000',
      },
      {
        orderItemId: 'd9688500-beca-4966-af7e-6fc61f4f2142',
        productId: null,
        quantity: 2,
        price: '13000',
      },
    ],
    orderStatus: 'Pending',
  },
  {
    orderId: 'f69b6373-5d59-411c-9088-15700a9ed12e',
    userId: '300e9115-f3c8-4236-8f30-bf2998746c59',
    name: '김동호',
    tel: '010-0000-0000',
    email: 'kdh96331@naver.com',
    addr: '한국',
    postcode: '0102-3020',
    merchantUid: 'jfdbsafd92bndfk-2jfdd',
    totalPrice: '9990000',
    createdAt: '2024-07-17T20:14:19.900231',
    orderItems: [
      {
        orderItemId: '2cade9e9-32a0-4481-b03c-5f36289a03b9',
        productId: null,
        quantity: 2,
        price: '13000',
      },
      {
        orderItemId: 'fe1e22cd-ace7-40f4-8ce4-292e7a7cfba7',
        productId: null,
        quantity: 4,
        price: '11000',
      },
    ],
    orderStatus: 'Pending',
  },
  {
    orderId: '0bf1fc37-b16b-4883-bc15-f415a66a2e06',
    userId: '300e9115-f3c8-4236-8f30-bf2998746c59',
    name: '김동호',
    tel: '010-0000-0000',
    email: 'kdh96331@naver.com',
    addr: '한국',
    postcode: '0102-3020',
    merchantUid: 'jfdbsafd92bndfk-2jfdd',
    totalPrice: '9990000',
    createdAt: '2024-07-17T19:28:04.89953',
    orderItems: [
      {
        orderItemId: '8d322d46-dab8-4ea3-b9c2-2ca5344ec794',
        productId: null,
        quantity: 2,
        price: '13000',
      },
      {
        orderItemId: 'fccfe0e5-bd0c-4948-b810-bbb087e6b6f4',
        productId: null,
        quantity: 4,
        price: '11000',
      },
    ],
    orderStatus: 'Pending',
  },
  {
    orderId: 'f53d5bd6-ea80-48dc-86b1-f6f96e0b869c',
    userId: 'bd5a8991-d9f0-4113-88fc-b2d717a619bc',
    name: 'User 3',
    tel: '345-678-9012',
    email: 'user3@example.com',
    addr: 'Address 3',
    postcode: '34567',
    merchantUid: '789GHI',
    totalPrice: null,
    createdAt: '2024-07-17T19:27:32.492469',
    orderItems: [],
    orderStatus: 'Failure',
  },
  {
    orderId: 'b2e52b49-ef71-4247-9808-284f2015b981',
    userId: '300e9115-f3c8-4236-8f30-bf2998746c59',
    name: 'User 2',
    tel: '234-567-8901',
    email: 'user2@example.com',
    addr: 'Address 2',
    postcode: '23456',
    merchantUid: '456DEF',
    totalPrice: null,
    createdAt: '2024-07-17T19:27:32.492387',
    orderItems: [],
    orderStatus: 'Failure',
  },
  {
    orderId: '6815d2c0-c467-4ca9-b10f-3b7f10a89881',
    userId: '1b5f2e1d-aa56-47b1-8eb1-b701ba0978a7',
    name: 'User 1',
    tel: '123-456-7890',
    email: 'user1@example.com',
    addr: 'Address 1',
    postcode: '12345',
    merchantUid: '123ABC',
    totalPrice: null,
    createdAt: '2024-07-17T19:27:32.492196',
    orderItems: [],
    orderStatus: 'Failure',
  },
]

export const Transactions = () => {
  const [orderlist, setOrderlist] = React.useState([])
  React.useEffect(() => {
    // setOrderlist(items)
    const fetchData = async () => {
      try {
        const response = await getRecentOrders()
        setOrderlist(response.data)
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
    fetchData()
  })
  return (
    <Card className="rounded-xl bg-default-50 px-3 shadow-md">
      <CardBody className="gap-4 py-5">
        <div className="flex justify-center gap-2.5">
          <div className="flex flex-col rounded-xl border-2 border-dashed border-divider px-6 py-2">
            <span className="text-xl font-semibold text-default-900">
              Latest Transactions
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {orderlist.map((item) => (
            <div key={item.merchantUid} className="grid w-full grid-cols-3">
              <span className="font-semibold text-default-900">
                {item.name}
              </span>
              <div>
                <span className="text-xs text-success">{item.orderStatus}</span>
              </div>
              <div>
                <span className="text-xs text-default-500">
                  {item.totalPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
