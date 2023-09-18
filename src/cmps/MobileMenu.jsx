import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MobileMenu({  toggelMobileMenu, scrollToCourses, scrollToWhoAreWe, isMobileMenu }) {

  const navigate = useNavigate()
  const loggdingUser = useSelector((storeState) => storeState.userModule.loggdingUser)

  useEffect(() => {
  }, [loggdingUser])


  const handelClick = (ev, type) => {
 

  }
  const handelNavigation = (ev, type) => {
console.log('type',type);
    if (type === 'home') navigate('/')
    if (type === 'signup') navigate(`${type}`)

    toggelMobileMenu()
  }

  return (
    <section className={isMobileMenu ? "mobile-menu-container open " : "mobile-menu-container "}>
      <main className="mobile-menu-wrapper  ">

        <ul className="list-links flex-col clean">
          {loggdingUser ?
            loggdingUser._id !== '64abe02a8723e73efc4d4be8'?

            <div className='user-img-container flex-jc-ac'  >
              <span className='user-img'>{loggdingUser.fname[0].toUpperCase()}</span>

            </div> :
            <div className="login-signup-group">
              {/* <li className="link-container flex-jc-ac"><span onClick={(event) => handelNavigation(event, 'login')} className="link">התחברות</span></li> */}
              <li className="link-container flex-jc-ac"><span onClick={(event) => handelNavigation(event, 'signup')} className="link">הרשמה</span></li>
            </div>:
            <div className="login-signup-group">
              {/* <li className="link-container flex-jc-ac"><span onClick={(event) => handelNavigation(event, 'login')} className="link">התחברות</span></li> */}
              <li className="link-container flex-jc-ac"><span onClick={(event) => handelNavigation(event, 'signup')} className="link">הרשמה</span></li>
            </div>
          }
          <div className="home-page-links">
            <li className="link-container flex-jc-ac" onClick={(event) => handelNavigation(event, 'home')}><span className="link">דף הבית</span></li>
            {/* <li className="link-container flex-jc-ac" onClick={(event) => handelClick(event, 'who-are-we')}><span className="link">מי אנחנו</span></li>
            <li className="link-container flex-jc-ac" onClick={(event) => handelClick(event, 'benefits')}><span className="link">יתרונות השיטה</span></li>
            <li className="link-container flex-jc-ac" onClick={(event) => handelClick(event, 'tools')}><span className="link">כלים מעשיים</span></li>
            <li className="link-container flex-jc-ac" onClick={(event) => handelClick(event, 'memorial')}><span className="link">לזיכרו של שלמה</span></li> */}

          </div>
          <div className="my-courses-group">
            {loggdingUser ?
              loggdingUser.courses.length ?
                <li className="link-container flex-jc-ac"><span onClick={(event) => handelNavigation(event, 'my-courses')} className="link">הקורסים שלי</span></li>
                : ''
              : ''
            }
          </div>
          {loggdingUser ?
          loggdingUser.isAdmin ?
            <li className="link-container flex-jc-ac"><span onClick={(event) => handelNavigation(event, 'dashboard')} className="link">ניהול מערכת</span></li> 
                : ''
              : '' }


        </ul>

      </main>

    </section>
  )
}
