import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './front/common/Header';
import Start from './front/common/pages/Start';
import BookList from './front/common/pages/BookList';
import AuthorList from './front/common/pages/AuthorList';
import AdminPanel from './front/admin-front/AdminPanel';
import BookPage from './front/common/pages/BookPage';
import EditingBookPage from './front/admin-front/EditingBookPage';
import { LoginPage } from './front/common/pages/LoginPage';
import { useContext, useState } from 'react';
import { AdminContext, AdminProvider} from './AdminContext';
import { Col } from 'react-bootstrap';

function App() {


  return (
    <Col xs = {3}>
    <AdminProvider>
    <Router>
    <div className = "App">
    <Header />

    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/Books" element = {<BookList/>}/>
      <Route path="/Authors" element = {<AuthorList/>}/>
      <Route 
              path="/AdminPanel" 
              element=<AdminPanelGuard/> 
            />
      <Route path="/books/:id" element = {<BookPage/>}/>
      <Route path= "/books/edit/:id" element = {<EditingBookPage/>}/>
      <Route path= "Login" element={<LoginPage/>}/>
    </Routes>
    </div>
    </Router>
    </AdminProvider>
    </Col>
  );
}

export default App;

function AdminPanelGuard(){
  const {isAdmin}=useContext(AdminContext);
  return isAdmin?<AdminPanel/>:<Navigate to="/Login" replace />;
}