import { useState } from 'react';
import styled from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/client';

const AuthButton = () => {
  const [session] = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const url = process.env.NODE_ENV === 'production' ? 'https://tv-tracker-orpin.vercel.app/api/auth/callback/google' : 'http://localhost:3000/api/auth/signin/google';
  return (
    <>
      {!session ? (
        <Button
          onClick={() => signIn()}
          data-cy="login-button"
          href={url}
        >
          Sign in
        </Button>
      ) : (
        <Container>
          <div>
            {isVisible ? (
              <Tooltip>
                {session.user.email}
              </Tooltip>
            ) : null}
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
          <ImageContainer
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={(() => setIsVisible(false))}
          >
            <Image src={session.user.image} alt="avatar" />
          </ImageContainer>
        </Container>
      )}
    </>
  );
};

export default AuthButton;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
`;

const Button = styled.a`
  padding: 10px 15px;
  background-color: #FFF447;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 15px;
  color: #696969;
  border-radius: 5px;
  cursor: pointer; 
  border: none;
`;

const Tooltip = styled.div`
  /* color: #FFF447; */
  border: 1px solid #696969;
  font-size: 12px;
  padding: 5px;
  border-radius: 5px;
  margin: 0;
  background-color: #ffff;
  text-align: center;
  position: absolute;
  top: 60px;
  right: 100px;
  z-index: 1;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 20%;
  margin-left: 10px;
`;

const Image = styled.img`
  border-radius: 50px;
  width: 100%;
`;
