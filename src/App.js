import React, { useState } from 'react'
import './App.css';

function App() {
  const [profileImage, setProfileImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const uploadPreset = "vfvnwbhk"
  const handleFileInputChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    console.log(imagePreview)
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageUrl;
      if(        
          profileImage && (
          profileImage.type === "image/png" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/jpeg" 
        )
      ){
          const image = new FormData();
          image.append("file", profileImage)
          image.append("cloud_name", "djsn84htr")
          image.append("upload_preset", uploadPreset)

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/djsn84htr/image/upload",
            {
              method: "post",
              body:image
            }
          )
          const imgData = await response.json();
          imageUrl = imgData.url.toString();
          setImagePreview(null)
      }
      //do save the image in the database now
      alert(imageUrl);
      setIsLoading(false)
      setProfileImage('')
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  return (
    <div className="App">
      <h1>Cloudinary Image Uplods</h1>
      <form onSubmit={uploadImage}>
        <label>Photo:</label> <br />
        <input type="file" accept="image/png, image/jpeg, image/jpg" name="image"
          onChange={handleFileInputChange} /> <br />
        <p>
          {
            isLoading ? ("Uploading...") : (
              <button type='submit'>Upload image</button>
            )
          }
        </p>
      </form>
      <div>
        <div>
          {imagePreview && (
            <img src={imagePreview && imagePreview} alt='profileImg' />)}
        </div>
      </div>

    </div>
  );
}

export default App;
