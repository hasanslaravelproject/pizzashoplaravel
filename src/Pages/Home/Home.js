import React, { useEffect , useState, useContext} from "react";
import  { CartContext } from '../../contexts/CartContext';
import Axios from 'axios'
import {Link} from 'react-router-dom'
export default function Home() {


    const { addProduct, cartItems, increase } = useContext(CartContext);

    let [initialproduct, setInitialProduct] = useState([])
    let [product, setProduct] = useState([])
    let [categories, setCategories] = useState([])
    const fetchProduct = async () =>{
        const {data} =  await Axios.get('http://127.0.0.1:8000/api/product')
        await setInitialProduct(data)
        setProduct(data);
    }

    const fetchCategory = async () =>{
        const {data} =  await Axios.get('http://127.0.0.1:8000/api/category')
       
        setCategories(data);
    }

    const handleSearch = (event) =>{ 
        let updatedList = initialproduct.filter(function(item){
          return item.name.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        setProduct(updatedList);
    }
    let [show, setShow] = useState(false)

    useEffect(() =>{
        fetchCategory() 
        fetchProduct() 
    },[])

    const getFilteredProducts = (id) => {
        Axios.get('http://127.0.0.1:8000/api/products/'+id)
        .then((data) => {
            setProduct(data.data);
           
        })
        .catch((error) => {
            
        })
        
        
    }


    return (
        <>
        <div className="row mt-4">
            <div className="col-lg-4 offset-lg-4">
                <div className="form-group">
                    <input type="text" 
                        name="search" 
                        placeholder="search product"   
                        onChange={handleSearch} 
                        className="form-control"
                    />
                </div>
            </div>
        </div>                
        <div className="row mt-2">
            {categories && categories.map(category => {
                return <button key={category.id} type="button" className="btn btn-info text-center" style={{marginLeft: "5px"}} id={category.id} onClick={(e) => getFilteredProducts(category.id)}> { category.name }</button>;
            })}
        </div> 
        <div className="row  mt-2"> 
            {product && product.map(function(el) {
              return   <div key={el.id} className="col-lg-4">
                <div className="card border-primary p-0">
                    <div className="card-body  p-0">
                        <img src={`http://127.0.0.1:8000/uploads/${el.image}`} alt="product" className="img-fluid" style={{objectFit: 'cover'}}/>
                        <div className="p-2">
                             <h2 className="text-capitalize text-muted display-5">{el.name}</h2>
                             <Link className="btn btn-info text-center" to={`single-product/${el.id}`}> Show More</Link> 
                             &nbsp;

                             {
                                 
                                !cartItems.find(item => item.id === el.id) && <button 
                                    onClick={() => addProduct(el)}
                                    className="btn btn-info text-center">Add to cart
                                </button>
                             }
                             
                             {
                                cartItems.find(item => item.id === el.id) && <Link to="/cart" className="btn btn-info text-center">
                                            View Cart 
                                        </Link>
                             }
                             
                        
                        </div>
                    </div>
                </div> 
                </div> 
            })} 
        </div>
    </>
    )
}
