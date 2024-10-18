const getHomePage = (req, res) => {
  res.render("views/main", {
    data: {
      title: "Home Page",
      page: "home",
    },
  });
};

export { getHomePage };
