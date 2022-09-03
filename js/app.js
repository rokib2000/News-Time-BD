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
  loadingData(true);

  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
};

// view all news

const displayNews = (newsAll) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";

  // check news
  const totalNews = document.getElementById("news-alert");
  const items = newsAll.length;
  if (items === 0) {
    totalNews.innerText = "No news found. please check another category!";
    totalNews.classList.add("alert-danger");
    totalNews.classList.remove("alert-light");
  } else {
    totalNews.innerText = `${items} items found from the category `;
    totalNews.classList.remove("alert-danger");
    totalNews.classList.add("alert-light");
  }

  newsAll.map((news) => {
    // console.log(news);
    // news details slice
    const newsDetail = news.details;

    newsContainer.innerHTML += `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-2">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-10">
            <div class="card-body">
                <h5 class="card-title fw-semibold">${news.title}</h5>
                <p class="card-text">${newsDetails(newsDetail)}</p>
                <div class="align-items-end">
                <div class="row mt-4 align-items-center">
                    <div class="col-4">
                    <div class="row align-items-center">
                        <div class="col-2"><img src="${
                          news.author.img
                        }" class="img-fluid rounded-circle" alt="..." /></div>
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
                    <p onclick="newsView('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsModal">
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

  loadingData(false);
};

// news details Slice Function
const newsDetails = (details) => {
  if (details.length > 600) {
    const newDetails = details.slice(0, 600) + "...";
    return newDetails;
  } else {
    return details;
  }
};

// load news full data
const newsView = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  singleNewsView(data.data[0]);
};

// single news data view in modal
const singleNewsView = (singleNews) => {
  console.log(singleNews);
  const singleNewsDetail = document.getElementById("single-news-details");
  singleNewsDetail.innerHTML = `
  <div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="newsModalLabel">${singleNews.title}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <div class="my-3"><img src="${singleNews.image_url}" class="img-fluid" alt="..." /></div>
    <p class="card-text">${singleNews.details}</p>
  </div>
  <div class="modal-footer">
    <div class="align-items-end">
      <div class="row  align-items-center">
        <div class="col-4">
          <div class="row align-items-center">
            <div class="col-2">
              <img src="${singleNews.author.img}" class="img-fluid rounded-circle" alt="..." />
            </div>
            <div class="col-10">
              <h5>${singleNews.author.name}</h5>
            </div>
          </div>
        </div>
        <div class="col-4 text-center">
          <h5><i class="fa-regular fa-eye fa-xl"></i> ${singleNews.total_view}</h5>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  </div>
</div>
    `;
};

// loading data

const loadingData = (isLoading) => {
  const toggleSpinner = document.getElementById("taggle-spinner");
  if (isLoading) {
    toggleSpinner.classList.remove("d-none");
  } else {
    toggleSpinner.classList.add("d-none");
  }
};

loadCategoryNews("01");

loadCategories();
