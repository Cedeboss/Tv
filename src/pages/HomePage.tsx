import React from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../assets/css/homepage.css'
import firebaseConfig from '../utils/firebase'


const HomePage: React.FC<any> = () => {

  // Déclaration des constantes
  const [player, setPlayer] = React.useState<any[]>([])
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<any[]>([])
  const [backgroundSelected, setBackgroundSelected] = React.useState<any>('bg-homepage.jpg')
  const [nameSelected, setNameSelected] = React.useState<any>('')
  const [typeSelected, setTypeSelected] = React.useState<any>('')
  const [linkSelected, setLinkSelected] = React.useState<any>('')
  const [detailShow, setDetailShow] = React.useState<boolean>(false)


  // Get BDD from firebase
  React.useEffect(() => {
    initializeApp(firebaseConfig)
    const db = getDatabase()
    const starCountRef = ref(db, 'Player/')
    onValue(starCountRef, (snapshot: any) => {
      setData(snapshot.val())
      setLoading(true)
    })
  }, [isLoading])

  // Fonction qui récupérer les données du state pour les utiliser ailleurs
  const selectedElement = (item: any) => {
    // Condition sur le type d'image
    if (item.type == "image-fixed") {
      if (item.time_slot == "all") {
        setTypeSelected("Image fixe")
      }
      else {
        setTypeSelected("Images programmées")
      }
    }
    if (item.type == "image-animated") {
      if (item.time_slot == "all") {
        setTypeSelected("Images animées en boucle")
      }
      else {
        setTypeSelected("Images animées programmées")
      }
    }

    // Condition si les images sont dans un tableau
    if (item.Image[0].filename[0].length > 1) {
      const bg = item.Image[0].filename[0]
      setBackgroundSelected(bg)
    }
    else {
      setBackgroundSelected(item.Image[0].filename)
    }
    setNameSelected(item.name)
    setLinkSelected(item.id)
    setDetailShow(true)
  }

  // Condition sur l'affichage des backgrounds des cards
  const getFile = (i: any) => {
    return (i.Image[0].filename[0].length > 1) ? i.Image[0].filename[0] : i.Image[0].filename
  }

  // Mapping du state
  const dataList = data.map((i) => (
    <>
      <Col key={i.id} className="mt-3">
        <Card className='cardAcc' style={{ backgroundImage: 'url(../../src/assets/img/mediatheque/' + getFile(i) + ')' }} onClick={() => selectedElement(i)}>
          <Card.Body>
          </Card.Body>
        </Card>
      </Col>
    </>
  ))

  // Render 
  return (
    <>
      <Container fluid
        className='homepage'
        style={{ backgroundImage: 'url(../../src/assets/img/mediatheque/' + backgroundSelected + ')' }}>
        <Row>
          <Col className='text-center mt-5'>
            <img src='../../src/assets/img/logo-homepage.png' alt='Brioche Doré' width={380} />
          </Col>
        </Row>
        {isLoading && (
          <>
            {detailShow && (
              <Row>
                <Col>
                  <div className='detailAll'>
                    <h2>{nameSelected}</h2>
                    <h4 className='mb-4'>{typeSelected}</h4>
                    <Link className='text-center' to={'/Player/' + linkSelected}>
                      Voir les détails
                    </Link>
                  </div>
                </Col>
              </Row>
            )}
            <Row xs={1} md={2} lg={4} className='alignEnd mx-5' >
              {dataList}
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default HomePage
