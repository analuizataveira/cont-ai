import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import Menu from './pages/Menu.tsx'
import RecordList from './pages/record/RecordList.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/record-list" element={<RecordList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)