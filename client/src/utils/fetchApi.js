import axios from "axios"

export const getData = async(value)=>{
    try {
        
        const {data} = await axios.get(`http://localhost:3000/${value}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}