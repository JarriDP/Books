import React, {Children, createContext, useState} from "react";

export const AdminContext = createContext({
    isAdmin: false,
    toggleAdmin:()=>{}
});

export const AdminProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(
        () => JSON.parse(localStorage.getItem('isAdmin')) || false
    );

    const toggleAdmin = (admin) =>{
        localStorage.setItem('isAdmin', JSON.stringify(admin));
        setIsAdmin(admin);
        console.log("Admin ", isAdmin);
    }
    return(
        <AdminContext.Provider value={{isAdmin, toggleAdmin}}>
            {children}
        </AdminContext.Provider>
    );
}
