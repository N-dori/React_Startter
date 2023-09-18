import React, { useEffect, useState } from 'react'

export  function ItemFilter(props) {
    const [filterBy,setFilterBy] = useState()

    const options = [

      {
    
        label: "title",
    
        value: "title",
    
      },
    
      {
    
        label: "price",
    
        value: "price",
    
      },
 
    
    ];
    useEffect(() => {
      setFilterBy( props.filterBy )
     
    }, [])

    useEffect(() => {
      // console.log('filterBy in item filter cmp!!! ', props.filterBy);
      props.onChangeFilter(filterBy)
      
    }, [filterBy])
    
    const  handelChange = ( {target} ) => {
      const field = target.name
      let value = target.value
      setFilterBy((preFilterBy) => ({ ...preFilterBy, [field]:value }))   
    }
    const onChangeSort = (ev) => {

      console.log('sort by ', ev.target.value);
      const value = ev.target.value
      setFilterBy((preFilterBy) => ({ ...preFilterBy, sortBy:value }))   
    }
    if(!filterBy ){

      return <div>Loading...</div>

    }else
    {
    const {title,price,content} = filterBy
  
    return (
    <section className='form-container flex-jc-ac flex-col'>

      <p className="title-filter">filter</p>
    <form className='filter-form flex'>
        <label htmlFor='title'>
        <input  value={title} onChange={handelChange} type='text' name='title' id='title' placeholder='title'/>
        </label>
        <label htmlFor='price'>
        <input value= {price} onChange={handelChange} type='number' name='price' id='price' placeholder='price'/>
</label>
        <label htmlFor='content'>
        <input value={content} onChange={handelChange} type='text' name='content' id='content' placeholder='content' />
        </label>
    </form>
   <section className='sort-container'>
<span className='title'>Sort</span>

<select onChange={onChangeSort}>

  {options.map((option,i) => (

    <option key={i} value={option.value} >{option.label}</option>

  ))}

</select>

   </section>
    </section>)


    }
}
