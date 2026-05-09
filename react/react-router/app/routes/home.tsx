import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Header from "components/Header";
import axios from "axios";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Home" },
  ];
}

export default function Page() {

  async function getTest(){
    const res = await axios.get('http://localhost:8000/api/test')
    const {data} = res
    console.log(data);
    
  }
  
  useEffect(() => {
    getTest()
  }, [])
  
  return (
    <>
      <div className="flex flex-col">
        
      </div>
    </>
  );
}
