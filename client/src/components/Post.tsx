import { Avatar, Typography } from 'antd'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faBookmark, faShareFromSquare } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import '../styles/post.css'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

const Post:FC = () => {
  const { Title, Paragraph, Text } = Typography

  return (
    <div className="post">
      <div className="votes">
        <ArrowUpOutlined />
        <Text>0</Text>
        <ArrowDownOutlined />
      </div>
      <div className="details">
        <div className="post-user">
          <Avatar />
          <div>
            <Title level={5}>username</Title>
            <Text style={{ fontSize: '0.7rem' }}>hours ago</Text>
          </div>
        </div>

        <div className="title">
          <Title level={4}>Post Title</Title>
        </div>
        <div className="para">
          <Paragraph>
            Ant Design, a design language for background applications, is refined by Ant UED Team.
          </Paragraph>
        </div>
        <div className="social-media">
          <div className="icon">
            <FontAwesomeIcon icon={faComment} />
            <Title level={5}>comments</Title>
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
