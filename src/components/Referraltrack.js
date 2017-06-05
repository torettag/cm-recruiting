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
    let referrals = this.props.referralsStore.referrals;

    let referralsInLast30Days = referrals.filter( (referral) => { return moment().subtract(30,'days') < moment(referral.referredCouncilMemberCreateDate) } )

    this.setState({ referralsInLast30Days })

  }

  render () {
    return (
      <div id='referraltrack' className='view-container'>
        <section className=''>
          <div className='flex-col'>
            <p>REFERRAL TRACKING</p>
            { this.state.referralsInLast30Days ?
              <p>{this.state.referralsInLast30Days.length}</p>
            : null }
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

export default connect(mapStateToProps)(Referraltrack)







