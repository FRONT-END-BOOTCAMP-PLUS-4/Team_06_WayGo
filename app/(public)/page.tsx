import SelectBasic from "@/components/selectBasic/selectBasic";

export default function Home() {
  const durationOptionList = [
    { value: 1, title: "당일치기" },
    { value: 2, title: "1박2일" },
    { value: 3, title: "2박3일" },
    { value: 4, title: "3박4일~" },
  ];

  const seasonOptionList = [
    { value: 1, title: "봄 🌸" },
    { value: 2, title: "여름 🤿" },
    { value: 3, title: "가을 🍁" },
    { value: 4, title: "겨울 ❄️" },
  ];

  const locationOptionList = [
    { value: 1, title: "수도권" },
    { value: 2, title: "강원권" },
    { value: 3, title: "충청권" },
    { value: 4, title: "호남권" },
    { value: 5, title: "경상권" },
    { value: 6, title: "제주권" },
  ];

  const budgetOptionList = [
    { value: 1, title: "~10만원" },
    { value: 2, title: "10~20만원" },
    { value: 3, title: "20~40만원" },
    { value: 4, title: "40만원~" },
  ];

  return (
    <div className="main-container">
      <h1>비회원 메인 페이지입니다.</h1>
    </div>
  );
}
