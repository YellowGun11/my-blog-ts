import styled from "styled-components";

const FooterDiv = styled.footer`
  width: 100%;
  min-width: 1200px;
  height: 50px;
  border-top: 1px solid #eaeaea2e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const A = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Footer() {
  return (
    <FooterDiv>
      <A
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        YellowGun
      </A>
    </FooterDiv>
  );
}