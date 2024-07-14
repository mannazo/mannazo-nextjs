import { Button } from '@nextui-org/react'
import Payment from './Payment'
// import * as PortOne from "@portone/browser-sdk/v2";

import Script from "next/script";

export default function PaymentCheckout() {

  return(
    <>
      <h1>Payment page</h1>
      <Payment />
      </>
  )
}