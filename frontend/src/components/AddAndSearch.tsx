import Search from "./Search";
import styled from "styled-components";
import Add from "./Add";
import { ReactNode } from "react";

const AddAndSearchStyled = styled.div`
  display: inline-flex;
  align-items: center;
  // justify-content: space-between;
  gap: 10px;
`;

interface AddAndSearchProps {
  children: ReactNode;
  title: string;
  setKeyword: (keyword: string) => void;
  keyword: string;
}

export default function AddAndSearch({ children, title, setKeyword, keyword }: AddAndSearchProps) {
  return (
    <AddAndSearchStyled>
      <Add title={title}>{children}</Add>
      <Search setKeyword={setKeyword} keyword={keyword} />
    </AddAndSearchStyled>
  );
}
