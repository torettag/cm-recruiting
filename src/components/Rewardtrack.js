import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment';

import epi from '../services/epi'
import '../styles/Rewardtrack.css';


class Rewardtrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

   componentDidMount () {
    //calculate the last reward
    let lastReward = 0;
    
    let referrals = this.props.referralsStore.referrals;

    //filter paid
    referrals = referrals.filter( (referral) => { return referral.referralBonus } )

    if (referrals.length){
      //sort by date
      referrals = referrals.sort( (a,b) => { return moment(b.referredCouncilMemberCreateDate) + moment(b.referredCouncilMemberCreateDate) } )
      lastReward = referrals.splice(0,1)[0].referralBonus;
    }
    this.setState({ lastReward })
  }

  render () {
    return (
      <div id='rewardtrack' className='view-container'>
        <section className=''>
          <div className='flex-col'>

            <div className='subhead'>Last Reward</div><br/>
            <div id='textblock' className='flex-row'>
              <div className='large-red-text'>${this.state.lastReward}</div>
            </div>

          </div>
        </section>

      </div>
    )
  }
}

function mapStateToProps(store){
  return {
    referralsStore: store.reducers.referrals
  }
}

export default connect(mapStateToProps)(Rewardtrack)







