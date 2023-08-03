import React, { useState } from "react";
import styled from "styled-components";
import ContentArea from "../../commons/ContentArea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminChangeReuqest, fetchUsers } from "../../../api/user";
import GraphTemplate from "../../commons/GraphTemplate";
import { admin_columns, admin_paddings } from "../../commons/column_type/admin";

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const queryClient = useQueryClient();
    const paddings = admin_paddings;
    const columns = admin_columns;

    const fetchUsersQuery = useQuery(['users'], fetchUsers, {
        onSuccess: async (data) => {
            console.log('[AdminPage]: fetching users info');
            setUsers([...data]);
        },
        onError: async () => {
            alert('사용자 정보 조회 실패');
            
        },
        select: (res) => res.data,
    });

    const { mutate: updateRoleType } = useMutation(({userId, approve}) => adminChangeReuqest(userId, {approve: approve}), {
        onSuccess: async (res) => {
            console.log('[AdminPage]: update role type');
            queryClient.invalidateQueries('users');
        },
        onError: (err) => {
            const { status } = err.response;
            if (status === 400) {
              alert('모든 정보를 입력해 주세요.');
            }
            if (status === 403) {
              alert('관리자가 아닙니다.');
            }
            if (status === 404) {
              alert('존재하지 않는 회원입니다.');
            }
            if (status === 409) {
              alert('이미 수정된 정보입니다.');
            }
        },
        
    });

    return (
        <ContentArea tab={'/admins'} title={'관리자'}>
            <GraphTemplate columns={columns} paddings={paddings}>
                {users.map(user => (
                    <List key={user.user_id}>
                        <UserWrapper>
                            <ProfileWrapper>
                                <ProfileImage>
                                    <img src={'data:image/png;base64,' + user.profile} alt=""/>
                                </ProfileImage>
                            </ProfileWrapper>
                        <UserInfo>{user.username}</UserInfo>
                        </UserWrapper>
                        <UserInfo padding={paddings[1]}>{user.email}</UserInfo>
                        <UserInfo padding={paddings[2]}>{user.created_date[0]+"/"+user.created_date[1]+"/"+user.created_date[2]}</UserInfo>
                        <UserInfo padding={paddings[3]}>
                            {user.role_type === "USER" ? (
                                <Btn onClick={() => updateRoleType({userId: user.user_id, approve: true})} approve="true">{"승인"}</Btn>
                            ) : (
                                <Btn onClick={() => updateRoleType({userId: user.user_id, approve: false})} hidden={user.role_type === "MAIN_ADMIN"}>{"해지"}</Btn>
                            )}
                        </UserInfo>
                    </List>
                ))}
            </GraphTemplate>
        </ContentArea>
    );
}

const List = styled.li`
    align-items: center;
    padding: 24px 31px 24px 31px;// top right bottom left: ;
    border-bottom: 1px solid #DFE0EB;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20%, 1fr)); /* 자동으로 요소들 배치 */
`;

const UserWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-shrink: 0; // UserWrapper가 필요한 크기만큼만 차지하도록 설정
`;

const UserInfo = styled.div`
    margin-left: ${props => (props.padding ? `${props.padding}px` : '0px')};
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
    background-color: ${props => (props.approve ? '#29CC97' : '#9747FF')};
    color: white;
    text-align: center;
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.2px;
    border-radius: 13px;
    border: none;
    cursor: pointer;
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