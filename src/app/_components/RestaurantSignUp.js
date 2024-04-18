import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignUp = () =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [c_password,setC_password] = useState('');
    const [name,setName] = useState('');
    const [city,setCity] = useState('');
    const [address,setAddress] = useState('');
    const [contact,setContact] = useState('');
    const router = useRouter();
    const [error,setError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    
    const handleSignUp = async() =>{
        if(password !== c_password){
            setPasswordError(true);
            return false
        }else{
            setPasswordError(false);
        }
        if(!email || !password || !c_password || !name || !city || !address || !contact)
        {
                setError(true);
                return false
        }else{
            setError(false);
        }
        console.log(email,password,name,city,address,contact);
        let response = await fetch("http://localhost:3000/api/restaurant",{
            method:"POST",
            body:JSON.stringify({email,password,name,city,address,contact})
        })
        response = await response.json();
        console.log(response);
        if(response.success){
            const {result} = response
            delete result.password;
            localStorage.setItem("restaurantUser",JSON.stringify(result));
            router.push("restaurant/dashboard");
        }
    }

    return(
        <>
            <h3>Sign Up </h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email id" className="input-field" />
                    {
                        error && !email && <span className="input-error">Please enter valid email</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password" className="input-field" />
                    {
                        passwordError && <span className="input-error"> Password and Confirm Password doesnt match</span>
                    }
                    {
                        error && !password && <span className="input-error">Please enter valid password</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="password" value={c_password} onChange={e => setC_password(e.target.value)}
                        placeholder="Confirm password" className="input-field" />
                    {
                        passwordError && <span className="input-error"> Password and Confirm Password doesnt match</span>
                    }
                    {
                        error && !c_password && <span className="input-error">Please enter valid confirm password</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                        placeholder="Enter restaurant name" className="input-field" />
                    {
                        error && !name && <span className="input-error">Please enter valid name</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" value={city} onChange={e => setCity(e.target.value)}
                        placeholder="Enter city" className="input-field" />
                    {
                        error && !city && <span className="input-error">Please enter valid city</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" vvalue={address} onChange={e => setAddress(e.target.value)}
                        placeholder="Enter full address" className="input-field" />
                    {
                        error && !address && <span className="input-error">Please enter valid address</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="text" value={contact} onChange={e => setContact(e.target.value)}
                        placeholder="Enter contact no." className="input-field" />
                    {
                        error && !contact && <span className="input-error">Please enter valid contact</span>
                    }

                </div>

                <div className="input-wrapper" >
                    <button className="button" onClick={handleSignUp}>Sign up</button>
                </div>
            </div>
        </>
    )
}
export default RestaurantSignUp;