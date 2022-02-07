import { Container, Spinner } from 'react-bootstrap'
import RootNav from './RootNav'

const LoadSpinner = () => <Spinner animation="grow" />

export const BodySpinner = () => <RootNav><Container><LoadSpinner /></Container></RootNav>

export default LoadSpinner
