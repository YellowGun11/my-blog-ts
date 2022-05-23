import { useEffect } from 'react'
import "./index.css";

export default function Header() {
  return (
    <div className='head'>
      <div className='head_logo'>YellowGun's Blog</div>
      <div className='head_nav'>
        <a href="/">
          首页
        </a>
        <a href="/photo">
          照片
        </a>
        <a href="/classify">
          分类
        </a>
        <a href="/about">
          关于
        </a>
      </div>
    </div>
  )
}