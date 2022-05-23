import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux'
import Macy from 'macy';
import { PhotoState, actions } from '../../redux/modules/photo'
import { CombinedState } from '../../redux/modules/index'
import './index.css';

function Photo(props:Props) {
  const [masonry, setMasonry] = useState<any>()

  useEffect(() => {
    // props.getList(0, 10)
    // getMacy()
    getList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const getList = async () => {
    await props.getPhotoList(1, 10)
    getMacy()
  }

  const getMacy = () => {
    if (masonry) {
      masonry.reInit()
    } else {
      let masonry = new Macy({
        container: '.macy-container', // 图像列表容器
        trueOrder: false,
        waitForImages: false,
        useOwnImageLoader: false,
        debug: false,
        margin: { x: 13, y: 8 },    // 设计列与列的间距
        columns: 4,    // 设置列数
      })
      setMasonry(masonry)
    }
  }

  return (
    <main className='main'>
      <div className='macy-container'>
        {
          props.photoList && props.photoList.map(item => {
            return (
              <div className='image-box' key={item.id}>
                <img src={item.imgUrl} alt={item.name} />
              </div>
            )
          })
        }
      </div>
    </main>
  )
}

const mapStateToProps = (state: CombinedState): PhotoState => {
  return {
    ...state.photoReducer
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
)(Photo)