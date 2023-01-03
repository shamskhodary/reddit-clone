import { FC, useEffect, useState } from 'react'
import { Typography, Avatar } from 'antd'
import '../styles/details.css'
import { LoadingOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import ApiService from '../services/ApiService'
import { IComments } from '../interfaces'

const { Title, Text } = Typography

const AllComments:FC <{isCommented: boolean}> = ({ isCommented }) => {
  const postId = useParams().id
  const [comments, setComments] = useState<IComments[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const allComments = async ():Promise<void> => {
      setLoading(true)
      try {
        const response = await ApiService.get(`/api/v1/posts/${postId}/comments`)
        if (response.status === 200) {
          setComments(response.data)
        }
        setLoading(false)
      } catch (error) {
        setComments(null)
        setLoading(false)
      }
    }

    allComments()
  }, [postId, isCommented])

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {loading ? <LoadingOutlined /> : comments?.map((e) => (
        <div className="my-comment" key={e.id}>
          <div className="comment-owner">
            <Avatar src={e.user?.profileImg} />
            <Title level={5}>{e.user?.username}</Title>
            <Text style={{ fontSize: '0.7rem' }}>
              {moment(e.createdAt).fromNow()}
            </Text>
          </div>
          <div dangerouslySetInnerHTML={{ __html: e.content }} />
        </div>
      ))}
    </div>

  )
}

export default AllComments
