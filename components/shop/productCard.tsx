import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'

import { Product } from '@/_model/product'

interface ProductList {
  product: Product
  addtocart: (product: Product) => void
}
const ProductCard: React.FC<ProductList> = ({ product, addtocart }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Card className="h-[800px]" shadow="sm" isPressable onPress={onOpen}>
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            className="h-[370px] w-full object-cover"
            src={product.product_image}
          />
          {/*<h3 className="text-lg font-semibold mt-2">{product.name}</h3>*/}
          {/*<p className="text-gray-500 mt-1">{product.description}</p>*/}
          {/*<p className="text-blue-600 font-bold mt-2">${product.price}</p>*/}
        </CardBody>
        <CardFooter className="justify-between text-small">
          <b>{product.product_name}</b>
          <p className="text-default-500">{product.price}</p>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {product.product_name}
              </ModalHeader>
              <ModalBody>
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  className="w-full object-cover"
                  src={product.product_image}
                />
                <p className="mt-2 text-gray-500">{product.description}</p>
                <p className="mt-2 font-bold text-blue-600">${product.price}</p>
              </ModalBody>
              <ModalFooter>
                {product.stock > 0 ? (
                  <Button
                    color="primary"
                    onPress={() => {
                      addtocart(product)
                    }}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <p>Out of stock</p>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default ProductCard
