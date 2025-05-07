import {URL} from "./configuration";

export const getStores = async () => {
    const res = await fetch(`${URL}/stores`, {
        method:"GET",
        headers:{
            Accept:"application/json,"
        }
    });
    return res.json();
}
export const addStores = async (data) => {
    const res = await fetch (`${URL}/stores`,{
        method:"POST",
        headers:{
            Accept:"application/json",
        }
    });
    return res.json(data);

}