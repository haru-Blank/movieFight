const autoCompleteConfig = {
   renderOption(movie) {
      const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
      return `
         <img src="${imgSrc}" 
         alt="${movie.Title}" 
         title="${movie.Title}"/>
         ${movie.Title} (${movie.Year})
      `;
   },

   inputValue(movie) {
      return movie.Title;
   },

   async fetchData(searchTerm) {
      const response = await axios.get('http://www.omdbapi.com/', {
         params: {
            apikey: 'b1b9a789',
            s: searchTerm
         }
      });

      if (response.data.Error) {
         console.log(response.data.Error);
         return [];
      }

      return response.data.Search;
   }
};

//! left column
createAutoComplete({
   ...autoCompleteConfig,
   root: document.querySelector('#left-autocomplete'),

   onOptionSelect(movie) {
      document.querySelector('.tutorial').classList.add('is-hidden');
      onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
   }
});

//! right column
createAutoComplete({
   ...autoCompleteConfig,
   root: document.querySelector('#right-autocomplete'),
   onOptionSelect(movie) {
      document.querySelector('.tutorial').classList.add('is-hidden');
      onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
   }
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
   const response = await axios.get('http://www.omdbapi.com/', {
      params: {
         apikey: 'b1b9a789',
         i: movie.imdbID
      }
   });

   summaryElement.innerHTML = movieTemplate(response.data);

   if (side === 'left') {
      leftMovie = response.data;
   }

   if (side === 'right') {
      rightMovie = response.data;
   }

   if (leftMovie && rightMovie) {
      runComparison();
   }
};

const runComparison = () => {
   console.log('Time For Comparison');
};

const movieTemplate = movieDetail => {
   const dollars = parseInt(
      movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
   );
   const metaScore = parseInt(movieDetail.Metascore);
   const imdbRating = parseFloat(movieDetail.imdbRating);
   const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

   // ! WITHOUT REDUCE
   /* let count = 0;
   const awards = movieDetail.Awards.split(' ').forEach(word => {
      const value = parseInt(word);

      if (isNaN(value)) {
         return;
      } else {
         count = count + value;
      }
   }); */

   // ! WITH REDUCE
   const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
      const value = parseInt(word);

      if (isNaN(value)) {
         return prev;
      } else {
         return prev + value;
      }
   }, 0);

   return `
      <article class="media">
         <figure class="media-left">
            <p class="image">
               <img src="${movieDetail.Poster}">
            </p>
         </figure>

         <div class="media-content">
            <h1>
               ${movieDetail.Title}
            </h1>

            <h4>
               ${movieDetail.Genre}
            </h4>

            <p>
              ${movieDetail.Plot} 
            </p>
         </div>
      </article>

      <article class="notification is-primary">
         <p class="title">
            ${movieDetail.Awards}
         </p>
         <p class="subtitle">Awards</p>
      </article>

      <article class="notification is-primary">
         <p class="title">
            ${movieDetail.BoxOffice}
         </p>
         <p class="subtitle">Box Office</p>
      </article>

      <article class="notification is-primary">
         <p class="title">
            ${movieDetail.Metascore}
         </p>
         <p class="subtitle">Metascore</p>
      </article>

      <article class="notification is-primary">
         <p class="title">
            ${movieDetail.imdbRating}
         </p>
         <p class="subtitle">IMDB Rating</p>
      </article>

      <article class="notification is-primary">
         <p class="title">
            ${movieDetail.imdbVotes}
         </p>
         <p class="subtitle">IMDB Votes</p>
      </article>
   `;
};
