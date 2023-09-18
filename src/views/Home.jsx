import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ItemIndex } from './ItemIndex';
import { loadItems, setFilterBy, setSortBy } from '../store/actions/item.actions';

export function Home() {
  const loggdingUser = useSelector((storeState) => storeState.userModule.loggdingUser)
  const filterBy = useSelector((storeState)=> storeState.itemModule.filterBy)
  const items = useSelector((storeState) => storeState.itemModule.items)
   const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
   _loadItems()
   console.log('items in home',items);
  }, [])
  const onChangeFilter = (filterBy) => {
    console.log('filter by in  onChangeFilter in home',filterBy);

    dispatch(setFilterBy(filterBy))
    dispatch(loadItems())
}

const _loadItems =  () => {
dispatch(loadItems())

}
 


  return (
    items?
    <section className='home-page-container'>
    <ItemIndex filterBy={filterBy}
               items={items}
               onChangeFilter={onChangeFilter} 
               />
    </section>:''


  )
}
