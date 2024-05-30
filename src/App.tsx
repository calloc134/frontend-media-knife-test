import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { css } from "../styled-system/css";

function App() {
  const handleUpload = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await fetch(`${window.location.origin}/upload`, {
        method: "POST",
        body: formData,
      });

      alert("File uploaded");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUpload,
  });

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        gap: 4,
      })}
    >
      <h1 className={css({ fontSize: "2xl" })}>Media Knife</h1>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // class="icon icon-tabler icon-tabler-upload"
          className={css({
            width: 24,
            height: 24,
          })}
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
          <path d="M7 9l5 -5l5 5" />
          <path d="M12 4l0 12" />
        </svg>
      </div>
    </div>
  );
}

export default App;
