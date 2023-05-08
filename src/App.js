import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Tweets from './pages/Tweets/Tweets';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
             <Route index element={<Tweets />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
