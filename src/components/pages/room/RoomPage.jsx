import React, { useState } from "react";
import styled from "styled-components";
import ContentArea from "../../commons/ContentArea";
import { room_columns, room_paddings } from "../../commons/column_type/room";
import GraphTemplate from "../../commons/GraphTemplate";
import { useQuery } from "@tanstack/react-query";
import { fetchRooms } from "../../../api/room";

export default function RoomPage() {
  const paddings = room_paddings;
  const columns = room_columns;

  const [rooms, setRooms] = useState([]);

  const fetchRoomsQuery = useQuery(["rooms"], fetchRooms, {
    onSuccess: async (data) => {
      console.log("[RoomPage]: fetching rooms info");
      setRooms([...data]);
    },
    onError: async () => {
      // alert('전체 사용자 정보 조회 실패');
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
            <RoomInfo padding={paddings[5]}>{room.end_date}</RoomInfo>
            <ArrowButton />
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
`;

const ArrowButton = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .arrow-up,
  .arrow-down {
    border: solid #000;
    border-width: 0 2px 2px 0;
    padding: 6px;
  }

  .arrow-up {
    transform: rotate(-135deg);
  }

  .arrow-down {
    transform: rotate(45deg);
  }
`;
