import React, { useState, useEffect } from "react";
import "./Todolist.css";
import { toast } from 'react-hot-toast';
import { getItems, createItem, updateItem, deleteItem } from './ItemService.js';
import NameTxt from '../Name/NameTxt.jsx'

export default function Todolist({ listId }) {
  const [Items, setItems] = useState([]);
  const [newItemValue, setNewItemValue] = useState("");

  async function fetchItems () {
    getItems(listId).then((items) =>  {
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

  const handleCheckboxChange = async (item, archived) => {
    updateItem(item._id, { archived: archived} ).then(() =>  {
      fetchItems();
      toast.success(`${item.name} ${archived ? 'archived' : 'unarchived'} successfully`);
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };

  const createNewItem = async (event) => {
    if (event.key === "Enter" && newItemValue) {
      createItem(newItemValue.trimEnd().trimStart(), listId).then(() =>  {
        fetchItems();
        setNewItemValue("")
        toast.success(`${newItemValue} added successfully`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }
  };

  const handleItemNameDoubleClick = async (listId, listName) => {
    await updateItem(listId, { name: listName.trim()});
    fetchItems();
  };

  const handleDeleteItem = async (itemId) => {
    await deleteItem(itemId);
    fetchItems();
  };

  return (
    <div>
      <div className="list-content">
        <ul>
          {Items && Items.filter((item) => !item.archived).map((item) => (
          <li key={item._id} >
                <input
                  type="checkbox"
                  checked={item.archived}
                  onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                />
                <NameTxt
                  nameId = {item._id}
                  nameTxt = {item.name}
                  updateEvent = {handleItemNameDoubleClick}
                  deleteEvent = {() => handleDeleteItem(item._id)}
                  >
                  </NameTxt>
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
      <div className="list-content">
        <ul>
          {Items && Items.filter((item) => item.archived).map((item) => (
            <li key={item._id} className="archived-item" >
              <input
                type="checkbox"
                checked={item.archived}
                onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                />
                <NameTxt
                  nameId = {item._id}
                  nameTxt = {item.name}
                  updateEvent = {handleItemNameDoubleClick}
                  deleteEvent = {handleDeleteItem}
                  >
                  </NameTxt>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}