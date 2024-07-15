'use client'

import React, { useEffect, useState } from 'react' ;
import ProductCard from './productCard'
import {Product} from '@/_model/product'
import { ShoppingCart } from '@/_model/shoppingCart'
import ShoppingCartIcon from '../shop/shoppingCartIcon'
import Link from 'next/link'

const ProductCards : React.FC = () => {
  const [products, setProducts] = useState<Product[]> ([]);
  const [cart, setCart] = useState<ShoppingCart>({items:[]})
  useEffect(() => {
    fetch('/product.json').then(response => response.json())
    .then((data:Product[]) => {
      setProducts(data)
      console.log(products.toString())
    })

  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
  }, [cart]);

  const addToCart = (product: Product ) => {
    // add to cart
    console.log(cart)
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.product_id === product.product_id)
      // Existing item: Find in prevcart ( an item of which=> item's product's product id === product's product id)
      if(existingItem) {
        console.log("Old item")
        return {
          ...prevCart,
          items: [...prevCart.items.map(item => item.product.product_id===product.product_id ? {...item, quantity:item.quantity+1} : item)]
        };
      }else{
        console.log("New item")
        return {
          ...prevCart,
          items: [...prevCart.items, { product, quantity: 1 }]
        };
      }

    })


  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <Link href="/shop/cart">

          <ShoppingCartIcon cart={cart} />

      </Link>
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