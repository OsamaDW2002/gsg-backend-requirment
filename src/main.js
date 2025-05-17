import './style.css';
const app = document.querySelector('#app');

app.innerHTML = `
  <h1>Quote Search</h1>
  <input type="text" id="searchInput" placeholder="Search quotes..." />
  <ul id="quoteList"></ul>
  <p id="errorMessage" style="color: red;"></p>
`;

const searchInput = document.getElementById('searchInput');
const quoteList = document.getElementById('quoteList');
const errorMessage = document.getElementById('errorMessage');

let quotes = [];

axios.get('https://dummyjson.com/quotes')
    .then((response) => {
        quotes = response.data.quotes;
        displayQuotes(quotes);
    })
    .catch((error) => {
        errorMessage.textContent = 'Failed to load quotes: ' + error.message;
    });

const  displayQuotes = (list)=> {
    quoteList.innerHTML = '';
    list.forEach((quote) => {
        const li = document.createElement('li');
        li.textContent = quote.quote;
        quoteList.appendChild(li);
    });
}

searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filtered = quotes.filter((q) => q.quote.toLowerCase().includes(term));
    displayQuotes(filtered);
});
