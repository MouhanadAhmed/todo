import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { toast } from 'react-hot-toast';
import Todolist from "../Todolist/Todolist.jsx";
import { getListData, createList, deleteList, updateList } from "./listService.js";
import NameTxt from  "../Name/NameTxt.jsx";

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

  const AddNewList = async (event) => {
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

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return `${formattedDate} ${formattedTime}`;
  };

  const deleteListData = async (list) => {
    const listName = list.name;
    deleteList(list._id)
      .then(() => {
        fetchLists();
        toast.success(`${listName} deleted successfully`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleListNameDoubleClick = async (listId, listName) => {
    await updateList(listId, listName.trim());
    fetchLists();
  };

  return (
    <div className="container">
      <h4 className="py-4">
        <i className="fa-solid fa-add me-2"></i>
        <span>Add New List </span>
          <input
              value= {newList}
              onChange = {(e) => setAddedNewlist(e.target.value)}
              onKeyDown = {(e) => AddNewList(e, newList)}
              type="text"
            ></input>
      </h4>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {lists.map((list) => (
        <div className="list" key={list._id}>
          <div className="list-title">
            <NameTxt
              nameId = {list._id}
              nameTxt = {list.name}
              updateEvent = {handleListNameDoubleClick}
              >
              </NameTxt>
          </div>
          <div key={list._id} className="col">
            <Todolist listId = {list._id} ></Todolist>
          </div>
          <div className="list-footer">
            <div className="list-actions">
              <button onClick={() => deleteListData(list)}>Delete</button>
            </div>
            <div className="list-date">Created: {formatDateTime(list.createdAt)}</div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
