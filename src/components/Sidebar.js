import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = styled.div`
background: #15171c;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #15171c;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

	const showSidebar = () => setIsSidebarOpen(!isSidebarOpen);
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const logoutHandler = () => {
		logout();
		navigate('/login');
	}

	return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<Nav>
					<NavIcon to="#">
						<FaIcons.FaBars onClick={showSidebar} />
					</NavIcon>
					<h5
						className="title-font"
						style={{
							textAlign: "center",
							marginLeft: "26vw",
							color: "white",
							fontWeight:"bold",
						}}
					>
						ACCURACY CALCULATION FOR BODY MOVEMENT USING POSE NET

					</h5>
					{user?<button onClick={logoutHandler} className="btn btn-info btn-sm" style={{marginLeft: 'auto', marginRight: '10px'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right m-1" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>Log Out</button>:null}
				</Nav>
				<SidebarNav sidebar={isSidebarOpen}>
					<SidebarWrap>
						<NavIcon to="#">
							<AiIcons.AiOutlineClose onClick={showSidebar} />
						</NavIcon>
						{SidebarData.map((item, index) => {
							return <SubMenu item={item} key={index} />;
						})}
					</SidebarWrap>
				</SidebarNav>
			</IconContext.Provider>
		</>
	);
};

export default Sidebar;
