import { Button } from "~/components/ui/button";
import { css } from "../../styled-system/css";
import { useSearch } from "@tanstack/react-router";

export const DownloadPage = () => {
  const param = useSearch({ from: "/download" });

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
      <p className={css({ fontSize: "xl" })}>
        ファイルのダウンロードを行います。
      </p>
      <p className={css({ fontSize: "xl" })}>ファイル名: {param.filename}</p>
      <div className={css({ height: 4 })} />

      <Button
        size={"2xl"}
        // onClick={() => window.open(`/download/${param.filename}`)}
      >
        ダウンロード
      </Button>
    </div>
  );
};
