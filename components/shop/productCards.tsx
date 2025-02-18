'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from './productCard'
import { Product } from '@/_model/product'
import ShoppingCartIcon from './shoppingCartIcon'
import Link from 'next/link'
import { fetchProducts } from '@/services/api'

interface ShoppingCart {
  items: Array<{ product: Product; quantity: number }>
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<ShoppingCart>({ items: [] })
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
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart)
  }, [cart])

  const addToCart = (product: Product) => {
    // add to cart
    console.log(cart)
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product.productId === product.productId
      )
      // Existing item: Find in prevcart ( an item of which=> item's product's product id === product's product id)
      if (existingItem) {
        console.log('Old item')
        return {
          ...prevCart,
          items: [
            ...prevCart.items.map((item) =>
              item.product.productId === product.productId

                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          ],
        }
      } else {
        console.log('New item')
        return {
          ...prevCart,
          items: [...prevCart.items, { product, quantity: 1 }],
        }
      }
    })
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="mb-8 text-3xl font-bold">Featured Products</h1>
        <Link href="/shop/cart">
          <ShoppingCartIcon cart={cart} />
        </Link>
      </div>

      <div className="flex flex-wrap justify-between">
        {products.map((product) => (
          <div
            key={product.productId}

            className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/3"
          >
            <ProductCard product={product} addtocart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCards
