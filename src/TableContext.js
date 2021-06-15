import React, {useState, useEffect, useRef } from 'react';
import Faker from 'faker';

// copy-pasted from Dan Abramov's post: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const TableContext = React.createContext();

const TableContextProvider = ({children}) => {
  
  const generateUsers = () => {
    const randomNumberOfUsers = 5 + Math.floor(Math.random() * 10);
    const newUsers = [];
    for (let i = 0; i < randomNumberOfUsers; i++) {
      const user = {
        title: Faker.name.title(),
        name: Faker.name.firstName(),
        surname: Faker.name.lastName(),
        //email: Faker.internet.email(),
        //phone: Faker.phone.phoneNumberFormat(),
        //website: Faker.internet.domainName(),
        //url: Faker.internet.url(),
        birthYear: Faker.date.between(1950, 2000).getFullYear()
        //birthCity: Faker.address.city()
      };
      
      newUsers.push(user)
    }
    
    return newUsers;
  }
  
  const [data, setData] = useState(generateUsers());

  useInterval(() => {
    const newUsers = generateUsers();
    setData(newUsers)
  }, 300)

  return <TableContext.Provider value={data}>{children}</TableContext.Provider>
}

export default TableContextProvider;
export { TableContext };
