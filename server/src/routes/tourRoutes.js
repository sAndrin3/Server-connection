import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/toursController.js";
import { login, register, loginRequired, registerAdmin, adminLogin} from '../controllers/userController.js';
import { getAdmins, getAdmin, createAdmin, updateAdmin, deleteAdmin } from "../controllers/toursController.js";


export const userRoutes = (app) => {
    app.route('/users')
        .get(loginRequired, getUsers)
        .post(loginRequired, createUser);

    app.route('/user/:id')
        .put(loginRequired, updateUser)
        .get(loginRequired, getUser)
        .delete(loginRequired, deleteUser);

    app.route('/admins')
        .get( getAdmins)
        .post(loginRequired, createAdmin);

    app.route('/admin/:id')
        .put(loginRequired, updateAdmin)
        .get(loginRequired, getAdmin)
        .delete(loginRequired, deleteAdmin);
        
    app.route('/auth/registerAdmin')
        .post(registerAdmin);


    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);

    app.route('/auth/loginAdmin')
        .post(adminLogin);
};
