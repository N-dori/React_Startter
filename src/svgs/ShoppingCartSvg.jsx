import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export  function ShoppingCartSvg({len}) {


 

  return (
   <Link to={'/shopping-cart'}>
   <section className='shopping-cart-container '>
  {
    len?<article className='ligth-bulb flex-jc-ac'>{len}</article>:""
  }
    
    
    <svg className="cart-svg" xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M284.525-80.667q-30.858 0-52.691-21.975Q210-124.616 210-155.475q0-30.858 21.975-52.691Q253.95-230 284.808-230q30.859 0 52.692 21.975t21.833 52.833q0 30.859-21.975 52.692-21.974 21.833-52.833 21.833Zm400 0q-30.858 0-52.691-21.975Q610-124.616 610-155.475q0-30.858 21.975-52.691Q653.95-230 684.808-230q30.859 0 52.692 21.975t21.833 52.833q0 30.859-21.975 52.692-21.974 21.833-52.833 21.833ZM238.666-734 344-515.333h285.334l120-218.667H238.666ZM206-800.667h589.382q22.976 0 34.964 20.834Q842.333-759 830.667-738L693.333-490.667q-11 19.333-28.872 30.667-17.873 11.333-39.128 11.333H324l-52 96.001h487.333V-286H278q-43 0-63-31.833T214.667-386l60.667-111.333L126-813.334H47.334V-880h121.333L206-800.667Zm138 285.334h285.334H344Z"/></svg>
  
    </section>
    </Link>
  )
}
