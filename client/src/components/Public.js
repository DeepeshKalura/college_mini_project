import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Rahul Singh Repairs!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Foo City, Rahul Singh Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Rahul Singh Repairs<br />
                    555 Foo Imaginary<br />
                    Foo City, CA 12345<br />
                    <a href="tel:+15555555555">+91 55555-55555</a>
                </address>
                <br />
                <p>Owner: Rahul Singh</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public