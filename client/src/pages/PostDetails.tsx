import { Avatar, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faBookmark, faShareFromSquare } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { Comments, Navbar } from '../components'
import '../styles/details.css'
import ApiService from '../services/ApiService'
import IPosts from '../interfaces/IPosts'

const { Title, Paragraph, Text } = Typography

const PostDetails:FC = () => {
  const [details, setDetails] = useState<IPosts | null>(null)
  const { id } = useParams()

  useEffect(() => {
    const postInfo = async ():Promise<void> => {
      try {
        const response = await ApiService.get(`/api/v1/posts/${id}`)
        setDetails(response.data)
      } catch (error) {
        setDetails(null)
      }
    }
    postInfo()
  }, [id])

  return (
    <>
      <Navbar />
      <div className="details-page">
        <div className="votes">
          <ArrowUpOutlined />
          <Text>0</Text>
          <ArrowDownOutlined />
        </div>
        <div className="details">
          <div className="post-user">
            <Avatar src={details?.user.profileImg} />
            <div>
              <Title level={5}>{details?.user.username}</Title>
              <Text style={{ fontSize: '0.7rem' }}>
                {moment(details?.createdAt).fromNow()}
              </Text>
            </div>
          </div>

          <div className="title">
            <Title level={4}>{details?.title}</Title>
          </div>
          <div className="para">
            <Paragraph>
              {details?.content}
            </Paragraph>
          </div>
          <div className="social-media">
            <div
              className="icon"
              onClick={() => {}}
              aria-hidden="true"
            >
              <FontAwesomeIcon icon={faComment} />
              <Title level={5}>
                <Text style={{ paddingRight: '5px' }}>{details?.comments?.length}</Text>

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
      <Comments />

    </>

  )
}

export default PostDetails
