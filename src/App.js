import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)

  // fetch data

  const fetchItems = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${page}&_limit=20`)
      const data = await response.json()
      setItems(prevItems => [...prevItems, ...data])
      setPage(prevPage => prevPage + 1)
    } catch (error) {
      console.log('fetching error', error);
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const {scrollTop, clientHeight, scrollHeight} = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight) {
        fetchItems()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [page])

  return (
    <div className="list">
      {
        items.map((item, index) => (
          <div className='list-item' key={index}>{item.title}</div>
        ))
      }
    </div>
  );
}

export default App;
