import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import Interested from "../components/Interested"

const SearchResult = () => {

    const [result, setResult] = useState([])

    let { jobName } = useParams()

    useEffect(() => {
        setResult([])
        axios.get(`jobSearch/${jobName}`)
            .then(res => {
                console.log(res.data)
                setResult(res.data)
            })
    }, [jobName])

    //sends request to back end to create job from search
    function addJobfromSearch(item) {
        let job = {
            company_name: item.company_name,
            job_title: item.title,
            description: item.description,
            link: item.detail_url,
        }
        axios.post('jobs', job)
            .then(request => (console.log('job added')))
    }

    return (
        <div>
            <NavBar />
            {result.length > 0 ?
                <div className="container-fluid">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>COMPANY</td>
                                <td>JOB TITLE</td>
                                <td>LOCATION</td>
                                <td>ACTIONS</td>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.company_name}</td>
                                    <td>{item.title}</td>
                                    <td>{item.city}, {item.state} </td>
                                    <td><a href={item.detail_url} target="blank"><button>More Info</button></a></td>
                                    <td><Interested addJobfromSearch={addJobfromSearch} item={item} /></td>
                                    {/* <td><button onClick={()=>addJobfromSearch(item) }>Interested</button></td> */}
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div> :
                <img src="https://media1.giphy.com/media/Qc8UoA7NJqx70SfiCL/giphy.gif"
                    alt="loading"
                    style={{
                        height: "200px",
                        width: "20%",
                        marginLeft: "40%"
                    }} />
            }
        </div>
    )
}

export default SearchResult