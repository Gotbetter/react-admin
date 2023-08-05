import { styled } from "styled-components";

export default function GraphTemplate({ columns, paddings, children }) {
  return (
    <div>
      <ColumnNameWrapper grid={100 / columns.length}>
        {columns.map((column) => (
          <ColumnName key={column.id} padding={paddings[column.id]}>
            {column.title}
          </ColumnName>
        ))}
      </ColumnNameWrapper>
      <ListWrapper>{children}</ListWrapper>
    </div>
  );
}

const ColumnNameWrapper = styled.div`
  padding: 12px 43px 12px 31px; // top right bottom left: ;
  display: grid;
  grid-template-columns: ${(props) =>
    props.grid
      ? `repeat(auto-fit, minmax(${props.grid}%, 1fr));`
      : "repeat(auto-fit, minmax(25%, 1fr));"}; /* 자동으로 요소들 배치 */
  border-bottom: 1px solid #dfe0eb;
  flex-shrink: 0;
`;

const ColumnName = styled.div`
  margin-left: ${(props) => (props.padding ? `${props.padding}px` : "0px")};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.2px;
  color: #9fa2b4;
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  margin-top: 0px;
  overflow-y: scroll;
  height: inherit;

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
