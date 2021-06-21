import React from 'react';
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
      <Image src={`https://image.tmdb.org/t/p/w500${imgSrc}`} />
    </ImageWrapper>
    <TextWrapper>
      <Text>{text}</Text>
    </TextWrapper>
  </Container>

);

export default TvShowSeasonsDetails;

const Container = styled.div`
margin-left: 5px;
`;

const StyledLink = styled.a`
  color: #011C26;
  cursor: pointer;
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
  /* height: 400px;
  background-color: #049DBF;
  color: #fff;
  padding: 0px 200px;
  margin-right: 30px; */
`;

const TextWrapper = styled.div`
  vertical-align: top;
  display: inline-block;
  width: 80%;
  padding: 20px 60px;
`;
