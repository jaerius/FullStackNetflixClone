import "./navbar.scss"
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons"
import {useState} from 'react';

const Navbar = () =>{
    const [isScrolled, setIsScrolled] = useState(false);
    
    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        
        return () => (window.onscroll = null) // clean up function if there's not return it's goona be a loop
    } // 마운트 해제 되거나, 특정 이펙트가 재실행 되기 전에 필요한 정리 작업을 위해 사용. 여기서는 window.onscroll 이벤트 리스너 제거한다
    // 수행하지 않으면 컴포넌트가 마운트 해제된 후에도 이벤트 리스너가 계속 메모리에 남아있어 메모리 누수
    // 이벤트 리스너, 타이머, 구독 등 컴포넌트 라이프 사이클 동안 추가된 외부 자원을 해제 -> 효율성 유지
    console.log(isScrolled)
    return(
        <div className = {isScrolled ? "navbar scrolled" : "navbar"}>
             {/* 여기서 isScrolled가 true일 때, navbar scrolled가 되므로, scss파일에서 .navbar, &.scrolled 사용가능 --> */}
            
            <div className = "container">
                <div className="left">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt="img"
                    />
                    <span>HomePage</span>
                    <span>Series</span>
                    <span>Movies</span>
                    <span>New and Popular</span>
                    <span>My List</span>
                
                </div>
                <div className="right">
                    <Search className ="icon"/>
                    <span>KID</span>
                    <Notifications className = "icon"/>
                    
                    <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/>
                    <div className="profile">
                        <ArrowDropDown className  = "icon"/>
                        <div className="options">
                            <span>Settings</span>
                            <span>Logout</span>
                        </div>
                    
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Navbar