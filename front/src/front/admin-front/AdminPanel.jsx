import React, {useContext, useState} from "react";
import AddAuthorMenu from "./AddAuthorMenu";
import AddBookMenu from "./AddBookMenu";
import UpdateAuthorMenu from "./UpdateAuthorMenu";
import UpdateBookMenu from "./UpdateBookMenu";
import { Col, Row } from "react-bootstrap";
import { AdminContext } from "../../AdminContext";


const AdminPanel = () => {
    const [activeMenu, setActiveMenu] = useState('addAuthor');
    const {isAdmin} = useContext(AdminContext);
    return(
        <div>
            <Col xs={9}>
            <Row xs={4}>
        
            <nav className="adminPanel">
            <h2>Panel administrador</h2>
            
                <ul className="adminUl">
                    <div className="separator">
                        <li ><button onClick={()=>setActiveMenu('AddAuthorMenu')}>Añadir autor</button></li>
                        <li ><button onClick={()=>setActiveMenu('AddBookMenu')}>Añadir Libro</button></li>
                    </div>
                    <div className="separator">
                        <li ><button className= "updateButton" onClick={()=>setActiveMenu('UpdateAuthorMenu')}>Actualizar autor</button></li>
                        <li ><button className= "updateButton" onClick={()=>setActiveMenu('UpdateBookMenu')}>Actualizar libro</button></li>
                    </div>
                    
                </ul>
            </nav>
            
            </Row>
            <div>
                {activeMenu ==='AddAuthorMenu' && <AddAuthorMenu/>}
                {activeMenu === 'AddBookMenu' && <AddBookMenu/>}
                {activeMenu === 'UpdateBookMenu' && <UpdateBookMenu/>}
                {activeMenu === 'UpdateAuthorMenu' && <UpdateAuthorMenu/>}
            </div>
            </Col>
        </div>
    )
}
export default AdminPanel