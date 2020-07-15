import React, { useEffect , useState} from "react";
import Axios from 'axios'
export default function Single(props) {
 
    let [product, setProduct] = useState({})
    const fetchProduct = async (id) =>{
      const {data} =  await Axios.get('http://127.0.0.1:8000/api/product/'+id)
        setProduct(data)
     }

    useEffect(() =>{
        fetchProduct(props.match.params.id)
    },[props])
    return (
        <> 
        <div className="row  mt-2">  
          <div  className="col-lg-6 offset-lg-3">
                <div className="card border-primary p-0">
                    <div className="card-body  p-0">
                        <img   src={`http://127.0.0.1:8000/uploads/${product.image}`} alt="product" className="img-fluid" style={{objectFit: 'cover'}}/>
                        <div className="p-2">
                             <h2 className="text-capitalize text-muted display-5">{product.name}</h2> 
                         
                             <>
                                <p >description: {product.description}</p>
                                <p >price: {product.price}</p>
                                <p >unit: {product.unit}</p>
                                <p >quantity: {product.quantity}</p>
                             </>
                      
                        </div>
                    </div>
                </div> 
                </div>  
        </div>
    </>
    )
}
