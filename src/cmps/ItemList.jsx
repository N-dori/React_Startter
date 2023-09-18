import React from 'react'
import { ItemPreview } from './ItemPreview'

export  function ItemList({items}) {
  return (
    items? 
    <ul className='items-list-container grid clean'  >
      {items.map(item => 
    <ItemPreview key={item._id} item={item}/>
        
        )}
    </ul>:
    <div>Loading</div>
  )
}
