'use client'

import { Col, Row } from 'antd'

import { TodoProvider } from '../contexts/TodoContext'

import NewTodo from '../components/NewTodo/NewTodo'
import UnorderedList from '../components/UnorderedList/UnorderedList'

export default function Home (): JSX.Element {
  return (
    <TodoProvider>
      <Row>
        <Col span={12} offset={6}>
          <NewTodo />
        </Col>
      </Row>

      <Row>
        <Col span={12} offset={6}>
          <UnorderedList />
        </Col>
      </Row>
    </TodoProvider>
  )
}