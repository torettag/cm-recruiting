import React from 'react'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Activitymon.css';
import moment from 'moment';



class Activitymon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activity: [] };
    this.epi = new epi();
  }

  componentDidMount () {
    let activity = this.props.referralsStore.activity;

    activity = activity.sort((a,b) => {
      return new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime()
    })

    this.setState({ activity });
    console.log("ACTIVITY?: ", activity);
  }


  render () {
    return (
      <div>
        { this.state.activity.length ?
          <div id='activitymon' className='view-container'>
            <section className=''>
              <div className='flex-col'>
                <div className='subhead'>Activity Monitor</div>
                  <div className='activityitembox'>
                  {
                    this.state.activity.map( (event,i) => {
                      return (
                        <section key={i} id='activitytextblock'>
                          <div className='flex-row'>
                            <div className='circle'></div><span className='activitytext'>Your referral {event.firstName} {event.lastName} has a status update: {event.activity}<span className='activitytime'>{moment(event.activityDate).fromNow()}</span></span>
                          </div>
                        </section>
                      );
                    })
                  }
                  </div>
              </div>
            </section>
          </div>
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

export default connect(mapStateToProps)(Activitymon)







