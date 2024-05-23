---
title: Pending UI
order: 7
---

# Pending UI

When the user navigates to a new route, or submits data to an action, the UI should immediately respond to the user's actions with a pending or optimistic state.

## Global Pending Navigation

When the user navigates to a new url, the loaders for the next page are awaited before the next page renders. You can get the pending state from `useNavigation`.

```tsx
import { useNavigation } from "react-router";

export default function Root() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <html>
      <body>
        {isNavigating && <GlobalSpinner />}
        <Outlet />
      </body>
    </html>
  );
}
```

## Local Pending Navigation

Pending indicators can also be localized to the link. NavLink's children, className, and style props can be functions that receive the pending state.

```tsx
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav>
      <NavLink to="/home">
        {({ isPending }) => (
          <span>Home {isPending && <Spinner />}</span>
        )}
      </NavLink>
      <NavLink
        to="/about"
        style={({ isPending }) => ({
          color: isPending ? "gray" : "black",
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

## Pending Form Submission

When a form is submitted, the UI should immediately respond to the user's actions with a pending state. This is easiest to do with a [fetcher][use_fetcher] form because it's pending state is independent.

```tsx filename=app/project.tsx
import { useFetcher } from "react-router";

function NewProjectForm() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <input type="text" name="title" />
      <button type="submit">
        {fetcher.state !== "idle"
          ? "Submitting..."
          : "Submit"}
      </button>
    </fetcher.Form>
  );
}
```

For non-fetcher form submissions, pending states are available on `useNavigation`.

```tsx filename=app/projects/new.tsx
import { useNavigation, Form } from "react-router";

function NewProjectForm() {
  const navigation = useNavigation();

  return (
    <Form method="post" action="/projects/new">
      <input type="text" name="title" />
      <button type="submit">
        {navigation.formAction === "/projects/new"
          ? "Submitting..."
          : "Submit"}
      </button>
    </Form>
  );
}
```

## Optimistic UI

When the future state of the UI is known by the form submission data, an optimistic UI can be implemented for instant UI.

```tsx filename=app/project.tsx lines=[6]
function Task({ task }) {
  const fetcher = useFetcher();

  let isComplete = task.status === "complete";
  if (fetcher.formData) {
    isComplete = fetcher.formData.get("status");
  }

  return (
    <div>
      <div>{task.title}</div>
      <fetcher.Form method="post">
        <button
          name="status"
          value={isComplete ? "incomplete" : "complete"}
        >
          {isComplete ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </fetcher.Form>
    </div>
  );
}
```

[use_fetcher]: ../hooks/use-fetcher