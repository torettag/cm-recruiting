import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Referraltrack.css';


class Referraltrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

  componentDidMount () {

  }

  render () {
    return (
      <div id='referraltrack' className='view-container'>
        <section className=''>
          <div className='flex-col'>
            <div className='subhead'>Referral Invites</div><br/>
            <div id='textblock' className='flex-row'>
              <div className='large-red-text'>50</div>
              <span className='large-desc-text'>in past<br/>30 days</span>
            </div>
          </div>
        </section>

      </div>
    )
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(Referraltrack)







