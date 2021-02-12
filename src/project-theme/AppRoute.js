
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Company from "./components/Company";
import AddEditCompany from "./components/AddEditCompany";
export default {
    Home: {
        component: Login,
        path: '/'
    },
    ForgotPassword: {
        component: ForgotPassword,
        path: '/forgotPassword'
    },
    Login: {
        component: Login,
        path: '/login'
    },

    Company: {
        component: Company,
        path: '/company'
    },
    AddEditCompany: {
        component: AddEditCompany,
        path: '/AddEditCompany'
    },
   
   
};