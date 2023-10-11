import styled from "styled-components";
import type { Data } from "../type/data";

const Img = styled.img`
  width: 100%;
`;

type Props = Omit<Data, "id">;

export const SlideContent: React.FC<Props> = ({ title, img, link }) => (
  <a href={link}>
    <div>
      {title}
      {img}
    </div>
    <Img src={img} alt={title} />
  </a>
);
