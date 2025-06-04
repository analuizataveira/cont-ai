import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import Menu from './pages/Menu.tsx'
import RecordList from './pages/record/RecordList.tsx';
import Login from './pages/LoginForm.tsx';
import UserForm from './pages/UserForm.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={
          <ProtectedRoute>
          <Menu />
          </ProtectedRoute>
          } />
        <Route path="/create-user" element={<UserForm />} />

        <Route path="/record/RecordList" element={
          <ProtectedRoute>
          <RecordList />
          </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)