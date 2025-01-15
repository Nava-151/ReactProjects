import { useParams } from "react-router";

const UserName=()=>{
    const { name } = useParams();
    return (<>
    <h1> Hi {name}!</h1></>)
}
export default UserName