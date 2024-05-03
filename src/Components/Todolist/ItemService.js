import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export const getItems = async (listId) => {
  try {
    return axios.get(`${API_URL}/item/${listId}/list`)
    .then(response => response.data.result.Items);
  } catch (error) {
    throw new Error(`Error fetching items for list ${listId}: ${error?.response?.data?.message}`);
  }
};

export const createItem = async (itemName, listId) => {
  try {
    return axios.post(`${API_URL}/item`, {
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
    return axios.put(`${API_URL}/item/${itemId}`, { archived });
  } catch (error) {
    throw new Error(`Error updating archived status for item ${itemId}: ${error?.response?.data?.message}`);
  }
};
