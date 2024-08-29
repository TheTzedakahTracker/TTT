
import LogoImg from './LogoImg';
import MyProfile from './MyProfile'
import './MemberMain.css';



function MemberMain(props){

    return(
        <>
        <div className="container-fluid ">
            <div className="row">
                <div >
                <MyProfile id={props.user} />
                
                </div>
            </div>
        </div>
        </>
    );//end return

}
export default MemberMain;