import TextInput from "@/components/textInput/TextInput";

export default function Home() {
  return (
    <div className="main-container">
      <h1>메인 페이지입니다.</h1>
      <TextInput
        label="이건 테스트 인풋란입니다."
        id="test"
        placeholder="테스트 인풋란입니다."
      />
    </div>
  );
}
