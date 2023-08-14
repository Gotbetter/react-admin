import React from "react";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { GREY, YELLOW } from "../../../../colors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useErrorHandling } from "../../../../api/useErrorHandling";
import { useApiError } from "../../../../api/useApiError";
import { updateRoom } from "../../../../api/room";
import RoomInfoWrapper from "./RoomInfoWrapper";
import { fetchCategories, fetchRules } from "../../../../api/common";
import { fetchParticipants } from "../../../../api/participant";

const initRoomInfo = {
  title: "",
  // room_code: "",
  account: "",
  // entry_fee: "",
  max_user_num: "",
  // week: "",
  room_category_code: "",
  rule_code: "",
  leader_id: "",
};

export default function UpdateRoomInfoModal({ handleClickModal, room }) {
  const [roomInfo, setRoomInfo] = useState(initRoomInfo);
  const [categories, setCategories] = useState([]);
  const [rules, setRules] = useState([]);
  const [participants, setParticipants] = useState([]);

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const handleRoomUpdate = () => {
    let changable = false;
    if (roomInfo.title !== room.title) {
      changable = true;
    }
    if (roomInfo.account !== room.account) {
      changable = true;
    }
    if (roomInfo.max_user_num !== room.max_user_num) {
      if (
        roomInfo.max_user_num < 1 ||
        roomInfo.max_user_num < room.current_user_num
      ) {
        alert("최대 인원 확인해주세요.");
        return;
      }
      changable = true;
    }
    if (roomInfo.room_category_code !== room.room_category_code) {
      changable = true;
    }
    if (roomInfo.rule_code !== room.rule_code) {
      changable = true;
    }
    if (roomInfo.leader_id !== room.leader_id) {
      changable = true;
    }
    if (changable) {
      updateRoomInfo(roomInfo);
    } else {
      handleClickModal({});
    }
    // if (roomInfo.room_code !== room.room_code) {
    //   changable = true;
    // }
    // if (roomInfo.entry_fee !== room.entry_fee) {
    //   if (roomInfo.entry_fee < 0) {
    //     alert("참가비 확인해주세요.");
    //     return;
    //   }
    //   changable = true;
    // }
    // if (roomInfo.week !== room.week) {
    //   if (roomInfo.week < 1 || roomInfo.week < room.current_week) {
    //     alert("전체 주차 확인해주세요.");
    //     return;
    //   }
    //   changable = true;
    // }
  };

  const { mutate: updateRoomInfo } = useMutation(
    (roomInfo) => updateRoom(room.room_id, roomInfo),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async () => {
        console.log("[RoomInfo]: update room info");
        handleClickModal({});
        queryClient.invalidateQueries("oneRoom");
      },
    }
  );

  const fetchCategoriesQuery = useQuery(
    ["categoryList"],
    ({ queryKey }) => fetchCategories(true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[categoryList]: fetching categories info");
        setCategories([...data]);
      },
      select: (res) => res.data,
    }
  );

  const fetchRulesQuery = useQuery(
    ["ruleList"],
    ({ queryKey }) => fetchRules(true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[ruleList]: fetching rules info");
        setRules([...data]);
      },
      select: (res) => res.data,
    }
  );

  const fetchParticipantsQuery = useQuery(
    ["participantList"],
    () => fetchParticipants(room.room_id, true, true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[participantList]: fetching participants info");
        setParticipants([...data]);
      },
      select: (res) => res.data,
    }
  );

  useEffect(() => {
    const keys = Object.keys(initRoomInfo);
    if (keys.every((key) => roomInfo[key] === "")) {
      setRoomInfo(room);
    }
  }, [room, roomInfo]);

  return (
    <ModalOutside>
      <WhiteBox>
        <ModalName>방 정보 수정</ModalName>
        <RoomInfoWrapper
          name='방 이름'
          propKey='title'
          value={roomInfo.title}
          setValue={setRoomInfo}
        />
        <RoomInfoWrapper
          name='방 코드'
          value={roomInfo.room_code}
          // propKey='room_code'
          // setValue={setRoomInfo}
        />
        <RoomInfoWrapper
          name='계좌번호'
          propKey='account'
          value={roomInfo.account}
          setValue={setRoomInfo}
        />
        <RoomInfoWrapper
          isNum={true}
          name='참가비'
          value={roomInfo.entry_fee}
          // propKey='entry_fee'
          // setValue={setRoomInfo}
        />
        <RoomInfoWrapper name='전체 참가비' value={room.total_entry_fee} />
        <RoomInfoWrapper name='현재 인원' value={room.current_user_num} />
        <RoomInfoWrapper
          name='최대 인원'
          propKey='max_user_num'
          value={roomInfo.max_user_num}
          setValue={setRoomInfo}
        />
        <RoomInfoWrapper name='현재 주차' value={room.current_week} />
        <RoomInfoWrapper
          isNum={true}
          name='전체 주차'
          value={roomInfo.week}
          // propKey='week'
          // setValue={setRoomInfo}
        />
        <RoomInfoWrapper name='시작 날짜' value={room.start_date} />
        <RoomInfoWrapper
          name='카테고리'
          propKey='room_category_code'
          value={roomInfo.room_category_code}
          setValue={setRoomInfo}
          categoryList={categories}
        />
        <RoomInfoWrapper
          name='규칙'
          propKey='rule_code'
          value={roomInfo.rule_code}
          setValue={setRoomInfo}
          ruleList={rules}
        />
        <RoomInfoWrapper
          name='방장'
          propKey='user_id'
          setValue={setRoomInfo}
          value={room.leader_id}
          userList={participants}
        />
        <ButtonWrapper>
          <Btn color={GREY} onClick={() => handleClickModal({})}>
            취소
          </Btn>
          <Btn color={YELLOW} onClick={handleRoomUpdate}>
            수정
          </Btn>
        </ButtonWrapper>
      </WhiteBox>
    </ModalOutside>
  );
}

const ModalOutside = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const WhiteBox = styled.div`
  position: relative;
  width: 400px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px;
`;

const ModalName = styled.div`
  font-size: 19px;
  font-style: normal;
  font-weight: bold;
  letter-spacing: 0.2px;
  margin-bottom: 10px;
  color: #252733;
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const Btn = styled.button`
  width: 54px;
  height: 24px;
  background-color: ${(props) => (props.color ? `${props.color}` : "black")};
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
  margin: 1px;
`;
