import React from 'react'
// import { Link } from 'react-router'

import { connect } from 'react-redux'
import ga from 'react-ga'
import epi from '../services/epi'
import '../styles/Home.css';
import Sidemenu from '../components/Sidemenu';
import Welcomestatus from '../components/Welcomestatus';
import Referraltrack from '../components/Referraltrack';
import Rewardtrack from '../components/Rewardtrack';
import Tasks from '../components/Tasks';
import Activitymon from '../components/Activitymon';
import Modal from '../components/Modal';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

  componentDidMount () {
    ga.pageview('/home');
  }

  render () {
    return (
      <div id='home'>
        <section className=''>

          <div className='flex-row'>
            <Sidemenu/>
            <div className='flex-col'>
              <Welcomestatus/>
              <div className='flex-row'>
                <Tasks />
                <div className='flex-col'>

                  <h1 id="h1">Key Information</h1>
                  <div className='flex-row'>
                    <Referraltrack/>
                    <Rewardtrack/>
                   { this.props.appSettingsStore.focusMode ?
                    <Modal showModal={this.props.appSettingsStore.focusMode}/>
                    : null }
                  </div>

                   <div className='activityholder'>
                    <Activitymon/>
                   </div>

                </div>
              </div>
            </div>
          </div>



        </section>

      </div>
    )
  }
}

function mapStateToProps(store){
  return {
    appSettingsStore: store.reducers.appSettings
  }
}



export default connect(mapStateToProps)(Home)