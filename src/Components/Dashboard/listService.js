import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export const getListData = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data.result.Lists;
  } catch (error) {
    throw new Error(`Error fetching lists: ${error?.response?.data?.message && error.response.data.message}`);
  }
};

export const createList = async (listName) => {
  try {
      const response = await axios.post(`${API_URL}/list`, { name: listName });
      return response.data;
  } catch (error) {
    throw new Error(`Error create new List : ${error?.response?.data && error.response.data.message}`);
  }
};

export const deleteList = async (listId) => {
  try {
      return await axios.delete(`${API_URL}/list/${listId}`);
  } catch (error) {
      throw new Error(`Error create new List : ${error?.response?.data && error.response.data.message}`);
  }
};
