import profilePic from "../../assets/dev.jpg";

import "./index.css";

const Profile = () => (
  <div className="profile-container">
    <img src={profilePic} alt="dev-img" className="dev-img" />
    <div>
    <h1 className="profile-name">Uzair</h1>
    <p className="profile-bio">Full-Stack Developer</p>
    </div>
  </div>
);
export default Profile;

// import { Component } from 'react';
// import Cookies from 'js-cookie';
// import { Circles } from 'react-loader-spinner'; // Ensure correct props are used
// import './index.css';

// const apiProfileStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// };

// class Profile extends Component {
//   state = {
//     apiProfileStatus: apiProfileStatusConstants.initial,
//     profileData: {},
//   };

//   componentDidMount() {
//     this.getProfileData();
//   }

//   getProfileData = async () => {
//     this.setState({ apiProfileStatus: apiProfileStatusConstants.inProgress });
//     const jwtToken = Cookies.get('jwt_token');
//     const profileApiUrl = 'https://apis.ccbp.in/profile';
//     const profileOptions = {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       method: 'GET',
//     };

//     try {
//       const profileResponse = await fetch(profileApiUrl, profileOptions);
//       if (profileResponse.ok) {
//         const profileData = await profileResponse.json();
//         const updatedProfileData = {
//           name: profileData.profile_details.name,
//           profileImageUrl: profileData.profile_details.profile_image_url,
//           shortBio: profileData.profile_details.short_bio,
//         };

//         this.setState({
//           profileData: updatedProfileData,
//           apiProfileStatus: apiProfileStatusConstants.success,
//         });
//       } else {
//         this.setState({ apiProfileStatus: apiProfileStatusConstants.failure });
//       }
//     } catch {
//       this.setState({ apiProfileStatus: apiProfileStatusConstants.failure });
//     }
//   };

//   renderProfileView = () => {
//     const { profileData } = this.state;
//     const { name, shortBio, profileImageUrl } = profileData;

//     return (
//       <div className="profile-container">
//         <img src={profileImageUrl} alt="profile" className="profile-image" />
//         <h1 className="profile-name">{name}</h1>
//         <p className="profile-bio">{shortBio}</p>
//       </div>
//     );
//   };

//   onRetryFailure = () => {
//     this.getProfileData();
//   };

//   renderProfileFailureView = () => (
//     <div className="profile-fail-container">
//       <h1>Failed to load profile</h1>
//       <button type="button" className="failure-btn" onClick={this.onRetryFailure}>
//         Retry
//       </button>
//     </div>
//   );

//   renderProfileLoadingView = () => (
//     <div className="loader-container" data-testid="loader">
//       <Circles color="#0b69ff" height={50} width={50} />
//     </div>
//   );

//   renderProfileStatus = () => {
//     const { apiProfileStatus } = this.state;

//     switch (apiProfileStatus) {
//       case apiProfileStatusConstants.success:
//         return this.renderProfileView();
//       case apiProfileStatusConstants.failure:
//         return this.renderProfileFailureView();
//       case apiProfileStatusConstants.inProgress:
//         return this.renderProfileLoadingView();
//       default:
//         return null;
//     }
//   };

//   render() {
//     return <>{this.renderProfileStatus()}</>;
//   }
// }

// export default Profile;
