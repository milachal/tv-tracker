import { useState } from 'react'
import { useRouter } from 'next/router'
import tmdbAPI from '../axios'

const Home = ({ data, apiKey}) => {

  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState(data)

  console.log(searchData)

  const searchHandler = async (e) => {
    setSearchQuery(e.target.value)
    const res = await tmdbAPI.get(`/search/tv?api_key=${apiKey}&query=${e.target.value}`)
    setSearchData(res.data)
  }

  return (
    <>
      <h4>Search for TV shows</h4>
      <input value={searchQuery} onChange={searchHandler} placeholder="search" />
      <button onClick={() => setSearchData(data)}>go</button>
      <div>{JSON.stringify(searchData)}</div>
    </>
  )
}

export default Home

export async function getServerSideProps() {

  const res = await tmdbAPI.get(`/tv/1399/recommendations?api_key=${process.env.TMDB_API_KEY}`)
  console.log(res)
  return {
    props: {
      data: res.data,
      apiKey: process.env.TMDB_API_KEY
    }
  }

}