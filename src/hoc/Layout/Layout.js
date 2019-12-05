import React, {Component} from 'react';
import './Layout.scss'

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Layout'>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;
