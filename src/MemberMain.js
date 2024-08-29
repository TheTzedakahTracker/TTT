
import MyProfile from './MyProfile'
import './MemberMain.css';
import Layout from './AI/components/Layout';



function MemberMain(props){

    return (
        <>
            <Layout>
        <div className="container-fluid ">
            <div className="row">
                <div >
                <MyProfile id={props.user} />
                
                </div>
            </div>
                </div>
                </Layout>
        </>
    );//end return

}
export default MemberMain;