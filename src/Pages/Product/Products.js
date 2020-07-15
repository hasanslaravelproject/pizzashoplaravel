import React, { useEffect , useState} from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
export default function Products() {
  let [products, setProducts] = useState([])
  const fetchProduct = async () =>{
    const {data} =  await Axios.get('http://127.0.0.1:8000/api/product')
      setProducts(data)
   }
   const deleteData = async (id) =>{
      if(window.confirm('are you sure')){
        const {data} =  await Axios.delete('http://127.0.0.1:8000/api/product/'+id)
        if(data){
          fetchProduct()
        }
      }
   }
  useEffect( () => {
      fetchProduct()
  }, [])
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card mt-5 border-primary">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <h3>Product</h3>
              <Link to="product/create" className="btn btn-success">Add Product</Link>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped table-bordered"> 
              <thead>
                <tr>
                  <th scope="col">#Sl</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Manage</th>
                </tr>
              </thead>
              <tbody>
               {products && products.map(data => {
                return  <tr key={data.id}>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.price}</td> 
                    <td>{data.category_id}</td> 
                    <td>{data.unit}</td>
                    <td>
                      <Link to={`/product/${data.id}/edit`} className="btn btn-success btn-sm mr-2"><i className="fa fa-edit"></i></Link>
                      <Link to={`/product/view/${data.id}`} className="btn btn-success btn-sm mr-2"><i className="fa fa-eye"></i></Link>
                      <button onClick={()=> deleteData(data.id)} className="btn btn-success btn-sm"><i className="fa fa-trash"></i></button>
                    </td>
                  </tr> 
               })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
