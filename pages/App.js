import React from 'react';
import ProtectedPage from '../components/ProtectedPage';
const App = () => {
  return (
    <ProtectedPage>
      <div>Hello from my App</div>
    </ProtectedPage>
  );
};

export default App;
