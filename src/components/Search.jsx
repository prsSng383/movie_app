import React from 'react'

const Search = ({searchTerm , setSearchTerm}) => {
  return (
    <div className='search my-0'>
        <div>
        <img src="search.svg" alt="Search Icon" />

        <input 
        type="text"
        placeholder='Search throuhgh thousands of movies.'
        value={searchTerm}
        onChange={(event)=>setSearchTerm(event.target.value)}  
        />
        </div>
    </div>
  )
}

export default Search