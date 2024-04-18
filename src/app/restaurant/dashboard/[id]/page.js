"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditFoodItems =(props) => {
   // console.log(props.params);
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [path,setPath] = useState("");
    const [description,setDescription] = useState("");
    const [error,setError] = useState(false);
    const router  = useRouter();

    useEffect(()=>{
        loadFoodItem()
        },[]);

    const handleEditFoodItem = async() => {

        if(!name || !price || !path || !description)
        {
            setError(true)
            return false
        }
        else{
            setError(false)
        }
      //  console.log(name,price,path,description);
        const food_id = props.params.id;
      
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+food_id,{
            method:'PUT',
            body:JSON.stringify({name, price, img_path:path, description})
        });
        response = await response.json();
       if(response.success){
        router.push('../dashboard')
       }
       else{
        alert("Data not updated. Please try again")
       }
       
        
    }

    const loadFoodItem = async() => {
           
            const food_id = props.params.id;
            console.log(food_id)
            let response  = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+food_id);
            response = await response.json();
            if(response)
            {
                console.log(response.result)
                setName(response.result.name)
                setPrice(response.result.price)
                setPath(response.result.img_path)
                setDescription(response.result.description)
            }
            else{
                console.log("failed")
            }
            

    }

    return(
        <div className="container">
           <h2>Edit Food Items</h2> 
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
                <button className="button" onClick={handleEditFoodItem}>Update Food Item</button>
           </div>
           <div className="input-wrapper">
                <button className="button" onClick={()=>router.push('../dashboard')}>Back to Food Item List</button>
           </div>
        </div>
    )
}
export default EditFoodItems;