import { Avatar, message, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faBookmark, faShareFromSquare } from '@fortawesome/free-regular-svg-icons'
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

  const navigateTo = ():void => {
    navigate(`/posts/${post.id}`)
  }
  // console.log(post.postImg)
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
        onClick={navigateTo}
        aria-hidden="true"
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

        <div className="title">
          <Title level={4}>{post?.title}</Title>
        </div>
        <div className="para">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        {post?.postImg && <img src={post?.postImg} alt="" />}
        <div className="social-media">
          <div className="icon">
            <FontAwesomeIcon icon={faComment} />
            <Title level={5}>
              <Text style={{ paddingRight: '5px' }}>
                {post?.comments?.length > 0 && post?.comments?.length}
              </Text>

              comments
            </Title>
          </div>
          <div className="icon">
            {' '}
            <FontAwesomeIcon icon={faShareFromSquare} />
            <Title level={5}>share</Title>

          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faBookmark} />
            <Title level={5}>save</Title>
          </div>

          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>

    </div>

  )
}

export default Post
