const getHomePage = (req, res) => {
  res.render("views/main", {
    data: {
      title: "Home Page",
    },
  });
};

export { getHomePage };
