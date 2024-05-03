import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { toast } from 'react-hot-toast';
import Todolist from "../Todolist/Todolist.jsx";

export default function Dashboard() {
  const [lists, setLists] = useState([]);
  const [AddedNewList, setAddedNewlist] = useState("");

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

  const handleKeyPress = async (event) => {
    if (event.key === "Enter" && setAddedNewlist) {
      try {
        await axios.post(`http://localhost:8080/api/v1/list`,
        {
          "name": AddedNewList.trim(),
        });
        fetchLists();
        setAddedNewlist("")
        toast.success(`${AddedNewList} added successfully`);
      } catch (error) {

        toast.error('Error create new List ' + (error?.response?.data?.message && error.response.data.message));

        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <h4 className="py-4">
        <i className="fa-solid fa-add me-2"></i>
        <span>Add New List </span>
          <input
              value= {AddedNewList}
              onChange = {(e) => setAddedNewlist(e.target.value)}
              onKeyDown = {(e) => handleKeyPress(e, AddedNewList)}
              type="text"
            ></input>
      </h4>
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
