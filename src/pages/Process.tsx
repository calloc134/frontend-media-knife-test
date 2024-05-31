import { useSearch } from "@tanstack/react-router";
import { css } from "../../styled-system/css";
import { Button } from "~/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import * as RadioGroup from "~/components/ui/radio-group";

export const ProgressPage = () => {
  const param = useSearch({ from: "/progress" });

  const navigate = useNavigate();

  const options = [
    { value: "ffmpeg", label: "形式変換" },
    { value: "demucs", label: "音源分離" },
    { value: "esrgan", label: "拡大" },
    { value: "segmenration", label: "被写体切り抜き" },
    { value: "whisper", label: "書き起こし" },
  ];

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
        <form>
          <RadioGroup.Root defaultValue={"ffmpeg"}>
            {options.map((option) => (
              <RadioGroup.Item key={option.value} value={option.value}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>

          <div className={css({ height: 8 })} />

          <Button size={"2xl"} type={"submit"}>
            加工を開始する
          </Button>
        </form>

        <Button size={"2xl"} onClick={() => navigate({ to: "/" })}>
          加工をやめる
        </Button>
      </div>
    </div>
  );
};
