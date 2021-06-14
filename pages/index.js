import { useState } from 'react'
import { useRouter } from 'next/router'
import tmdbAPI from '../axios'
import Link from 'next/link'
import { 
  Container, 
  Card, 
  Row, 
  Col,
  Badge,
  Form,
  Button 
} from 'react-bootstrap'
import styled from 'styled-components'

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
      <FormWrapper>
        <Form.Control 
          value={searchQuery} 
          onChange={searchHandler} 
          placeholder="search for tv shows" 
          style={{
            border: "none",
            display: "inline-block",
            width: "20rem"
          }}  
        />
        <Button 
          variant="outline-primary" 
          onClick={() => setSearchData(data)}
          style={{
            margin: "2px"
          }}
          >
            go
          </Button>
      </FormWrapper>
      <Container fluid>
        <Row xs={1} md={2} lg={3} xl={4}>
          {searchData.results.slice(0, 10).map(show => {
            return (
              <Col key={show.id}>
                  <Card 
                    border="light"
                    style={{ 
                      width: '18rem',
                      display: 'inline-flex'
                    }}  
                    bg="light"
                  > 
                    <Link passHref href={{
                      pathname: `/tv-shows/[id]`,
                      query: { 
                        id: show.id
                      }
                    }}>
                      <a>
                        <Card.Title>{show.name}</Card.Title>
                      </a>
                    </Link>
                    <Card.Subtitle  className="mb-2 text-muted">{show.first_air_date}</Card.Subtitle>
                    <Link passHref href={{
                      pathname: `/tv-shows/[id]`,
                      query: { 
                        id: show.id
                      }
                    }}>
                      <a>
                      <Card.Img 
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
                      />
                      </a>
                    </Link>
                    <span>
                      <Badge pill bg="info">{show.vote_average}</Badge>
                    </span>
                  </Card>
                </Col>
              )
            })}
        </Row>
      </Container>
     
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

const FormWrapper = styled.div`
  display: inline-block;
  margin: 3rem;
`