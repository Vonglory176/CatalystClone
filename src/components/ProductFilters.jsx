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

  // const [searchTerm, setSearchTerm] = useState("")
  // useEffect(() => {
  //   const tempSearchTerm = searchParams.get('q')
  //   setSearchTerm(tempSearchTerm ? `q=${tempSearchTerm}` : "")
  // }, searchParams.get('q'))
  
  return (
    <div className="filter-list-container">

      <div className="filter-list-wrapper">
        {/* <span>Product Category</span> */}
        <div className="category-links">
            <NavLink
            title="View all products"
            to={{pathname:`/collections/${id}`, search: `?${searchParams.get('q')? `q=${searchParams.get('q')}&` : ""}categories=all-products`}} 
            className={`btn ${currentCategory === "all-products"? "active-link" : ""}`}
            >
                All Products
            </NavLink>

            <NavLink
            title="View products recommended for newcomers"
            to={{pathname:`/collections/${id}`, search: `?${searchParams.get('q')? `q=${searchParams.get('q')}&` : ""}categories=getting-started`}}
            className={`btn ${currentCategory === "getting-started"? "active-link" : ""}`}
            >
                Getting Started
            </NavLink>

            <NavLink
            title="View products that have been added recently"
            to={{pathname:`/collections/${id}`, search: `?${searchParams.get('q')? `q=${searchParams.get('q')}&` : ""}categories=new-arrivals`}}
            className={`btn ${currentCategory === "new-arrivals"? "active-link" : ""}`}
            >
                New Arrivals
            </NavLink>

            <NavLink
            title="View products that are on sale"
            to={{pathname:`/collections/${id}`, search: `?${searchParams.get('q')? `q=${searchParams.get('q')}&` : ""}categories=on-sale`}}
            className={`btn ${currentCategory === "on-sale"? "active-link" : ""}`}
            >
                On Sale
            </NavLink>

            <NavLink
            title="View products that are free to download"
            to={{pathname:`/collections/${id}`, search: `?${searchParams.get('q')? `q=${searchParams.get('q')}&` : ""}categories=free-downloads`}}
            className={`btn ${currentCategory === "free-downloads"? "active-link" : ""}`}
            >
                Free Downloads
            </NavLink>
        </div>
        {typeList && typeList.length > 0 && 
        <div className="filter-title">
          <span>Product Type</span> 
          {searchParams.get('types') && <input type="button" value={"x"} onClick={() => setSearchParams(prevSearch => {prevSearch.delete('types'); return prevSearch})}/>}
        </div>
        }
        {typeList && typeList.length > 0 && <ul className="type-list">{typeList}</ul>}

        {tagList && tagList.length > 0 && 
        <div className="filter-title">
          <span>Product Tags</span> 
          {searchParams.get('tags') && <input type="button" value={"x"} onClick={() => setSearchParams(prevSearch => {prevSearch.delete('tags'); return prevSearch})}/>}
        </div>}
        {tagList && tagList.length > 0 &&  <ul className="tag-list">{tagList}</ul>}
      </div>
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