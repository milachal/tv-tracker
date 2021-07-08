import Link from 'next/link';
import styled from 'styled-components';

const TvShowSeasonsDetails = ({
  dataId, seasonNumber, title, text, subtitle, imgSrc,
}) => (

  <Container>
    <Link href={`/tv-shows/${dataId}/season/${seasonNumber}`}>
      <StyledLink><h2>{title}</h2></StyledLink>
    </Link>
    <p>{subtitle}</p>
    <ImageWrapper>
      <Image src={imgSrc} />
    </ImageWrapper>
    <TextWrapper>
      <Text>{text}</Text>
    </TextWrapper>
  </Container>

);

export default TvShowSeasonsDetails;

const Container = styled.div`
padding-left: 5px;
`;

const StyledLink = styled.a`
  color: #011C26;
  cursor: pointer;
  &:hover {
    color: #3EB595;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Text = styled.p`
`;

const ImageWrapper = styled.div`
  display: inline-block;
  width: 20%;
  padding: 20px;
  padding-left: 0;
`;

const TextWrapper = styled.div`
  vertical-align: top;
  display: inline-block;
  width: 80%;
  padding: 20px 60px;
`;
