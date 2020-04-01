# Movie Fight

## Challenges

- **We need to somehow fetch data about movies**
  *We should attempt to fetch some data about movies from our JS code*
  *We will use [OMDB Api](http://www.omdbapi.com/)*
- **We need to build that auto complete widget from scratch**
  *We should sit down and write out a list of rules that describe how our auto complete works*
- **This app would be a lot better with some styling + CSS**
  *The starter kit we just set up has a CSS a framework called ‘Bulma CSS’ already wired up*

## Issues with Implementation

- All code touches everything
- Autocomplete widget was supposed to be reusable
- Autocomplete has knowledge of what a movie object is 
- Autocomplete has knowledge of what to show for each option
- Autocomplete has knowledge of what to do when a movie is clicked
- Many global variables that refer to specific elements - it will be really hard to show a second autocomplete on the screen