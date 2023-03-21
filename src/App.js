import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sponsors from './components/Sponsors/rendersponsors.js';
import AuthProvider from './Context/AuthManager';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RoutesManager from './Context/RoutesManager';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={'714264284767-2ltb08rc9rjpd6ffm2ctokb9a6jqamre.apps.googleusercontent.com'}>
    
    <BrowserRouter>
    <AuthProvider>
      <Navbar/>
        <RoutesManager/>
      <Footer />
    </AuthProvider>
    </BrowserRouter>
     
    </GoogleOAuthProvider>
  )
}

export default App;
