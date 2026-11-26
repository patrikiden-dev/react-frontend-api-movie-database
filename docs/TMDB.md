# The Movie Database (TMDB)

![The San Juan Mountains are beautiful](/screenshoots/tmdb.png")

Information and links to resources from TMDB.  
https://www.themoviedb.org/


## Table of Contents

- [API Setting for your Personal Account](#api-setting-for-your-personal-account)
- [API Documentation](#api-documentation)
- [API Response Examples](#api-response-examples)
- [Attribution Requirements](#attribution-requirements)
- [Images at TMDB](#images-at-tmdb)
- [Movie Credits](#movie-credits)
- [Language and Locale](#language-and-locale)
- [The Movie Database Support](#the-movie-database-support)


## API Setting for your Personal Account

https://www.themoviedb.org/settings/api


## API Documentation

All documentation regarding the API (such as available endpoints, how to use your API key, etc.) can be found at:  
https://developers.themoviedb.org/3


## Append To Response

Keep in mind that you can combine requests when retrieving movie data. For example, add `append_to_response=credits`
to include the cast list in the same response. Read more about `append_to_response` in the TMDB documentation.  
https://developer.themoviedb.org/docs/append-to-response


## API Response Examples

The Movie Database (TMDB) Api List Create Response Example.  
https://apis.io/examples/tmdb/tmdb-api-list-create-response-example/  
https://github.com/api-evangelist/tmdb  


## Attribution Requirements

Credit TMDB as the source within your app. Use an approved TMDB logo along with the text:
"This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB."
For more details, refer to the TMDB API terms and conditions.  
https://developer.themoviedb.org/docs/faq#what-are-the-attribution-requirements

When using a TMDB logo, we require you to use one of our approved logos.   
https://www.themoviedb.org/about/logos-attribution

## Finding Data

There are 3 ways to search for and find movies, TV shows and people on TMDB. They're outlined below.
    
**/search** - Text based search is the most common way. You provide a query string and we provide the closest match. 
Searching by text takes into account all original, translated, alternative names and titles.

**/discover** - Sometimes it useful to search for movies and TV shows based on filters or definable values like ratings, 
certifications or release dates. The discover method make this easy.

**/find** - The last but still very useful way to find data is with existing external IDs. For example, if you know the 
IMDB ID of a movie, TV show or person, you can plug that value into this method and we'll return anything that 
matches. This can be very useful when you have an existing tool and are adding our service to the mix.  

https://developer.themoviedb.org/docs/finding-data


## Search & Query For Details

How to search for a movie (or TV show, or person) and then query for the details.  
https://developer.themoviedb.org/docs/search-and-query-for-details


## Images at TMDB

TMDB provides relative paths. Add the base URL and image size to obtain a full image URL.  
https://developer.themoviedb.org/docs/image-basics


## Movie Credits

Regarding an actor’s films: Use, for example, "Movie Credits" for the individual and display the films 
in the cast section.    
https://developer.themoviedb.org/docs/person-details


## Language and Locale

With the language/locale code like `language=sv-SE` provides film titles, descriptions, and similar information 
in Swedish (if available; otherwise, it falls back to English).
If you want to change the list to films showing in Sweden, you can use `region=SE`.  
https://developer.themoviedb.org/docs/image-languages


## The Movie Database Support

https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee

