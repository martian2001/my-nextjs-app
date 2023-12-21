import React, { useState, useEffect } from "react";
import { Pagination, CircularProgress, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const GifGallery = ({ gifs }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    setLoading(true);
    // Simulate a delay (replace this with your actual gif loading logic)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup function to clear the timeout on component unmount
    return () => clearTimeout(delay);
  }, [currentPage, gifs]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentGifs = gifs.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const toggleFavorite = (gifId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      newFavorites[gifId] = !newFavorites[gifId];
      return newFavorites;
    });
  };

  return (
    <div>
      <div className="gifContainer">
        {loading ? (
          <CircularProgress />
        ) : (
          currentGifs.map((gif) => (
            <div key={gif.id} className="gifCard">
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                style={{
                  width: "220px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div className="textContainer">
              <div className="gifText">
                <p style={{ fontWeight: "bold" }}>{gif.title}</p>
                <p>@{gif.username}</p>
              </div>
              <div>
                <IconButton
                  onClick={() => toggleFavorite(gif.id)}
                  color={favorites[gif.id] ? "primary" : "default"}
                >
                  {favorites[gif.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="paginationContainer">
        <Pagination
          shape="rounded"
          color="secondary"
          count={Math.ceil(gifs.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GifGallery;
