import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function ServersidePagination() {

    const [posts, setPosts] = useState([])

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)
    const [currentPage, setCurrentPage] = useState(0);

  //  const limitPerPage = (begin, end, increase) => {

  // } 
  
  // useEffect(() => {
  //     axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${}&_limit=${}`)
  //     .then(res => {
  //       console.log(res)
  //       setPosts({posts: res.data, currentPage: currentPage + increase})
  //       console.log('serversideComponent',posts);
  //     })
     
  //     .catch(err => {
  //       console.log(err)
  //       // setError(err.message);
  //     })
  //   },[])
   

    return (
        <div className="serverside__pagination">
           
        </div>
    )
}

export default ServersidePagination
