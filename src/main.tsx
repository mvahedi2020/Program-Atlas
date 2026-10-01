import { Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
class ErrorBoundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false}
 static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?<main className="runtime-error"><h1>Program Atlas could not open this scenario.</h1><p>Your stored data has not been reset. Reload to retry the compatible-state check, or inspect this browser’s storage if the issue persists.</p><button type="button" onClick={()=>window.location.reload()}>Reload workspace</button></main>:this.props.children}
}
const root=document.getElementById('root')
if(!root) throw new Error('Program Atlas mount element is missing.')
createRoot(root).render(<ErrorBoundary><App/></ErrorBoundary>)
