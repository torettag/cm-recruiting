import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Tasks.css';


class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { referrals: []};
    this.epi = new epi();
  }

  componentDidMount () {
    let referrals = this.props.referralsStore.referrals;


    //find the task to perform
    referrals.forEach( (referral) => { 
      //has not completed the application
      if (referral.referredCouncilMemberIsLead)
        referral.task = { reason: 'apply', referralTask: 'Has not completed the application', sponsorTask: 'Follow up'  };
      //has not signed the terms
      else if (!referral.referredCouncilMemberSignedTerms)
        referral.task = { reason: 'terms', referralTask: 'Has not signed the terms and conditions', sponsorTask: 'Help them sign the T&Cs'};
      //has not set a rate
      else if (!referral.referredCouncilMemberSetRate )
        referral.task = { reason: 'rate', referralTask: 'Has not set a rate', sponsorTask: 'Help them set a rate'};
      //has not accepted project
      else if (referral.referredCouncilMemberInvitedConsultationId)
        referral.task = { reason: 'accept', referralTask: 'Has not accepted a project', sponsorTask: 'Help them to accept'};
    })

    //filter only to referrals that need tasks completed
    referrals = referrals.filter( (referral) => { return referral.task })


    this.setState({ referrals });

  }

  render () {
    return (
      <div className='view-container'>
        <section id='tasks' className=''>
          <div className='flex-col'>
            <h1>Tasks</h1>
            
            { this.state.referrals.map( (referral) => {
                return(
                  <div className='task-child' key={referral.referredCouncilMemberCouncilMemberId}>

                    <div className='flex-col'>
                      <div className='flex-row'>
                        <div className='task-child-headline'>
                          <p>
                            {referral.referredCouncilMemberFirstName} {referral.referredCouncilMemberLastName}<br/> 
                            {referral.task.referralTask}
                          </p>
                        </div>
                        <div className='task-child-close'>
                          <span className="icon-close_icon"></span>
                        </div>
                      </div>
                      <div className='flex-row'>
                        <div className='action-alert-container'>
                          <span className="icon-alert_icon"></span>
                        </div>
                        <div className='action-name-container'>
                          {referral.task.sponsorTask}
                        </div>
                        <div className='action-button'>
                          <span className="icon-redarrow_icon"></span>
                        </div>
                      </div>
                    </div>

                  </div>
                )
              }) 
            }
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

export default connect(mapStateToProps)(Tasks)