import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

import { Product } from '@/_model/product'

interface ProductList {
  product: Product;
  addtocart: (product: Product) => void;
}
const ProductCard: React.FC<ProductList> = ({ product, addtocart }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <>
    <Card shadow="sm" isPressable onPress={onOpen} >
      <CardBody className="overflow-visible p-0 ">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"

          className="w-full object-cover h-[370px]"
          src={product.image}
        />
        {/*<h3 className="text-lg font-semibold mt-2">{product.name}</h3>*/}
        {/*<p className="text-gray-500 mt-1">{product.description}</p>*/}
        {/*<p className="text-blue-600 font-bold mt-2">${product.price}</p>*/}
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{product.name}</b>
        <p className="text-default-500">{product.price}</p>
      </CardFooter>
    </Card>

  <Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    placement="top-center"
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">{product.name}</ModalHeader>
          <ModalBody>
            <Image
              shadow="sm"
              radius="lg"
              width="100%"

              className="w-full object-cover"
              src={product.image}
            />
            <p className="text-gray-500 mt-2">{product.description}</p>
            <p className="text-blue-600 font-bold mt-2">${product.price}</p>
          </ModalBody>
          <ModalFooter>
            {product.stock > 0 ? ( <Button color="primary" onPress={() => {
              addtocart(product);
            }}>
              Add to Cart
            </Button>): (<p>Out of stock</p>) }


          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
    </>

  )
};
export default ProductCard