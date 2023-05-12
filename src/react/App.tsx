import { useState } from 'react'
import './App.scss'
import { Sidebar, SidebarItem } from './components/sidebar'
import { JsonViewer } from './components/jsonViewer'


function App() {
  const [items, setItems] = useState<SidebarItem[]>([
    {
      title: "Hi",
      data: null
    }
  ]);

  const test: any = {
    'hi': 'bye',
    'test': {
      'number': 123,
      'bool': true
    }
  }

  return (
    <>
      <div className='row m-0 w-100 h-70'>
        <div className='p-0 col sidebar'>
          <Sidebar items={items} />
        </div>
        <div className='p-1 col border'>
          <JsonViewer json={test}>

          </JsonViewer>
        </div>
      </div>
      <div className='row m-0 h-30'>

      </div>
    </>
  )
}

export default App
