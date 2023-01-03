import { Avatar, Typography } from 'antd'
import { FC } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faBookmark, faShareFromSquare } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import '../styles/post.css'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import IPostProp from '../interfaces/props/IPostProp'

const Post:FC<IPostProp> = ({ post }) => {
  const { Title, Paragraph, Text } = Typography
  const navigate = useNavigate()
  const navigateTo = ():void => {
    navigate(`/posts/${post.id}`)
  }

  return (
    <div
      className="post"
      key={post.id}
      onClick={navigateTo}
      aria-hidden="true"
    >
      <div className="votes">
        <ArrowUpOutlined />
        <Text>0</Text>
        <ArrowDownOutlined />
      </div>
      <div className="details">
        <div className="post-user">
          <Avatar src={post.user.profileImg} />
          <div>
            <Title level={5}>{post.user.username}</Title>
            <Text style={{ fontSize: '0.7rem' }}>
              {moment(post.createdAt).fromNow()}
            </Text>
          </div>
        </div>

        <div className="title">
          <Title level={4}>{post.title}</Title>
        </div>
        <div className="para">
          <Paragraph>
            {post.content}
          </Paragraph>
        </div>
        <div className="social-media">
          <div className="icon">
            <FontAwesomeIcon icon={faComment} />
            <Title level={5}>
              <Text style={{ paddingRight: '5px' }}>
                {post.comments?.length > 0 && post.comments?.length}
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
