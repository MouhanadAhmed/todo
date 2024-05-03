import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { toast } from 'react-hot-toast';
import Todolist from "../Todolist/Todolist.jsx";
import { getListData , createList } from "./listService.js";

export default function Dashboard() {
  const [lists, setLists] = useState([]);
  const [newList, setAddedNewlist] = useState("");

  const fetchLists = () => {
    getListData()
      .then((listsData) => {
        setLists(listsData);
        console.log(listsData);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleKeyPress = async (event) => {
    if (event.key === "Enter" && newList) {
      createList(newList.trimEnd().trimStart())
      .then(() => {
        setAddedNewlist("")
        fetchLists();
        toast.success(`${newList} added successfully`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <div className="container">
      <h4 className="py-4">
        <i className="fa-solid fa-add me-2"></i>
        <span>Add New List </span>
          <input
              value= {newList}
              onChange = {(e) => setAddedNewlist(e.target.value)}
              onKeyDown = {(e) => handleKeyPress(e, newList)}
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
