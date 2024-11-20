import NavbarComponent from "../components/NavbarComponent"
import ProductsComponent from "../components/ProductsComponent"
import PushNotificationComponent from "../components/PushNotificationComponent"



const ProductsPage = () => {  
      
  return (
    <>
   <NavbarComponent value1={"block"} value5={"block"} value2={"block"} value3={"block"} value4={"block"} image={"./assests/images/vegetable.png"}/>
   <ProductsComponent/>
  
    </>
  )
}

export default ProductsPage