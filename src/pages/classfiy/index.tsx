import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import {
  EllipsisOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import { ClassifyState, actions as classifyActions } from '../../redux/modules/classify'
import { HomeState, actions as homeActions } from '../../redux/modules/home'
import { CombinedState } from '../../redux/modules/index'
import { Pagination } from '../home/data.d'
import './index.css'

type Select = string | undefined

function Classify(props: Props) {
  const [selected, setSelected] = useState<Select>(undefined)

  useEffect(()=>{
    getArticleData(0,10)
    props.getClassifyList()
  },[])

  const getArticleData =(beginIndex:number, limit:number, type?:number) =>{
    props.getHomeList(beginIndex,limit,type)
  }

  const chooseClassify = (id:string) => {
    setSelected(id)
  }

  return (
    <div className='main'>
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
        <div className='tag_box'>
          <div className='tag_box-title'>分类标签</div>
          {
            props.classifyList && props.classifyList.map(item => {
              return <li key={item.id} className={selected===item.id?'tag_box-title_li tag_box-title_li_checked':'tag_box-title_li'} onClick={()=>chooseClassify(item.id)}>{item.name}</li>
            })
          }
        </div>
      </div>
    </div> 
  )
}

const mapStateToProps = (state: CombinedState): ClassifyState & HomeState => {
  return {
    ...state.classifyReducer,
    ...state.homeReducer
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(classifyActions,dispatch),
    ...bindActionCreators(homeActions,dispatch),
  }
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classify)