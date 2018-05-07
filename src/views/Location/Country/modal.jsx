import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

export default class App extends React.Component {


    
    render() {
      
        return (
            <div>
                <Modal open={this.props.open} onClose={this.props.onClose} center>
                    
                </Modal>
            </div>
        );
    }
}


