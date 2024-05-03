import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todolist.css";
import { toast } from 'react-hot-toast';

export default function Todolist({ list }) {
  const [Items, setItems] = useState([]);

  async function getItems () {
    const itemResponse = await axios.get(`http://localhost:8080/api/v1/item/${list._id}/list`);
    const { Items } = itemResponse.data.result;

    console.log(Items);
    setItems(Items);
  };

  useEffect(() => {
    getItems();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return `${formattedDate} ${formattedTime}`;
  };

  const handleCheckboxChange = async (item, archived) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/item/${item._id}`, { archived });
      getItems();

      toast.success(`${item.name} ${archived ? 'archived' : 'unarchived'} successfully`);
    } catch (error) {
      toast.error('Error archiving item', error);
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
            {/* <li>
              add
            <input ></input>
          </li> */}
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