import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { Layout } from "./layout";
import { IndexPage } from "./pages/Index";
import { ProgressPage } from "./pages/Process";
import { DownloadPage } from "./pages/Download";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <IndexPage />,
});

const ProgressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: () => <ProgressPage />,

  validateSearch: (
    search: Record<string, string>
  ): {
    filename: string;
  } => {
    if (!search.filename) {
      return {
        filename: "",
      };
    }

    return {
      filename: search.filename,
    };
  },
});

const DownloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/download",
  component: () => <DownloadPage />,

  validateSearch: (
    search: Record<string, string>
  ): {
    filename: string;
    url: string;
  } => {
    return {
      filename: search.filename,
      url: search.url,
    };
  },
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, ProgressRoute, DownloadRoute]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
