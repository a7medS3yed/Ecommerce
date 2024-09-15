import { WishlistComponent } from './components/wishlist/wishlist.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'login',
                loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'forget',
                loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
            }
        ]
    },
    {
        path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
            },
            {
                path: 'wishlist',
                loadComponent: () => import('./components/wishlist/wishlist.component').then(m => m.WishlistComponent)
            },
            {
                path: 'products',
                loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent)
            },
            {
                path: 'categories',
                loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent)
            },
            {
                path: 'detalies/:id',
                loadComponent: () => import('./components/detalies/detalies.component').then(m => m.DetaliesComponent)
            },
            {
                path: 'brands',
                loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent)
            },
            {
                path: 'allorders',
                loadComponent: () => import('./components/allorders/allorders.component').then(m => m.AllordersComponent)
            },
            {
                path: 'order/:id',
                loadComponent: () => import('./components/order/order.component').then(m => m.OrderComponent)
            }
        ]
    },
    {
        path: '**',
        component: NotfoundComponent
    }
];
