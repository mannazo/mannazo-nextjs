"use client"

import React from "react";
import { Button, Progress } from '@nextui-org/react'
import AddressCheckout from '@/components/shop/AddressCheckout';
import PaymentCheckout from '@/components/shop/PaymentCheckout';
import ReviewCheckout from '@/components/shop/ReviewCheckout';

export default function Page() {
  const [value, setValue] = React.useState(0);
  const [active, setActive] = React.useState(0);

  function getStepContent(step:number){
    switch(step){
      case 0:
        return <AddressCheckout />
      case 1:
        return <PaymentCheckout />
      case 2:
        return <ReviewCheckout />
    }
  }
  function handleNext() {
    setActive((prevStep) => prevStep + 1);
  }

  function handleBack() {
    setActive((prevStep) => prevStep - 1);
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8">
    <Progress
      aria-label="Checkout progress"
      size="lg"
      value={((active+1) / (3)) * 100}
      color="success"
      showValueLabel={true}
      className="max-w-lg"
    />

      {getStepContent(active)}

      <Button onPress={handleNext}></Button>
      </div>
    </>
  );
}