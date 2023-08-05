import React, { useState } from "react";
import styled from "styled-components";
import ContentArea from "../../commons/ContentArea";
import {
  common_columns,
  common_paddings,
} from "../../commons/column_type/common";
import GraphTemplate from "../../commons/GraphTemplate";
import UpdateCommonModal from "./UpdateCommonModal";
import CategoryPage from "./CategoryPage";

export default function CommonPage() {
  const [updateModal, setUpdateModal] = useState(false);
  const [updateCommonInfo, setUpdateCommonInfo] = useState({});
  const [selectedOption, setSelectedOption] = useState("카테고리");
  const paddings = common_paddings;
  const columns = common_columns;

  const handleClickModal = (common) => {
    setUpdateCommonInfo(common);
    setUpdateModal(!updateModal);
  };

  const test = () => {
    console.log("aa");
  };

  return (
    <ContentArea tab={"/commons"} title={"공통 코드"}>
      <SelectWrapper>
        <Select onChange={(e) => setSelectedOption(e.target.value)}>
          <option value='카테고리'>카테고리</option>
          <option value='규칙'>규칙</option>
        </Select>
        <Btn onClick={() => handleClickModal({})}>추가</Btn>
      </SelectWrapper>

      {selectedOption === "카테고리" ? (
        <GraphTemplate columns={columns} paddings={paddings}>
          <CategoryPage handleClickModal={handleClickModal} />
        </GraphTemplate>
      ) : (
        <></>
      )}
      <UpdateCommonModal
        isClicked={updateModal}
        handleClickModal={handleClickModal}
        common={updateCommonInfo}
      />
    </ContentArea>
  );
}

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Select = styled.select`
  margin-top: 20px;
  margin-left: 19px;
  margin-bottom: 20px;
  width: 200px;
  padding: 5px;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2px;
  border: 1px solid #dfe0eb;
  border-radius: 5px;
  color: #333;
`;

const Btn = styled.button`
  width: 70px;
  height: 29px;
  background-color: #3751ff;
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
  margin: 20px;
`;
