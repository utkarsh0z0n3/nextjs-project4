import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const [foodItems,setFoodItems] = useState([])
    const router = useRouter();

    useEffect(()=>{
        loadFoodItems()
    },[]);

    const loadFoodItems = async()=>{
        const restaurantData = JSON.parse((localStorage.getItem('restaurantUser')));
        const resto_id = restaurantData._id;
            let response = await fetch("http://localhost:3000/api/restaurant/foods/"+resto_id);
            response = await response.json();
            if(response)
            {
                console.log(response)
                setFoodItems(response.result)
            }else{
                alert("food item not loading")
            }
    }
    const deleteFoodItems = async(id) => {
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+id,{
            method:'delete'
        })
        response = await response.json();
        if(response.success){
            loadFoodItems();
        }
        else{
            alert("food item not loading")
        }
    }

    return(
        <div>
            <h1>Food Items</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems.map((food,key) =>
                        <tr key={key}>
                            <td>{key+1}</td>
                            <td>{food.name}</td>
                            <td>{food.price}</td>
                            <td>{food.description}</td>
                            <td><img src={food.img_path}/></td>
                            <td><button onClick={()=>deleteFoodItems(food._id)}> Delete</button>
                            <button onClick={()=>router.push("dashboard/"+food._id)}>Edit</button></td>
                        </tr> 
                        )
                    }
                
                    

                </tbody>
            </table>
        </div>
    )
}
export default FoodItemList;