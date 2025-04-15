import PwInput from "@/components/pwInput/PwInput";
import TextInput from "@/components/textInput/TextInput";

export default function Home() {
  return (
    <div className="main-container">
      <h1>비회원 메인 페이지입니다.</h1>
      <TextInput
        id="test"
        placeholder="테스트 인풋입니다."
        label="텍스트 인풋 테스트"
      />
      <PwInput />
    </div>
  );
}
