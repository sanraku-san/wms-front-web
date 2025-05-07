import { URL } from "./configuration";

export const getUsers = async () => {
    const res = await fetch(`${URL}/users`, {
        method:"GET",
        headers:{
            Accept:"aplication/json",
        }
    });
    return res.json();
}
export const addAccount = async (data) => {
    const res = await fetch (`${URL}/users`,{
        method:"POST",
        headers:{
            Accept:"application/json",
        }
    });
    return res.json(data);

}