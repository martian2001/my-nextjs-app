// lib/Giphy.js
import axios from "axios";

const GIPHY_API_KEY = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";

export const searchGifs = async (query) => {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${GIPHY_API_KEY}&limit=18`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    return [];
  }
};
