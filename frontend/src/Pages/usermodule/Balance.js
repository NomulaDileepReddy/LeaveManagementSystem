import UserHeader from "./UserHeader";
import {useState,useEffect} from "react"

function Balance() {

    const [user,setUser] = useState("")
    const [remainingLeave,setRemainingLeave] = useState(0)

    useEffect(() => {
        let loggedInUser = localStorage.getItem("loggedInUser")
        loggedInUser = loggedInUser ? JSON.parse(loggedInUser) : null;
        fetch(`http://localhost:5000/user/${loggedInUser.email}/balance`)
            .then(function (res) {
                return res.json()
            }).then(function (result) {
                console.log("Result : ", result)
                let remainingLeave = Number(result.leaveCount) - Number(result.approvedLeaveCount);
                setRemainingLeave(remainingLeave)
                setUser(result)
            })
    },[])

    return (
        <div>
            <UserHeader />
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card"  style={{"border":"2px solid #ddd","borderLeft":"5px solid red"}}>
                            <div className="card-body">
                                <h5 className="card-title">Total leave</h5>
                                <p className="card-text">{user.leaveCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card"  style={{"border":"2px solid #ddd","borderLeft":"5px solid cyan"}}>
                            <div className="card-body">
                                <h5 className="card-title">Leaves Tsken</h5>
                                <p className="card-text">{user.approvedLeaveCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card"  style={{"border":"2px solid #ddd","borderLeft":"5px solid green"}}>
                            <div className="card-body">
                                <h5 className="card-title">Remaining Balance</h5>
                                <p className="card-text">{remainingLeave}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Balance;