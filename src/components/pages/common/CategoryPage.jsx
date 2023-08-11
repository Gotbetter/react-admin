import React, { useState } from "react";
import {
  category_columns,
  category_paddings,
} from "../../commons/column-type/common";
import { fetchCategories } from "../../../api/common";
import { useQuery } from "@tanstack/react-query";
import Profile from "../../commons/Profile";
import { PURPLE, YELLOW } from "../../../colors";
import { Btn, CommonInfo, List } from "./CommonStyle";
import { useErrorHandling } from "../../../api/useErrorHandling";
import { useApiError } from "../../../api/useApiError";

export default function CategoryPage({ handleClickModal }) {
  const paddings = category_paddings;
  const columns = category_columns;
  const [categories, setCategories] = useState([]);

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(undefined, errorhandling);

  const fetchCategoriesQuery = useQuery(
    ["categories"],
    ({ queryKey }) => fetchCategories(true),
    {
      retry: 1,
      onError: handleError,
      onSuccess: async (data) => {
        console.log("[CategoryPage]: fetching categories info");
        setCategories([...data]);
      },
      select: (res) => res.data,
    }
  );

  // const { mutate: deleteACommon } = useMutation(
  //   ({ userId }) => deleteCommon(userId),
  //   {
  //     staleTime: Infinity,
  //     onError: handleError,
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
