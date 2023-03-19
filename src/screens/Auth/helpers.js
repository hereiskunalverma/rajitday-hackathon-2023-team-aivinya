import jwt_decode from 'jwt-decode';
import * as Yup from 'yup';
import axios from '../../services/axios';
import { setAnalyticsUserId, sendEventToAnalytics } from '../../services/analytics';
// import OrgContext from 'utils/orgContext';
import { useState, useEffect } from 'react';
import { useContext } from 'react';

export const LoginAuth = async (
  authRes,
  LogIn,
  firebase,
  fetchFailure,
  isInviteFlow,
  invite_key,
  router
) => {
  //Get Auth id token from Firebase

  let token = await firebase
    .auth()
    .currentUser.getIdToken()
    .catch((err) => {
      fetchFailure(err);
    });

  console.log('token: ' + token);

  //server authentication, returns jwt token
  if (!token) return;
  let email = authRes.user.email;
  let data = { email, token };
  let authServerRes = await axios.post(`/auth/login`, data).catch((err) => {
    fetchFailure(err);
  });

  if (!authServerRes) return;

  let validToken = isValidToken(authServerRes.data.token, fetchFailure);

  let id = validToken.user;
  let username = authRes.user.displayName;
  let photo = authRes.user.photoURL;
  let provider = authRes.user.providerData[0].providerId;
  let jwt_token = authServerRes.data.token;

  let user = {
    id,
    email,
    username,
    photo,
    provider,
    jwt_token
  };

  sendEventToAnalytics('login', { method: 'Email' });
  setAnalyticsUserId(id);

  //save user info to React context
  await LogIn(user);

  //navigate to correct route based on flow
  if (isInviteFlow) {
    router.push(`/user/confirmedinvite/${invite_key}`);
  } else {
    // setRestriction()
    router.push('/user/dashboard');
  }
};

// const setRestriction = async () => {
//   // console.log(org);

//   let url = process.env.NEXT_PUBLIC_SERVER_URL;
//   let email = JSON.parse(localStorage.getItem("user")).email;

//   console.log("from helper.js hello")
//   console.log(`${url}/api/orgbyemail/?email=${email}`);

//           let res = await axios.get(`${url}/api/orgbyemail/?email=${email}`);

//           res = res.data;
//           console.log(res);

//           let subscription_id = null;
//           let sub = null

//           let planMap = {
//             "Rise plan": 1,
//             "Growth plan": 2,
//             "Scale plan": 3
//           }

//           res.forEach((item) => {
//             if (item.subscription_id != undefined && item.subscription_id != null) {
//               if  (subscription_id == null && item.subscription_id != null) {
//                 subscription_id=item.subscription_id;
//                 sub = item.plan_type;
//               }

//               if (planMap[sub] > planMap[item.plan_type]) {
//                 subscription_id=item.subscription_id;
//                 sub = item.plan_type;
//               }

//             }
//           })

//           console.log(sub);

//           if (sub == null) sub = "free";
//         else if (sub === "Growth Plan") sub = "growth";
//         else if (sub === "Scale Plan") sub = "scale";
//         else sub = "rise";

//   let planRestrictions = localStorage.getItem("planRestrictions");
//   if (planRestrictions == undefined || planRestrictions == null) {
//     // Get current subscription
//     // let sub = "free";

//     let creditMap = {
//       "free": 1000,
//       "growth": 100000,
//       "scale": 400000,
//       "rise": 40000
//     }

//     localStorage.setItem("planRestrictions", JSON.stringify({
//       user: JSON.parse(localStorage.getItem("user")).id ,
//       plan: sub,
//       credits: creditMap[sub]
//     }))
//   }

//   if (planRestrictions != null && planRestrictions != undefined && (JSON.parse(planRestrictions).plan != sub)) {
//     let creditMap = {
//       "free": 1000,
//       "growth": 100000,
//       "scale": 400000,
//       "rise": 40000
//     }

