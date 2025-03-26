import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchPublications = async () => {
  try {
    const response = await axios.get(`${API_URL}/publicaciones/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
};

export const searchPublicationsByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/publicacionestitulo/${title}`);
    return response.data;
  } catch (error) {
    console.error('Error searching publications:', error);
    throw error;
  }
};

export const searchPublicationsByUser = async (userEmail) => {
  try {
    const response = await axios.get(`${API_URL}/publicacionesusuario/${userEmail}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user publications:', error);
    throw error;
  }
};

export const editPublication = async (id, formData) => {
  try {
    await axios.put(`${API_URL}/editmural/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    console.error('Error editing publication:', error);
    throw error;
  }
};

export const deletePublication = async (id) => {
  try {
    await axios.delete(`${API_URL}/deletemural/${id}`);
  } catch (error) {
    console.error('Error deleting publication:', error);
    throw error;
  }
};
