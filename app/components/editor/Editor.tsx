import ReactQuill from "react-quill-new";
import styles from "./editor.module.scss";
import "react-quill-new/dist/quill.snow.css";
import { useMemo } from "react";

interface EditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void; // 타입 수정
  placeholder: string;
  height: number;
}

// if (typeof window !== "undefined" && window.Quill) {
//   window.Quill = Quill;
// }

// 에디터에서 사용할 기능을 제한
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "color",
];

const Editor = ({
  label,
  value,
  onChange,
  placeholder,
  height,
}: EditorProps) => {
  // 에디터에 표시할 기능
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "bullet" },
            { list: "ordered" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ color: [] }],
          ["link"],
          ["clean"],
        ],
      },
    };
  }, []);

  return (
    <div className={styles.editor}>
      <p>{label}</p>
      <ReactQuill
        theme="snow"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{ height }}
      />
    </div>
  );
};

export default Editor;
