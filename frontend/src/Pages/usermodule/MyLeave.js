import { useEffect, useState } from "react";
import UserHeader from "./UserHeader";

const MyLeave = () => {

    const [leaves, setLeaves] = useState([])
    const [username, setUserName] = useState("")

    useEffect(() => {
        let loggedInUser = localStorage.getItem("loggedInUser")
        loggedInUser = loggedInUser ? JSON.parse(loggedInUser) : null;
        setUserName(loggedInUser.email)
    }, [])

    useEffect(() => {
        let loggedInUser = localStorage.getItem("loggedInUser")
        loggedInUser = loggedInUser ? JSON.parse(loggedInUser) : null;
        fetch(`http://localhost:5000/userleave/${loggedInUser.email}/myleave`)
            .then(function (res) {
                return res.json()
            }).then(function (result) {
                console.log("Result : ", result)
                setLeaves(result)
            })
    },[])

    return (
        <div>
            <UserHeader />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">UserName</th>
                        <th scope="col">Leave Type</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Status</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) => {
                        return (
                            <tr>
                                <td>{leave.username}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.reason}</td>
                                <td>
                                    {leave.status === "approved" && <span class="badge bg-success">{leave.status}</span>}
                                    {leave.status === "pending" && <span class="badge bg-secondary">{leave.status}</span>}
                                    {leave.status === "rejected" && <span class="badge bg-info text-dark">{leave.status}</span>}
                                </td>
                                <td>{leave.startDate}</td>
                                <td>{leave.endDate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default MyLeave;