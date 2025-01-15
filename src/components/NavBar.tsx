import { useContext } from "react";
import {  Link, NavLink } from "react-router";
import { UserContext } from "../App";
import { Box } from "@mui/system";

export default ()=>{
    const [user,Dispatch]=useContext(UserContext)
    if(!user.firstName)
        user.firstName="please login first"
    return(
        <>
         <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        m: 2, // Margin
      }}/>
      <Box sx={{   position: "absolute",
        top: 0,
        right: 0,
        m: 2, // Margin
      }}>
        
        <nav>
       
    
            <Link to="/home">   Home   </Link>
            <Link to="/about">   About   </Link>
            <Link to={`/about/${user.firstName}`}>   User </Link>
            <NavLink to='/rer'/>

        </nav>
      </Box>

        </>
    )
}