// pages/index.js

import Navbar from '../app/components/Navbar';
import Footer from '../app/components/Footer';
import Home from '../app/components/Home';

const Admin = () => {

  return (
    <div>
      <h1 className='text-red-500'>IMR movie App</h1>
      <Navbar />
      <h1>Home</h1>
      <Home/>
      <Footer />
    </div>
  );
}

export default Admin;
