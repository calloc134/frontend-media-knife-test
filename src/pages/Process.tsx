import { useSearch } from "@tanstack/react-router";
import { css } from "../../styled-system/css";

export const ProgressPage = () => {
  const param = useSearch({ from: "/progress" });

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      })}
    >
      <h1 className={css({ fontSize: "4xl" })}>Media Knife</h1>
      <p className={css({ fontSize: "xl" })}>ファイルの加工を行います。</p>
      <p className={css({ fontSize: "xl" })}>ファイル名: {param.filename}</p>

      <button
        className={css({
          fontSize: "2xl",
          bg: "indigo.800",
          borderRadius: "lg",
          padding: 8,
          borderWidth: 2,
          color: "white",
        })}
      >
        加工を開始
      </button>
    </div>
  );
};
