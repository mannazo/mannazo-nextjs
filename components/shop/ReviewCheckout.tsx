import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Link, Input,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { ShoppingCart } from '@/_model/shoppingCart'
import { Order } from '@/_model/order'

export default function ReviewCheckout({order}) {
  useEffect(() => {

  }, []);

  return(
    <div className="container mx-auto px-4 py-8">
      <h1>Shopping Cart</h1>
     <>
          <Table aria-label="Shopping cart">
            <TableHeader>
              <TableColumn>Product</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Quantity</TableColumn>
            </TableHeader>

              <TableBody>
                {order.cartItems.items.map((item) =>(
                  <TableRow key={item.product.product_id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.product.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )
          </Table>
          <h3>Total: {total}</h3>


        </>
      ) : (<p></p>)}


    </div>
  )
}