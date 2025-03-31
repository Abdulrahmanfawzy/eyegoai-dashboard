import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from '../../redux/reducers/tokenSlice';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const tokenStatus = useSelector(store=>store.token);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getToken());
    },[]);

    
    if(tokenStatus){
        return children
    }else{
        return <Navigate to={"/auth/login"} />
    }
    
}
