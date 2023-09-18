
import { Route, HashRouter as Router, Routes, } from 'react-router-dom';
import './assets/scss/main.scss';
import { Home } from './views/Home';
import { AppHeader } from './cmps/AppHeader';
import { DetailsPage } from './views/DetailsPage';
import { SignupPage } from './views/Signup';
import { useState } from 'react';
import MobileMenu from './cmps/MobileMenu';



function App() {
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const toggelMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu)
    setIsActive(!isActive)
  if(!isMobileMenu) {
     window.scrollTo(0,0)
     document.body.style.overflowY = "hidden"
    }else{
      document.body.style.overflowY = "auto"

    }
}



  return (
    <Router >
    <section className='main-layout'>
      <AppHeader toggelMobileMenu={toggelMobileMenu} isActive={isActive}/>
      <MobileMenu 
                    toggelMobileMenu={toggelMobileMenu}
                    isMobileMenu={isMobileMenu}
                    setIsMobileMenu={setIsMobileMenu}/>
    <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/details/:id" element={<DetailsPage/>}/>
    <Route path="/signup/" element={<SignupPage />}/>

    </Routes>
    </section>
    </Router>
  
  );
}

export default App;
