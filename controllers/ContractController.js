const getContractPage = (req, res) => {
  res.render("views/main", {
    data: {
      title: "Contract Page",
      page: "contract",
    },
  });
};
export { getContractPage };
