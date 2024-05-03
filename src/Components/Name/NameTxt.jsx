import React, { useState } from "react";
import "./NameTxt.css";
import { toast } from 'react-hot-toast';

export default function NameTxt({nameId, nameTxt , triggerEvent}) {
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleNameDoubleClick = () => {
    setEditingId(nameId);
    setEditedName(nameTxt);
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleNameBlur = async () => {
    if (editedName.trim() !== "" && editedName.trim() !== nameTxt.trim()) {
      try {
        await triggerEvent(nameId, editedName.trim());
        toast.success(`Name updated from ${nameTxt} to ${editedName} successfully`);
      } catch (error) {
        toast.error(error.message);
      }
    }
    setEditingId(null);
  };
  return (
    <div
      onDoubleClick={() => handleNameDoubleClick()}
    >
      {editingId === nameId ? (
        <input
          type="text"
          value={editedName}
          onChange={handleNameChange}
          onBlur={() => handleNameBlur()}
          autoFocus
        />
      ) : (
        <span>{nameTxt}</span>
      )}
    </div>
  );
}
