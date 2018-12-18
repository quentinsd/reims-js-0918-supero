import React from "react";
import "./UserProfile.css";
import Header from "./Header";
import axios from "axios";
import Loading from "./Loading";
import DisplayDifficultyIcon from "./DisplayDifficultyIcon";
import ageCalculation from "./ageCalculation";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    const user_id = this.props.match.params.id;
    this.props.fetchUserProfile();
    axios
      .get(`http://localhost:3001/users/${user_id}`)
      .then(res => this.props.viewUserProfile(res.data[0]));
  }

  render() {
    return !this.props.userProfile ? (
      <Loading />
    ) : (
      <div className="user_profile" style={{ height: "100vh" }}>
        <Header title="Profil" goBack={this.goBack} />

        <div
          style={{
            marginBottom: "-40px",
            justifyContent: "center",
            flexWrap: "wrap",
            display: "flex"
          }}
        >
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              maxHeight: "220px"
            }}
          >
            <img
              style={{ width: "100%" }}
              src={process.env.PUBLIC_URL + `/images/running.jpg`}
              alt="sport"
              align="bottom"
            />
          </div>
          <div className="avatar rounded-circle">
            {this.props.userProfile.user_photo !== "photo" ? (
              <img
                src={this.props.userProfile.user_photo}
                alt="avatar"
                align="bottom"
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + `/images/avatar_fabien.jpeg`}
                alt="avatar"
                align="bottom"
              />
            )}
          </div>
        </div>
        <div className="user_name">
          <h2>
            {this.props.userProfile.user_firstname}{" "}
            <span>{this.props.userProfile.user_lastname}</span>
          </h2>
          <h4 className="user_age">
            {ageCalculation(this.props.userProfile.user_birthdate)} ans
          </h4>
        </div>
        <div className="user_detail">
          <div>
            <h5>Niveau</h5>
            <span className="level">
              <DisplayDifficultyIcon
                difficulty={this.props.userProfile.user_level}
              />
            </span>
          </div>
          <div>
            <h5>Activités</h5>
            <p>
              Organisés : <span>10</span> | Participés : <span>7</span>
            </p>
          </div>
        </div>
        <div className="user_about">{this.props.userProfile.user_about}</div>
        <button className="send_message">Envoyer un message</button>
      </div>
    );
  }
}
export default UserProfile;