import React from 'react'
import { Image } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import '../assets/css/ImageAnimated.css'

const ImageAnimated: React.FC<any> = ({ images }) => {
  const animation = images[0].animation
  const delay = images[0].delay
  let imageList
  if (images[0].filename[0].length == 1) {
    imageList = images.map((i: any, indx: any) => (
      <Carousel.Item key={Math.random()} className='imgAnimated'>
        <Image className='d-block w-100' src={'../src/assets/img/mediatheque/' + i.filename} />
      </Carousel.Item>
    ))
  } else {
    imageList = images[0].filename.map((i: any, ind: any) => (
      <Carousel.Item key={Math.random()} className='imgAnimated'>
        <Image className='d-block w-100' src={'../src/assets/img/mediatheque/' + i} />
      </Carousel.Item>
    ))
  }

  return animation == 'slide' ? (
    <>
      <Carousel variant='dark' slide pause={false} interval={delay} controls={false}>
        {imageList}
      </Carousel>
    </>
  ) : (
    <>
      <Carousel variant='dark' fade pause={false} interval={delay} controls={false}>
        {imageList}
      </Carousel>
    </>
  )
}

export default ImageAnimated
