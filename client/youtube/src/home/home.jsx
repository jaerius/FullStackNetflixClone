import "./home.scss"
import Navbar from "../components/navbar/navbar"
import Featured from "../components/navbar/featured/Featured"

const Home =() => {
    return (
        <div className="home">

            <Navbar/>
            <Featured type="series"/>

        </div>
    )
}

export default Home