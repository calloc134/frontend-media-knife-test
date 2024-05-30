import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { Layout } from "./layout";
import { IndexPage } from "./pages/Index";
import { ProgressPage } from "./pages/Process";

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

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, ProgressRoute]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
