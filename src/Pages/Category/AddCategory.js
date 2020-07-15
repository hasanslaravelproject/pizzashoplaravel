import React, {useState } from "react";
import FileBase64 from 'react-file-base64';
import {Link} from 'react-router-dom'
import Axios from 'axios'
export default function AddCategory(props) {
  const initialFormState = {
    name: "",  
 
  };
  const [category, setCategory] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };
    const SubmitHandler = async (event) => {
    event.preventDefault();
    if (!category.name) return; 
    let data = {
       ...category,
      
    } 
    
   let response = await Axios.post('http://127.0.0.1:8000/api/category',data);
   if(response.data){
      props.history.push('/category')
    }

  }; 
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card mt-5 border-primary">
        <div className="card-header">
            <div className="d-flex justify-content-between">
              <h3>Add New category</h3>
              <Link to="/category" className="btn btn-success">Back</Link>
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
                  value={category.name}
                  onChange={handleInputChange}
                />
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
