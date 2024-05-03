import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export const getItems = async (listId) => {
  try {
    const response = await axios.get(`${API_URL}/item/${listId}/list`);
    return response.data.result.Items;
  } catch (error) {
    throw new Error(`Error fetching items for list ${listId}: ${error?.response?.data?.message}`);
  }
};

export const createItem = async (itemName, listId) => {
  try {
    await axios.post(`${API_URL}/item`, {
      name: itemName,
      list: listId,
      archived: false
    });
  } catch (error) {
    throw new Error(`Error creating new item for list ${listId}: ${error?.response?.data?.message}`);
  }
};

export const updateItemArchivedStatus = async (itemId, archived) => {
  try {
    await axios.put(`${API_URL}/item/${itemId}`, { archived });
  } catch (error) {
    throw new Error(`Error updating archived status for item ${itemId}: ${error?.response?.data?.message}`);

  }
};
