const getAboutPage = (req, res) => {
  res.render("views/main", {
    data: {
      title: "Home Page",
      page: "about",
    },
  });
};

export { getAboutPage };
