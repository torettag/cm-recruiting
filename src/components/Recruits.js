import React from 'react'
// import { Link } from 'react-router'

import { connect } from 'react-redux'
import ga from 'react-ga'
import epi from '../services/epi'
import '../styles/Home.css';
import Sidemenu from '../components/Sidemenu';
import Welcomestatus from '../components/Welcomestatus';


class Recruits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

  componentDidMount () {
    ga.pageview('/recruits');
  }

  render () {
    return (
      <div id='recruits'>
        <section className=''>

          <div className='flex-row'>
            <Sidemenu/>
            <div className='flex-col'>
              <Welcomestatus/>
              <div className='flex-row'>
                This is the jobs page.
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



export default connect(mapStateToProps)(Recruits)