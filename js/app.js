let typingTimer;
const typingDelay = 300;

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('.search__bar__btn');
searchInput.addEventListener('input', () => {

    const query = searchInput.value.trim();

    if (query.length >= 3) {
        clearTimeout(typingTimer);

        typingTimer = setTimeout(() => {
            fetchResults(query);
        }, typingDelay);

    } else {
        clearResults();
    }

});

searchBtn.addEventListener('enter', () => {
    console.log("event");
});


function fetchResults(query) {
    // fetch(`/search?q=${query}`)
    fetch('https://fakestoreapi.com/products?limit=3')
        .then(response => response.json())
        
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    const resultsHeader = document.querySelector('.search__results__header');
    const resultsList = document.querySelector('.search__results__list');
    const resultsFooter = document.querySelector('.search__results__footer');
    resultsHeader.innerHTML=''
    resultsList.innerHTML=''
    resultsFooter.innerHTML=''
        
    resultsHeader.innerHTML = `
       <a class="search__results__header__count" href="#">${results.length}تعداد نتیجه یافت شده</a>    
    `
    results.forEach(result => {
        resultsList.insertAdjacentHTML('beforeend', `
            
             <div class="search__results__list__card">
                <div class="search__results__list__card__thumbnail">
                    <img class="search__results__list__card__thumbnail__img" src="${result.image}"
                        alt="${result.title}">
                </div>
                <div class="search__results__list__card__content">
                    <h5 class="search__results__list__card__content__title">${result.title}</h5>
                    <p class="search__results__list__card__content__description">
                        ${result.description}</p>
                   <p> 
                   <span class="search__results__list__card__content__rating">🥇 ${result.rating.rate}</span>
                   &nbsp;
                   <span class="search__results__list__card__content__price">${result.price}  تومان </span>
                    </p>
                </div>
            </div>
            
        `);
    });

    resultsFooter.innerHTML = `
        <a class="search__results__footer__btn" href="#">مشاهده همه نتایج</a>
   
    `
}

function clearResults() {
    const resultsHeader = document.querySelector('.search__results__header');
    const resultsList = document.querySelector('.search__results__list');
    const resultsFooter = document.querySelector('.search__results__footer');
    resultsHeader.innerHTML=''
    resultsList.innerHTML=''
    resultsFooter.innerHTML=''
}





