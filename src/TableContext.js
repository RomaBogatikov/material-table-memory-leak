import React, {useState, useEffect } from 'react';
import io from 'socket.io-client';

const TableContext = React.createContext();


const TableContextProvider = ({children}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const connection = io(`http://127.0.0.1:8082`, {
      autoConnect: true,
      reconnectionAttempts: 5,
      transports: ['websocket'],
    });

    connection.on('users', (data) => {
      const parsedData = JSON.parse(data);
      setData(parsedData);
    })
  }, [])

  return <TableContext.Provider value={data}>{children}</TableContext.Provider>
}

export default TableContextProvider;
export { TableContext };
