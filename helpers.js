import fetch from "node-fetch";

async function getCategoryList(ids) {
  const categoryResponses = await Promise.all(
    ids.map(async (idCategory) => {
      const category = await fetch(
        `https://api.mercadolibre.com/categories/${idCategory}`
      );
      return await category.json();
    })
  );
  let categories = [];
  for (const resp of categoryResponses) {
    if (resp.path_from_root.length > categories.length) {
      categories = resp.path_from_root.map((item) => item.name);
    }
  }

  return categories;
}

module.exports = {
  getCategoryList,
};
