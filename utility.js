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
