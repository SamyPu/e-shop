import React, { useState } from 'react'

function App() {

  const [list,setList] = useState([])
  const [money, setMoney] = useState(20)
  const [produits, setProduits] = useState([
    {
      nom: "Coca Cola",
      prix: 1,
      stock: 5,
      img : "./img/coca.jpg"
    },
    {
      nom: "Fanta",
      prix: 1.5,
      stock: 5,
      img : "./img/fanta.png"
    },
    {
      nom: "Ice Tea",
      prix: 2,
      stock: 5,
      img : "./img/ice-tea.jpg"
    },
  ])

  let achat = (index) => {
    let produitsTemp = [...produits]
    let moneyTemp = money
    let listTemp = [...list]
    
    produitsTemp[index].stock --
    moneyTemp -= produitsTemp[index].prix
    
    listTemp.push(produitsTemp[index])

    setProduits(produitsTemp)
    setMoney(moneyTemp)
    setList(listTemp)
  }

  let vendre = (index,element) => {
    let produitsTemp = [...produits]
    let listTemp = [...list]
    let moneyTemp = money

    console.log(element.stock);
    moneyTemp += element.prix
    if (element.nom === "Coca Cola") {
      produitsTemp[0].stock += 1
    }
    if (element.nom === "Fanta") {
      produitsTemp[1].stock += 1
    }
    if (element.nom === "Ice Tea") {
      produitsTemp[2].stock += 1
    }
    listTemp.splice(index,1)

    setProduits(produitsTemp)
    setMoney(moneyTemp)
    setList(listTemp)
  }

  return (
    <div className="container">

      <div className="row">
        <div className="col">
          <h1>Mon argent : {money} euros</h1>
        </div>
      </div>

      <div className="row">
        {produits.map((element,index) =>
          <div key={index} className="col-4">
            <div className="card p-3">
              <img src={element.img} className="card-img-top" alt="..." />
              <div className={`card-body ${element.stock === 1 ? "bg-warning" : element.stock === 0 ? "bg-danger" : "bg-white"}`}>
                <h3 className="card-text">{element.nom}</h3>
                <p className="card-text">Stock : {element.stock}</p>
                <p className="card-text">Prix : {element.prix}</p>
                { (element.stock > 0 && money >= element.prix) &&
                  <button onClick={() => achat(index)} type="button" className="btn btn-success">Achat</button> 
                }
                { element.stock === 0  &&
                  <p>RUPTURE DE STOCK</p>
                }
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="row">
        <p>Mon panier :</p>
        <ul>
          { list.map((element,index) =>
            <li key={index}>{element.nom} <button onClick={() => vendre(index,element)} type="button" className="btn btn-success">Vendre</button>  </li>
          )}
        </ul>
      </div>

    </div>
  )
}

export default App
