# ARCHITECTURE

## Introduction



## Table of Contents

- [Design Ideas](#design-ideas)


## Feature First Based Architecture

Feature-First architecture (also known as modular or domain-driven design)


### Index.ts Pattern

The `index.ts` file acts as a **barrel file** that serves as the explicit **public API** for that specific feature module.

This pattern enforces encapsulation. It ensures that other parts of your application can only access what is explicitly exposed, preventing brittle, deep imports into a feature's internal folder structure.

Instead of grouping files globally by technical type (e.g., a massive global components/ or hooks/ folder), you group everything required to run a specific business capability together:

![feature-first-index-pattern.png](https://github.com/the-hive-resistance/ykrea26h1-inlamningsuppgift-patrikiden-dev/blob/main/docs/screenshoots/feature-first-index-pattern.png)

Example:

A component outside the auth feature must never bypass the public API:  
❌ import { LoginForm } from '@/features/auth/components/LoginForm';

It must strictly consume from the feature root:  
✅ import { LoginForm } from '@/features/auth';





###  Goals

### The Index.ts Patter

### Visual - Feature First Three Structure

## Feature Folder Structure

- Add a folder only when a file type has more than one file.

![feature-folder-or-files](./screenshoots/feature-folder-or-files.png)

- When utils.ts grows into 3 or more unrelated pieces, turn it into utils/ with files named by purpose (format-runtime.ts, get-poster-url.ts). 

- Don't name them movie.ts, because the feature folder already says "movie".








## React Router 8

React Router 8 with Declarative mode which is the simplest setup which uses <BrowserRouter>.

IMPORTANT! The package is react-router in version 8. (react-router-dom was removed in v8).

| File    | Description |
| ----------- | ----------- |
| src/main.tsx      | Wraps providers, routes with app       |
| src/app/providers.tsx   | Render <BrowserRouter> with providers       |
| src/app/router.tsx    | Defining routes       |
| src/components/layout/root-layout.tsx  | Root Layout        |
| src/feature/movies/queryies.ts      | Tanstack Query keys for Movies       |
                            


### ROUTER SETUP

You render a <BrowserRouter> around your app with Providers. With your app/ folder, I'd put it in providers.tsx

src/app/providers.tsx
```typescript jsx
// src/app/providers.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { queryClient } from "./query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
```

```typescript jsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./app/providers";
import { AppRouter } from "./app/router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <AppRouter />
    </Providers>
  </StrictMode>,
);
```

### Defining routes

In declarative mode, router.tsx is a normal component that returns <Routes>. It is not a createBrowserRouter() call, which belongs to data mode. A layout route with <Outlet /> is the key pattern:

```typescript jsx
// src/app/router.tsx
import { Route, Routes } from "react-router";
import { RootLayout } from "@/components/layout/root-layout";
import IndexPage from "@/routes";
import MovieDetailsPage from "@/routes/movie-details";
import PersonPage from "@/routes/person";
import SearchPage from "@/routes/search";
import FavoritesPage from "@/routes/favorites";
import PrivacyPage from "@/routes/privacy";
import NotFoundPage from "@/routes/not-found";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="movie/:movieId" element={<MovieDetailsPage />} />
        <Route path="person/:personId" element={<PersonPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
```

```typescript jsx      
// src/components/layout/root-layout.tsx
import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function RootLayout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}
```

The layout route has no path, so it only wraps its children. The child pages render where <Outlet /> sits.

### Reading the URL

```typescript jsx      
// src/routes/movie-details.tsx
import { useParams } from "react-router";
import { MovieDetails, useMovie } from "@/features/movies";

export default function MovieDetailsPage() {
    const { movieId } = useParams<{ movieId: string }>();
    const id = Number(movieId);
    const { data, isPending, isError } = useMovie(id);
    // ...
}
```

```typescript jsx      
// src/routes/search.tsx — search state lives in the URL
import { useSearchParams } from "react-router";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const page = Number(params.get("page") ?? 1);

  function onSearch(value: string) {
    setParams({ q: value, page: "1" });
  }
  // pass query/page into useSearchMovies(query, page)
}
```

```typescript jsx      
// Navbar links
import { Link, NavLink, useNavigate } from "react-router";

<Link to={`/movie/${movie.id}`}>{movie.title}</Link>

<NavLink to="/" end className={({ isActive }) => isActive ? "font-bold" : ""}>
  Home
</NavLink>

const navigate = useNavigate();
navigate(`/search?q=${encodeURIComponent(term)}`);
```



```typescript jsx      

```

https://reactrouter.com/start/declarative/installation


## TANSTACK QUERY


https://tanstack.com/query/v4/docs/reference/QueryCache
https://tanstack.com/query/latest/docs/framework/react/reference/classes/MutationCache
https://tanstack.com/query/v4/docs/reference/QueryClient


## API

Axios



### Styling

Strive to have index.css thin and styling close to components with Tailwind.


## Coding Standard and File Naming Convention

- All files and folders should use `kebab-case` (my-file-name.txt). I am used to Next.js and I like to be consistent.
- All route pages function name should always end with *Page*. Example: privacy.tsx have a function name: PrivacyPage()
  Naming Convention

https://dev.to/kristiyanvelkov/react-js-naming-convention-lcg

Components
Use descriptive and meaningful names for React components. Use PascalCase (capitalizing the first letter of each word) for component names.

Files
Name your files using PascalCase, matching the component name. For example, if you have a component named UserCard, the file should be named UserCard.js.

Props
Use descriptive names for props to clearly indicate their purpose. Avoid abbreviations or acronyms unless they are widely understood in the context of your project.

State variables
Prefix state variables with is, has, or should to denote boolean values.

In this example, we have three state variables: _

isActive,
hasError
shouldRender
These variables are prefixed with is, has, and should, respectively, according to the naming convention.

The corresponding state update functions setIsActive, setHasError, and setShouldRender are used to modify the state.

By following the naming convention, the purpose and meaning of these state variables are clear, making the code more readable and maintainable.


Event handlers
Use handle as a prefix for event handler functions. For example, handleClick, handleInputChange.

CSS classes
Use lowercase letters and hyphens for CSS class names

Constants
Use uppercase letters with underscores to represent constants in JavaScript.

For example, API_URL, MAX_RESULTS.

Utility functions
Choose descriptive names that indicate their purpose or functionality.

For example, formatDate, generateUniqueId.







