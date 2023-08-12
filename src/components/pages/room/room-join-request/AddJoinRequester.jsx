import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BLUE, GREY } from "../../../../colors";
import { useErrorHandling } from "../../../../api/useErrorHandling";
import { useApiError } from "../../../../api/useApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers } from "../../../../api/user";
import { joinRoomRequest } from "../../../../api/participant";

export default function AddJoinRequester({ handleClickModal, room_code }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");

  const queryClient = useQueryClient();
  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(
    {
      409: {
        CONFLICT_JOIN: () => alert("이미 참여한 회원입니다."),
        CONFLICT: () => alert("이미 참여 요청을 보낸 상태입니다."),
        CONFLICT_MAX: () => alert("이미 최대 인원입니다."),
      },
      403: {
        FORBIDDEN_DATE: () => alert("이미 종료된 방입니다."),
        FORBIDDEN_ADMIN: errorhandling.handleNotAdminError,
      },
    },
    errorhandling
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

  const { mutate: createJoinRequester } = useMutation(
    ({ user_id }) =>
      joinRoomRequest({
        user_id: user_id,
        room_code,
      }),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async () => {
        console.log("[RoomJoinRequesters]: create joinRequester");
        queryClient.invalidateQueries("joinRequesters");
        handleClickModal({});
      },
    }
  );

  const handleOptionChange = (e) => {
    const userId = parseInt(e.target.value);
    setSelectedUserId(userId);
    setSelectedProfile(users.find((user) => user.user_id === userId).profile);
    setSelectedUsername(users.find((user) => user.user_id === userId).username);
  };

  return (
    <ModalOutside>
      <WhiteBox>
        <Select value={selectedUserId} onChange={handleOptionChange}>
          <option value={0} disabled>
            회원 선택
          </option>
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.username}
            </option>
          ))}
        </Select>
        <UserWrapper>
          {selectedProfile !== "" && (
            <>
              <ProfileWrapper>
                <ProfileImage>
                  <img
                    src={"data:image/png;base64," + selectedProfile}
                    alt=''
                  />
                </ProfileImage>
              </ProfileWrapper>
              <UserInfo>{selectedUsername}</UserInfo>
            </>
          )}
        </UserWrapper>
        <ButtonWrapper>
          <Btn color={GREY} onClick={() => handleClickModal([])}>
            취소
          </Btn>
          <Btn
            color={BLUE}
            onClick={() => createJoinRequester({ user_id: selectedUserId })}
          >
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
  padding: 25px;
`;

const Select = styled.select`
  width: 250px;
  height: 30px;
  padding: 5px;
  border-radius: 8px;
  color: #535151;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 25px;
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

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  margin-left: 110px;
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
