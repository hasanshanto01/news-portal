// loading categories 
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error));
};

// display categories 
const displayCategories = categories => {
    console.log(categories);
    const categoryList = document.getElementById('category-list');
    console.log(categoryList);

    // console.log(categoryField);
    categories.forEach(category => {
        console.log(category.category_id, category.category_name);
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
