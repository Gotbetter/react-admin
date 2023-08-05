import React from "react";
import styled from "styled-components";

export default function Profile({ profile, username }) {
  return (
    <UserWrapper>
      <ProfileWrapper>
        <ProfileImage>
          <img src={"data:image/png;base64," + profile} alt='' />
        </ProfileImage>
      </ProfileWrapper>
      <UserInfo>{username}</UserInfo>
    </UserWrapper>
  );
}

const UserWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-shrink: 0; // UserWrapper가 필요한 크기만큼만 차지하도록 설정
`;

const UserInfo = styled.div`
  margin-left: ${(props) => (props.padding ? `${props.padding}px` : "0px")};
  color: #252733;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.2px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const ProfileImage = styled.div`
  background-color: white;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
