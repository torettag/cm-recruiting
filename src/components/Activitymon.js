import React from 'react'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Activitymon.css';


class Activitymon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activity: [] };
    this.epi = new epi();
  }

  componentDidMount () {
    let activity = this.props.referralsStore.activity;
    this.setState({ activity });
  }

  render () {
    return (
      <section>
      </section>
    )
  }

  // render () {
  //   return (
  //     <section>
  //       { this.state.activity.length ?
  //         <div id='activitymon' className='view-container'>
  //           <section className=''>
  //             <div className='flex-col'>
  //               <div className='subhead'>Activity Monitor</div>
  //               <section id='activitytextblock'>
  //                 <div className='flex-row'>
  //                   <div className='circle'></div><span className='activitytext'>This is a test activity here<span className='activitytime'> 60 seconds ago</span></span>
  //                 </div>
  //                 <div className='flex-row'>
  //                   <div className='circle'></div><span className='activitytext'>This is a test activity here<span className='activitytime'> 24 hours ago</span></span>
  //                 </div>
  //                 <div className='flex-row'>
  //                   <div className='circle'></div><span className='activitytext'>This is a test activity here<span className='activitytime'> 2 day ago</span></span>
  //                 </div>
  //                 <div className='flex-row'>
  //                   <div className='circle'></div><span className='activitytext'>This is a test activity here<span className='activitytime'> 4 days ago</span></span>
  //                 </div>
  //               </section>

  //             </div>
  //           </section>
  //         </div>
  //       : null }
  //     </section>
  //   )
  // }
}

function mapStateToProps(store){
  return {
    referralsStore: store.reducers.referrals
  }
}

export default connect(mapStateToProps)(Activitymon)







