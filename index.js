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

let timeoutId;

const onInput = event => {
   /* 
   $ Debouncing an input
   - waiting for some time to pass after the last event to actually do something
   */
   if (timeoutId) {
      clearTimeout(timeoutId);
   }
   timeoutId = setTimeout(() => {
      fetchData(event.target.value);
   }, 500);
};

input.addEventListener('input', onInput);
