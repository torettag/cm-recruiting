import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import ga from 'react-ga'
import epi from '../services/epi'
import '../styles/Sidemenu.css';


class Sidemenu extends React.Component {
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
      <div id='sidemenu' className='view-container'>
        <section className=''>
          <div className='flex-col'>
            <ul>
              <li><a href="#home">DASHBOARD</a></li>
              <li><a href="#news">ADD RECRUITS</a></li>
              <li><a href="#contact">VIEW JOB LIST</a></li>
            </ul>
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

export default connect(mapStateToProps)(Sidemenu)






