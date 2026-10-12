import CalendarCard from './CalendarCard.jsx'
import JuzMap from './JuzMap.jsx'
import PlanCard from './PlanCard.jsx'
import ProgressCard from './ProgressCard.jsx'
import StatCards from './StatCards.jsx'
import TodayCard from './TodayCard.jsx'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <>
      <div className="dashboard">
        <div className="hero">
          <TodayCard />
          <ProgressCard />
        </div>
        <StatCards />
      </div>

      <JuzMap />

      <div id="calendar" className="lower">
        <CalendarCard />
        <PlanCard />
      </div>
    </>
  )
}
