// load categories 
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error));
};

// display categories 
const displayCategories = categories => {
    const categoryList = document.getElementById('category-list');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.setAttribute('id', `${category.category_id}`);
        li.classList.add('list-group-item', 'border-0');
        li.innerText = `${category.category_name}`;
        categoryList.appendChild(li);
    });
};

//load all news
const loadAllNews = categoryId => {
    console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllNews(data.data))
        .catch(error => console.log(error));
}

//display all news
const displayAllNews = newsInfos => {
    let newsCard = document.getElementById('news-card');
    newsCard.innerHTML = '';
    if (newsInfos.length !== 0) {
        newsInfos.forEach(newsInfo => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'mb-3', 'p-2');
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
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fa fa-arrow-right" onclick=loadNewsDetail('${newsInfo._id}')></i>
                                </button>
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
        const p = document.createElement('p');
        p.classList.add('fs-2', 'text-danger', 'text-center');
        p.innerText = `No news Found!`;
        newsCard.appendChild(p);
    }
    toggleSpinner(false);
};

//load news detail
const loadNewsDetail = newsId => {
    // console.log(newsId);
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetail(data.data[0]))
        .catch(error => console.log(error));
}

//display news detail
const displayNewsDetail = (news) => {
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = `News Title: ${news.title}`;
    const newsDetail = document.getElementById('news-detail');
    newsDetail.innerText = `Detail-News: ${news.details}`;
    const info = document.getElementById('info');
    info.innerHTML = `
    <p class="mb-0 fw-semibold">Author: ${news.author.name ? news.author.name : 'Not Found'}</p>
    <p class="mb-0 fw-semibold">Published On: ${news.author.published_date ? news.author.published_date : 'Not Found'} </p>
    `;
}

// categories event handler
document.getElementById('category-list').addEventListener('click', function (event) {
    console.log(event.target.id);
    const categoryId = event.target.id;
    toggleSpinner(true);
    loadAllNews(categoryId);
})


//spinner
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

loadCategories();
loadAllNews('01');