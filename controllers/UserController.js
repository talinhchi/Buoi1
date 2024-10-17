import userModel from "../services/UserModel";

const getUserPage = async (req, res) => {
  const listUsers = await userModel.getAllUser();
  res.render("views/main", {
    data: {
      title: "User Page",
      page: "viewUser",
      rows: listUsers,
    },
  });
};
const getAddUserPage = (req, res) => {
  res.render("views/main", {
    data: {
      title: "Add User Page",
      page: "addUser",
    },
  });
};
export default { getUserPage, getAddUserPage };
