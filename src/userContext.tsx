import React, { createContext, useState, PropsWithChildren, useEffect } from 'react';

type UserContextType = {
  user: User | null;
  isUserLogin: boolean;
  setUserData: (userData: User | null, token: string | null) => void;
};

type User = {
  id: string;
  username: string;
  login: string;
  password: string;
};

const initialUserContext: UserContextType = {
  user: null,
  isUserLogin: false,
  setUserData: () => {},
};

const UserContext = createContext<UserContextType>(initialUserContext);

const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLogin, setIsUserLogin] = useState<boolean>(false);

  const fetchUser = () => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      return
    }
    fetch(`${process.env.API_URL}/user/${userToken}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((user) => {
        setUser(user)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const saveUserTokenToCookies = (token: string): void => {
    localStorage.setItem('userToken', token);
  };

  const checkUserLoggedIn = (): boolean => {
    const userToken = localStorage.getItem('userToken');
    const isLoggedIn = !!userToken;
    return isLoggedIn;
  };

  const setUserData = (userData: User | null, token: string | null) => {
    setUser(userData);
    setIsUserLogin(true)
    if (token) {
      saveUserTokenToCookies(token);
    }
  };

  useEffect(() => {
    setIsUserLogin(checkUserLoggedIn());
    fetchUser()
  }, []);

  return (
    <UserContext.Provider value={{ user, isUserLogin, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
