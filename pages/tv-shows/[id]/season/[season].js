import { 
    Card,
    Container 
} from 'react-bootstrap'
import tmdbAPI from '../../../../axios'

const SeasonDetails = ({ data }) => {
    console.log(data)
    return (
        <Container >
            <Card 
                style={{
                    width: '25rem'
                }}>
                <Card.Title>{data.name}</Card.Title>
                <Card.Img 
                    rounded 
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
                <Card.Text style={{ padding: '10px 15px' }}>{data.overview}</Card.Text>
                {data.episodes.map(episode => {
                    return (
                        <div key={episode.id}>
                            <h4>Episode {episode.episode_number}: {episode.name}</h4>
                            <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} />
                            <button>watched</button>
                        </div>
                    )
                })}
            </Card>
        </Container>
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