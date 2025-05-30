import * as Styled from "./CommunityReview.styled";
import ReviewList from "../common/list/ReviewList";
import { GreenBtn } from "../common/button/GreenBtn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reviewApi, ReviewListAPI } from "../../apis/community/ReviewApi";

export default function CommunityReview() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("최신순");
  const [reviewData, setReviewData] = useState<ReviewListAPI[]>([]);

  const fetchReviewList = async (filter: string) => {
    try {
      const review = await reviewApi.getReviewList(filter);
      setReviewData(review);
    } catch (error) {
      console.error("리뷰 글 목록 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchReviewList(filter);
  }, [filter]);

  const handleLikeToggle = async (itemId: number) => {
    setReviewData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, liked_by_current_user: !item.liked_by_current_user } : item
      )
    );
    const currentItem = reviewData.find((item) => item.id === itemId);

    if (!currentItem) return;

    try {
      if (currentItem.liked_by_current_user) {
        await reviewApi.deleteReviewHeart(itemId);
      } else {
        await reviewApi.postReviewHeart(itemId);
      }
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };

  const handleReviewClick = () => {
    navigate("/community/review/write");
  };

  return (
    <Styled.Wrapper>
      <ReviewList
        title="리뷰"
        review_data={reviewData}
        onLikeToggle={handleLikeToggle}
        filter={filter}
        onTypeChange={setFilter}
      />
      <Styled.ButtonWrapper>
        <GreenBtn onClick={handleReviewClick}>리뷰 작성하기</GreenBtn>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
}
