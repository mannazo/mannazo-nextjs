import { Card, CardBody } from '@nextui-org/react'
import React from 'react'
import { getRecentOrders } from '@/services/api'

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
