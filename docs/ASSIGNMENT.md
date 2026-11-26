# Assignment - Build a Movie App in React

For course Web Development with React.  
https://www.iths.se/utbildningar/webbutveckling-med-react-2/


## Table of Contents

- [Description](#description)
- [API Access to The Movie Database (TMDB)](#api-access-to-the-movie-database-tmdb)
  - [API Documentation](#api-documentation)
- [Hygiene Requirements](#hygiene-requirements)
- [Requirements Specification (G, Approved)](#requirements-specification-g-approved)
- [Tips and Tricks](#tips-and-tricks)
- [Testing and Documentation](#testing-and-documentation)
- [Requirements for "Very Good" (VG, well approved)](#requirements-for-very-good-vg-well-approved)
- [Deadline](#deadline)
- [Presentation](#presentation)
- [Assessment Criteria](#assessment-criteria)



## Description

Build a React app where users can view movies currently in theaters, trending films, and top-rated titles from 
The Movie Database (TMDB), as well as browse movies by genre. For the list of movies currently in theaters, 
allow users to choose between Sweden and the USA.

Wherever a movie is displayed, users should be able to access its dedicated movie page. From there, they 
should be able to navigate to an actor’s profile page and explore other films in which that actor has appeared.


## API Access to The Movie Database (TMDB)

Create an account at https://www.themoviedb.org/. Then, log in and access the API page via the link below.

Retrieve your API Key or API Read Access Token. Save it in a local environment file—such as `.env.local`—and ensure 
that this file is excluded from Git. Add the corresponding environment variable to the platform where you 
deploy your app. Note that any values used within the browser can be accessed by users.

Direct link to the API page:  
https://www.themoviedb.org/settings/api.


### API Documentation

All documentation regarding the API (such as available endpoints, how to use your API key, etc.) can be found at:  
https://developer.themoviedb.org/docs/getting-started.

Keep in mind that you can combine requests when fetching movie data. For example, add `append_to_response=credits` to 
include the cast list in the same response. Learn more about `append_to_response` in the TMDB documentation.

Credit TMDB as the source within your app. Use an approved TMDB logo along with the text: "This application uses 
TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB." 
For further details, please refer to the TMDB API Terms of Use.


## Hygiene Requirements

These requirements apply to both the "Pass" (G) and "Pass with Distinction" (VG) grades. Start by including 
a brief plan in your README—a few bullet points or a sketch of the components and the data flow between 
them will suffice. Include this plan in your first commit.

- Use React, TypeScript, Vite, React Router, React Context (for the theme), and TanStack React Query.

- Responsive design (mobile-first, naturally).

- Component-based architecture, including at least 3 custom components. Pagination and navigation bar components 
may be reused from the course material and do not count toward this total of three.

- Consolidate calls to the TMDB API into a dedicated API service. Use TanStack Query to fetch data through this service.

- Provide feedback for data loading states, failed API calls, and empty lists.

- Ensure the code is properly indented and clean. Version control using Git is mandatory; make multiple commits 
throughout the development process, with commit messages that describe the changes made.

- Define types for component props and the portions of the API responses used by the application. Run linting, 
type checking, and the build process. The type checking must cover the entire application codebase and pass successfully.

- Deploy the application to a web server (e.g., Netlify, as used in the course). Verify that routing functions 
correctly—even when accessing a subpage directly or reloading the page.

- Build your own application and ensure you can explain the code you submit. Remove any unused code.


## Requirements Specification (G, Approved)

Display the movie poster or the actor’s profile picture whenever a movie or actor is shown. Ensure the view remains 
functional even if the image is missing.

The browser’s back and forward buttons must navigate to the correct view. When browsing by genre, both the selected 
genre and the page number should be restored. Direct links to a specific movie, actor, or page within a genre 
must function correctly in the deployed application.

As a visitor, I should be able to:
- view movies currently in theaters ("Now Playing").
- view trending movies ("Trending").
- view top-rated movies ("Top Rated").
- browse movies by genre and see the name of the genre. Selecting a new genre should reset the view to the first page.

Additionally, as a visitor, I should be able to:
- open a movie to view its details—such as the plot, premiere date, and cast.
- open an actor’s profile from the cast list, read about the actor, see the movies they have appeared in, 
- and navigate to the individual page for each of those movies.
- switch between at least two color themes (e.g., light and dark modes).

To achieve a passing grade (G), pagination must be implemented for genre-based browsing. Fetch the genres from TMDB. 
For the "Now Playing," "Trending," and "Top Rated" sections, displaying movies from the first API page is sufficient.

**When you reload, the same view should be displayed. For example, if you are on page 2 of a genre, you should 
remain on page 2 of that same genre. Your color theme should also be preserved!**


## Tips and tricks

Try making a few requests in Postman first. Examine the responses and determine which fields your components 
require before writing your API service.

**Regarding genres:** You can retrieve movies within a specific genre using Discover -> Movie Discover.

**Regarding images:** TMDB provides relative paths. Add the base URL and image size to construct the full 
image URL. Refer to the TMDB guide on images.

**Regarding an actor's films:** Use, for example, "Movie Credits" for the individual and display the 
films from the cast list.


## Testing and Documentation

Write at least one automated test for a behavior in your app—for example, the "Next" button on the final page, 
or what is displayed when a list is empty.

Use test data so that the test can run without making live calls to TMDB. You are encouraged to use Vitest and 
React Testing Library, as covered in the course.

Briefly explain in the README how to start, type-check, test, and build the app.

Also, provide a brief description in the README of how you expanded upon an existing, functional part of the app. 
What could a user do before the change, and what can they do after? Indicate which commit corresponds to the change, 
describe the coding problem you solved, and explain how you verified the result.

Justify your choice of component structure and data flow. Which requirement guided this choice, and how is it 
reflected in the app? Mention one limitation and one potential improvement.

Use AI as an aid for a specific, contained task—for example, to understand an error or to generate an idea 
for a test. In the README, briefly describe what you asked, what the tool suggested, how you verified the suggestion, 
and what course of action you ultimately took. Use your own code or mock test data.


## Requirements for "Very Good" (VG, well approved)

To achieve a grade of "Very Good," you must meet the requirements for "Good" (G) and implement a movie search feature.

- Users must be able to search for movies using a form and browse through the results. A new search should always 
start on the first page. An empty search query should not trigger a request to TMDB.

- The search term and page number must be included in the URL. The search field and the results must remain consistent 
when the page is reloaded, accessed via a direct link, or navigated using the browser's back/forward buttons.

- Encapsulate the data fetching logic for the search within a custom hook that utilizes TanStack Query and your 
API service. The search term and page number should determine which query is executed.

- Provide feedback when a search is loading, fails, or yields no results. Ensure that previous results are not 
displayed as matches for a new search. Link the movies to the same movie detail page used elsewhere in the application.

- In your README, explain how components, hooks, and rendering interact within the search feature. Compare your 
approach with an alternative you considered; why is your chosen solution better for the user and for those who 
will maintain the code? Describe how you tested a specific scenario—for example, performing a new search 
from page 2, followed by navigating back.

- Achieve at least 99.0% type coverage in the application's TypeScript code. Include a command in the repository to 
verify this, such as: `type-coverage -p ./tsconfig.app.json --detail --at-least 99`.


## Deadline

No later than Friday, December 11, at 16:00.

Don’t forget to test the deployed app! Open a subpage directly and try reloading it!


## Presentation

**Link to your GitHub repo from Classroom50**
__paste the link here__

**Link to your published app**
__paste the link here__

**G or VG level:**
__G level/VG level__]

**Any known bugs or comments:**
__here you can, for example, include anything you think might be helpful for me when reviewing your submission—such 
as issues you encountered or anything else you’d like to share regarding the assignment__


## Assessment Criteria

**Pass**  
Meets hygiene requirements and the requirement specification. The published app, code, tests, and README demonstrate 
how you built, further developed, and quality-assured the solution.

**Pass with Distinction**  
Meets the requirements for both Pass and Pass with Distinction. In the search flow, you demonstrate great skill and 
high precision regarding components, hooks, and rendering, and you justify your technical choices with careful analysis.

END