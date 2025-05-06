import { URL } from "./configuration";

export const getProducts = async ()=>{
    const res = await fetch(`${URL}/products`,{
        method:"GET",
        headers:{
            Accept:"application/json",
        }
    });
    return res.json();
}


