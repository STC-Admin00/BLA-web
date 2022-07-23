import { Link } from "react-router-dom";

const Directory = () => {
    return (
        <section>
            <h1>Hello there!</h1>
            <br />
            <h2>Please choose your destination below.</h2>
            <br />
            <Link to="/userProfile">User Suite</Link>
            <Link to="/authorProfile">Author Suite</Link>
            <Link to="/adminProfile">Admin Suite</Link>
        </section>
    )
}

export default Directory;