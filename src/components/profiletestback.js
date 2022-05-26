import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Profile(props) {

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getData();
  }, [])

  function getData() {
   axios({
     method: "GET",
     url:"/api/profile",
     headers: {
       Authorization: 'Bearer ' + props.token
     }
  })
  .then((response) => {
    const res =response.data
    res.access_token && props.setToken(res.access_token)
    setProfileData({
      my_nickname: res.firstname,
      my_birthdate: res.lastname,
      my_email: res.email,
      my_dogs: res.dogs,
      })
      console.log(res.dogs)
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
   })}


   
   return (
    <div style={{marginTop:'250px', marginBottom:'250px'}} className="Profile">
 
        {profileData && <div>
            <h3>Your profile details</h3>
            <p>My nickname: {profileData.my_nickname}</p>
            <p>My birthdate: {profileData.my_birthdate}</p>
            <p>My email: {profileData.my_email}</p>
            
            {profileData.my_dogs.map((dog, index) =>
              <div key={index}>
              <p>index : {index}</p>
              <p>Nom du chien : {dog.dogname}</p>
              <p>Race du chien : {dog.breed}</p>
            </div>)}
            </div>
        }
        <button onClick={() => navigate("/api/logout", { replace: true })
}>Logout</button>
        
        
 
    </div>
  );
 }
 
 export default Profile;

