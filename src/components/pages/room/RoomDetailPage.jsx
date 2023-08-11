import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ContentArea from "../../commons/ContentArea";
import RoomInfo from "./room-info/RoomInfo";
import RoomParticipant from "./room-participant/RoomParticipant";

export default function RoomDetailPage() {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selected === "") {
      setSelected("방 정보");
    }
  }, [selected]);

  return (
    <ContentArea
      tab={"/rooms"}
      title={"방 관리"}
      Middle={
        <>
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
        </>
      }
    >
      {selected === "방 정보" && <RoomInfo />}
      {selected === "참여자" && <RoomParticipant />}
      {selected === "참여 요청자" && <div>참여 요청자</div>}
    </ContentArea>
  );
}

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
