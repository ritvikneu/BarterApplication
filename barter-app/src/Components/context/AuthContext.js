// import { createContext, useContext, useEffect, useState } from 'react';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from 'firebase/auth';
// import { auth } from '../firebase/firebase.js';

// const UserContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState({});

//   const createUser = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//    const signIn = (email, password) =>  {
//     return signInWithEmailAndPassword(auth, email, password)
//    }

//   const logout = () => {
//       return signOut(auth)
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log(currentUser);
//       currentUser.getIdToken().then((token) => {
//         console.log("Access Token "+token);
//       });
//       console.log("Email Id "+currentUser.email);
//       setUser(currentUser);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <UserContext.Provider value={{ createUser, user, logout, signIn }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(UserContext);
// };

import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.js';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.getIdToken().then((token) => {
          // console.log("Access Token "+token);
        });
        // console.log("Email Id "+currentUser.email);
        localStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
