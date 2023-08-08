import React from "react";
import { useEffect, useState } from "react";
import { BLUE, GREY, YELLOW } from "../../../colors";
import { styled } from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommon, updateCommon } from "../../../api/common";
import LoadingImg from "../../../assets/loading.png";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { loginState } from "../../../recoil/login/loginState";

export default function UpdateCommonModal({
  isClicked,
  handleClickModal,
  isNew,
  isRule,
  common,
}) {
  const commonInfo = {
    group_code: isRule ? "RULE" : "ROOM_CATEGORY",
    code: isRule ? common.rule_code : common.room_category_code,
    description: isRule
      ? common.rule_description
      : common.room_category_description,
    updated_date: common.updated_date,
    updated_by: common.updated_by,
    attribute1: isRule ? common.rule_attribute1 : common.room_category_image,
    attribute2: isRule ? common.rule_attribute2 : null,
  };
  const [code, setCode] = useState("");
  const [codeDescription, setCodeDescription] = useState("");
  const [attribute1, setAttribute1] = useState("");
  const [attribute2, setAttribute2] = useState("");
  const queryClient = useQueryClient();
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const { mutate: updateCommonInfo } = useMutation(
    ({ group_code, code, code_description, attribute1, attribute2 }) =>
      updateCommon({
        group_code: group_code,
        code: code,
        code_description: code_description,
        attribute1: attribute1,
        attribute2: attribute2,
      }),
    {
      retry: 1,
      onSuccess: async () => {
        console.log(
          isRule
            ? "[RulePage]: update rule info"
            : "[CategoryPage]: update category info"
        );
        queryClient.invalidateQueries(isRule ? "rules" : "categories");
        handleClickModal({});
      },
      onError: (err) => {
        const errorType = err.response.data.errors[0].errorType;
        const { status } = err.response;

        if (status === 403 && errorType === "FORBIDDEN_ADMIN") {
          alert("권한이 없습니다.");
          setIsLogin(false);
          navigate("/notfound");
        }
        if (status === 400) {
          alert("모든 정보를 입력해 주세요.");
        }
        if (status === 404) {
          alert("존재하지 않는 회원입니다.");
        }
      },
    }
  );

  const { mutate: createCommonInfo } = useMutation(
    ({ group_code, code, code_description, attribute1, attribute2 }) =>
      createCommon({
        group_code: group_code,
        code: code,
        code_description: code_description,
        attribute1: attribute1,
        attribute2: attribute2,
      }),
    {
      retry: 1,
      onSuccess: async () => {
        console.log(
          isRule
            ? "[RulePage]: create rule info"
            : "[CategoryPage]: create category info"
        );
        queryClient.invalidateQueries(isRule ? "rules" : "categories");
        handleClickModal({});
      },
      onError: (err) => {
        const errorType = err.response.data.errors[0].errorType;
        const { status } = err.response;

        if (status === 403 && errorType === "FORBIDDEN_ADMIN") {
          alert("권한이 없습니다.");
          setIsLogin(false);
          navigate("/notfound");
        }
        if (status === 400) {
          alert("모든 정보를 입력해 주세요.");
        }
        if (status === 404) {
          alert("존재하지 않는 회원입니다.");
        }
      },
    }
  );

  useEffect(() => {
    if (!isClicked) {
      setCode("");
      setCodeDescription("");
      setAttribute1("");
      setAttribute2("");
    } else {
      if (!isNew) {
        setCode(commonInfo.code);
        setCodeDescription(commonInfo.description);
        setAttribute1(commonInfo.attribute1);
        setAttribute2(commonInfo.attribute2);
      }
    }
  }, [
    isClicked,
    isNew,
    commonInfo.code,
    commonInfo.description,
    commonInfo.attribute1,
    commonInfo.attribute2,
  ]);

  return (
    <div>
      {isClicked && (
        <ModalOutside>
          <WhiteBox>
            {!isRule && (
              <>
                <ProfileWrapper>
                  <ProfileImage>
                    <img
                      src={
                        isNew
                          ? LoadingImg
                          : "data:image/png;base64," + commonInfo.attribute1
                      }
                      alt=''
                    />
                  </ProfileImage>
                </ProfileWrapper>
                <BtnProfile color={GREY}>사진 수정</BtnProfile>
              </>
            )}
            <CommonInfoWrapper>
              코드
              <TextInput
                type='text'
                placeholder={commonInfo.code}
                readOnly={!isNew}
                onChange={(e) => isNew && setCode(e.target.value)}
              />
            </CommonInfoWrapper>
            <CommonInfoWrapper>
              코드 상세
              <TextInput
                type='text'
                defaultValue={commonInfo.description}
                onChange={(e) => setCodeDescription(e.target.value)}
              />
            </CommonInfoWrapper>
            {isRule && (
              <>
                <CommonInfoWrapper>
                  규칙 개요
                  <TextInput
                    type='text'
                    defaultValue={commonInfo.attribute1}
                    onChange={(e) => setAttribute1(e.target.value)}
                    height={80}
                  />
                </CommonInfoWrapper>
                <CommonInfoWrapper>
                  규칙 상세
                  <TextInput
                    type='text'
                    defaultValue={commonInfo.attribute2}
                    onChange={(e) => setAttribute2(e.target.value)}
                    height={200}
                  />
                </CommonInfoWrapper>
              </>
            )}
            <CommonInfoWrapper>
              수정 날짜
              <TextInput
                type='text'
                placeholder={commonInfo.updated_date}
                readOnly={true}
              />
            </CommonInfoWrapper>
            <CommonInfoWrapper>
              권한
              <TextInput
                type='text'
                placeholder={commonInfo.updated_by}
                readOnly={true}
              />
            </CommonInfoWrapper>
            <ButtonWrapper>
              <Btn color={GREY} onClick={() => handleClickModal({})}>
                취소
              </Btn>
              <Btn
                color={isNew ? BLUE : YELLOW}
                onClick={() =>
                  isNew
                    ? createCommonInfo({
                        group_code: commonInfo.group_code,
                        code: code,
                        code_description: codeDescription,
                        attribute1: isRule ? attribute1 : "image",
                        attribute2: isRule ? attribute2 : null,
                      })
                    : updateCommonInfo({
                        group_code: commonInfo.group_code,
                        code: code,
                        code_description: codeDescription,
                        attribute1: isRule ? attribute1 : "image",
                        attribute2: isRule ? attribute2 : null,
                      })
                }
              >
                {isNew ? "추가" : "수정"}
              </Btn>
            </ButtonWrapper>
          </WhiteBox>
        </ModalOutside>
      )}
    </div>
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
  width: 380px;
  height: 582px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;

const ProfileImage = styled.div`
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommonInfoWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`;

const BtnProfile = styled.button`
  width: 80px;
  height: 24px;
  background-color: ${(props) => (props.color ? `${props.color}` : "black")};
  color: white;
  text-align: center;
  font-size: 11px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  letter-spacing: 0.2px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px;
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

const TextInput = styled.textarea`
  width: 230px;
  height: ${(props) => (props.height ? `${props.height}px` : "39px")};
  padding: 10px;
  fill: #fff;
  margin: 10px 0;
  border-radius: 8px;
  color: #535151;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  margin: 5px;

  /* 읽기 전용일 때 스타일 변경 */
  ${(props) =>
    props.readOnly &&
    `
      background-color: #ccc; /* 읽기 전용 배경색 */
      border-color: #ccc; /* 읽기 전용 테두리 색 */
      cursor: not-allowed;
    `}

  /* 텍스트 왼쪽 위 정렬 */
  text-align: left;
  vertical-align: top;
  /* line-height: 1.2; //텍스트의 높이에 맞춰서 높이를 설정 */
  resize: none; /* 크기 조절 불가능하도록 설정 */
  overflow: auto; /* 내용이 넘칠 경우 스크롤바가 나오지 않도록 설정 */

  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 5px;
  }
`;
