'use client'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader =()=>{

    const [details,setDetails] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>{
        let data = localStorage.getItem("restaurantUser");
        
        if(!data && pathname=="/restaurant/dashboard"){
            router.push("/restaurant");
        }else if(data && pathname=="/restaurant"){
            router.push("/restaurant/dashboard");
        }
        else{
            setDetails(JSON.parse(data))
        }

    },[])
    
    const logout = () =>{
        localStorage.removeItem("restaurantUser");
        router.push("/restaurant");
    }
    return(
        <div className="header-wrapper">
            <div className="logo">
                <img style={{width:80}} src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg?w=740&t=st=1712732494~exp=1712733094~hmac=bff8364ce29f29911c57247836bb3feaf72987e274a67feb2e2844b5cf3b2d39" />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {
                    details && details.name ?
                    <>
                    <li> <button onClick={logout}>Logout</button></li>
                    <li> <Link href="/">Profile</Link></li>
                    </>
                    
                    :<li>  <Link href="/">Login/SignUp</Link>  </li>
                }
                
                
            </ul>
        </div> 
    )
}

export default RestaurantHeader;