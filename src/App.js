
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routers } from './components/routers/routers';
import './App.css';
function App() {
  return (
   <>
   <RouterProvider router={routers}> </RouterProvider>
   <ToastContainer />
   </>
  );
}

export default App;
