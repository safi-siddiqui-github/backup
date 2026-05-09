'use server'
import axios from "axios";

export async function RegisterUser(formData: FormData) {

    console.log(formData.get('firstname'));

    const data = await axios.post('http://expressjs:3000/api/v1/user/register', {formData})

    console.log(data);
    return;
    
    
    const user = await data.data
    const userData = user.data;
    console.log(userData);
    return userData;
}
