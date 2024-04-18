import Link from "next/link";

const CustomerHeader = ()=>{
    return(
        <div className="header-wrapper">
             <div className="logo">
                <img style={{width:80}} src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg?w=740&t=st=1712732494~exp=1712733094~hmac=bff8364ce29f29911c57247836bb3feaf72987e274a67feb2e2844b5cf3b2d39" />
            </div>
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/"}>Login</Link>
                </li>
                <li>
                    <Link href={"/"}>SignUp</Link>
                </li>
                <li>
                    <Link href={"/"}>Cart(0)</Link>
                </li>
                <li>
                    <Link href={"/"}>Add Restaurant</Link>
                </li>
                
            </ul>
        </div>
    )
}

export default CustomerHeader;