import { useEffect, useState } from "react";
import { BLUE, GREY, YELLOW } from "../../../colors";
import { styled } from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommon } from "../../../api/common";
import LoadingImg from "../../../assets/loading.png";

export default function UpdateCommonModal({
  isClicked,
  handleClickModal,
  common,
}) {
  const [codeDescription, setCodeDescription] = useState("");
  const queryClient = useQueryClient();

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
      onSuccess: async (res) => {
        console.log("[CommonPage]: update common info");
        queryClient.invalidateQueries("commons");
        handleClickModal({});
      },
      onError: (err) => {
        const { status } = err.response;
        if (status === 400) {
          alert("모든 정보를 입력해 주세요.");
        }
        if (status === 403) {
          alert("관리자가 아닙니다.");
        }
        if (status === 404) {
          alert("존재하지 않는 회원입니다.");
        }
      },
    }
  );

  useEffect(() => {
    if (!isClicked) {
      setCodeDescription("");
    }
  });

  return (
    <div>
      {isClicked && (
        <ModalOutside>
          <WhiteBox>
            <ProfileWrapper>
              <ProfileImage>
                <img
                  src={
                    Object.keys(common).length === 0
                      ? LoadingImg
                      : "data:image/png;base64," + common.room_category_image
                  }
                  alt=''
                />
              </ProfileImage>
            </ProfileWrapper>
            <BtnProfile color={GREY}>사진 수정</BtnProfile>
            <CommonInfoWrapper>
              코드
              <TextInput
                type='text'
                placeholder={common.room_category_code}
                readOnly={Object.keys(common).length !== 0 && "true"}
              />
            </CommonInfoWrapper>
            <CommonInfoWrapper>
              코드 상세
              <TextInput
                type='text'
                placeholder={common.room_category_description}
                onChange={(e) => setCodeDescription(e.target.value)}
              />
            </CommonInfoWrapper>
            <CommonInfoWrapper>
              수정 날짜
              <TextInput
                type='text'
                placeholder={common.updated_date}
                readOnly='true'
              />
            </CommonInfoWrapper>
            <CommonInfoWrapper>
              권한
              <TextInput
                type='text'
                placeholder={common.updated_by}
                readOnly='true'
              />
            </CommonInfoWrapper>
            <ButtonWrapper>
              <Btn color={GREY} onClick={() => handleClickModal({})}>
                취소
              </Btn>
              <Btn
                color={Object.keys(common).length === 0 ? BLUE : YELLOW}
                onClick={() =>
                  codeDescription !== ""
                    ? updateCommonInfo({
                        group_code: "ROOM_CATEGORY",
                        code: common.room_category_code,
                        code_description: codeDescription,
                        attribute1: "image",
                        attribute2: null,
                      })
                    : handleClickModal({})
                }
              >
                {Object.keys(common).length === 0 ? "추가" : "수정"}
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
  margin-top: 30px;
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

const TextInput = styled.input`
  width: 220px;
  height: 30px;
  padding: 10px;
  fill: #fff;
  margin: 10px 0;
  border-radius: 8px;
  color: #bdbdbd;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  font-variant-numeric: lining-nums proportional-nums;
  margin: 5px;

  /* 읽기 전용일 때 스타일 변경 */
  ${(props) =>
    props.readOnly &&
    `
      background-color: #ccc; /* 읽기 전용 배경색 */
      border-color: #ccc; /* 읽기 전용 테두리 색 */
      cursor: not-allowed;
    `}
`;
