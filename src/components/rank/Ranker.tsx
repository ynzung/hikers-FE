import * as Styled from "./Ranker.styled";
import otherRankDefault from "../../assets/images/otherRankDefault.svg";
import myRankDefault from "../../assets/images/myRankDefault.svg";
// import rankDown from "../../assets/images/rankDown.svg";   .. 백엔드 구현 X
// import rankUp from "../../assets/images/rankUp.svg";
// import rankSame from "../../assets/images/rankSame.svg";

interface RankerProps {
  $isMe?: boolean;
  rank: number | undefined;
  name: string | undefined;
  stamp: number | undefined;
  // status: "up" | "down" | "same";  .. 백엔드 구현 X
}

const Ranker = ({ $isMe = false, rank, name, stamp }: RankerProps) => {
  return (
    <Styled.RankerContainer $isMe={$isMe}>
      <Styled.RankerInfoContainer>
        <Styled.PlaceContainer>
          <Styled.Place $isMe={$isMe}>{rank}</Styled.Place>
        </Styled.PlaceContainer>
        <Styled.Img src={$isMe ? myRankDefault : otherRankDefault} />
        <Styled.NameStampContainer>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Stamp $isMe={$isMe}>{stamp}</Styled.Stamp>
        </Styled.NameStampContainer>
      </Styled.RankerInfoContainer>
      <Styled.StatusContainer>
        {/* <Styled.StatusImage src={status === "up" ? rankUp : status === "down" ? rankDown : rankSame} /> */}
      </Styled.StatusContainer>
    </Styled.RankerContainer>
  );
};

export default Ranker;
