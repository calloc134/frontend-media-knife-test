import { useSearch } from "@tanstack/react-router";
import { css } from "../../styled-system/css";
import { Button } from "~/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export const ProgressPage = () => {
  const param = useSearch({ from: "/progress" });

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
      <p className={css({ fontSize: "xl" })}>ファイルの加工を行います。</p>
      <p className={css({ fontSize: "xl" })}>ファイル名: {param.filename}</p>
      <div className={css({ height: 4 })} />
      <div
        className={css({ display: "flex", gap: 2, flexDirection: "column" })}
      >
        <Button size={"2xl"}>加工を開始</Button>

        <Button size={"2xl"} onClick={() => navigate({ to: "/" })}>
          加工をやめる
        </Button>
      </div>
    </div>
  );
};
