import Products from "@/src/components/products/Products"
import { Suspense } from "react"


const ProductsPage=()=>{
    return (
        <Suspense fallback={<div>Loading...</div>}>

        <Products />
        </Suspense>
    )
}
export default ProductsPage