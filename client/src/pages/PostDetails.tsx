import { Avatar, Typography, message } from 'antd'
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
import { useAuth } from '../context/authUser'

const { Title, Text } = Typography

const PostDetails:FC = () => {
  const [details, setDetails] = useState<IPosts | null>(null)
  const { id } = useParams()
  const { user } = useAuth()
  const [total, setTotal] = useState<number>(0)
  const [votedUp, setVotedUp] = useState<boolean>(false)
  const [votedDown, setVotedDown] = useState<boolean>(false)

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

  const handleVoteUp = async ():Promise<void> => {
    try {
      if (user) {
        await ApiService.post(`/api/v1/posts/${details?.id}/votes/up`, {})
        setVotedUp(!votedUp)
      }
    } catch (error:any) {
      message.error(error.response.data.message)
    }
  }

  const handleVoteDown = async ():Promise<void> => {
    try {
      if (user) {
        await ApiService.post(`/api/v1/posts/${details?.id}/votes/down`, {})
        setVotedDown(!votedDown)
      }
    } catch (error:any) {
      message.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const allVotes = async ():Promise<void> => {
      if (details?.id) {
        const totalVotes = await ApiService.get(`/api/v1/posts/${Number(details.id)}/votes/total`)
        if (totalVotes.status === 200) {
          setTotal(totalVotes.data)
        }
      }
    }

    allVotes()
  }, [details?.id, votedUp, votedDown])

  return (
    <>
      <Navbar />
      <div className="details-page">
        <div className="votes">
          <ArrowUpOutlined onClick={handleVoteUp} />
          <Text>{total}</Text>
          <ArrowDownOutlined onClick={handleVoteDown} />
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
            {details?.content && <div dangerouslySetInnerHTML={{ __html: details.content }} />}
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
