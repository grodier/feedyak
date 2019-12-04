import { useState, useEffect, useContext, createContext } from 'react';
import {
  handleUserStateChanged,
  getCurrentUser,
  signUpUser,
  signInUser,
  signOutUser,
} from '../firebase/firebaseAuth';

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(getCurrentUser());
  console.log(user);
  const [isPending, setIsPending] = useState(!user);
  console.log(isPending);

  async function onUserStateChanged(user) {
    if (user) {
      setUser(user);
      return setIsPending(false);
    }
    setUser(user);
    setIsPending(false);
  }

  useEffect(() => {
    const unsubscribe = handleUserStateChanged(onUserStateChanged);
    return () => unsubscribe();
  }, []);

  const signUp = signUpUser;
  const login = signInUser;
  const logout = signOutUser;

  return (
    <AuthContext.Provider
      value={{ user, signUp, login, logout, isPending }}
      {...props}
    />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
