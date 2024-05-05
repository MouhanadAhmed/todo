import React, { useState } from "react";
import "./NameTxt.css";
import { toast } from 'react-hot-toast';

export default function NameTxt({nameId, nameTxt , updateEvent, deleteEvent}) {
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [isHovered, setIsHovered] = useState(false);


  const handleNameDoubleClick = () => {
    setEditingId(nameId);
    setEditedName(nameTxt);
  };

  const handleNameBlur = async () => {
    if (editedName.trim() !== "" && editedName.trim() !== nameTxt.trim()) {
      try {
        await updateEvent(nameId, editedName.trim());
        toast.success(`Name updated from ${nameTxt} to ${editedName} successfully`);
      } catch (error) {
        toast.error(error.message);
      }
    }
    setEditingId(null);
  };

  const handleDelete = async () => {
      try {
        await deleteEvent(nameId);
        toast.success(`${nameTxt} Deleted successfully`);
      } catch (error) {
        toast.error(error.message);
      }
  };

  return (
    <div
      onDoubleClick={() => handleNameDoubleClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {editingId === nameId ? (
        <input
          type="text"
          value={editedName}
          onChange={(event) => setEditedName(event.target.value)}
          onBlur={() => handleNameBlur()}
          autoFocus
        />
      ) : (
      <span>
        <span>{nameTxt}</span>
        <span className="deleteIcon">
          {isHovered && deleteEvent &&  (
            <i
              className="fa-solid fa-xmark fa-me-2"
              onClick={() => handleDelete()}
              data-testid="delete-icon"
            ></i>
          )}
        </span>
      </span>
      )}
    </div>
  );
}
