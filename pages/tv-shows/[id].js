import tmdbAPI from '../../axios'
import Link from 'next/link'

const Show = ({ data }) => {

    console.log(data)
    return (
        <>
            <h3>{data.name}</h3>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            <h4>{data.first_air_date}</h4>
            <p>{data.overview}</p>
            <div>
                {data.seasons.map(season => {
                    return (
                        <div key={season.id}>
                            <Link passHref href={{
                                pathname: `/tv-shows/[id]/season/[season]`,
                                query: { 
                                    id: data.id,
                                    season: season.season_number,
                                }
                            }}>
                                <a>
                                    <h2>{season.name}</h2>
                                </a>
                            </Link>
                            <p>Season {season.season_number} premiered on {season.air_date}</p>
                            <img src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Show

export async function getServerSideProps(context) {

    const response = await tmdbAPI.get(`tv/${context.params.id}?api_key=${process.env.TMDB_API_KEY}`)
    return {
        props: { 
            data: response.data 
        }
    }
}