export const getToken = () =>{
    
    if(localStorage.getItem('token')){
        return localStorage.getItem('token');
    }
    else{
        return sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;
    }
}