import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { GiftsView } from './views/GiftView';
import { NotFoundView } from './views/NotFoundView';
import { ChildView } from './views/ChildView';

function App() {
  return (
    <>
      <Routes>
        <Route path='/gift' element={<GiftsView />} />
        <Route path='/child' element={<ChildView />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </>
  );
}

export default App;
