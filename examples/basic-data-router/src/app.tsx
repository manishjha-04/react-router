import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

import "./index.css";

let router = createBrowserRouter(
  [
    {
      path: "/",
      loader: () => ({ message: "Hello Data Router!" }),
      Component() {
        let data = useLoaderData() as { message: string };
        return <h1>{data.message}</h1>;
      },
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true
    },
  }
);

export default function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>Loading...</p>}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
