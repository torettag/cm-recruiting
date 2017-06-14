import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Sidemenu.css';


class Sidemenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }


  componentWillMount() {

  }

  componentDidMount () {

  }

  render () {
    return (
      
      <div id='sidemenu' className='view-container'>
      { !this.props.appSettingsStore.focusMode ?
        <section className=''>
          <div className='flex-col'>
            <span className="icon-dash_icon"></span>
            <span className="icon-addcontact_icon"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
            <span className="icon-joblist_icon"></span>
            <ul>
              <li><a href="#home">DASHBOARD</a></li>
              <li><a href="#news">ADD RECRUITS</a></li>
              <li><a href="#contact">VIEW JOB LIST</a></li>
            </ul>
          </div>
        </section>
        : null }
      </div>
      
    )
  }
}

function mapStateToProps(store){
  return {
    appSettingsStore: store.reducers.appSettings
  }
}

export default connect(mapStateToProps)(Sidemenu)







