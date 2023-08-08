import React, { useState } from "react";
import {
  category_columns,
  category_paddings,
} from "../../commons/column_type/common";
import { fetchCategories } from "../../../api/common";
import { useQuery } from "@tanstack/react-query";
import Profile from "../../commons/Profile";
import { PURPLE, YELLOW } from "../../../colors";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../../recoil/login/loginState";
import { useNavigate } from "react-router-dom";
import { Btn, CommonInfo, List } from "./CommonStyle";

export default function CategoryPage({ handleClickModal }) {
  const paddings = category_paddings;
  const columns = category_columns;
  const [categories, setCategories] = useState([]);
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const fetchCategoriesQuery = useQuery(
    ["categories"],
    ({ queryKey }) => fetchCategories(true),
    {
      retry: 1,
      onSuccess: async (data) => {
        console.log("[CategoryPage]: fetching categories info");
        setCategories([...data]);
      },
      onError: async (err) => {
        const errorType = err.response.data.errors[0].errorType;
        const { status } = err.response;

        if (status === 403 && errorType === "FORBIDDEN_ADMIN") {
          alert("권한이 없습니다.");
          setIsLogin(false);
          navigate("/notfound");
        } else {
          alert("전체 카테고리 정보 조회 실패");
        }
      },
      select: (res) => res.data,
    }
  );

  // const { mutate: deleteACommon } = useMutation(
  //   ({ userId }) => deleteCommon(userId),
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
      {categories.map((category) => (
        <List grid={columns.length} key={category.order}>
          <Profile
            profile={category.room_category_image}
            username={category.room_category_code}
          />
          <CommonInfo padding={paddings[1]}>
            {category.room_category_description}
          </CommonInfo>
          <CommonInfo padding={paddings[2]}>{category.updated_date}</CommonInfo>
          <CommonInfo padding={paddings[3]}>{category.updated_by}</CommonInfo>
          <CommonInfo padding={paddings[4]}>
            <Btn
              color={YELLOW}
              onClick={() => handleClickModal(category, false, false)}
            >
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
