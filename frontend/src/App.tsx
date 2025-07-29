import './App.css'
import { useState } from 'react'
import GraphView from './components/Graphview'
import MarkdownEditor from './components/MarkdownEditor'

function App() {
  const [showingEditor, setShowingEditor] = useState(false);
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
