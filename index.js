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

const debounce = (func, delay = 1000) => {
   /* 
   $ Debouncing an input
   - waiting for some time to pass after the last event to actually do something
   */
   let timeoutId;
   return (...args) => {
      if (timeoutId) {
         clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
         func.apply(null, args);
      }, delay);
   };
};

/* const onInput = debounce(event => {
   fetchData(event.target.value);
});

input.addEventListener('input', onInput); */

const onInput = event => {
   fetchData(event.target.value);
};

input.addEventListener('input', debounce(onInput, 500));
