import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import ga from 'react-ga'
import epi from '../services/epi'
import '../styles/Home.css';
import Sidemenu from '../components/Sidemenu';
import Welcomestatus from '../components/Welcomestatus';
import Tasks from '../components/Tasks';

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
      <div id='home' className='view-container'>
        <section className=''>

          <div className='flex-row'>
            <Sidemenu/>
            <div className='flex-col'>
              <Welcomestatus/>
              <div className='flex-row'>
                <Tasks/>
              </div>
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



export default connect(mapStateToProps)(Home)