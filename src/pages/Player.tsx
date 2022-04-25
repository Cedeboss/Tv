import React from 'react'
import { Container, Figure, Row } from 'react-bootstrap'
import '../assets/css/homepage.css'
import { useParams } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../utils/firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import ImageAnimated from '../components/ImageAnimatedComponent'

const Player: React.FC<any> = () => {
  const [dataz, setDataz] = React.useState<any[]>([])
  let params = useParams()

  let now = new Intl.DateTimeFormat('fr-Fr', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date())
  let hourNow = parseInt(now.slice(0, 2))
  let minNow = parseInt(now.slice(3, 5))
  let realTime = (hourNow + minNow / 60) * 60 * 60
  let player = dataz.filter((player: any) => player.id == params.id)
  let filterFix: any = {}
  let filterAnim: any = {}

  React.useEffect(() => {
    initializeApp(firebaseConfig)
    const db = getDatabase()
    const starCountRef = ref(db, '/Player/')
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setDataz(data)
    })
  }, [])

  const aff = () => {
    if (player[0].Image.length > 1) {
      if (player[0].type === 'image-fixed') {
        filterFix = player[0].Image.filter(
          (player: any, ind: any) =>
            (parseInt(player.start_to) + parseInt(player.start_to.slice(3, 5)) / 60) *
              60 *
              60 <=
              realTime &&
            (parseInt(player.end_to) + parseInt(player.end_to.slice(3, 5)) / 60) * 60 * 60 >
              realTime
        )
        if (filterFix != 0) {
          return filterFix[0].filename
        } else {
          return [player[0].Image[0].filename]
        }
      } else if (player[0].type === 'image-animated') {
        if (player[0].time_slot === 'all') {
          return player[0].Image
        } else if (player[0].time_slot === 'partial') {
          filterAnim = player[0].Image.filter(
            (player: any, ind: any) =>
              (parseInt(player.start_to) + parseInt(player.start_to.slice(3, 5)) / 60) *
                60 *
                60 <=
                realTime &&
              (parseInt(player.end_to) + parseInt(player.end_to.slice(3, 5)) / 60) * 60 * 60 >
                realTime
          )

          if (filterAnim != 0) {
            return filterAnim
          } else {
            return [player[0].Image[0]]
          }
        }
      }
    } else {
      return player[0].Image[0].filename
    }
  }

  React.useEffect(() => {}, [dataz])

  return (
    <Container fluid className='p-0'>
      {player[0] &&
        (player[0].type == 'image-fixed' ? (
          <>
            <Container
              fluid
              className='player '
              style={{
                backgroundImage: `url(../../src/assets/img/mediatheque/${aff()})`,
              }}
            ></Container>
          </>
        ) : player[0].type == 'image-animated' ? (
          <>
            <ImageAnimated images={aff()} />
          </>
        ) : null)}
    </Container>
  )
}
export default Player
