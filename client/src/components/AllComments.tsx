import { FC, useEffect, useState } from 'react'
import { Typography, Avatar } from 'antd'
import '../styles/details.css'
import ApiService from '../services/ApiService'
import { IComments } from '../interfaces'

const { Title, Paragraph, Text } = Typography

const AllComments:FC<{postId: string | undefined}> = ({ postId }) => {
  const [comments, setComments] = useState<IComments[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const allComments = async ():Promise<void> => {
      try {
        const response = await ApiService.get(`/api/v1/posts/${postId}/comments`)
        if (response.status === 200) {
          setComments(response.data)
        }
      } catch (error) {
        setComments(null)
      }
    }

    allComments()
  }, [postId])

  console.log(comments)
  return (
    <div className="my-comment">
      <div className="comment-owner">
        <Avatar />
        <Title level={5}>username</Title>
        <Text style={{ fontSize: '0.7rem' }}>
          {/* {moment(details?.createdAt).fromNow()} */}
          time
        </Text>
      </div>
      <Paragraph className="para-comment">Content</Paragraph>
    </div>
  )
}

export default AllComments
