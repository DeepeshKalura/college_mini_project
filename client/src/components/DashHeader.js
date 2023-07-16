import { Link } from 'react-router-dom';

const DashHeader = () => {
    const content = (
        <div className="dash-header">
            <div class="dash-header__container">
                <Link to="dash/notes" >
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {

                    }
                </nav>
            </div>

        </div>
    );
    return content;
}

export default DashHeader;