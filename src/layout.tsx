import { css } from "../styled-system/css";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    className={css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "1rem",
      bg: "gray-100",
    })}
  >
    <h1>Layout</h1>
    {children}
  </div>
);
