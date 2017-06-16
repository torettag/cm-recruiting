import React from 'react'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Modal.css';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

  componentDidMount() {
     
    this.setState({ modalVisible: this.props.showModal })
  }

  closeButton() {
    this.setState({modalVisible: false});

  }

  render () {
    return (
    
      <div>
      { this.state.modalVisible ? 
        <section className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={(e) => this.closeButton()}>&times;</span>
              <h2>Welcome to the GLG Referral Dashboard</h2>
            </div>
            <div className="modal-body">
              <p>It looks like you've provided us with referrals in the past. This Dashboard is meant to help you follow up and earn a referral bonus with the recent candidates that you've referred to us.</p>
            </div>
            <div className="modal-footer">
              <h3>To get started look at your task list to see who you should follow up with.</h3>
            </div>
          </div>
        </section>
         : null }
      </div>
     
    )
  }
}

function mapStateToProps(store){
  return {
    referralsStore: store.reducers.referrals
  }
}

export default connect(mapStateToProps)(Modal)







