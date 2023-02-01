import { Typography } from 'antd'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faBookmark, faShareFromSquare } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import ISaves from '../interfaces/ISaves'

const { Title, Text } = Typography

const Saves:FC<{data: ISaves}> = ({ data }) => {
  console.log()
  return (
    <div className="post-saved">
      <div className="votes">
        <ArrowUpOutlined />
        <Text>0</Text>
        <ArrowDownOutlined />
      </div>
      <div className="content">
        <div className="content-img">
          <img src={data.posts.postImg} alt="example" />
        </div>
        <div className="details">
          <Title level={4}>{data.posts.title}</Title>
          <Text style={{ fontSize: '0.8rem' }}>
            posted by
            {' '}
            {data.data}
          </Text>
          <div className="social-media">
            <div className="icon">
              <FontAwesomeIcon icon={faComment} />
              <Title level={5}>
                <Text style={{ paddingRight: '5px' }}>
                  {0}
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
    </div>
  )
}

export default Saves
