import { useState } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { css } from "../../styled-system/css";
import { Button } from "~/components/ui/button";
import * as Dialog from "~/components/ui/dialog";
import * as RadioGroup from "~/components/ui/radio-group";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { RadioGroup as RadioGroupArk } from "@ark-ui/react/radio-group";

export const ProgressPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const param = useSearch({ from: "/progress" });

  const navigate = useNavigate();

  const options = [
    { value: "ffmpeg_mp3", label: "mp3に変換" },
    { value: "ffmpeg_wav", label: "wavに変換" },
    { value: "demucs", label: "音源分離" },
    { value: "esrgan", label: "拡大" },
    { value: "segmenration", label: "被写体切り抜き" },
    { value: "whisper", label: "書き起こし" },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const process = (event.target as HTMLFormElement).process.value as string;

    // TODO: 途中で終了してもダイアログを閉じる
    setIsOpen(true);

    const result = await fetch(`${window.location.origin}/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: param.filename,
        process,
      }),
    });

    setIsOpen(false);

    if (!result.ok) {
      toast.error("加工に失敗しました");
      return;
    }

    navigate({ to: "/download", search: { filename: param.filename } });
  };

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
        <form onSubmit={handleSubmit}>
          <RadioGroup.Root defaultValue="ffmpeg_mp3" name="process">
            {options.map((option) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                // disabled={false}
              >
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
                <RadioGroupArk.ItemHiddenInput />
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
      <Dialog.Root open={isOpen}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                padding: 16,
              })}
            >
              <p className={css({ fontSize: "xl" })}>加工を行っています。</p>
              <p className={css({ fontSize: "xl" })}>
                このままお待ちください。
              </p>
              <div className={css({ height: 16 })} />
              <PropagateLoader color="#2c3e50" />
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  );
};
