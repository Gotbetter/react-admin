import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function RoomInfoWrapper({
  isNum,
  name,
  propKey,
  value,
  setValue,
  categoryList,
  ruleList,
  userList,
}) {
  const handleOptionChange = (e) => {
    setValue((prevRoomInfo) => ({
      ...prevRoomInfo,
      [propKey]: e.target.value,
    }));
  };

  return (
    <Wrapper>
      <ColumnName>{name}</ColumnName>
      {name === "카테고리" && (
        <Select value={value} onChange={handleOptionChange}>
          {categoryList.map((category) => (
            <option key={category.order} value={category.room_category_code}>
              {category.room_category_description}
            </option>
          ))}
        </Select>
      )}
      {name === "규칙" && (
        <Select value={value} onChange={handleOptionChange}>
          {ruleList.map((rule) => (
            <option key={rule.order} value={rule.rule_code}>
              {rule.rule_description}
            </option>
          ))}
        </Select>
      )}
      {name === "방장" && (
        <Select defaultValue={value} onChange={handleOptionChange}>
          {userList.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.username}
            </option>
          ))}
        </Select>
      )}
      {name === "최대 인원" && (
        <Select defaultValue={value} onChange={handleOptionChange}>
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </Select>
      )}
      {name !== "카테고리" &&
        name !== "규칙" &&
        name !== "방장" &&
        name !== "최대 인원" && (
          <TextInput
            type={isNum ? "number" : "text"}
            defaultValue={value}
            onChange={handleOptionChange}
            readOnly={!propKey}
          />
        )}
    </Wrapper>
  );
}

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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
  margin-top: 8px;
  margin-left: 5px;
`;

const ColumnName = styled.div`
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.2px;
  color: #252733;
`;

const TextInput = styled.input`
  width: 250px;
  height: 30px;
  padding: 10px;
  fill: #fff;
  border-radius: 8px;
  color: #535151;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);

  /* 읽기 전용일 때 스타일 변경 */
  ${(props) =>
    props.readOnly &&
    `
      background-color: #ccc; /* 읽기 전용 배경색 */
      border-color: #ccc; /* 읽기 전용 테두리 색 */
      cursor: not-allowed;
    `}
`;
