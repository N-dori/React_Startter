import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { itemService } from '../services/item.service local'

export  function DetailsPage() {

    const param = useParams()
    const [item , setItem ]= useState(null)
    
    useEffect(() => {
        loadItem() 
    }, [])
    const loadItem = async () => {
    const item  = await itemService.getItemById(param.id)
    setItem(item)
    }
  return (
    item?
    <section className='details-page-container'>
        <header className="details-page-header flex-jc-ac">
            <h1> {item.title}</h1>
        </header>
        <section className='img-wrapper details-img-wrapper'>
            <img className='img details-img' src={item.imgUrl}/>
        </section>
        <p>{item.content}</p>
    </section>:<div>Loading...</div>
  )
}
