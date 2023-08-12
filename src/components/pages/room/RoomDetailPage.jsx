import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../../commons/Layout";
import RoomInfo from "./room-info/RoomInfo";
import RoomParticipant from "./room-participant/RoomParticipant";
import UpdateParticipantModal from "./room-participant/UpdateParticipantModal";
import RoomJoinRequest from "./room-join-request/RoomJoinRequest";
import AddJoinRequester from "./room-join-request/AddJoinRequester";
import { useErrorHandling } from "../../../api/useErrorHandling";
import { useApiError } from "../../../api/useApiError";
import { useQuery } from "@tanstack/react-query";
import { fetchParticipants } from "../../../api/participant";
import { fetchOneRoom } from "../../../api/room";
import PlanList from "./plan/PlanList";

export default function RoomDetailPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const roomId = pathname.split("/")[2];

  const [selected, setSelected] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateParticipantInfo, setUpdateParticipantInfo] = useState({});

  const [participantId, setParticipantId] = useState(0);
  const [participantClicked, setParticipantClicked] = useState(false);

  const [room, setRoom] = useState(undefined);
  const [participants, setParticipants] = useState([]);
  const [joinRequesters, setJoinRequesters] = useState([]);

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const fetchRoomsQuery = useQuery(
    ["oneRoom"],
    () => fetchOneRoom(roomId, true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[RoomInfo]: fetching room detail info");
        setRoom(data);
      },
      select: (res) => res.data,
    }
  );

  const fetchParticipantsQuery = useQuery(
    ["participants"],
    () => fetchParticipants(roomId, true, true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[RoomParticipants]: fetching participants");
        setParticipants([...data]);
      },
      select: (res) => res.data,
    }
  );

  const fetchJoinRequestersQuery = useQuery(
    ["joinRequesters"],
    () => fetchParticipants(roomId, false, true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[RoomJoinRequesters]: fetching joinRequesters");
        setJoinRequesters([...data]);
      },
      select: (res) => res.data,
    }
  );

  useEffect(() => {
    if (selected === "") {
      setSelected("방 정보");
    }
  }, [selected]);

  const handleUpdateClickModal = (participant) => {
    setUpdateParticipantInfo(participant);
    setUpdateModal(!updateModal);
  };

  const handleAddClickModal = () => {
    setAddModal(!addModal);
  };

  const handleParticipantClick = (participant_id) => {
    setParticipantId(participant_id);
    setParticipantClicked(!participantClicked);
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
            <Btn onClick={handleAddClickModal}>추가</Btn>
          )}
        </>
      }
    >
      {selected === "방 정보" && <RoomInfo room={room} />}
      {selected === "참여자" && participantClicked && (
        <PlanList
          handleParticipantClick={handleParticipantClick}
          participant_id={participantId}
        ></PlanList>
      )}
      {selected === "참여자" && !participantClicked && (
        <RoomParticipant
          participants={participants}
          handleClickModal={handleUpdateClickModal}
          handleParticipantClick={handleParticipantClick}
        />
      )}
      {selected === "참여 요청자" && (
        <RoomJoinRequest
          joinRequesters={joinRequesters}
          roomId={room.room_id}
        />
      )}
      {updateModal && (
        <UpdateParticipantModal
          handleClickModal={handleUpdateClickModal}
          participant={updateParticipantInfo}
        />
      )}
      {addModal && (
        <AddJoinRequester
          handleClickModal={handleAddClickModal}
          room_code={room.room_code}
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
