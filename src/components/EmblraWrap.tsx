import styled from "styled-components";
import { EmblaCarousel } from "./Embla";
import { useCallback, useState } from "react";
import { data1 } from "../data/data1";
import { data2 } from "../data/data2";
import { data3 } from "../data/data3";
import type { Data } from "../type/data";
const Buttons = styled.div`
  margin-top: 16px;
  text-align: center;
  > div {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    column-gap: 16px;
  }
`;

export const EmblaWrap: React.FC = () => {
  const [selectedData, setSelectedData] = useState([
    ...data1,
    ...data2,
    ...data3,
  ]);

  const handleDataChange = useCallback((data: Data[]) => {
    setSelectedData(data);
    console.log(data);
  }, []);
  return (
    <>
      <EmblaCarousel data={selectedData} />
      <Buttons>
        <button
          onClick={() => {
            handleDataChange([...data1, ...data2, ...data3]);
          }}
        >
          ぜんぶ
        </button>
        <div>
          <button
            onClick={() => {
              handleDataChange(data1);
            }}
          >
            １
          </button>
          <button
            onClick={() => {
              handleDataChange(data2);
            }}
          >
            ２
          </button>
          <button
            onClick={() => {
              handleDataChange(data3);
            }}
          >
            ３
          </button>
        </div>
      </Buttons>
    </>
  );
};
