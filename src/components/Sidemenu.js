import React from 'react'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Sidemenu.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';


class Sidemenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeActive : true,
      jobsActive : false
    };
    this.epi = new epi();
  }

  
  locationChange(location) {

    if (location ==='#/') {
    
      this.setState( { homeActive : true });
      this.setState( { jobsActive : false });
      this.setState( { recruitsActive : false });
      console.log("Location is DASH");
     
     
    }
    if (location ==='#/jobs') {
      
      this.setState( { jobsActive : true });
      this.setState( { homeActive : false });
      this.setState( { recruitsActive : false });
      console.log("Location is JOBS");

    }
    if (location ==='#/recruits') {
      
      this.setState( { recruitsActive : true});
      this.setState( { jobsActive : false});
      this.setState( { homeActive : false });
      
      console.log("Location is RECRUITS");

    }


    
    window.location = location;
    console.log('READING LOCATION AS:',location)
  }


  componentWillMount() {

  }

  componentDidMount () {

  }

  render () {

    var home = classnames({
      'homeActive': this.state.homeActive ? true : false
    }); 

    var jobs = classnames({
      'jobsActive': this.state.jobsActive ? true : false
    });

    var recruits = classnames({
      'recruitsActive': this.state.recruitsActive ? true : false
    });     

    return (
      
      <div id='sidemenu' className='view-container'>
      { !this.props.appSettingsStore.focusMode ?
        <section className=''>
          <div className='flex-col'>
            <span className="icon-dash_icon"></span>
            <span className="icon-addcontact_icon"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
            <span className="icon-joblist_icon"></span>
            <ul>
              <Link to='/'><li className={home}><a onClick={(e) => this.locationChange('#/')}>DASHBOARD</a></li></Link>
              <Link to='/recruits'><li className={recruits}><a onClick={(e) => this.locationChange('#/recruits')}>ADD RECRUITS</a></li></Link>
              <Link to='/jobs'><li className={jobs}><a onClick={(e) => this.locationChange('#/jobs')}>VIEW JOB LIST</a></li></Link>
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







