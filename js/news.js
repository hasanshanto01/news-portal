// load categories 
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error));
};

//load all news
const loadAllNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a')
        .then(res => res.json())
        .then(data => displayAllNews(data.data[0]));
}

//display all news
const displayAllNews = newsInfo => {
    console.log(newsInfo.total_view);
    const newsCard = document.getElementById('news-card');
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('row', 'g-3');
    cardDiv.innerHTML = `
    <div class="col-md-3">
        <img src="${newsInfo.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-9">
        <div class="card-body">
            <h3 class="card-title">${newsInfo.title}</h3>
            <p class="card-text">${newsInfo.details}</p>
            <div class="row mt-4">
                <div class="col-4 d-flex align-items-center">
                    <div class="w-25">
                    <img src="${newsInfo.author.img}" class="w-100 rounded-circle" alt="...">
                    </div>
                    <div class="w-75 ms-2">
                        <p class="fw-semibold mb-0">${newsInfo.author.name}</p>
                        <p class="mb-0">${newsInfo.author.published_date}</p>
                    </div>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center">
                    <p class="mb-0"><i class="fa-regular fa-eye"></i><span class="ms-2 fw-semibold">${newsInfo.total_view}</span></p>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center">
                <p class="fs-3 text-primary"><i class="fa fa-arrow-right"></i></p>
                </div>
            </div>
        </div>
    </div>
    `;
    newsCard.appendChild(cardDiv);
}

loadAllNews();

// display categories 
const displayCategories = categories => {
    // console.log(categories);
    const categoryList = document.getElementById('category-list');
    // console.log(categoryList);

    // console.log(categoryField);
    categories.forEach(category => {
        // console.log(category.category_id, category.category_name);
        const li = document.createElement('li');
        li.setAttribute('id', `${category.category_id}`);
        li.classList.add('list-group-item');
        li.innerHTML = `
        ${category.category_name}
        `;
        categoryList.appendChild(li);
        document.getElementById(category.category_id).addEventListener('click', function () {
            console.log('clicked', category.category_id);
        })

    });
};

loadCategories();
