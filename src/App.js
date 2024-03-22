import React from 'react';
import DataContextProvider from './context/DataProvider';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';


function App() {
  return (
    <DataContextProvider>

      <RouterProvider router={Router}/>
      </DataContextProvider>
  
  );
}

export default App;
