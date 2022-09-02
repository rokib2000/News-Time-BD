// load All catagories

const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category);
};

// View all categories

const displayCategories = (categories) => {
  const categoryItem = document.getElementById("category-item");

  categories.map((category) => {
    categoryItem.innerHTML += `
    <li   class="nav-item" >
        <a  onclick="loadCategoryNews('${category.category_id}')"  class="nav-link color-Gray52" href="#">
            ${category.category_name}
        </a>
    </li>`;
  });
};

// Load category news

const loadCategoryNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
};

// view all news

const displayNews = (newsAll) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";

  newsAll.map((news) => {
    newsContainer.innerHTML += `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-2">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-10">
            <div class="card-body">
                <h5 class="card-title fw-semibold">${news.title}</h5>
                <p class="card-text">${news.details}</p>
                <div class="align-items-end">
                <div class="row mt-4 align-items-center">
                    <div class="col-4">
                    <div class="row align-items-center">
                        <div class="col-2"><img src="${news.author.img}" class="img-fluid rounded-circle" alt="..." /></div>
                        <div class="col-10">
                        <h5>${news.author.name}</h5>
                        </div>
                    </div>
                    </div>
                    <div class="col-4 text-center">
                    <h5><i class="fa-regular fa-eye fa-xl"></i> ${news.total_view}</h5>
                    </div>
                    <div class="col-4 text-end">
                    <!-- Button trigger modal -->
                    <p data-bs-toggle="modal" data-bs-target="#newsModal">
                        <i class="fa-solid fa-arrow-right-long fa-2xl color-Blueberry"></i>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
  });
};

loadCategoryNews("01");

loadCategories();