//     localStorage.setItem("planRestrictions", JSON.stringify({
//       user: JSON.parse(localStorage.getItem("user")).id ,
//       plan: sub,
//       credits: creditMap[sub]
//     }))
//   }

//   let creditUserMap = localStorage.getItem("creditUserMap");
//   if (creditUserMap == null || creditUserMap == undefined) {
//     let creditMap = {
//       "free": 1000,
//       "growth": 100000,
//       "scale": 400000,
//       "rise": 40000
//     }
//     localStorage.setItem("creditUserMap", JSON.stringify({
//       [JSON.parse(localStorage.getItem("user")).id] : creditMap[sub]
//     }))
//   }

//   else {
//     let creditMap = {
//       "free": 1000,
//       "growth": 100000,
//       "scale": 400000,
//       "rise": 40000
//     }

//     if (Object.keys(JSON.parse(creditUserMap)).includes(JSON.parse(localStorage.getItem("user")).id)) {
//       localStorage.setItem("creditUserMap", JSON.stringify({
//         ...JSON.parse(creditUserMap),
//         [JSON.parse(localStorage.getItem("user")).id] : creditMap[sub]
//       }))

//       localStorage.setItem("planRestrictions", JSON.stringify({
//         user: JSON.parse(localStorage.getItem("user")).id,
//         plan: sub,
//         // credits: creditUserMap[JSON.parse(localStorage.getItem("user")).id]
//         credits: JSON.parse(creditUserMap)[JSON.parse(localStorage.getItem("user")).id]
//       }))
//       console.log(creditUserMap[JSON.parse(localStorage.getItem("user")).id])
//       // console.log("user id creditusermap: " + JSON.parse(localStorage.getItem("user")).id);
//       let userid = localStorage.getItem("user");
//       console.log(userid);
//     }

//     else {
//       localStorage.setItem("creditUserMap", JSON.stringify({
//         ...JSON.parse(creditUserMap),
//         [JSON.parse(localStorage.getItem("user")).id] : creditMap[sub]
//       }))
//     }
//   }

//   // if (planRestrictions != null && planRestrictions != undefined && (JSON.parse(planRestrictions).user != sub)) {

// }

export const SignupAuth = async (
  authRes,
  firebase,
  fetchFailure,
  name,
  domainUrl,
  isInviteFlow,
  invite_key,
  router
) => {
  // If user signed up with email, then set their display username
  if (!authRes) return;
  const isEmailSignup = authRes.additionalUserInfo.providerId === 'password';
  if (isEmailSignup && name) {
    let curUser = await firebase.auth().currentUser;

    await curUser
      .updateProfile({
        displayName: name
      })
      .catch((err) => {
        fetchFailure(err);
      });
  }

  //Get Auth id token from Firebase
  let token = await firebase
    .auth()
    .currentUser.getIdToken()
    .catch((err) => {
      fetchFailure(err);
    });

  //server firebase authentication, returns jwt token
  let username = authRes.user.displayName ? authRes.user.displayName : name;
  let email = authRes.user.email;

  // the url the user is redirected to after email verify
  const confirmEmailUrl = `${domainUrl}/auth/confirmedemail`;

  let authData = { email, username, token, confirmEmailUrl, isInviteFlow, invite_key };
  console.log(authData, "========>authData");

  await axios.post(`/auth/signup`, authData).catch((err) => {
    fetchFailure(err);
  });

  router.push('/auth/emailconfirm');
};

//valid format for setting an email, username and password
export const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required'),
  username: Yup.string()
    .min(3, 'Name must be at least 3 Characters')
    .max(50, 'Name Too Long')
    .required('Name Required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 Characters')
    .max(50, 'Password Too Long')
    .required('Password Required')
});

const isValidToken = (token, fetchFailure) => {
  //decode jwt token recieved from server
  let validToken;
  try {
    validToken = jwt_decode(token);
  } catch {
    console.log('JWT token decode failed');
    let error = {
      type: 'Authentication Failed',
      message: 'Authentication Failed, please try again or contact Support'
    };

    // fetchFailure(error);
  }

  return validToken;
};
