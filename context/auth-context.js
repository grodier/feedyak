import { useState, useEffect, useContext, createContext } from 'react';
import {
  handleUserStateChanged,
  getCurrentUser,
  signOutUser,
  createUserData,
  getUserData,
} from '../utils/userUtils';

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(getCurrentUser());
  const [isPending, setIsPending] = useState(!user);

  async function updateUser(user) {
    console.log(user);
    if (user) {
      if (user.newUser) {
        const newUserData = await createUserData(user);
        setUser(newUserData);
      } else {
        const userData = await getUserData(user);
        console.log(userData);
        setUser(userData);
      }
      return setIsPending(false);
    }
    setUser(user);
    setIsPending(false);
  }

  useEffect(() => {
    const unsubscribe = handleUserStateChanged(updateUser);
    return () => unsubscribe();
  }, []);

  const logout = signOutUser;

  return (
    <AuthContext.Provider
      value={{ user, logout, isPending, updateUser }}
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
