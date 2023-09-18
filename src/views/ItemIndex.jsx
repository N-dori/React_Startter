import React from 'react'
import { ItemList } from '../cmps/ItemList'
import { ItemFilter } from '../cmps/ItemFilter'

export  function ItemIndex({items, filterBy,onChangeFilter}) {
  return (
    <section className="item-index-conteiner">
        <h1>My wounderful items list</h1>
        <ItemFilter filterBy={filterBy}
        onChangeFilter={onChangeFilter}
        />
         <ItemList items={items}/>
    </section>
  )
}
