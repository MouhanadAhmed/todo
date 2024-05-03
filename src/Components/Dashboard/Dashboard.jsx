import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { toast } from 'react-hot-toast';
import Todolist from "../Todolist/Todolist.jsx";

export default function Dashboard() {
  const [lists, setLists] = useState([]);

  async function fetchLists() {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/list");

      console.log(data);

      const lists = data.result.Lists;
      setLists(lists);
    } catch (error) {
      toast.error('Error fetching lists'+ error);
    }
  }

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="container">
      <h3 className="py-4">Todo</h3>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {lists.map((list) => (
          <div key={list._id} className="col">
            <Todolist list = {list} ></Todolist>
          </div>
        ))}
      </div>
    </div>
  );
}
