import React from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import { Container, Row, Col, Figure } from 'react-bootstrap'
import '../assets/css/homepage.css'
import { useStoreImg } from '../store/image'
import firebaseConfig from '../utils/firebase'

const ImageFixed: React.FC<any> = (props) => {
  return (
    <Figure className=''>
      <Figure.Image
        width={171}
        height={180}
        alt='171x180'
        src={`../../src/assets/img/mediatheque/${props.image}`}
      />
      <Figure.Caption>{props.name}</Figure.Caption>
    </Figure>
  )
}

export default ImageFixed
