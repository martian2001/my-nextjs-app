import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { searchGifs } from "../lib/Giphy";
import auth from "../lib/firebase";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import GifGallery from "../components/GifGallery";
import "../styles/styles.css"; // Import the styles

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // Redirect to login if user is not authenticated and not loading
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);


  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      const fetchedGifs = await searchGifs(searchQuery);
      setGifs(fetchedGifs);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="inputContainer">
      <h1 style={{fontFamily: "Helvetica",}}>GIF Search App</h1>
      {user ? (
        <>
          <div className="navBar">
          <p>Welcome, {user.email}!</p>
          <button onClick={handleSignOut} className="searchButton">Sign Out</button>
          </div>
          <div className="searchContainer">
            <label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="inputStyle"
                placeholder="Enter your search query..."
              />
            </label>
            <button onClick={handleSearch}
              className="searchButton">Search</button>
          </div>
          <GifGallery gifs={gifs} />
        </>
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </div>
  );
};

export default Home;





// import React, { useState, useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRouter } from "next/router";
// import { searchGifs } from "../lib/Giphy";
// import auth from "../lib/firebase";
// import SignIn from "../components/SignIn";
// import SignUp from "../components/SignUp";
// import GifGallery from "../components/GifGallery";
// import IconButton from "@mui/material/IconButton";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import "../styles/styles.css"; // Import the styles


// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [gifs, setGifs] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const router = useRouter();
//   const [user, loading, error] = useAuthState(auth);

//   useEffect(() => {
//     // Redirect to login if user is not authenticated and not loading
//     if (!user && !loading) {
//       router.push("/login");
//     }
//   }, [user, loading, router]);

//   const handleSearch = async () => {
//     if (searchQuery.trim() !== "") {
//       const fetchedGifs = await searchGifs(searchQuery);
//       setGifs(fetchedGifs);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await auth.signOut();
//       router.push("/login");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   const toggleFavoritesView = () => {
//     setShowFavorites(!showFavorites);
//   };

//   return (
//     <div className="inputContainer">
//       <h1>GIF Search App</h1>
//       {user ? (
//         <>
//           <div className="navBar">
//             <p>Welcome, {user.email}!</p>
//             <IconButton onClick={toggleFavoritesView} className="favoriteIcon">
//               <FavoriteIcon />
//             </IconButton>
//             <button onClick={handleSignOut} className="searchButton">
//               Sign Out
//             </button>
//           </div>
//           {!showFavorites && (
//             <div className="searchContainer">
//               <label>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="inputStyle"
//                   placeholder="Enter your search query..."
//                 />
//               </label>
//               <button onClick={handleSearch} className="searchButton">
//                 Search
//               </button>
//             </div>
//           )}
//           {showFavorites && <GifGallery gifs={favorites} />}
//           {!showFavorites && <GifGallery gifs={gifs} setFavorites={setFavorites} />}
//         </>
//       ) : (
//         <>
//           <SignIn />
//           <SignUp />
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;
