const participant_paddings = [0, 0, 0, 30, 30, 50, 0];
const participant_columns = [
  {
    id: 0,
    title: "참여자",
  },
  {
    id: 1,
    title: "방장",
  },
  {
    id: 2,
    title: "수행 정도",
  },
  {
    id: 3,
    title: "환급금",
  },
  {
    id: 4,
    title: "수정 날짜",
  },
  {
    id: 5,
    title: "멤버 수정",
  },
  {
    id: 6,
    title: "멤버 강퇴",
  },
];

const join_request_paddings = [0, 30, 300, 50];
const join_request_columns = [
  {
    id: 0,
    title: "참여 요청자",
  },
  {
    id: 1,
    title: "요청 날짜",
  },
  {
    id: 2,
    title: "참여 승인",
  },
  {
    id: 3,
    title: "참여 거절",
  },
];

export {
  participant_paddings,
  participant_columns,
  join_request_paddings,
  join_request_columns,
};
