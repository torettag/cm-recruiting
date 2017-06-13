import React from 'react'
import { connect } from 'react-redux'
import mustache from 'mustache'
import moment from 'moment'
import epi from '../services/epi'
import '../styles/Tasks.css';


class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { referrals: []};
    this.epi = new epi();
    this.pageLoad = this.pageLoad.bind(this);
  }

  pageLoad () {
    let referrals = this.props.referralsStore.referrals;

    //filter to referrals you did not skip
    referrals = referrals.filter( (referral) => { return !referral.isCouncilMemberReferralFollowUpSkip })

    //find the task to perform
    referrals.forEach( (referral) => { 
      //has not completed the application
      if (referral.referredCouncilMemberIsLead)
        referral.task = { priority: 1, reason: 'apply', referralTask: 'Has not completed the application', sponsorTask: 'Follow up'  };
      //has not set a rate
      else if (!referral.referredCouncilMemberSetRate )
        referral.task = { priority: 4, reason: 'rate', referralTask: 'Has not set a rate', sponsorTask: 'Help them set a rate'};
      //has not signed the terms
      else if (!referral.referredCouncilMemberSignedTerms)
        referral.task = { priority: 2, reason: 'terms', referralTask: 'Has not signed the terms and conditions', sponsorTask: 'Help them sign the T&Cs'};
      //has not accepted project
      else if (referral.referredCouncilMemberInvitedConsultationId)
        referral.task = { priority: 3, reason: 'accept', referralTask: 'Has not accepted a project', sponsorTask: 'Help them to accept'};
    })

    //filter only to referrals that need tasks completed
    referrals = referrals.filter( (referral) => { return referral.task })

    //sort priority and by newest referral
    referrals = referrals.sort( (a, b) => {  
      if (a.task.priority !== b.task.priority)
        return a.task.priority - b.task.priority;
      else
        return moment(a.referredCouncilMemberCreateDate) + moment(b.referredCouncilMemberCreateDate);
    })


    this.setState({ referrals });
  }

  componentDidMount () {
    this.pageLoad();
  }

  followUpSkip (referredCouncilMemberId) {
    let props = this.props;
    this.epi.post('referral/insertCouncilMemberReferralFollowUpSkip.mustache')
    .then( () => {
      //find the referral
      let referral = props.referralsStore.referrals.find( (referral) => { return referral.referredCouncilMemberCouncilMemberId === referredCouncilMemberId })
      //mark skipped
      referral.isCouncilMemberReferralFollowUpSkip = true;
      //send it up to reducer
      props.dispatch({type:"setReferrals",value: props.referralsStore.referrals});

      this.pageLoad();
    })
  }

  render () {
    let cm = this.props.councilMemberStore.councilMember;

    return (
      <div className='view-container'>
        <section id='tasks' className=''>
          <div className='flex-col'>
            <h1>Tasks</h1>
            
            { this.state.referrals.map( (referral) => {
                let reasonMailToMap = {
                  'apply': { subject: 'Following up on your application to GLG', bodyTemplate: 'Please click on the following link to apply to GLG%0a%0ahttps://services.glgresearch.com/cm-profile/?referredByPersonId={{cm.Person_Id}}%26campaign=cm-recruiting' },
                  'terms': { subject: 'Sign the GLG Terms and Conditions', bodyTemplate: 'Please click on the following link to sign your GLG terms%0a%0ahttps://services.glgresearch.com/redirect-next' }, 
                  'rate': { subject: 'Set your GLG rate', bodyTemplate: 'Please click on the following link to set your GLG rate%0a%0ahttps://services.glgresearch.com/rate-recommender' },
                  'accept': { subject: 'Following up on your application to GLG', bodyTemplate: 'Please click on the following link to accept your GLG project%0a%0ahttps://services.glgresearch.com/cm_accept/nextProject?cpid={{referral.referredCouncilMemberInvitedConsultationParticipantId}}' } 
                }
                let body = mustache.render(reasonMailToMap[referral.task.reason].bodyTemplate, { referral, cm })
                let mailToLink = `mailto:${referral.referredCouncilMemberEmail}?Subject=${reasonMailToMap[referral.task.reason].subject}&body=${body}`

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
                        <div className='task-child-close' onClick={(e) => this.followUpSkip(referral.referredCouncilMemberCouncilMemberId)}>
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
                          <a href={ mailToLink }><span className="icon-redarrow_icon"></span></a>
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
    councilMemberStore: store.reducers.councilMember,
    referralsStore: store.reducers.referrals
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     referralDispatch: () => dispatch(updateImageAction()),
//   };
// };

export default connect(mapStateToProps)(Tasks)


