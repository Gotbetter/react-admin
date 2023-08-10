import React, { useState } from "react";
import { styled } from "styled-components";
import { fetchOneRoom } from "../../../api/room";
import { useQuery } from "@tanstack/react-query";
import { useErrorHandling } from "../../../api/useErrorHandling";
import { useApiError } from "../../../api/useApiError";
import { useLocation } from "react-router-dom";
import { GREY, PURPLE, YELLOW } from "../../../colors";
import UpdateRoomInfoModal from "./UpdateRoomInfoModal";

export default function RoomInfo() {
  const [room, setRoom] = useState(undefined);
  const location = useLocation();
  const pathname = location.pathname;
  const roomId = pathname.split("/")[2];

  const [updateModal, setUpdateModal] = useState(false);
  const [updateRoomInfo, setUpdateRoomInfo] = useState({});

  const [hasError, setHasError] = useState(false);
  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const fetchRoomsQuery = useQuery(
    ["oneRoom"],
    () => fetchOneRoom(roomId, true),
    {
      retry: 1,
      onError: (err) => {
        setHasError(true);
        handleError(err);
      },
      onSuccess: async (data) => {
        console.log("[RoomInfo]: fetching room info");
        setRoom(data);
      },
      select: (res) => res.data,
      enabled: !hasError,
    }
  );

  const handleClickModal = (room) => {
    setUpdateRoomInfo(room);
    setUpdateModal(!updateModal);
  };

  return (
    <InfoWrapper>
      {room && (
        <>
          {updateModal && (
            <UpdateRoomInfoModal
              handleClickModal={handleClickModal}
              room={updateRoomInfo}
            />
          )}
          <TitleWrapper>
            <Title>{room.title}</Title>
            <BtnWrapper>
              <Btn color={YELLOW} onClick={() => handleClickModal(room)}>
                수정
              </Btn>
              <Btn color={PURPLE}>삭제</Btn>
            </BtnWrapper>
          </TitleWrapper>
          <DetailListWrapper>
            <DetailInfoWrapper>
              <DetailInfo>방 코드</DetailInfo>
              <DetailInfo color={GREY}>{room.room_code}</DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>계좌번호</DetailInfo>
              <DetailInfo color={GREY}>{room.account}</DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>참가비</DetailInfo>
              <DetailInfo color={GREY}>{room.entry_fee + "원"}</DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>전체 참가비</DetailInfo>
              <DetailInfo color={GREY}>
                {room.total_entry_fee + "원"}
              </DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>인원</DetailInfo>
              <DetailInfo color={GREY}>
                {room.current_user_num + "명 / " + room.max_user_num + "명"}
              </DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>주차</DetailInfo>
              <DetailInfo color={GREY}>
                {room.current_week + "주차 / " + room.week + "주차"}
              </DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>시작 날짜</DetailInfo>
              <DetailInfo color={GREY}>{room.start_date}</DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>종료 날짜</DetailInfo>
              <DetailInfo color={GREY}>{room.end_date}</DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>카테고리</DetailInfo>
              <DetailInfo color={GREY}>{room.room_category}</DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>규칙</DetailInfo>
              <DetailInfo color={GREY}>{room.rule}</DetailInfo>
            </DetailInfoWrapper>
            <DetailInfoWrapper>
              <DetailInfo>방장</DetailInfo>
              <DetailInfo color={GREY}>{room.leader}</DetailInfo>
            </DetailInfoWrapper>
          </DetailListWrapper>
        </>
      )}
    </InfoWrapper>
  );
}

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-left: 32px;
  margin-right: 32px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const Title = styled.div`
  color: #252733;
  font-size: 19px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0.4px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Btn = styled.button`
  width: 70px;
  height: 29px;
  background-color: ${(props) => (props.color ? `${props.color}` : "#3751ff")};
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
  margin-left: 3px;
`;

const DetailListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dfe0eb;
  width: 100%;
  margin-top: 11px;
  padding-bottom: 9.5px;
`;

const DetailInfo = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.2px;
  color: ${(props) => (props.color ? `${props.color}` : "#252733")};
`;