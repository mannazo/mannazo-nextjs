'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import UserList from '@/components/admin/UserList'
import {
  getNumberOfOrders,
  getNumberOfPosts,
  getNumberOfUsers,
} from '@/services/api'
import { Card, CardBody } from '@nextui-org/react'
import { Community } from '@/components/admin/Community'
import { Transactions } from '@/components/admin/Transactions'
import { ProductsList } from '@/components/admin/ProductsList'

interface CountryUsers {
  country: string
  users: number
}

export default function Page() {
  const [posts, setPosts] = useState<number>(0)
  const [users, setUsers] = useState<number>(0)
  const [orders, setOrders] = useState<number>(0)
  const [usersByCountries, setUsersByCountries] = useState<CountryUsers[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [isUserList, setIsUserList] = useState(true)

  useEffect(() => {
    // const { totalusers, settotalusers } = use
    const fetchData = async () => {
      try {
        const postsData = await getNumberOfPosts()
        const usersData = await getNumberOfUsers()
        const ordersData = await getNumberOfOrders()

        console.log(postsData.data)
        console.log(usersData.data)
        setPosts(postsData.data)
        setUsers(usersData.data)
        setOrders(ordersData.data)
      } catch (err) {
        setError('Failed to fetch data')
        toast.error('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getUsers = async () => {
    const response = await getNumberOfUsers()
    return response.data
  }
  return (
    <div className="h-full lg:px-6">
      <div className="mx-auto flex w-full max-w-[90rem] flex-wrap justify-center gap-4 px-4 pt-3 sm:pt-10 lg:px-0 xl:flex-nowrap xl:gap-6">
        <div className="mt-6 flex w-full flex-col gap-6">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Mannazu Statistics</h3>
            <div className="grid w-full grid-cols-1 justify-center gap-5 md:grid-cols-2 2xl:grid-cols-3">
              <Card className="w-full rounded-xl bg-primary px-3 shadow-md xl:max-w-sm">
                <CardBody className="py-5">
                  <div className="flex gap-5">
                    <Community />
                    <div className="flex flex-col">
                      <span className="text-white">Total Users</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 py-2">
                    <span className="text-xl font-semibold text-white">
                      {users}
                    </span>
                    <span className="text-xs text-success">+4.5 % </span>
                  </div>
                </CardBody>
              </Card>
              <Card className="w-full rounded-xl bg-default-50 px-3 shadow-md xl:max-w-sm">
                <CardBody className="py-5">
                  <div className="flex gap-2.5">
                    <Community />
                    <div className="flex flex-col">
                      <span className="text-default-900">
                        Total Travel Posts
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 py-2">
                    <span className="text-xl font-semibold text-default-900">
                      {posts}
                    </span>
                    <span className="text-xs text-danger">- 4.5%</span>
                  </div>
                </CardBody>
              </Card>
              <Card className="w-full rounded-xl bg-success px-3 shadow-md xl:max-w-sm">
                <CardBody className="py-5">
                  <div className="flex gap-2.5">
                    <Community />
                    <div className="flex flex-col">
                      <span className="text-white">Total Orders</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 py-2">
                    <span className="text-xl font-semibold text-white">
                      {orders}
                    </span>
                    <span className="text-xs text-danger">- 4.5%</span>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Chart */}
          <div className="flex h-full flex-col gap-2">
            <div className="flex gap-4">
              <h3
                className={`cursor-pointer text-xl font-semibold ${isUserList ? 'font-bold' : 'text-default-500'}`}
                onClick={() => setIsUserList(true)}
              >
                Users
              </h3>
              <h3 className="text-xl font-semibold">|</h3>
              <h3
                className={`cursor-pointer text-xl font-semibold ${!isUserList ? 'font-bold' : 'text-default-500'}`}
                onClick={() => setIsUserList(false)}
              >
                Products
              </h3>
            </div>
            <div className="w-full rounded-2xl bg-default-50 p-6 shadow-lg">
              {isUserList ? <UserList /> : <ProductsList />}
              {/*<UserList />*/}
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className="mt-4 flex w-full flex-col gap-2 xl:max-w-md">
          <h3 className="text-xl font-semibold">Section</h3>
          <div className="flex flex-col flex-wrap justify-center gap-4 md:flex-col md:flex-nowrap">
            <Transactions />
            {/*<Transactions />*/}
          </div>
        </div>
      </div>

      {/* Table Latest Users */}
      {/*<div className="mx-auto flex w-full max-w-[90rem] flex-col justify-center gap-3 px-4 py-5 lg:px-0">*/}
      {/*  <div className="flex flex-wrap justify-between">*/}
      {/*    <h3 className="text-center text-xl font-semibold">*/}
      {/*      Mannazu Products*/}
      {/*    </h3>*/}
      {/*    <UserList />*/}
      {/*    /!*<Link*!/*/}
      {/*    /!*  href="/accounts"*!/*/}
      {/*    /!*  as={NextLink}*!/*/}
      {/*    /!*  color="primary"*!/*/}
      {/*    /!*  className="cursor-pointer"*!/*/}
      {/*    /!*>*!/*/}
      {/*    /!*  View All*!/*/}
      {/*    /!*</Link>*!/*/}
      {/*  </div>*/}
      {/*  /!*<TableWrapper />*!/*/}
      {/*</div>*/}
    </div>
  )
}
