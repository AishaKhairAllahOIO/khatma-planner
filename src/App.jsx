import Dashboard from './components/Dashboard.jsx'
import Header from './components/Header.jsx'
import HistoryList from './components/HistoryList.jsx'
import PlanDialog from './components/PlanDialog.jsx'
import SetupForm from './components/SetupForm.jsx'
import { useKhatmaStore } from './store/useKhatmaStore.js'
import './App.css'

export default function App() {
  const hasPlan = useKhatmaStore((state) => state.plan !== null)

  return (
    <div className="app">
      <div className="app__inner">
        <Header />
        <main className="app__content">
          {hasPlan ? <Dashboard /> : <SetupForm />}
          <HistoryList />
        </main>
      </div>
      <PlanDialog />
    </div>
  )
}
