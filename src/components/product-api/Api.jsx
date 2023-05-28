import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Api.css"


const Api = () => {

  const [product, setProduct] = useState([])


  const [productId, setProductId] = useState("")

  const [state, setState] = useState({
    category: "",
    name: "",
    price: "",
    img: ""
  })

  const editData = (ed)=>{
    setState({
      category: ed.category,
      name: ed.name,
      price: ed.price,
      img: ed.img
    })
    setProductId(ed._id)
  }

  const updateData = async()=>{
    await axios.put(`http://localhost:8050/products/${productId}`, state)
    await getData()
  }

  const getData = async () => {
    const res = await axios.get("http://localhost:8050/products")
    setProduct(res.data)
  }


  const productDelet = async (id) => {
    await axios.delete(`http://localhost:8050/products/${id}`)
    getData()
  }

  // const handleChange = (e) => {
  //   setState({ ...state, [e.target.category]: e.target.value })
  // }

  // const productPost = async (e) => {
  //   e.preventDefault()
  //   await axios.post("http://localhost:6050/products", {
  //     category: state.category,
  //     name: state.name,
  //     price: state.price,
  //     img: state.img
  //   })

  //   await getData()
  // }

  useEffect(() => {
    getData()
  }, [])



  return (
    <div className='container'>

      <form action="">
        <label htmlFor="">category</label>
        <input type="text" name='category'  value={state.category} />
        <label htmlFor="">name</label>
        <input type="text" name='name'  value={state.name} />
        <label htmlFor="">price</label>
        <input type="text" name='price'  value={state.price} />
        <label htmlFor="">img</label>
        <input type="text" name='img'  value={state.img} />
        <button>add</button>
      </form>


      <button onClick={updateData}>update</button>
      {
        product
          .map((pro) => (
            <div className='cart'>
              <img src={pro.img} alt="" />
              <h1>{pro.category}</h1>
              <h3>{pro.name}</h3>
              <p>{pro.price}azn</p>
              <button onClick={() => productDelet(pro._id)}>delet</button>
              <button onClick={()=> editData(pro)}>edit</button>
            </div>
          ))
      }

    </div>
  )
}

export default Api
