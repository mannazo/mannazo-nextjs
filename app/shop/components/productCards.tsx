'use client'

import React, { useEffect, useState } from 'react' ;
import ProductCard from '../components/productCard'
import {Product} from '../_model/product'
import ShoppingCart from '../_model/shoppingCart'


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
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {products.map(product => (
        <ProductCard key={product.product_id} product={product} addtocart={addToCart}/>
      ))}
    </div>
    </div>
    )

}

export default ProductCards