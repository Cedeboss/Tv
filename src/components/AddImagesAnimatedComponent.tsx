import React, { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import '../assets/css/AddImageAnimated.css'

const AddImageAnimatedComponent: React.FC<any> = () => {

  const [imagesAnimatedList, setImagesAnimatedList] = React.useState<any[]>([])

  const [newImageAnimatedName, setNewImageAnimatedName] = React.useState<any>('')
  const [newImageAnimatedPrice, setNewImageAnimatedPrice] = React.useState<any>('')
  const [newImageAnimatedFile, setNewImageAnimatedFile] = React.useState<any>('')


  const handleChangeImageAnimatedName = (event: any) => {
    setNewImageAnimatedName(event.currentTarget.value)
  }

  const handleChangeImageAnimatedPrice = (event: any) => {
    setNewImageAnimatedPrice(event.currentTarget.value)
  }
  const handleChangeImageAnimatedFile = (event: any) => {
    setNewImageAnimatedFile(event.currentTarget.value)
  }

  const handleAddImageAnimated = (event: any) => {
    event.preventDefault();
    const newImageAnimated = {
      name: newImageAnimatedName,
      price: newImageAnimatedPrice,
      image: newImageAnimatedFile
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", newImageAnimatedName);
    urlencoded.append("image", newImageAnimatedFile);
    urlencoded.append("price", newImageAnimatedPrice);

    var requestOptions1 = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };


    fetch("https://625f38643b039517f1025970.mockapi.io/ImagesAnimated", requestOptions1)
      .then((response: any) => response.json())
      .then((result: any) => {
        setImagesAnimatedList([...imagesAnimatedList, result]);
        // setNewImageAnimatedName("");
        // setNewImageAnimatedPrice("");
        // setNewImageAnimatedFile("");

        console.log(urlencoded)
      })
      .catch((error: any) => console.log("error", error));


  }




  return (
    <>




      <Container className='p-5'>

        <form onSubmit={handleAddImageAnimated}>

          <input
            required
            className="mt-1"
            type="text"
            placeholder="Nom du l'image"
            value={newImageAnimatedName}
            onChange={handleChangeImageAnimatedName}
          />
          <br />
          <input
            required
            className="mt-2"
            type="number"
            placeholder="Prix"
            value={newImageAnimatedPrice}
            onChange={handleChangeImageAnimatedPrice}
          />
          <br />
          <input
            required
            className="mt-2"
            type="file"
            value={newImageAnimatedFile}
            onChange={handleChangeImageAnimatedFile}
          />
          <br />
          <button
            type="submit"
            className="btn btn-primary mt-2 mr-2"
          >
            Valider
          </button>

        </form>

      </Container>

    </>
  )
}

export default AddImageAnimatedComponent