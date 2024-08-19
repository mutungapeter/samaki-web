import AddressList from "@/src/components/Account/addresses/addresses"
import { Suspense } from "react"

const AddressPage=()=>{
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddressList />
    </Suspense>
  )
}
export default AddressPage