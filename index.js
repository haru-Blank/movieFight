const fetchData = async searchTerm => {
   const response = await axios.get('http://www.omdbapi.com/', {
      params: {
         apikey: 'b1b9a789',
         s: searchTerm
      }
   });
   console.log(response.data);
};

const input = document.querySelector('input');

/* const onInput = debounce(event => {
   fetchData(event.target.value);
});

input.addEventListener('input', onInput); */

const onInput = event => {
   fetchData(event.target.value);
};

input.addEventListener('input', debounce(onInput, 500));
