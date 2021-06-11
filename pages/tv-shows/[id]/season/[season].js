import tmdbAPI from '../../../../axios'

const SeasonDetails = ({ data }) => {
    console.log(data)
    return (
        <div>
            <h2>{data.name}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            <p>{data.overview}</p>
            {data.episodes.map(episode => {
                return (
                    <div key={episode.id}>
                        <h4>Episode {episode.episode_number}: {episode.name}</h4>
                        <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} />
                    </div>
                )
            })}
        </div>
    )
}

export default SeasonDetails

export async function getServerSideProps(context) {
    const res = await tmdbAPI.get(`tv/${context.params.id}/season/${context.params.season}?api_key=${process.env.TMDB_API_KEY}`)
    console.log(res)
    return {
        props: {
            data: res.data
        }
    }
}