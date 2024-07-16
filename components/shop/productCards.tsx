'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from './productCard'
import { Product } from '@/_model/product'
import { ShoppingCart } from '@/_model/shoppingCart'
import ShoppingCartIcon from './shoppingCartIcon'
import Link from 'next/link'
import { fetchProducts } from '@/services/api'

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<ShoppingCart>({ items: [] })
  useEffect(() => {
    // fetchProducts()
    //   .then((data) => {
    //     setProducts(data)
    //     console.log('Fetched products:', data)
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching products:', error)
    //   })
    fetch('/product.json')
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data)
        console.log(products.toString())
      })
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
        (item) => item.product.shop_id === product.shop_id
      )
      // Existing item: Find in prevcart ( an item of which=> item's product's product id === product's product id)
      if (existingItem) {
        console.log('Old item')
        return {
          ...prevCart,
          items: [
            ...prevCart.items.map((item) =>
              item.product.shop_id === product.shop_id
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
      <h1 className="mb-8 text-3xl font-bold">Featured Products</h1>
      <Link href="/shop/cart">
        <ShoppingCartIcon cart={cart} />
      </Link>
      <div className="flex flex-wrap justify-between">
        {products.map((product) => (
          <div key={product.shop_id} className="w-full p-2 sm:w-1/2 lg:w-1/4">
            <ProductCard product={product} addtocart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCards
