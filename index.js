const fetchData = async searchTerm => {
   const response = await axios.get('http://www.omdbapi.com/', {
      params: {
         apikey: 'b1b9a789',
         s: searchTerm
      }
   });

   if (response.data.Error) {
      console.log(response.data.Errora);
      return [];
   }

   return response.data.Search;
};

const input = document.querySelector('input');

const onInput = async event => {
   const movies = await fetchData(event.target.value);

   for (let movie of movies) {
      const div = document.createElement('div');

      div.innerHTML = `
         <img src="${movie.Poster}" alt="${movie.Title}" title="${movie.Title}"/>
         <h1>$a{movie.Title}</h1>
      `;

      document.querySelector('#target').appendChild(div);
   }
};

input.addEventListener('input', debounce(onInput, 500));
