import { createContext,useState,useEffect } from "react";

import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
categoriesMap:{},

})
export const CategoriesProvider = ({children})=>{
const [categoriesMap,setCategoriesMap] = useState({});

useEffect(()=>{

    const getCategoriesMap = async()=>{
    const categoryMap = await getCategoriesAndDocuments();
    setCategoriesMap(categoryMap);
}
getCategoriesMap();
},[])
//below code is to add data in firestore to work with,this useEffect does not need it anymore
// useEffect(()=>{
//     addCollectionAndDocuments('categories',SHOP_DATA);
// },[]);
const value = {categoriesMap};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};