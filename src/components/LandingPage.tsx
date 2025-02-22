import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>暗記プラスへようこそ</Title>
        <Subtitle>あなたの暗記になにかプラスの価値を与えます</Subtitle>
      </Header>

      <Main>
        <Features>
          <SectionTitle>機能一覧</SectionTitle>
          <FeatureList>
            <FeatureItem>問題作成</FeatureItem>
            <FeatureItem>作成した問題を解く</FeatureItem>
            <FeatureItem>みんなが作った問題を解く（有料版）</FeatureItem>
          </FeatureList>
        </Features>

        <CTA>
          <SectionTitle>今すぐ始めましょう！</SectionTitle>
          <ButtonContainer>
            <StyledLink to="/sign-up">無料登録</StyledLink>
            <StyledLink to="/login">
              ログイン
            </StyledLink>
          </ButtonContainer>
        </CTA>
      </Main>

      <Footer>© 2024 家計簿アプリ. All Rights Reserved.</Footer>
    </Container>
  );
};

export default LandingPage;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 0 20px;
  background-color: #f9f9f9;
  color: #333;
`;

const Header = styled.header`
  background-color: #4caf50;
  color: white;
  padding: 20px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5em;
`;

const Subtitle = styled.p`
  margin: 10px 0 0;
`;

const Main = styled.main`
  margin: 30px 0;
`;

const Features = styled.section``;

const SectionTitle = styled.h2`
  color: #4caf50;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin: 10px 0;
  font-size: 1.2em;
`;

const CTA = styled.section`
  margin: 30px 0;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  background-color: #007bff;
  &:hover {
    opacity: 0.8;
  }
`;

const Footer = styled.footer`
  margin-top: 30px;
  font-size: 0.8em;
  color: #777;
`;