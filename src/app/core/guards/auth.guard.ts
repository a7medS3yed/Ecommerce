import { isPlatformBrowser } from '@angular/common';
import { inject, input, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID)

  
  // if(typeof localStorage !== null){
  //   if(localStorage.getItem('userdata') !==null){
  //     return true;
  //   }
  //   else{
  
  //   _Router.navigate(['/login']) ;
  //   return false;  
  
  //   }
  // }
  // else{
  //   return false
  // }


  if(isPlatformBrowser(_PLATFORM_ID)){
    if(localStorage.getItem('userdata') !==null){
      return true;
    }
    else{
  
    _Router.navigate(['/login']) ;
    return false;  
  
    }
  }
  else{
    return false
  }
};
