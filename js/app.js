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
  console.log(data.data);
};

loadCategories();
