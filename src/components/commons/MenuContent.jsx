import React from "react";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user/userState";

export default function MenuContent({ title, Middle, children }) {
  const user = useRecoilValue(userState);

  return (
    <Layout>
      <HeaderWrapper middle={Middle}>
        <Title>{title}</Title>
        <UserWrapper>
          <UserName>{user.username}</UserName>
          <ProfileWrapper>
            <ProfileImage>
              <img src={"data:image/png;base64," + user.profile} alt='' />
            </ProfileImage>
          </ProfileWrapper>
        </UserWrapper>
      </HeaderWrapper>
      {Middle && <MiddleWrapper>{Middle}</MiddleWrapper>}
      <BodyWrapper>
        <WhiteBox>{children}</WhiteBox>
      </BodyWrapper>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f7f8fc;
  display: flex;
  flex-direction: column; /* UserWrapper와 BodyWrapper를 위아래로 정렬하기 위해 flex-direction: column 추가 */
`;

const HeaderWrapper = styled.div`
  margin-top: 48px;
  margin-left: 35px;
  margin-bottom: ${(props) => (props.middle ? "10px" : "22px")};
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.3px;
  color: #252733;
`;

const UserWrapper = styled.div`
  margin-right: 33px;
  display: flex;
  flex-direction: row;
  flex-shrink: 0; // UserWrapper가 필요한 크기만큼만 차지하도록 설정
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 14px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.2px;
  color: #252733;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div`
  background-color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  overflow: hidden;
`;

const WhiteBox = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin-left: 35px;
  margin-bottom: 10px;
`;
