import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { DetailState, actions } from '../../redux/modules/detail'
import { CombinedState } from '../../redux/modules/index'

function Detail(props:Props) {
  useEffect(()=>{
    const { id, getDetailData } = props
    getDetailData(id)
  },[])
  return (
    <div>
      <div>
        <img src={props.detialData.imgUrl} alt="" />
      </div>
      <div>
        {props.detialData.title}
        {props.detialData.tag}
        {props.detialData.updateTime}
        {props.detialData.readNum}
      </div>
      { 
        props.detialData.content && 
        <div dangerouslySetInnerHTML={{__html:props.detialData.content}} />
      }
    </div>
  )
}

const mapStateToProps = (state: CombinedState): DetailState => {
  return {
    ...state.detailReducer
  }
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(actions,dispatch)
  }
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & { id: string }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)