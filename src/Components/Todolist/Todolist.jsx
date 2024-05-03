import React, { useState, useEffect } from "react";
import "./Todolist.css";
import { toast } from 'react-hot-toast';
import { getItems, createItem, updateItemArchivedStatus } from './ItemService.js';

export default function Todolist({ list }) {
  const [Items, setItems] = useState([]);
  const [newItemValue, setNewItemValue] = useState("");

  async function fetchItems () {
    getItems(list._id).then((items) =>  {
      console.log(Items);
      setItems(items);
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return `${formattedDate} ${formattedTime}`;
  };

  const handleCheckboxChange = async (item, archived) => {
    updateItemArchivedStatus(item._id,archived ).then(() =>  {
      fetchItems();
      toast.success(`${item.name} ${archived ? 'archived' : 'unarchived'} successfully`);
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };

  const createNewItem = async (event) => {
    if (event.key === "Enter" && newItemValue) {
      createItem(newItemValue.trimEnd().trimStart(), list._id).then(() =>  {
        fetchItems();
        setNewItemValue("")
        toast.success(`${newItemValue} added successfully`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <div className="list">
      <div className="list-title">{list.name}</div>
      <div className="list-content">
        <ul>
          {Items && Items.filter((item) => !item.archived).map((item) => (
          <li key={item._id} >
                <input
                  type="checkbox"
                  checked={item.archived}
                  onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                />
                <span>{item.name}</span>
          </li>
          ))}
            <li>
            <i className="fa-solid fa-add me-2"></i>
            <input
             value= {newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              onKeyDown={(e) => createNewItem(e, newItemValue)}
              type="text"
            ></input>
          </li>
        </ul>
      </div>
      <div className="list-title"></div>
      <div className="list-content">
        <ul>
          {Items && Items.filter((item) => item.archived).map((item) => (
            <li key={item._id} className="archived-item" >
                <input
                  type="checkbox"
                  checked={item.archived}
                  onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                  />
                  <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="list-footer">
        <div className="list-actions">
          <button>Delete</button>
        </div>
        <div className="list-date">Created: {formatDateTime(list.createdAt)}</div>
      </div>
    </div>
  );
}