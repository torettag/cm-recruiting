import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import epi from '../services/epi'
import '../styles/Referraltrack.css';


class Referraltrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

  componentDidMount () {
    //how many referrals in the last 30 days
    let referrals = this.props.referralsStore.referrals;

    let referralsInLast30Days = referrals.filter( (referral) => { return moment().subtract(30,'days') < moment(referral.referredCouncilMemberCreateDate) } )

    this.setState({ referralsInLast30Days })

  }

  render () {
    return (
      <div id='referraltrack' className='view-container'>
        
        { this.state.referralsInLast30Days ?
        <section className=''>

          <div className='flex-col'>
            <div className='subhead'>Referral Invites</div><br/>
            <div id='textblock' className='flex-row'>
            
              <div className='large-red-text'>{this.state.referralsInLast30Days.length}</div>
              <span className='large-desc-text'>in past<br/>30 days</span>
              
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

export default connect(mapStateToProps)(Referraltrack)







