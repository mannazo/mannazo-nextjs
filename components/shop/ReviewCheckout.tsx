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

export default function ReviewCheckout() {
  const [cart,setCart] = useState<ShoppingCart>({ items:[] })
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    setCart(storedCart);
    console.log(storedCart)
    setLoading(false)
  }, []);
  const total = cart.items.reduce(( total, item ) => {
    return total + item.product.price * item.quantity
  },0)
  return(
    <div className="container mx-auto px-4 py-8">
      <h1>Shopping Cart</h1>
      {!loading ? (
        <>
          <Table aria-label="Shopping cart">
            <TableHeader>
              <TableColumn>Product</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Quantity</TableColumn>
            </TableHeader>
            {cart.items.length>0 ? (
              <TableBody>
                {cart.items.map((item) =>(
                  <TableRow key={item.product.product_id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.product.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody emptyContent={'Your cart is empty'}>{[]}</TableBody>
            )}
          </Table>
          <h3>Total: {total}</h3>


        </>
      ) : (<p></p>)}


    </div>
  )
}