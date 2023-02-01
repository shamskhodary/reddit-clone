import { Avatar, message, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment, faBookmark, faShareFromSquare, faCircleXmark,
} from '@fortawesome/free-regular-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import '../styles/post.css'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import IPostProp from '../interfaces/props/IPostProp'
import ApiService from '../services/ApiService'
import { useAuth } from '../context/authUser'

const Post:FC<IPostProp> = ({ post }) => {
  const { Title, Text } = Typography
  const navigate = useNavigate()
  const { user } = useAuth()
  const [total, setTotal] = useState<number>(0)
  const [votedUp, setVotedUp] = useState<boolean>(false)
  const [votedDown, setVotedDown] = useState<boolean>(false)
  const [clicked, setClicked] = useState<boolean>(false)
  const [deleted, setDeleted] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)

  const navigateTo = ():void => {
    navigate(`/posts/${post.id}`)
  }
  const handleVoteUp = async ():Promise<void> => {
    try {
      await ApiService.post(`/api/v1/posts/${post.id}/votes/up`, {})
      if (user) {
        setVotedUp(!votedUp)
      }
    } catch (error:any) {
      message.error(error.response.data.message)
    }
  }

  const handleVoteDown = async ():Promise<void> => {
    try {
      await ApiService.post(`/api/v1/posts/${post.id}/votes/down`, {})
      if (user) {
        setVotedDown(!votedDown)
      }
    } catch (error:any) {
      message.error(error.response.data.message)
    }
  }
  useEffect(() => {
    const allVotes = async ():Promise<void> => {
      const totalVotes = await ApiService.get(`/api/v1/posts/${post.id}/votes/total`)
      if (totalVotes.status === 200) {
        setTotal(totalVotes.data)
      }
    }
    allVotes()
  }, [post.id, votedUp, votedDown])

  const handleSave = async ():Promise<void> => {
    try {
      const response = await ApiService.post(`/api/v1/posts/${post.id}/saves`, {})
      if (response.data) {
        post.saved = true
        setDeleted(false)
        setClicked(true)
      }
    } catch (error:any) {
      message.error(error.response.data.message)
    }
  }

  const handleUnSave = async ():Promise<void> => {
    try {
      let id = 0

      post.saves.map((e:any) => {
        if (e?.postId === post.id) {
          id = e.id
        }
        return id
      })

      const response = await ApiService.delete(`/api/v1/posts/${post.id}/saves/${id}`)
      if (response.data) {
        post.saved = false
        setDeleted(true)
        setClicked(false)
      }
    } catch (error:any) {
      message.error(error.response.data.message)
    }
  }

  useEffect(():any => {
    if (deleted && !clicked) {
      handleUnSave()
    }
    if (clicked && !deleted) {
      handleSave()
    }
  }, [post.saved])

  useEffect(() => {
    const allComments = async ():Promise<void> => {
      const response = await ApiService.get(`/api/v1/posts/${post.id}/comments/count`)
      setCount(response.data)
    }
    allComments()
  }, [post.id])

  return (
    <div
      className="post"
      key={post.id}
    >
      <div className="votes">
        <ArrowUpOutlined onClick={handleVoteUp} />
        <Text>{total}</Text>
        <ArrowDownOutlined onClick={handleVoteDown} />
      </div>
      <div
        className="details"
      >
        <div className="post-user">
          <Avatar src={post.user?.profileImg} />
          <div>
            <Title level={5}>{post.user?.username}</Title>
            <Text style={{ fontSize: '0.7rem' }}>
              {moment(post.createdAt).fromNow()}
            </Text>
          </div>
        </div>

        <div
          className="title"
          onClick={navigateTo}
          aria-hidden="true"
        >
          <Title level={4}>{post?.title}</Title>
        </div>
        <div
          className="para"
          onClick={navigateTo}
          aria-hidden="true"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        {post?.postImg && <img src={post?.postImg} alt="" />}
        <div className="social-media">
          <div
            className="icon"
            onClick={() => navigate(`posts/${post.id}`)}
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={faComment} />
            <Title level={5}>
              <Text style={{ paddingRight: '5px' }}>
                {count > 0 && count}
              </Text>

              comments
            </Title>
          </div>
          <div className="icon">
            {' '}
            <FontAwesomeIcon icon={faShareFromSquare} />
            <Title level={5}>share</Title>

          </div>
          <div
            className="icon"
            aria-hidden="true"
          >
            {(post.saved) ? (
              <FontAwesomeIcon
                icon={faCircleXmark}
                onClick={handleUnSave}
              />
            ) : <FontAwesomeIcon icon={faBookmark} onClick={handleSave} /> }

            <Title level={5}>{post.saved ? 'unsave' : 'save'}</Title>
          </div>

          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>

    </div>

  )
}

export default Post
