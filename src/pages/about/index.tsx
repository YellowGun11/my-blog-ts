import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { AboutState, actions } from '../../redux/modules/about'
import { CombinedState } from '../../redux/modules/index'
import './index.css';

function About(props:Props) {
  useEffect(()=>{
    props.getAbout()
  }, [])

  return (
    <div className='about'>
      <div className='about-banner'>
        {
          props.aboutData && <img src={props.aboutData.imgUrl} alt="" />
        }
      </div>
      {
        props.aboutData && <div className='about-content' dangerouslySetInnerHTML={{__html:props.aboutData.content}} />
      }
    </div>
  )
}

const mapStateToProps = (state: CombinedState): AboutState => {
  return {
    ...state.aboutReducer
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(actions,dispatch)
  }
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)