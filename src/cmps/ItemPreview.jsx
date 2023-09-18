import React from 'react'
import { Link } from 'react-router-dom'

export  function ItemPreview({item}) {
  return (
    <Link className='item-preview-container' to={`/details/${item._id}`}>
    <header className="item-header flex-jc-ac">
      <h1>{item.title}</h1>
    </header>
    <section className='img-wrapper'>
      <img className='img item-img' src={item.imgUrl}/>
    </section>
    <p className="item-txt">{item.content}</p>

    </Link>
  )
}
