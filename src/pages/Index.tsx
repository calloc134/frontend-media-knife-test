import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { css } from "../../styled-system/css";
import { useNavigate } from "@tanstack/react-router";
import * as Collapsible from "~/components/ui/collapsible";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";

export const IndexPage = () => {
  const navigate = useNavigate();
  const handleUpload = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await fetch(`${window.location.origin}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!result.ok) {
          toast.error("アップロードに失敗しました");
          return;
        }

        const { filename } = await result.json();

        navigate({
          to: "/progress",
          search: {
            filename,
          },
        });
      }
    },
    [navigate]
  );

  const handleYtDlp = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const url = (event.target as HTMLFormElement).url.value as string;

      const urlPattern = new RegExp(
        /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^\s/$.?#].[^\s]*$/
      );

      if (!urlPattern.test(url)) {
        // TODO: アラートをコンポーネント化する
        toast.error("URLが不正です");
        return;
      }

      const result = await fetch(`${window.location.origin}/yt-dlp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });

      if (!result.ok) {
        toast.error("ダウンロードに失敗しました");
        return;
      }

      const { filename } = await result.json();

      navigate({
        to: "/progress",
        search: {
          filename,
        },
      });
    },
    [navigate]
  );

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop: handleUpload,
  });

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
        加工したいメディアファイルをアップロードしてください。
      </p>
      <div></div>

      <div
        {...getRootProps()}
        className={css({
          borderWidth: 2,
          borderRadius: "lg",
          width: 48,
          height: 48,
          padding: isDragAccept ? 8 : 12,
        })}
      >
        <input {...getInputProps()} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // class="icon icon-tabler icon-tabler-upload"
          className={css({
            stroke: "#2c3e50",
          })}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
          <path d="M7 9l5 -5l5 5" />
          <path d="M12 4l0 12" />
        </svg>
      </div>
      <Collapsible.Root>
        <Collapsible.Trigger asChild>
          <Button size={"2xl"}>YouTubeからダウンロード</Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <form
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: 2,
            })}
            onSubmit={handleYtDlp}
          >
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: 2,
              })}
            >
              <label className={css({ fontSize: "xl" })}>
                <span>YouTubeのURL</span>
              </label>
              <Input type="text" name="url" />
            </div>
            <Button type="submit" size={"2xl"}>
              ダウンロード
            </Button>
          </form>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
};
