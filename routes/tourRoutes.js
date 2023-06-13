import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/toursController.js";

export const userRoutes = (app) => {
    app.route('/users')
        .get(getUsers)
        .post(createUser);

    app.route('/user/:id')
        .put(updateUser)
        .get(getUser)
        .delete(deleteUser);
}