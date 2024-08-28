import MakeDonation from './MakeDonation';
import LogoImg from './LogoImg';
import MyProfile from './MyProfile'
import './MemberMain.css';



function MemberMain(){

    return(
        <>
        <div className="container-fluid">
            <div className="row">
            <div className="col-12 b" ></div>

            <div className="col-12 r" ></div>
            </div>
        </div>
        <div className="container-fluid bg_color">
            <div className="row">
                <div className="col-lg-4"><LogoImg/></div>
                <div className="col-lg-8 float-right">--Donated This Year: $1253.00--</div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div col-6>
                <MyProfile id="3" />
                </div>
            </div>
        </div>
        </>
    );//end return

}
export default MemberMain;