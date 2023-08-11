import React, { useState } from "react";
import styled from "styled-components";
import ContentArea from "../../commons/ContentArea";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user/userState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, fetchUsers } from "../../../api/user";
import GraphTemplate from "../../commons/GraphTemplate";
import { user_columns, user_paddings } from "../../commons/column-type/user";
import { GREY, PURPLE, YELLOW } from "../../../colors";
import Profile from "../../commons/Profile";
import UpdateUserModal from "./UpdateUserModal";
import { useErrorHandling } from "../../../api/useErrorHandling";
import { useApiError } from "../../../api/useApiError";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateUserInfo, setUpdateUserInfo] = useState({});
  const loginUser = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const paddings = user_paddings;
  const columns = user_columns;

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const fetchUsersQuery = useQuery(["users"], fetchUsers, {
    retry: 1,
    onError: handleError,
    onSuccess: async (data) => {
      console.log("[UserPage]: fetching users info");
      setUsers([...data]);
    },
    select: (res) => res.data,
  });

  const { mutate: deleteAUser } = useMutation(
    ({ userId }) => deleteUser(userId),
    {
      retry: 1,
      staleTime: Infinity,
      onError: handleError,
      onSuccess: async () => {
        console.log("[UserPage]: delete user");
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const handleClickModal = (user) => {
    setUpdateUserInfo(user);
    setUpdateModal(!updateModal);
  };

  return (
    <ContentArea tab={"/users"} title={"회원 관리"}>
      <GraphTemplate columns={columns} paddings={paddings}>
        {users.map((user) => (
          <List key={user.user_id} grid={columns.length}>
            <Profile profile={user.profile} username={user.username} />
            <UserInfo padding={paddings[1]}>{user.email}</UserInfo>
            <UserInfo padding={paddings[2]}>{user.created_date}</UserInfo>
            <UserInfo padding={paddings[3]}>{user.updated_date}</UserInfo>
            <UserInfo padding={paddings[4]}>
              {user.role_type === "USER" &&
              user.user_id !== loginUser.user_id ? (
                <Btn color={YELLOW} onClick={() => handleClickModal(user)}>
                  {"수정"}
                </Btn>
              ) : (
                <Btn color={GREY} cursor='true'>
                  {"수정"}
                </Btn>
              )}
            </UserInfo>
            <UserInfo padding={paddings[5]}>
              {user.role_type === "USER" &&
              user.user_id !== loginUser.user_id ? (
                <Btn
                  color={PURPLE}
                  onClick={() => deleteAUser({ userId: user.user_id })}
                >
                  {"삭제"}
                </Btn>
              ) : (
                <Btn color={GREY} cursor='true'>
                  {"삭제"}
                </Btn>
              )}
            </UserInfo>
          </List>
        ))}
      </GraphTemplate>
      <UpdateUserModal
        isClicked={updateModal}
        handleClickModal={handleClickModal}
        user={updateUserInfo}
      />
    </ContentArea>
  );
}
// D9D9D9
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

const UserInfo = styled.div`
  margin-left: ${(props) => (props.padding ? `${props.padding}px` : "0px")};
  color: #252733;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.2px;
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
  border-radius: 13px;
  border: none;
  cursor: ${(props) => (props.cursor ? "default" : "pointer")};
`;
