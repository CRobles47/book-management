import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookTable from './Components/BookTable';
import AddBook from './Components/AddBook';
import AppNav from './Components/Navbar';

function App() {
  return (
    <>
    <AppNav></AppNav>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<BookTable/>} />
        <Route path="/add" element={<AddBook/>}/>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
