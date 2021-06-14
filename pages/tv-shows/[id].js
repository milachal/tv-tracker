import tmdbAPI from '../../axios'
import Link from 'next/link'
import { 
    Card,
    Nav,
    Tab,
    Image,
    Container
 } from 'react-bootstrap'

const Show = ({ data }) => {

    console.log(data)
    return (
        <Container
            style={{
                margin: '4rem'
            }}
        >
            <Card style={{
                width: '25rem'
            }}>
                <Card.Title>{data.name}</Card.Title>
                <Card.Img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
                <Card.Subtitle  
                    className="mb-2 text-muted"
                    style={{
                        margin: '15px'
                    }}
                >
                    {data.first_air_date}
                </Card.Subtitle>
                <Card.Text style={{ padding: '10px 15px' }}>{data.overview}</Card.Text>
            </Card>
            <div>
                <Tab.Container className="mb-3">
                    <Nav variant="pills">
                        {data.seasons.map(season => {
                            return (
                                <>
                                    <Nav.Item>
                                        <Nav.Link 
                                            eventKey={`season ${season.name}`}
                                        >
                                            {season.name}
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Tab.Content style={{
                                        margin: '1rem'
                                    }}>
                                        <Tab.Pane 
                                            eventKey={`season ${season.name}`}
                                            title={`Season ${season.name}`}
                                            key={season.id}    
                                        >
                                            <Link passHref href={{
                                                pathname: `/tv-shows/[id]/season/[season]`,
                                                query: { 
                                                    id: data.id,
                                                    season: season.season_number,
                                                }
                                            }}>
                                                <a>
                                                    <h6>{season.name}</h6>
                                                </a>
                                            
                                            </Link>
                                            <p>Season {season.season_number} premiered on {season.air_date}</p>
                                            <Image 
                                                rounded
                                                src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} 
                                                style={{
                                                    width: '10rem'
                                                }}    
                                            />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </>
                            )
                        })}
                    </Nav>
                </Tab.Container>
            </div>
       </Container>
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