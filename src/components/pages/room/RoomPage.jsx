import React, { useState } from "react";
import styled from "styled-components";
import ContentArea from "../../commons/ContentArea";
import { room_columns, room_paddings } from "../../commons/column_type/room";
import GraphTemplate from "../../commons/GraphTemplate";
import { useQuery } from "@tanstack/react-query";
import { fetchRooms } from "../../../api/room";
import ArrowIcon from "../../../assets/arrowIcon.svg";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../../recoil/login/loginState";

export default function RoomPage() {
  const paddings = room_paddings;
  const columns = room_columns;
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(loginState);

  const [rooms, setRooms] = useState([]);

  const fetchRoomsQuery = useQuery(["rooms"], fetchRooms, {
    retry: 1,
    onSuccess: async (data) => {
      console.log("[RoomPage]: fetching rooms info");
      setRooms([...data]);
    },
    onError: async (err) => {
      const errorType = err.response.data.errors[0].errorType;
      const { status } = err.response;

      if (status === 403 && errorType === "FORBIDDEN_ADMIN") {
        alert("권한이 없습니다.");
        setIsLogin(false);
        navigate("/notfound");
      } else {
        alert("전체 방 정보 조회 실패");
      }
    },
    select: (res) => res.data,
  });

  return (
    <ContentArea tab={"/rooms"} title={"방 관리"}>
      <GraphTemplate columns={columns} paddings={paddings}>
        {rooms.map((room) => (
          <List key={room.room_id} grid={columns.length}>
            <RoomInfo padding={paddings[0]}>{room.title}</RoomInfo>
            <RoomInfo padding={paddings[1]}>{room.leader}</RoomInfo>
            <RoomInfo padding={paddings[2]}>{room.room_category}</RoomInfo>
            <RoomInfo padding={paddings[3]}>{room.rule}</RoomInfo>
            <RoomInfo padding={paddings[4]}>{room.start_date}</RoomInfo>
            <RoomInfo padding={paddings[5]}>
              {room.end_date}
              <ArrowButton
                src={ArrowIcon}
                onClick={() => navigate(`/rooms/${room.room_id}`)}
              />
            </RoomInfo>
          </List>
        ))}
      </GraphTemplate>
    </ContentArea>
  );
}

const List = styled.li`
  align-items: center;
  padding: 24px 31px 24px 31px; // top right bottom left: ;
  border-bottom: 1px solid #dfe0eb;
  display: grid;
  grid-template-columns: ${(props) =>
    props.grid
      ? `repeat(auto-fit, minmax(${props.grid}%, 1fr));`
      : "repeat(auto-fit, minmax(25%, 1fr));"}; /* 자동으로 요소들 배치 */
`;

const RoomInfo = styled.div`
  margin-left: ${(props) => (props.padding ? `${props.padding}px` : "0px")};
  color: #252733;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ArrowButton = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
