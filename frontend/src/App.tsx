import './App.css'
import { useState } from 'react'
import GraphView from './components/Graphview'
import MarkdownEditor from './components/MarkdownEditor'
import Tabs from './components/Tabs'
import {v4 as uuid4v} from 'uuid'

function App() {
  const [showingId, setShowingId] = useState('');

  function handleNodeClick(id: string) {
    setShowingId(id);
  }


  return (
    <>
    <Tabs>
      <MarkdownEditor id={showingId} className="MarkdownEditor"/>
      <GraphView handleClick={handleNodeClick} className="GraphView"/>
    </Tabs>

    </>
  )
}

export default App
