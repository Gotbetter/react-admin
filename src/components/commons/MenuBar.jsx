import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DashIcon from "../../assets/dashIcon.svg";
import RoomIcon from "../../assets/roomIcon.svg";
import UserIcon from "../../assets/userIcon.svg";
import CommonIcon from "../../assets/commonIcon.svg";
import AdmminIcon from "../../assets/adminIcon.svg";
import ContinueIcon from "../../assets/continueIcon.svg";

export default function MenuBar({ tab }) {
  const navigate = useNavigate();

  const handleTabClick = (route) => {
    navigate(route);
  };

  return (
    <Wrapper>
      <AppName>GotBetter Admin</AppName>
      <TabWrapper onClick={() => handleTabClick("/")} selected={tab === "/"}>
        <TabIconWrapper>
          <TabIcon src={DashIcon} />
        </TabIconWrapper>
        <TabName selected={tab === "/"}>대시보드 (예정)</TabName>
      </TabWrapper>
      <TabWrapper
        onClick={() => handleTabClick("/rooms")}
        selected={tab === "/rooms"}
      >
        <TabIconWrapper>
          <TabIcon src={RoomIcon} />
        </TabIconWrapper>
        <TabName selected={tab === "/rooms"}>방 관리</TabName>
      </TabWrapper>
      <TabWrapper
        onClick={() => handleTabClick("/users")}
        selected={tab === "/users"}
      >
        <TabIconWrapper>
          <TabIcon src={UserIcon} />
        </TabIconWrapper>
        <TabName selected={tab === "/users"}>회원 관리</TabName>
      </TabWrapper>
      <TabWrapper
        onClick={() => handleTabClick("/commons")}
        selected={tab === "/commons"}
      >
        <TabIconWrapper>
          <TabIcon src={CommonIcon} />
        </TabIconWrapper>
        <TabName selected={tab === "/commons"}>공통 코드</TabName>
      </TabWrapper>
      <TabWrapper
        onClick={() => handleTabClick("/admins")}
        selected={tab === "/admins"}
      >
        <TabIconWrapper>
          <TabIcon src={AdmminIcon} />
        </TabIconWrapper>
        <TabName selected={tab === "/admins"}>관리자</TabName>
      </TabWrapper>
      <TabWrapper
        onClick={() => handleTabClick("/continue")}
        selected={tab === "/continue"}
      >
        <TabIconWrapper>
          <TabIcon src={ContinueIcon} />
        </TabIconWrapper>
        <TabName selected={tab === "/continue"}>(예정)</TabName>
      </TabWrapper>
      <UnderLine />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 608px;
  color: #a4a6b3;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px 64px 24px; // top right bottom left
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.4px;
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 18px 24px 18px 32px;
  cursor: pointer;
  border-left: ${(props) => (props.selected ? "3px solid #DDE2FF" : "none")};
  background-color: ${(props) =>
    props.selected ? "rgba(255, 255, 255, 0.05)" : "transparent"};
`;

const TabIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TabIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const TabName = styled.div`
  margin-left: 22px;
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.selected ? "bold" : "400")};
  line-height: normal;
  letter-spacing: 0.2px;
  color: ${(props) => (props.selected ? "#DDE2FF" : "#A4A6B3")};
`;

const UnderLine = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.05999999865889549;
  background-color: #dfe0eb;
`;
