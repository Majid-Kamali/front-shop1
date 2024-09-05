let typingTimer;
const typingDelay = 300;

// search
const isMobile = window.innerWidth <= 768;
const searchInput = isMobile ? document.querySelector('#mobile-search-bar-input') : document.querySelector('#desktop-search-bar-input');
const searchBtn = isMobile ? document.querySelector('#mobile-search-bar-btn') : document.querySelector('#desktop-search-bar-btn');
const searchResultsBox = isMobile ? document.querySelector('#mobile-search-results') : document.querySelector('#desktop-search-results');
const loadingIndicator = isMobile ? document.querySelector('#mobile-search-loading') : document.querySelector('#desktop-search-loading');
const searchHeader = isMobile ? document.querySelector('#mobile-search-results-header') : document.querySelector('#desktop-search-results-header');
const searchList = isMobile ? document.querySelector('#mobile-search-results-list') : document.querySelector('#desktop-search-results-list');


// mobile menu 
const mobileMenuBtn = document.querySelector('.toolbar-menu-icon');
const mobileMenuNav = document.querySelector('.mobile-nav');
const mobileMenuNavCloseIcon = document.querySelector('.mobile-nav__header__close-icon');




/**
 * 
 *  search data in product event and function
 * 
 */

searchInput.addEventListener('input', () => {
    search(searchInput)
});

searchBtn.addEventListener('click', () => {
    search(searchInput)
});

function search(inputValue) {
    const query = inputValue.value.trim();

    if (query.length >= 3) {
        clearTimeout(typingTimer);

        loadingIndicator.classList.add('open');

        typingTimer = setTimeout(() => {
            fetchResults(query);
        }, typingDelay);

    } else {
        clearResults(searchResultsBox, searchHeader, searchList);
    }
}

function fetchResults(query) {
    // fetch(`/search?q=${query}`)
    fetch('https://fakestoreapi.com/products?limit=3')
        .then(response => response.json())

        .then(data => {
            loadingIndicator.classList.remove('open');
            displayResults(data, searchResultsBox, searchHeader, searchList)
        })
        .catch(error => {
            loadingIndicator.classList.remove('open');
            console.error('Error fetching data:', error)
        });
}

function displayResults(productData, searchResultBox, header, list) {

    header.innerHTML = ''
    list.innerHTML = ''

    searchResultBox.classList.add('open');

    header.innerHTML = `
       <a class="search__results__header__count" href="#">${productData.length}تعداد نتیجه یافت شده</a>    
    `
    productData.forEach(productData => {
        list.insertAdjacentHTML('beforeend', `
            
             <a href="#" class="search__results__list__card">
                <div class="search__results__list__card__thumbnail">
                    <img class="search__results__list__card__thumbnail__img" src="${productData.image}"
                        alt="${productData.title}">
                </div>
                <div class="search__results__list__card__content">
                    
                        <h5 class="search__results__list__card__content__title">${productData.title}</h5>
                        <p class="search__results__list__card__content__description">
                            ${productData.description}</p>
                    <p> 
                        <span class="search__results__list__card__content__rating">🥇 ${productData.rating.rate}</span>
                        <span class="search__results__list__card__content__price">${productData.price}  تومان </span>
                    </p>
                  
                </div>
            </a>
            
        `);
    });


}

function clearResults(searchResultBox, header, list) {
    searchResultBox.classList.remove('open');
    header.innerHTML = ''
    list.innerHTML = ''
}

/**
 * 
 *  mobile menu btn 
 * 
 */

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuNav.classList.add('mobile-nav--open')
})

mobileMenuNavCloseIcon.addEventListener('click', () => {
    mobileMenuNav.classList.remove('mobile-nav--open')
})

/**
 * 
 * slider plugin config
 *  
 */

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


/**
 * 
 *  slider slide-wrapper before box-shadow
 * 
 */

document.querySelectorAll('.slide-wrapper').forEach(function (element) {
    var colorVariableName = element.getAttribute('data-color');
    var colorValue = getComputedStyle(document.documentElement).getPropertyValue(colorVariableName).trim();
    element.style.setProperty('--box-shadow-color', colorValue);
});



/**
 * 
 *  banner banner-wrapper  bg-color
 * 
 */

document.querySelectorAll('.banner__wrapper').forEach(function (element) {
    var colorVariable = element.getAttribute('data-color');
    element.style.setProperty('--bg-color', colorVariable);
});


/**
 * 
 *  FAQ drop down box
 * 
 */
document.querySelectorAll('.faq-card__header').forEach(function (element) {
    element.addEventListener('click', () => {
        const content = element.nextElementSibling;
        const icon = element.children[1];
        content.classList.toggle('faq-card__content--open');
        icon.classList.toggle('faq-card__header__icon--open');

        if (content.classList.contains('faq-card__content--open')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0';
        }
    });
});