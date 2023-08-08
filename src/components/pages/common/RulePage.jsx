import React, { useState } from "react";
import { rule_columns, rule_paddings } from "../../commons/column_type/common";
import { fetchRules } from "../../../api/common";
import { useQuery } from "@tanstack/react-query";
import { PURPLE, YELLOW } from "../../../colors";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../../recoil/login/loginState";
import { useNavigate } from "react-router-dom";
import { Btn, CommonInfo, List } from "./CommonStyle";

export default function RulePage({ handleClickModal }) {
  const paddings = rule_paddings;
  const columns = rule_columns;
  const [rules, setRules] = useState([]);
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const fetchRulesQuery = useQuery(
    ["rules"],
    ({ queryKey }) => fetchRules(true),
    {
      retry: 1,
      onSuccess: async (data) => {
        console.log("[RulePage]: fetching rules info");
        setRules([...data]);
      },
      onError: async (err) => {
        const { status } = err.response;
        if (status === 403) {
          alert("권한이 없습니다.");
          setIsLogin(false);
          navigate("/notfound");
        } else {
          alert("전체 규칙 정보 조회 실패");
        }
      },
      select: (res) => res.data,
    }
  );

  return (
    <>
      {rules.map((rule) => (
        <List grid={columns.length} key={rule.order}>
          <CommonInfo padding={paddings[0]}>{rule.rule_code}</CommonInfo>
          <CommonInfo padding={paddings[1]}>{rule.rule_description}</CommonInfo>
          <CommonInfo padding={paddings[2]}>{rule.rule_attribute1}</CommonInfo>
          <CommonInfo padding={paddings[3]}>{rule.rule_attribute2}</CommonInfo>
          <CommonInfo padding={paddings[4]}>{rule.updated_date}</CommonInfo>
          <CommonInfo padding={paddings[5]}>{rule.updated_by}</CommonInfo>
          <CommonInfo padding={paddings[6]}>
            <Btn
              color={YELLOW}
              onClick={() => handleClickModal(rule, true, false)}
            >
              {"수정"}
            </Btn>
          </CommonInfo>
          <CommonInfo padding={paddings[7]}>
            <Btn color={PURPLE}>{"삭제"}</Btn>
          </CommonInfo>
        </List>
      ))}
    </>
  );
}
