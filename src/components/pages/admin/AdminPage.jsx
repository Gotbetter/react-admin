import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../commons/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminChangeReuqest, fetchUsers } from "../../../api/user";
import GraphTemplate from "../../commons/GraphTemplate";
import { admin_columns, admin_paddings } from "../../commons/column-type/admin";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user/userState";
import { GREEN, GREY, PURPLE } from "../../../colors";
import Profile from "../../commons/Profile";
import { useErrorHandling } from "../../../api/useErrorHandling";
import { useApiError } from "../../../api/useApiError";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const loginUser = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const paddings = admin_paddings;
  const columns = admin_columns;

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const fetchUsersQuery = useQuery(["usersforAdmin"], fetchUsers, {
    retry: 1,
    onError: handleError,
    onSuccess: async (data) => {
      console.log("[AdminPage]: fetching users info");
      setUsers([...data]);
    },
    select: (res) => res.data,
  });

  const { mutate: updateRoleType } = useMutation(
    ({ userId, approve }) => adminChangeReuqest(userId, { approve: approve }),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async () => {
        console.log("[AdminPage]: update role type");
        queryClient.invalidateQueries("usersforAdmin");
      },
    }
  );

  return (
    <Layout tab={"/admins"} title={"관리자"}>
      <GraphTemplate columns={columns} paddings={paddings}>
        {users.map((user) => (
          <List key={user.user_id} grid={columns.length}>
            <Profile profile={user.profile} username={user.username} />
            <UserInfo padding={paddings[1]}>{user.email}</UserInfo>
            <UserInfo padding={paddings[2]}>{user.created_date}</UserInfo>
            <UserInfo padding={paddings[3]}>{user.role_type}</UserInfo>
            <UserInfo padding={paddings[4]}>
              {user.role_type === "USER" && (
                <Btn
                  onClick={() =>
                    updateRoleType({ userId: user.user_id, approve: true })
                  }
                  color={GREEN}
                >
                  {"승인"}
                </Btn>
              )}
              {(user.role_type === "MAIN_ADMIN" ||
                user.user_id === loginUser.user_id) && (
                <Btn color={GREY} cursor='true'>
                  {"해지"}
                </Btn>
              )}
              {!(
                user.role_type === "MAIN_ADMIN" ||
                user.user_id === loginUser.user_id
              ) &&
                user.role_type === "ADMIN" && (
                  <Btn
                    onClick={() =>
                      updateRoleType({ userId: user.user_id, approve: false })
                    }
                    color={PURPLE}
                  >
                    {"해지"}
                  </Btn>
                )}
            </UserInfo>
          </List>
        ))}
      </GraphTemplate>
    </Layout>
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
      : "repeat(auto-fit, minmax(25%, 1fr));"};
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
