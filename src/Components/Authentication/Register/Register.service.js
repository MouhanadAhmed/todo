import axios from "axios";

export default async function sendRegisterData(values){
    let response =await axios.post('http://localhost:8080/api/v1/user',values)
    .catch((err)=> {
        console.log(err.response.data)
        return err;
    })
        return response;
    
  }