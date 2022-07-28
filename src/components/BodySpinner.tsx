import { Container } from 'react-bootstrap'
import RootNav from './RootNav'
import { LoadSpinner } from './LoadSpinner'

// eslint-disable-next-line import/prefer-default-export
export const BodySpinner = () => <RootNav title="Loading"><Container><LoadSpinner /></Container></RootNav>
