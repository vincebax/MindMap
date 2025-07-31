import './App.css'
import { useState } from 'react'
import GraphView from './components/Graphview'
import MarkdownEditor from './components/MarkdownEditor'
import {v4 as uuid4v} from 'uuid'

function App() {
  const [showingId, setShowingId] = useState('');

  function handleNodeClick(id: string) {
    setShowingId(id);
  }


  return (
    <>
    <MarkdownEditor id={showingId}/>
    <GraphView handleClick={handleNodeClick}/>
    </>
  )
}

export default App
