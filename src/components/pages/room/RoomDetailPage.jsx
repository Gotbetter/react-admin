import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../../commons/Layout";
import RoomInfo from "./room-info/RoomInfo";
import RoomParticipant from "./room-participant/RoomParticipant";
import UpdateParticipantModal from "./room-participant/UpdateParticipantModal";
import RoomJoinRequest from "./room-join-request/RoomJoinRequest";

export default function RoomDetailPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const roomId = pathname.split("/")[2];

  const [selected, setSelected] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [updateParticipantInfo, setUpdateParticipantInfo] = useState({});

  useEffect(() => {
    if (selected === "") {
      setSelected("방 정보");
    }
  }, [selected]);

  const handleClickModal = (participant) => {
    setUpdateParticipantInfo(participant);
    setUpdateModal(!updateModal);
  };

  return (
    <Layout
      tab={"/rooms"}
      title={"방 관리"}
      Middle={
        <>
          <MiddleWrapper>
            <MiddleContent
              onClick={(e) => setSelected("방 정보")}
              selected={selected === "방 정보"}
            >
              방 정보
            </MiddleContent>
            <MiddleContent cursor='true'>|</MiddleContent>
            <MiddleContent
              onClick={(e) => setSelected("참여자")}
              selected={selected === "참여자"}
            >
              참여자
            </MiddleContent>
            <MiddleContent cursor='true'>|</MiddleContent>
            <MiddleContent
              onClick={(e) => setSelected("참여 요청자")}
              selected={selected === "참여 요청자"}
            >
              참여 요청자
            </MiddleContent>
          </MiddleWrapper>
          {selected === "참여 요청자" && (
            <Btn onClick={handleClickModal}>추가</Btn>
          )}
        </>
      }
    >
      {selected === "방 정보" && <RoomInfo roomId={roomId} />}
      {selected === "참여자" && (
        <RoomParticipant roomId={roomId} handleClickModal={handleClickModal} />
      )}
      {selected === "참여 요청자" && (
        <RoomJoinRequest roomId={roomId} handleClickModal={handleClickModal} />
      )}
      {updateModal && (
        <UpdateParticipantModal
          handleClickModal={handleClickModal}
          participant={updateParticipantInfo}
        />
      )}
    </Layout>
  );
}

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
`;

const MiddleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  line-height: 22px; /* 137.5% */
  letter-spacing: 0.3px;
  color: ${(props) => (props.selected ? "#252733" : "#888")};
  cursor: ${(props) => (props.cursor ? "default" : "pointer")};
`;

const Btn = styled.button`
  width: 70px;
  height: 29px;
  background-color: #3751ff;
  color: white;
  text-align: center;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
