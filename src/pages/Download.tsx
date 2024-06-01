import { Button } from "~/components/ui/button";
import { css } from "../../styled-system/css";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const DownloadPage = () => {
  const { filename, url } = useSearch({
    from: "/download",
  });
  const navigate = useNavigate();

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
      <p className={css({ fontSize: "xl" })}>加工が完了しました。</p>
      <p className={css({ fontSize: "xl" })}>ファイル名: {filename}</p>
      <div className={css({ height: 4 })} />

      <Button size={"2xl"} onClick={() => window.open(url, "_blank")}>
        ダウンロード
      </Button>

      <Button size={"2xl"} onClick={() => navigate({ to: "/" })}>
        ホームに戻る
      </Button>
    </div>
  );
};
