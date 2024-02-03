import { useEffect, useState } from "react"
import { NavLink, useParams, useSearchParams } from "react-router-dom"

export default function Filters({ currentCategory, filterInstanceList }) {
  
  const {id} = useParams()
  const [searchParams, setSearchParams] = useSearchParams({})
  
  // const [currentCategory, setCurrentCategory] = useState()
  const [typeList, setTypeList] = useState()
  const [tagList, setTagList] = useState()
  
  const handleFilterChange = (filterType, filterName) => {
    // Get the current search parameters for the filter type
    let currentSearchParams = searchParams.get(filterType)
    console.log(currentSearchParams)
    
    if (currentSearchParams) currentSearchParams = JSON.parse(currentSearchParams)
    else currentSearchParams = []
    
    // If filterName is already in the list, remove it. Otherwise, add it.
    const index = currentSearchParams.indexOf(filterName);
    if (index !== -1) {
      currentSearchParams.splice(index, 1)
    } else {
      currentSearchParams.push(filterName)
      currentSearchParams.sort()
    }
    
    // Update the search parameters  
    if (currentSearchParams.length > 0) {
      // setCurrentPage(1) //Page reset
      
      setSearchParams(prevSearch => {
        prevSearch.set('page', 1)
        prevSearch.set(filterType, JSON.stringify(currentSearchParams))
        if (filterType === 'types') prevSearch.delete('tags') // Reset the tag filter whenever the type filter changes
        return prevSearch
      })
    } else {
      setSearchParams(prevSearch => {
        prevSearch.delete(filterType)
        return prevSearch
      })
    }
  }
  
  useEffect(() => {
    if (filterInstanceList) {
      console.log(filterInstanceList)

      const createFilterList = (instanceList, filterType) => {
        const sortedInstanceList = Object.entries(instanceList).sort()
    
        return sortedInstanceList.map(([name, count]) => (
            <li className="search-results__filter-li" key={name}>
                <input 
                    type="checkbox"
                    onChange={() => handleFilterChange(filterType, name)}
                    id={`${name}-checkbox`}
                    name={`${name}-checkbox`}
                    value={name}
                    checked={searchParams.get(filterType)?.includes(name) || false}
                />
                <label htmlFor={`${name}-checkbox`}>{`${name} (${count})`}</label>
            </li>
        ))
      }
  
      setTypeList(createFilterList(filterInstanceList.types, 'types'))
      setTagList(createFilterList(filterInstanceList.tags, 'tags'))
    }
  }, [filterInstanceList])
  
  return (
    <div className="filter-list-wrapper">
      {/* <span>Product Category</span> */}
      <div className="category-links">
          <NavLink 
          to={{pathname:`/collections/${id}`, search: "?categories=all-products"}} 
          className={`btn ${currentCategory === "all-products"? "active-link" : ""}`}
          >
              All Products
          </NavLink>

          <NavLink
          to={{pathname:`/collections/${id}`, search: "?categories=getting-started"}}
          className={`btn ${currentCategory === "getting-started"? "active-link" : ""}`}
          >
              Getting Started
          </NavLink>
          
          <NavLink
          to={{pathname:`/collections/${id}`, search: "?categories=new-arrivals"}}
          className={`btn ${currentCategory === "new-arrivals"? "active-link" : ""}`}
          >
              New Arrivals
          </NavLink>

          <NavLink
          to={{pathname:`/collections/${id}`, search: "?categories=on-sale"}}
          className={`btn ${currentCategory === "on-sale"? "active-link" : ""}`}
          >
              On Sale
          </NavLink>

          <NavLink
          to={{pathname:`/collections/${id}`, search: "?categories=free-downloads"}}
          className={`btn ${currentCategory === "free-downloads"? "active-link" : ""}`}
          >
              Free Downloads
          </NavLink>
      </div>
      {typeList && typeList.length > 0 && <span>Product Type</span>}
      {typeList && typeList.length > 0 && <ul className="type-list">{typeList}</ul>}
      {tagList && tagList.length > 0 && <span>Product Tags</span>}
      {tagList && tagList.length > 0 &&  <ul className="tag-list">{tagList}</ul>}
  </div>
    );
  }

  // <div>
  //   {filters.map(filter => (
  //     <div key={filter.name}>
  //       <input
  //         type="checkbox"
  //         checked={filter.checked}
  //         onChange={() => onFilterChange(filter.name)}
  //       />
  //       <label>{filter.name} ({filter.count})</label>
  //     </div>
  //   ))}
  // </div>