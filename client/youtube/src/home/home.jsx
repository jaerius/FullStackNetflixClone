import "./home.scss"
import Navbar from "../components/navbar/navbar"
import Featured from "../components/navbar/featured/Featured"
import List from "../components/navbar/list/List"

const Home =() => {
    return (
        <div className="home">

            <Navbar/>
            <Featured type="series"/>
            <List/>
            <List/>
            <List/>
            <List/>
        </div>
    )
}

export default Home