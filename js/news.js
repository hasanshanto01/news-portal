// load categories 
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error));
};

//load all news
const loadAllNews = category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllNews(data.data))
        .catch(error => console.log(error));
}

//display all news
const displayAllNews = newsInfos => {
    console.log(newsInfos);
    let newsCard = document.getElementById('news-card');
    newsCard.innerHTML = '';
    if (newsInfos.length !== 0) {
        newsInfos.forEach(newsInfo => {
            // console.log(newsInfo);
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'mb-3', 'p-2');
            // cardDiv.classList.add('row', 'g-3');
            cardDiv.innerHTML = `
            <div class="row g-3">
                <div class="col-md-3">
                    <img src="${newsInfo.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h3 class="card-title">${newsInfo.title}</h3>
                        <p class="card-text">${newsInfo.details.slice(0, 250)}...</p>
                        <div class="row mt-4">
                            <div class="col-4 d-flex align-items-center">
                                <div class="w-25">
                                <img src="${newsInfo.author.img ? newsInfo.author.img : 'Not Found'}" class="w-100 rounded-circle" alt="...">
                                </div>
                                <div class="w-75 ms-2">
                                    <p class="fw-semibold mb-0">${newsInfo.author.name ? newsInfo.author.name : 'Not Found'}</p>
                                    <p class="mb-0">${newsInfo.author.published_date ? newsInfo.author.published_date : 'Not Found'}</p>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center align-items-center">
                                <p class="mb-0"><i class="fa-regular fa-eye"></i><span class="ms-2 fw-semibold">${newsInfo.total_view ? newsInfo.total_view : 'Not Found'}</span></p>
                            </div>
                            <div class="col-4 d-flex justify-content-center align-items-center">
                            <p class="fs-3 text-primary"><i class="fa fa-arrow-right"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            newsCard.appendChild(cardDiv);
        });
    }
    else {
        // console.log('No news Found');
        const p = document.createElement('p');
        p.classList.add('fs-2', 'text-danger', 'text-center');
        p.innerText = `No news Found!`;
        newsCard.appendChild(p);
    }
};

// loadAllNews();

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
            loadAllNews(category.category_id);
        })
        // li.classList.add('text-dark');
    });
};

loadCategories();
