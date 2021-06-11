import { useState } from 'react'
import { useRouter } from 'next/router'
import tmdbAPI from '../axios'
import Link from 'next/link'

const Home = ({ data, apiKey}) => {

  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState(data)

  console.log(searchData.results)

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
      {searchData.results.slice(0, 10).map(show => {
        return (
          <div key={show.id}>
            <Link passHref href={{
              pathname: `/tv-shows/[id]`,
              query: { 
                id: show.id
              }
            }}>
              <a>
                <h3>{show.name}</h3>
              </a>
            </Link>
            <p>{show.first_air_date}</p>
            <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} />
          </div>
        )
      })}
     
    </>
  )
}

export default Home

export async function getServerSideProps() {

  const res = await tmdbAPI.get(`tv/popular?api_key=${process.env.TMDB_API_KEY}`)

  return {
    props: {
      data: res.data,
      apiKey: process.env.TMDB_API_KEY
    }
  }

}