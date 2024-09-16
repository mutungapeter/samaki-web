import ProductsLayout from "@/src/components/Layout/Products/ProductsLayout"
import Products from "@/src/components/products/Products"
import { Suspense } from "react"


const ProductsPage=()=>{
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <ProductsLayout>

        <Products />
        </ProductsLayout>
        </Suspense>
    )
}
export default ProductsPage