import React, { useState, useEffect } from "react";
import "./User.css";
import { FaUser,FaGithub } from 'react-icons/fa';
import { ImEarth,ImLocation} from 'react-icons/im';
import { Link, useParams } from "react-router-dom";
import axios from "../axios";
import Uirepo from "./Uirepo";
const User = () => {
  const { login } = useParams();

  //UserInformation
  const [userInfo, setUserInfo] = useState({});
  //User repos
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await Promise.all([
          axios.get(`/users/${login}`),
          axios.get(`/users/${login}/repos`),
        ]);
        setUserInfo(response[0].data);
        setRepos(response[1].data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInformation();
  }, []);
  return (
    <div className="container">
      <Link to="/" className="back">
        Back
      </Link>
      <div className="user-information">
       
        <div className="user-content">
          <h3>{userInfo?.name}</h3>
          <p>{userInfo?.bio}</p>
          <div className="more-data">
            <p>
              <FaUser/>
              {userInfo?.followers} Followers. Following {userInfo?.following}
            </p>
            {userInfo?.location && (
              <p>
                <ImLocation/>
                {userInfo?.location}
              </p>
            )}
            {userInfo?.blog && (
              <p>
                <ImEarth/>
                {userInfo?.blog}
              </p>
            )}
            <p>
              <FaGithub/>
              <a href={userInfo?.html_url}>View GitHub Profile</a>
            </p>
          </div>
        </div>
      </div>
      <div className="user-repos">
        {repos ? (
          repos.map((repo) => {
            return <Uirepo repo={repo} key={repo.id} />;
          })
        ) : (
          <h2>No repos for this user...</h2>
        )}
      </div>
    </div>
  );
};

export default User;
