import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders';
import ManageStore from './pages/ManageStore';

export default function App() {
  return(
    <div> 
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Dashboard />}> </Route>
        <Route path="/inventory" exact element={<Inventory />}> </Route>
        <Route path="/reports" exact element={<Reports />}> </Route>
        <Route path="/suppliers" exact element={<Suppliers />}> </Route>
        <Route path="/orders" exact element={<Orders />}> </Route>
        <Route path="/managestore" exact element={<ManageStore />}> </Route>
      </Routes>
      </BrowserRouter>
    </div>
  
  )
}
