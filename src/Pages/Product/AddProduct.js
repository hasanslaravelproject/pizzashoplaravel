import React, {useState, useEffect } from "react";
import FileBase64 from 'react-file-base64';
import {Link} from 'react-router-dom'
import Axios from 'axios'

export default function AddProduct(props) {
  const initialFormState = {
    name: "",
    price: "",
    description: "", 
    unit: "",
    quantity: "",
  };
  const [image, setImage] = useState('');
  const [product, setProduct] = useState(initialFormState);
  let [category, setCategory] = useState([])
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const imageHandler = (images) =>{ 
    setImage(images.base64)
  }

  const SubmitHandler = async (event) => {
    event.preventDefault();
    if (!product.name || !product.price) return; 
    let data = {
       ...product,
       image
    } 
   
   let response = await Axios.post('http://127.0.0.1:8000/api/product',data);
   if(response.data){
      props.history.push('/product')
    }

  };

   useEffect(() =>{
        fetchCategory() 
    }, [])
    
    const fetchCategory = async () =>{
        const {data} =  await Axios.get('http://127.0.0.1:8000/api/category')
       
        setCategory(data);
    }
 
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card mt-5 border-primary">
        <div className="card-header">
            <div className="d-flex justify-content-between">
              <h3>Add New Product</h3>
              <Link to="/product" className="btn btn-success">Back</Link>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={SubmitHandler}>
              <div className="form-group">
                <label>Name</label>
                <input
                 className="form-control"
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                        <label htmlFor="type">category</label>
                        <select name="category_id" onChange={handleInputChange}  className="form-control">
                            <option >Select Category</option>
                          {category && category.map(val => <option value={val.id} key={val.id}>{val.name}</option>)}
                        </select>
                    </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Unit</label>
                <input
                 className="form-control"
                  type="number"
                  name="unit"
                  value={product.unit}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group" >
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={product.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <FileBase64
                 className="form-control"
                multiple={ false }
                onDone={ imageHandler } />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
