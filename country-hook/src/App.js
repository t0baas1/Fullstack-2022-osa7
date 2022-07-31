import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const url = `https://restcountries.com/v2/name/${name}?fullText=true`
    const countryData = {}
    if (!(name ==='' || name === null || name ===undefined))
    axios.get(url).then(res => {
        countryData.data = res.data[0]
        console.log(countryData.data)
        setCountry(countryData)
    })
    },[name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }
  console.log(country)
  return (
    <div>
      <h3>{country.data.name}</h3>
      <div>population {country.data.population}</div> 
      <div>capital {country.data.capital}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
