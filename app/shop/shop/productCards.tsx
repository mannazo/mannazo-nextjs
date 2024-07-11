'use client'

import React, { useEffect, useState } from 'react' ;
import ProductCard from './productCard'
import {Product} from '@/_model/product'
import { ShoppingCart } from '@/_model/shoppingCart'
import ShoppingCartIcon from '../shop/shoppingCartIcon'

const ProductCards : React.FC = () => {
  const [products, setProducts] = useState<Product[]> ([]);
  const [cart, setCart] = useState<ShoppingCart>({items:[]})
  useEffect(() => {
    fetch('/product.json').then(response => response.json())
    .then((data:Product[]) => {
      setProducts(data)
      console.log(products)
    })

  }, []);

  const addToCart = (product: Product ) => {
    setCart(prevCart => {
      return {
        ...prevCart,
        items: [...prevCart.items, { product, quantity: 1 }]
      };
    })
    console.log(cart)
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <ShoppingCartIcon cart={cart} />

      <div className="flex flex-wrap justify-between">
        {products.map(product => (
          <div key={product.product_id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
            <ProductCard product={product} addtocart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  )

}

export default ProductCards