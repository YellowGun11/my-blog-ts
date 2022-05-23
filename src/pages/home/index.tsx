import { useEffect } from 'react';
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import {
  EnvironmentOutlined,
  GithubOutlined,
  InstagramOutlined,
  TwitterOutlined,
  WeiboOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import './index.css';
import { HomeState, actions } from '../../redux/modules/home'
import { CombinedState } from '../../redux/modules/index'

function Home(props:Props) {
  useEffect(() => {
    props.getHomeList(1,10)
    props.getUserData()
  }, [])

  return (
    <div className='main'>
      {/* <div>{text}</div>
        <button onClick={changeText}>change</button>
        <div>{len}</div> */}
      <div className='content'>
        {
          props.articleList && props.articleList.map(item => {
            return (
              <div className='content_box' key={item.id}>
                <div className='content_box_img'>
                  <img src={item.imgUrl}></img>
                </div>
                <div className='content_box_text'>
                  <h2 className='content_box_text_title'>
                    {item.title}
                  </h2>
                  <div className='content_box_text_date'>{item.createTime}</div>
                  <div className='content_box_text_des'>
                    {item.des}
                  </div>
                  <div className='content_box_text_tag'>
                    {
                      item.tag && item.tag.map(value => {
                        return <Tag key={value} color="#87d068">{value}</Tag>
                      })
                    }
                  </div>
                  <div className='content_box_text_button'>
                    <EllipsisOutlined />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='right'>
        <div className='author'>
          <div className='author_avatar'>
            <img src='/images/avtor.jpg'></img>
          </div>
          <div className='author_name'>{props.userInfo.name}</div>
          <div className='author_intro'>
            {props.userInfo.des}
          </div>
          <div className='author_location'>
            <EnvironmentOutlined /> {props.userInfo.location}
          </div>
          {
            props.userInfo.social && props.userInfo.social.length===4 ? (
              <div className='author_contact'>
                <a
                  href={props.userInfo.social[0]}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubOutlined />
                </a>
                <a
                  href={props.userInfo.social[1]}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramOutlined />
                </a>
                <a
                  href={props.userInfo.social[2]}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterOutlined />
                </a>
                <a
                  href={props.userInfo.social[3]}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WeiboOutlined />
                </a>
              </div>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: CombinedState): HomeState => {
  return {
    ...state.homeReducer
  }
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(actions,dispatch)
  }
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)