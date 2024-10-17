import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter, matchRoutes } from "react-router-dom";

import { routes } from "./App";

hydrate();

async function hydrate() {
  // Determine if any of the initial routes are lazy
  let lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m) => m.route.lazy
  );

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        let routeModule = await m.route.lazy!();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      })
    );
  }

  let router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
    },
  });

  ReactDOM.hydrateRoot(
    document.getElementById("app")!,
    <React.StrictMode>
      <RouterProvider
        router={router}
        fallbackElement={null}
        future={{
          v7_startTransition: true,
        }}
      />
    </React.StrictMode>
  );
}
