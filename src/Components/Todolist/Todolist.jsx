import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todolist.css";
import { toast } from 'react-hot-toast';

export default function Todolist() {
  const [lists, setLists] = useState([]);

  async function fetchNotes() {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/list");
      const { Lists } = data.result;

      const get = await Promise.all(Lists.map(async (list) => {
        return await getItems(list, list)
      }));
      setLists(get);
    } catch (error) {
      toast.error('Error archiving item', error);
    }
  }

  async function getItems (list) {
    const itemResponse = await axios.get(`http://localhost:8080/api/v1/item/${list._id}/list`);
    const { Items } = itemResponse.data.result;
    let updatedLists = { ...list, Items };
    console.log(updatedLists);
    return updatedLists;
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return `${formattedDate} ${formattedTime}`;
  };

  const handleCheckboxChange = async (list, itemId, archived) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/item/${itemId}`, { archived });
      fetchNotes();

      toast.success(`Item ${archived ? 'archived' : 'unarchived'} successfully`);
    } catch (error) {
      toast.error('Error archiving item', error);
    }
  };

  return (
    <div className="container">
      <h3 className="py-4">Todo</h3>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {lists.map((list) => (
          <div key={list._id} className="col">
            <div className="list">
              <div className="list-title">{list.name}</div>
              <div className="list-content">
                <ul>
                  {list.Items && list.Items.filter((item) => !item.archived).map((item) => (
                  <li key={item._id} >
                       <input
                          type="checkbox"
                          checked={item.archived}
                          onChange={(e) => handleCheckboxChange(item, item._id, e.target.checked)}
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
                  {list.Items && list.Items.filter((item) => item.archived).map((item) => (
                    <li key={item._id} className="archived-item" >
                        <input
                          type="checkbox"
                          checked={item.archived}
                          onChange={(e) => handleCheckboxChange(item, item._id, e.target.checked)}
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
          </div>
        ))}
      </div>
    </div>
  );
}
