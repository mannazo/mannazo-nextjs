import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  User,
} from '@nextui-org/react'
import { EyeIcon } from '@/components/admin/EyeIcon'
import { DeleteIcon } from '@/components/admin/DeleteIcon'
import React, { useEffect, useState } from 'react'
import { createProduct, deleteProduct, fetchProducts } from '@/services/api'

interface Product {
  productId: number
  productName: string
  description: string
  price: number
  stock: number
  images: string
  category: string
}

export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProducts()
        .then((response) => {
          setProducts(response.data)
          console.log('Fetched products:', response)
        })
        .catch((error) => {
          console.error('Error fetching products:', error)
        })
    }
    fetchData()
  }, [])

  function handleDeleteProduct(productId: number) {
    console.log(productId)
    calldeleteProduct(productId)
  }

  const calldeleteProduct = async (productId) => {
    console.log('deleted!')
    try {
      const response = await deleteProduct(productId)
      console.log(response)
      const response2 = await fetchProducts()
      setProducts(response2.data)
    } catch (error) {
      console.error('Failed to delete user:', error)
      // Handle error, e.g., show a notification
    }
  }
  const handleCreateProduct = async (newProduct) => {
    try {
      const response = await createProduct(newProduct)
      setProducts([...products, response.data])
    } catch (error) {
      console.error('Failed to create product:', error)
    }
  }
  return (
    <>
      <div className={'gap-4'}>
        <Button onClick={onOpen}>Add Product</Button>
        <Table aria-label="Example table with custom cells">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>
                  <User
                    avatarProps={{ radius: 'lg', src: product.images[0] }}
                    description={product.description}
                    name={product.productName}
                  >
                    {product.productId}
                  </User>
                </TableCell>
                <TableCell>
                  <p>{product.stock}</p>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                      <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                        <EyeIcon />
                      </span>
                    </Tooltip>

                    <Tooltip color="danger" content="Delete user">
                      <span
                        className="cursor-pointer text-lg text-danger active:opacity-50"
                        onClick={() => handleDeleteProduct(product.productId)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
