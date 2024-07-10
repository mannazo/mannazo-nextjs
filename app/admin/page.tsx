import ECommerce from "@/components/admin/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout'

export default function Home() {
  return (
    <>
   <DefaultLayout>
     <ECommerce />
   </DefaultLayout>


    </>
  );
}
