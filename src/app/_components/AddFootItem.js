import { useState } from "react";

const AddFoodItems =(props) => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [path,setPath] = useState("");
    const [description,setDescription] = useState("");
    const [error,setError] = useState(false);

    const handleAddFoodItem = async() => {

        if(!name || !price || !path || !description)
        {
            setError(true)
            return false
        }
        else{
            setError(false)
        }
        console.log(name,price,path,description);
        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if(restaurantData)
        {
            resto_id = restaurantData._id
        }
        let response = await fetch("http://localhost:3000/api/restaurant/foods",{
            method:'POST',
            body: JSON.stringify({name, price, img_path: path, description, resto_id})
        });
        response = await response.json();
        if(response.success)
        {
            alert("Food item added")
            props.setAddItem(false)
        }
        else{
            alert("Food item not added")
        }
        
    }

    return(
        <div className="container">
           <h2>AddFoodItems</h2> 
           <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter food name"
                value={name} onChange={e => setName(e.target.value)}/>
                {
                    error && !name && <span className="input-error">Please enter food name</span>
                }
           </div>
           <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter price"
                value={price} onChange={e => setPrice(e.target.value)}/>
                {
                    error && !price && <span className="input-error">Please enter price </span>
                }
           </div>
           <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter image path"
                value={path} onChange={e => setPath(e.target.value)}/>
                {
                    error && !path && <span className="input-error">Please enter valid path</span>
                }
           </div>
           <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter food name"
                value={description} onChange={e => setDescription(e.target.value)}/>
                {
                    error && !description && <span className="input-error">Please enter description</span>
                }
           </div>
           <div className="input-wrapper">
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
           </div>
        </div>
    )
}
export default AddFoodItems;