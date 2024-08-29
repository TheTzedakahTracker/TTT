
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
<<<<<<< HEAD
        </div>
=======

            <div>
                <p>Donated this year:</p>
                <p>Funds available for Donating:</p>
            </div>


            <div>
                <button>New Donation</button>
                {/* onClick={handleClick} */}

            </div>
          {/* <div>{showDonation && <MakeDonation />}</div> */}
>>>>>>> 5feb3bd (toMerge)
        </>
    );//end return

}
export default MemberMain;