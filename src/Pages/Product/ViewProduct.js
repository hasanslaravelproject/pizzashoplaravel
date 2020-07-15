import React, { useEffect , useState} from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
export default function ViewProduct(props) {
  let [product, setProduct] = useState({})
  const fetchProduct = async (id) =>{
    const {data} =  await Axios.get('http://127.0.0.1:8000/api/product/'+id)
      setProduct(data)
   }
  useEffect( () => {
    fetchProduct(props.match.params.id)
  }, [props])
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card mt-5 border-primary">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <h3>View all Product</h3>
              <Link to="/product" className="btn btn-success">Back</Link>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped table-bordered"> 
              <tbody>
              <tr>
                  <td>Product Name</td>
                  <td>:</td>
                  <td>{product.name}</td>
              </tr>
              <tr>
                  <td>Product Price</td>
                  <td>:</td>
                  <td>{product.price}</td>
              </tr>
              <tr>
                  <td>Product Description</td>
                  <td>:</td>
                  <td>{product.description}</td>
              </tr>
              <tr>
                  <td>Product Unit</td>
                  <td>:</td>
                  <td>{product.unit}</td>
              </tr>
              <tr>
                  <td>Product Quantity</td>
                  <td>:</td>
                  <td>{product.quantity}</td>
              </tr>
              <tr>
                  <td>Product Image</td>
                  <td>:</td>
                  <td><img width="100" src={`http://127.0.0.1:8000/uploads/${product.image}`} alt="product"/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
