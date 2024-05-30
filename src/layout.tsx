import { css } from "../styled-system/css";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    className={css({
      // 最も外枠
      display: "flex",
      flexDirection: "column",
    })}
  >
    <header
      className={css({
        // ヘッダー
        padding: 2,
        paddingX: 8,
        bg: "gray.100",
        gradientFrom: "gray.200",
        borderBottomWidth: 2,
        borderRadius: "lg",
      })}
    >
      <h1 className={css({ fontSize: "2xl" })}>Media Knife</h1>
    </header>

    <main
      className={css({
        // メインコンテンツ

        padding: 2,
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: 4,
          borderRadius: "lg",
          borderWidth: 2,
          padding: 4,
        })}
      >
        {children}
      </div>
    </main>
  </div>
);
