import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { GREY, BLUE } from "../../../colors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, fetchRules } from "../../../api/common";
import { useErrorHandling } from "../../../api/useErrorHandling";
import { useApiError } from "../../../api/useApiError";
import CalendarModal from "../../commons/CustomCalendar";
import moment from "moment";
import { fetchUsers } from "../../../api/user";
import { createRoom } from "../../../api/room";
import { createPlans } from "../../../api/plan";

const initRoomInfo = {
  title: "",
  max_user_num: "",
  start_date: "",
  week: "",
  entry_fee: "",
  account: "",
  room_category_code: "",
  rule_code: "",
  user_id: "",
  description: "",
};

export default function AddRoomModal({ handleClickModal }) {
  const [roomInfo, setRoomInfo] = useState(initRoomInfo);
  const [categories, setCategories] = useState([]);
  const [rules, setRules] = useState([]);
  const [users, setUsers] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [participantInfo, setParticipantInfo] = useState(null);

  const queryClient = useQueryClient();

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

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

  const fetchUsersQuery = useQuery(["users"], fetchUsers, {
    retry: 1,
    onError: handleError,
    onSuccess: async (data) => {
      console.log("[UserPage]: fetching users info");
      setUsers([...data]);
    },
    select: (res) => res.data,
  });

  const { mutate: newRoom } = useMutation((roomInfo) => createRoom(roomInfo), {
    retry: 1,
    onError: handleError,
    onSuccess: async (res) => {
      console.log("[RoomPage]: create a room");
      setParticipantInfo(res.data);
    },
  });

  const { mutate: addPlans } = useMutation(
    ({ participant_id }) =>
      createPlans({ participant_id: participant_id }, true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async () => {
        console.log("[RoomPage]: create plans");
        queryClient.invalidateQueries("rooms");
        handleClickModal();
      },
    }
  );

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setRoomInfo((prevRoomInfo) => ({
      ...prevRoomInfo,
      start_date: moment(date).format("YYYY-MM-DD"),
    }));
    setSelectedDate(date);
  };

  const handleChange = (e, propKey) => {
    setRoomInfo((prevRoomInfo) => ({
      ...prevRoomInfo,
      [propKey]: e.target.value,
    }));
  };

  useEffect(() => {
    if (participantInfo !== null) {
      // plan 생성
      addPlans({ participant_id: participantInfo.participant_id });
      setParticipantInfo(null);
    }
  }, [addPlans, participantInfo]);

  return (
    <ModalOutside>
      <WhiteBox>
        <RoomInfoWrapper>
          방 이름
          <TextInput
            type='text'
            placeholder={"방 이름을 작성해주세요."}
            onChange={(e) => handleChange(e, "title")}
          />
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          최대 인원
          <Select
            defaultValue={0}
            onChange={(e) => handleChange(e, "max_user_num")}
          >
            <option value={0} disabled>
              최대 인원 선택
            </option>
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </Select>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          시작 날짜
          <CalendarBtn onClick={handleShowCalendar}>
            {selectedDate
              ? moment(selectedDate).format("YYYY-MM-DD")
              : "시작 날짜 선택"}
          </CalendarBtn>
        </RoomInfoWrapper>
        {showCalendar && (
          <CalendarModal
            handleShowCalendar={handleShowCalendar}
            handleDateSelect={handleDateSelect}
          />
        )}
        <RoomInfoWrapper>
          전체 주차
          <Select defaultValue={0} onChange={(e) => handleChange(e, "week")}>
            <option value={0} disabled>
              전체 주차 선택
            </option>
            {Array.from({ length: 20 }, (_, index) => index + 1).map(
              (number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              )
            )}
          </Select>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          참가비
          <Select
            defaultValue={0}
            onChange={(e) => handleChange(e, "entry_fee")}
          >
            <option value={0} disabled>
              참가비 선택
            </option>
            {[10000, 20000, 30000, 40000, 50000, 60000].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </Select>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          계좌번호
          <TextInput
            type='text'
            placeholder={"계좌번호를 입력해주세요."}
            onChange={(e) => handleChange(e, "account")}
          />
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          카테고리
          <Select
            defaultValue={0}
            onChange={(e) => handleChange(e, "room_category_code")}
          >
            <option value={0} disabled>
              카테고리 선택
            </option>
            {categories.map((category) => (
              <option key={category.order} value={category.room_category_code}>
                {category.room_category_description}
              </option>
            ))}
          </Select>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          규칙
          <Select
            defaultValue={0}
            onChange={(e) => handleChange(e, "rule_code")}
          >
            <option value={0} disabled>
              규칙 선택
            </option>
            {rules.map((rule) => (
              <option key={rule.order} value={rule.rule_code}>
                {rule.rule_description}
              </option>
            ))}
          </Select>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          방장
          <Select defaultValue={0} onChange={(e) => handleChange(e, "user_id")}>
            <option value={0} disabled>
              방장 선택
            </option>
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.username}
              </option>
            ))}
          </Select>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          소개글
          <TextInput
            type='text'
            placeholder={"소개글을 작성해주세요."}
            onChange={(e) => handleChange(e, "description")}
            height={200}
          />
        </RoomInfoWrapper>
        <ButtonWrapper>
          <Btn color={GREY} onClick={handleClickModal}>
            취소
          </Btn>
          <Btn color={BLUE} onClick={() => newRoom(roomInfo)}>
            추가
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

const RoomInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
  margin-top: 15px;
  margin-left: 5px;
  color: #252733;
`;

const CalendarBtn = styled.button`
  width: 250px;
  height: 39px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  color: #535151;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  margin: 5px;
  cursor: pointer;

  /* color: #535151;
  margin: 10px 0;
  text-align: center;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 1px; */
`;

const TextInput = styled.textarea`
  width: 250px;
  height: ${(props) => (props.height ? `${props.height}px` : "39px")};
  padding: 10px;
  fill: #fff;
  margin: 10px 0;
  border-radius: 8px;
  color: #535151;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  margin: 5px;

  /* 읽기 전용일 때 스타일 변경 */
  ${(props) =>
    props.readOnly &&
    `
      background-color: #ccc; /* 읽기 전용 배경색 */
      border-color: #ccc; /* 읽기 전용 테두리 색 */
      cursor: not-allowed;
    `}

  /* 텍스트 왼쪽 위 정렬 */
  text-align: left;
  vertical-align: top;
  /* line-height: 1.2; //텍스트의 높이에 맞춰서 높이를 설정 */
  resize: none; /* 크기 조절 불가능하도록 설정 */
  overflow: auto; /* 내용이 넘칠 경우 스크롤바가 나오지 않도록 설정 */

  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 5px;
  }
`;

const Select = styled.select`
  width: 255px;
  height: 39px;
  padding: 5px;
  border-radius: 8px;
  color: #535151;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  cursor: pointer;
`;
