# DEVELOPMENT

This document explains how I was planing this project. And how I did thinking about when I developed this web application.
The purpose are mostly for the teacher to understand my design and developing process.


## Table of Contents

- [Planing](#planing)
- [UI Mockup](#ui-mockup)
- [Images](#images)
- [Postman](#postman)
- [Type Coverage and Check Types](#type-coverage-and-check-types)
- [Validation of Environment Variables](#validation-of-environment-variables)
- [Light Dark Mode](#light-dark-mode)
- [Logotype](#logotype)
- [Favicon](#favicon)
- [TMDB Logo](#tmdb-logo)


## Planing

**Start**

After I have read the Assignment several times and checked the documentation for the TMDB API.


**Design and UI Mockup**

I decided to start with the Layout, colors and UI Mockup. I have earlier used Tailwind CSS, Shadcn UI and Lucid Icons.
I wanted to use that in my project with the Inter font. I also wanted a default light modern minimalistic UI design.


**Test the API with Postman**

I used Postman to test my API endpoints. I also took help by Postman AI to generate some of my API endpoints.
Study the documentation and tested some endpoints to see what data and format I got from the API.


**Layout**

Now I will start with the Layout. I used Shadcn UI to generate base CSS with light and dark mode variables.
Then I created the layout with React Router and concentrated on the desktop view from start.


**Components for Layout**

Next step was to create the components like Navbar, Footer, and Main content. I tried to use as much Shadcn UI 
components as possible. I created my own components based on Shadcn UI components.


**Logo and Favicon**

Creates a logotype of a Lucid Icon and with the website name `Moviex`. I added a smaller logo in the footer also.
With the logotype I created a image of the Lucid Icon with Adobe Photoshop in `.png` format.
I used then Figma to convert the `.png` to an favicon icon in `.svg`.  

Then to generate several favicons and the favicon meta code I used RealFaviconGenerator:  
https://realfavicongenerator.net/


**TMDB Attribute and Credits**

I my footer I added one of the TMDB logotype together with required text.


**Light/Dark Mode**

Now I created the light/dark mode and I used about the same code I had in an earlier project with some small adjustments.
When I tested the dark mode, some text was dark with dark background. So I found out that Shadcn UI CSS code that 
was generated was not 100% complete, so I solved that with a few lines.


**Created `type coverage` and `check-types` script**

So I could run them with the `npm` command.


**Environment Variables**

Created .env file with API key value and some URL's that are related to the API.
I also did double check the `.gitignore` so it had `.env`, so it would not upload my secret `.env` file to github.


**Validation of Environment Variables**

I have done a little validation earlier with the Zod library. So I created some typescript code that validates these 
variables I have in my `.env` file.


**Image Optimization**

I have earlier done some development in NextJS and I really liked NextJS's Image component. I looked for information 
if that was possible. And found the image optimization library called: `@unpic/react`

With this library I get like around 90% of the NextJS Image component optimization. 
@unpic/react [Image Optimazation] (https://unpic.pics/img/react/)


## Managing Document Head

I am using React-Helmet to manage and control the content of the HTML section. This is useful for setting metadata, titles, styles, and other elements in the head section.  
https://github.com/nfl/react-helmet#readme







## UI Mockup

I tried to find a good UI mockup tool. I tested a few UI mockup tools like Figma and V0, but I ended up
with Google Stitch. Now I had an idea of how the website should be designed loosely.  
https://stitch.google.com/


## Images

I am using `@unpic/react` to optimize my images like a 'NextJS-Image' component with optimization.

The Hero image I did use AI to generate 3 movie title images as 3 cards spread out. And I converted it 
from `.jpg` to `.webp` format from this website:  
https://cloudconvert.com/jpg-to-webp


## Postman

I used Postman to test my API endpoints. I also took help by Postman AI to generate some of my API endpoints.


## Type Coverage and Check Types

Added `type-coverage` and `check-types` scripts to `package.json`

```json
    "check-types": "tsc --noEmit",
    "type-coverage": "type-coverage -p ./tsconfig.app.json --detail --at-least 99",
    "quality": "npm run check-types && npm run type-coverage"
```


## Validation of environment variables

I have used Zod to validate my environment variables.

`/src/lib/validation/env.ts`

I also added TypeScript support for Vite env variables.

`/src/vite-env.d.ts`


## Light Dark Mode

I have used Shadcn UI for the light dark mode together with React Context.

`/src/contexts/ThemeContext.tsx` Create a context for the theme.

`/src/contexts/ThemeProvider.tsx` A Provider component for the theme context over my application. It save the state
in the localstorage.

`/src/hooks/useTheme.ts` A custom hook for the theme context.

`/src/components/layout/ThemeToggle.tsx` Component for the theme toggle button.

I have used this code before in my previous projects.


## Logotype

I did ask AI to generate a logotype for my Moviedex application. But I was not happy with it. I ended up found a 
Lucid icon called: `clapperboard`
Which I am using as my logotype for my application.  
https://lucide.dev/icons/clapperboard


## Favicon

I did use the logo.svg file and generated favicons from:  `/public/*`  
https://realfavicongenerator.net/

Added these lines in my: `/index.html`
```html
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Moviedex" />
    <link rel="manifest" href="/site.webmanifest" />
```


## TMDB Logo

I did add TMDB logo in my application from their own website.    
https://www.themoviedb.org/assets/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg  
`/src/assets/tmdb.svg`
