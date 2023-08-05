import React, { useState } from "react";
import styled from "styled-components";
import {
  common_columns,
  common_paddings,
} from "../../commons/column_type/common";
import { fetchCommons } from "../../../api/common";
import { useQuery } from "@tanstack/react-query";
import Profile from "../../commons/Profile";
import { PURPLE, YELLOW } from "../../../colors";

export default function CategoryPage({ handleClickModal }) {
  const paddings = common_paddings;
  const columns = common_columns;
  const [commons, setCommons] = useState([]);

  const fetchCommonsQuery = useQuery(
    ["commons"],
    ({ queryKey }) => fetchCommons(true),
    {
      onSuccess: async (data) => {
        console.log("[CommonPage]: fetching commons info");
        setCommons([...data]);
      },
      onError: async () => {
        alert("전체 공통 코드 정보 조회 실패");
      },
      select: (res) => res.data,
    }
  );

  // const { mutate: deleteACommon } = useMutation(
  //   ({ userId }) => deleteUser(userId),
  //   {
  //     staleTime: Infinity,
  //     onError: (err) => {
  //       const { status } = err.response;
  //       if (status === 400) {
  //         alert("모든 정보를 입력해 주세요.");
  //       }
  //       if (status === 403) {
  //         alert("관리자가 아니거나 본인이 아닙니다.");
  //       }
  //       if (status === 404) {
  //         alert("존재하지 않는 회원입니다.");
  //       }
  //     },
  //     onSuccess: async (res) => {
  //       console.log("[UserPage]: delete user");
  //       queryClient.invalidateQueries(["users"]);
  //     },
  //   }
  // );

  return (
    <>
      {commons.map((common) => (
        <List grid={columns.length}>
          <Profile
            profile={common.room_category_image}
            username={common.room_category_code}
          />
          <CommonInfo padding={paddings[1]}>
            {common.room_category_description}
          </CommonInfo>
          <CommonInfo padding={paddings[2]}>{common.updated_date}</CommonInfo>
          <CommonInfo padding={paddings[3]}>{common.updated_by}</CommonInfo>
          <CommonInfo padding={paddings[4]}>
            <Btn color={YELLOW} onClick={() => handleClickModal(common)}>
              {"수정"}
            </Btn>
          </CommonInfo>
          <CommonInfo padding={paddings[5]}>
            <Btn color={PURPLE}>{"삭제"}</Btn>
          </CommonInfo>
        </List>
      ))}
    </>
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

const CommonInfo = styled.div`
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
