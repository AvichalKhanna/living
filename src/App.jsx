import { useEffect, useState, useRef} from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./App.css"

function App() {
  const startDate = new Date("2006-12-02T07:51:36Z")
  const [seconds, setSeconds] = useState(0)
  const [timeUnit, setTimeUnit] = useState("seconds")

  useEffect(() => {
    const updateSeconds = () => {
      const now = new Date()
      const diffMs = now - startDate
      const diffSeconds = Math.floor(diffMs / 1000)
      setSeconds(diffSeconds)
    }

    updateSeconds()
    const interval = setInterval(updateSeconds, 1000)
    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
  "seconds",
  "minutes",
  "hours",
  "days",
  "months",
  "years"
]

const scrollRef = useRef(null)

const handleScroll = () => {
  const container = scrollRef.current
  if (!container) return

  const center = container.scrollLeft + container.offsetWidth / 2

  const children = Array.from(container.children)

  let closest = null
  let closestDistance = Infinity

  children.forEach((child, index) => {
    const childCenter =
      child.offsetLeft + child.offsetWidth / 2

    const distance = Math.abs(center - childCenter)

    if (distance < closestDistance) {
      closestDistance = distance
      closest = timeUnits[index]
    }
  })

  if (closest && closest !== timeUnit) {
    setTimeUnit(closest)
  }
}

  return (
    <div className="w-screen h-screen overflow-x-scroll overflow-y-hidden snap-x snap-mandatory flex scroll-smooth">

      {/* SCREEN 1 — RUNTIME */}
      <div className="snap-center shrink-0 w-screen h-screen flex flex-col items-center justify-between bg-[#0a0f14] px-6">
        
        <div className="w-full h-10"/>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-md bg-[#0f1720] border border-cyan-500/30 
          rounded-xl p-10 text-center shadow-[0_0_60px_rgba(0,255,255,0.15)]"
        >
          <motion.h1
            key={seconds}
            initial={{ opacity: 0.9, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-5xl font-bold tracking-widest text-cyan-400 
            drop-shadow-[0_0_12px_rgba(0,255,255,0.5)]"
          >
            {convertTime(seconds, timeUnit)}
          </motion.h1>

          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-cyan-500/50">
            System Runtime
          </p>

          <p className="mt-6 text-sm text-gray-400">
            Time is processing. Optimize your output.
          </p>
        </motion.div>
        
<div className="w-full flex justify-center mb-6">
  <div className="">
    
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-100 overflow-x-auto px-100 py-4
          max-w-xl snap-x snap-mandatory
          scrollbar-none relative"
        >
          {timeUnits.map((unit, index) => (
            <div
              key={unit}
              className={`snap-center shrink-0 text-xs uppercase tracking-widest
              transition-all duration-300
              ${
                timeUnit === unit
                  ? "text-cyan-400 scale-125"
                  : "text-cyan-500/40 scale-90"
              }`}
            >
              {unit}
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>

      {/* SCREEN 2 */}
      <div className="snap-center shrink-0 w-screen h-screen flex items-center justify-center bg-[#090d12] px-6">
        <ResolutionDashboard/>
      </div>

{/* SCREEN 3 — TARGET LOCK */}
<div className="snap-center shrink-0 w-screen h-screen flex items-center justify-center bg-[#060b10] px-6">
  <CountdownTarget />
</div>

      {/* SCREEN 4 */}
      <div className="snap-center shrink-0 w-screen h-screen flex items-center justify-center bg-[#070a0f] px-6">
        <OperatorProfile/>
      </div>

    </div>
  )
}

export default App

function ResolutionDashboard() {
  const defaultResolutions = [
    {
      title: "ELITE PHYSIQUE",
      description: "Train daily. No excuses.",
      priority: "HIGH",
      stars: 5,
      progress: 60,
    },
    {
      title: "MASTER CODING",
      description: "Deep focus. Build systems.",
      priority: "CRITICAL",
      stars: 5,
      progress: 45,
    },
    {
      title: "MENTAL DISCIPLINE",
      description: "Zero distraction mode.",
      priority: "CORE",
      stars: 4,
      progress: 70,
    },
  ]

  const [resolutions, setResolutions] = useState(() => {
    const saved = localStorage.getItem("cmd_resolutions")
    return saved ? JSON.parse(saved) : defaultResolutions
  })

  useEffect(() => {
    localStorage.setItem("cmd_resolutions", JSON.stringify(resolutions))
  }, [resolutions])

  const updateProgress = (index, value) => {
    const updated = [...resolutions]
    updated[index].progress = value
    setResolutions(updated)
  }

  const [yearProgress, setYearProgress] = useState(0)

useEffect(() => {
  const updateYearProgress = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59)

    const total = end - start
    const elapsed = now - start

    const percent = (elapsed / total) * 100
    setYearProgress(percent)
  }

  updateYearProgress()
  const interval = setInterval(updateYearProgress, 60000) 
  // updates every minute

  return () => clearInterval(interval)
}, [])

const averageProgress =
  resolutions.reduce((acc, r) => acc + r.progress, 0) /
  resolutions.length

return (
  <div className="w-full max-w-6xl h-[90vh] mx-auto flex flex-col justify-between">

    {/* Main Layout */}
    <div className="flex-1 flex items-center justify-between">

      {/* LEFT YEAR BAR */}
      <div className="flex flex-col items-center justify-center w-1/4">

        <div className="relative h-[250px] w-4 rounded-full bg-[#0b141c] overflow-hidden">

          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-purple-500/10"
          />

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${averageProgress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-full rounded-full
            bg-gradient-to-t from-red-600 via-purple-400 to-orange-200
            shadow-[0_0_25px_rgba(0,255,255,0.8)]"
          />

          <motion.div
            animate={{ y: ["200%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute w-full h-20 
            bg-gradient-to-t from-transparent via-purple-400/10 to-transparent"
          />
        </div>

        <div className="text-3xl font-semibold tracking-widest mt-4 
        text-purple-400 drop-shadow-[0_0_20px_rgba(200,155,0,0.7]">
          {averageProgress.toFixed(0)}%
        </div>

        <div className="text-sm font-light tracking-wide 
        text-orange-400/20 drop-shadow-[0_0_20px_rgba(200,155,0,0.2)]">
          Achieved
        </div>

      </div>


      {/* CENTER RESOLUTIONS */}
      <div className="w-2/4 flex flex-col space-y-2">

        {resolutions.map((res, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.15,
            }}
            className="relative bg-[#0f1720] border border-purple-500/40 
            rounded-xl px-6 py-4
            shadow-[0_0_40px_rgba(168,85,247,0.25)] overflow-hidden"
          >

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white tracking-wide">
                {res.title}
              </h2>
              <span className="text-purple-300 tracking-widest">
                {res.priority}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4">

              <input
                type="range"
                min="0"
                max="100"
                value={res.progress}
                onChange={(e) =>
                  updateProgress(index, Number(e.target.value))
                }
                className="flex-1 appearance-none h-2 rounded-full bg-purple-900"
              />

              <div className="w-40 h-2 rounded-full bg-purple-900 overflow-hidden">
                <motion.div
                  className="h-2 rounded-full
                  bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600
                  shadow-[0_0_20px_rgba(168,85,247,0.9)]"
                  animate={{ width: `${res.progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="text-purple-300 w-12 text-right">
                {res.progress}%
              </div>
              

            </div>
          </motion.div>
        ))}

      </div>


      {/* RIGHT YEAR BAR */}
      <div className="flex flex-col items-center justify-center w-1/4">

        <div className="relative h-[250px] w-4 rounded-full bg-[#0b141c] overflow-hidden">

          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-orange-500/10"
          />

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${yearProgress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-full rounded-full
            bg-gradient-to-t from-red-600 via-purple-400 to-orange-200
            shadow-[0_0_25px_rgba(0,255,255,0.8)]"
          />

          <motion.div
            animate={{ y: ["200%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute w-full h-20 
            bg-gradient-to-t from-transparent via-purple-400/10 to-transparent"
          />
        </div>

        <div className="text-3xl font-semibold tracking-widest mt-4 
        text-purple-400 drop-shadow-[0_0_20px_rgba(200,155,0,0.2)]">
          {yearProgress.toFixed(0)}%
        </div>

        <div className="text-sm font-light tracking-wide
        text-orange-400/20 drop-shadow-[0_0_20px_rgba(200,155,0,0.2)]">
          Year Spent
        </div>

      </div>

    </div>

    <div className="text-center text-xs text-gray-500 mt-4">
      SYSTEM STATUS: ACTIVE
    </div>

  </div>
)
}

function CountdownTarget() {
  const [targetDate, setTargetDate] = useState(() => {
    return localStorage.getItem("target_date") || ""
  })

  const [note, setNote] = useState(() => {
    return localStorage.getItem("target_note") || "MISSION TARGET"
  })

  const [timeLeft, setTimeLeft] = useState(null)
  const [showSettings, setShowSettings] = useState(true)

  useEffect(() => {
    localStorage.setItem("target_date", targetDate)
    localStorage.setItem("target_note", note)
  }, [targetDate, note])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!targetDate) return

      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft(null)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  // Auto collapse when date selected
  useEffect(() => {
    if (targetDate) {
      setShowSettings(false)
    }
  }, [targetDate])

  return (
    <div className="w-full h-[90vh] flex flex-col justify-between items-center text-center relative">

      {/* MASSIVE COUNTDOWN */}
      <div className="flex flex-col justify-center items-center flex-1">

        {timeLeft ? (
          <>
            <motion.div
              key={timeLeft.days}
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-[80px] sm:text-[100px] font-black text-purple-400
              tracking-widest drop-shadow-[0_0_40px_rgba(168,85,247,0.9)]"
            >
              {timeLeft.days}
            </motion.div>

            <div className="text-purple-500 text-lg tracking-[0.4em] -mt-2">
              DAYS
            </div>

            <div className="flex gap-6 mt-6 text-2xl text-purple-300 tracking-widest">
              <span>{timeLeft.hours}H</span>
              <span>{timeLeft.minutes}M</span>
              <span>{timeLeft.seconds}S</span>
            </div>

            <div className="mt-4 text-sm text-gray-400 tracking-widest">
              until {note}
            </div>
          </>
        ) : (
          <div className="text-3xl text-red-500 tracking-widest">
            TARGET REACHED
          </div>
        )}
      </div>

      {/* TOGGLE ICON */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => setShowSettings((prev) => !prev)}
          className="text-purple-400 text-xl opacity-70 hover:opacity-100 transition"
        >
          ⚙
        </button>
      </div>

      {/* COLLAPSIBLE SETTINGS */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full px-6 pb-6 space-y-3 pt-5 items-left justify-left"
          >
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-[70vw] h-10 bg-[#0f1720] border border-purple-500/30 
              text-purple-300 text-sm rounded-lg px-3 py-2 outline-none"
            />

            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter mission title"
              className="w-[70vw] h-10 bg-[#0f1720] border border-purple-500/30 
              text-center text-white rounded-lg px-3 py-2 outline-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

import { Activity, Wallet, Sparkles, Upload } from "lucide-react"

function OperatorProfile() {

  const DOB = new Date("2004-01-01") // HARDCODED

  const calculateAge = () => {
    const diff = Date.now() - DOB.getTime()
    const ageDate = new Date(diff)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }
  const [transactions, setTransactions] = useState(
  JSON.parse(localStorage.getItem("op_tx")) || []
)

const [amountInput, setAmountInput] = useState("")
const [type, setType] = useState("income")
const [category, setCategory] = useState("general")

useEffect(() => {
  localStorage.setItem("op_tx", JSON.stringify(transactions))
}, [transactions])

const money = transactions.reduce((acc, tx) =>
  tx.type === "income"
    ? acc + tx.amount
    : acc - tx.amount
, 0)
  const age = calculateAge()

  const [mode, setMode] = useState("body")

  const [name, setName] = useState(localStorage.getItem("op_name") || "OPERATOR")
  const [desc, setDesc] = useState(localStorage.getItem("op_desc") || "SYSTEM IN PROGRESS")
  const [image, setImage] = useState(localStorage.getItem("op_image") || null)

  const [weight, setWeight] = useState(parseFloat(localStorage.getItem("op_weight")) || 70)
  const [height, setHeight] = useState(parseFloat(localStorage.getItem("op_height")) || 175)

  const [looks, setLooks] = useState(
    JSON.parse(localStorage.getItem("op_looks")) || {
      acne: 50,
      skin: 60,
      hair: 70,
      body: 65,
      style: 55,
      posture: 60
    }
  )

  useEffect(() => {
    localStorage.setItem("op_name", name)
    localStorage.setItem("op_desc", desc)
    localStorage.setItem("op_weight", weight)
    localStorage.setItem("op_height", height)
    localStorage.setItem("op_money", money)
    localStorage.setItem("op_looks", JSON.stringify(looks))
    if (image) localStorage.setItem("op_image", image)
  }, [name, desc, weight, height, money, looks, image])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  const looksAverage =
    Math.round(
      Object.values(looks).reduce((a,b)=>a+b,0) /
      Object.values(looks).length
    )

  const updateLooks = (key, value) => {
    setLooks({...looks, [key]: value})
  }


  return (
    <div className="w-full h-screen bg-[#0b0f14] text-white flex flex-col px-6 py-6 overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between items-start">

        {/* LEFT SIDE */}
        <div className="flex-1 pr-4">

          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="bg-transparent text-2xl tracking-widest outline-none w-full"
          />

          <input
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
            className="bg-transparent text-sm text-gray-400 outline-none w-full mt-1"
          />

          {/* ROUND MODE ICONS */}
          <div className="flex gap-6 mt-6">

            <RoundIcon active={mode==="body"} onClick={()=>setMode("body")}>
              <Activity size={18}/>
            </RoundIcon>

            <RoundIcon active={mode==="looks"} onClick={()=>setMode("looks")}>
              <Sparkles size={18}/>
            </RoundIcon>

            <RoundIcon active={mode==="finance"} onClick={()=>setMode("finance")}>
              <Wallet size={18}/>
            </RoundIcon>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center gap-5">

          <label className="w-24 h-24 border border-purple-500/30 bg-[#11161d] rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
            {image ? (
              <img src={image} className="w-full h-full object-cover" />
            ) : (
              <Upload size={20} className="text-purple-400" />
            )}
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>

          <div className="text-sm text-purple-400 tracking-widest mb-2">
            ATTRACTIVENESS {looksAverage}%
          </div>

        </div>

      </div>

      {/* CENTER DISPLAY */}
      <motion.div
        key={mode}
        initial={{opacity:0, y:10}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.25}}
        className="flex-1 border border-purple-500/20 bg-[#11161d] rounded-xl px-6 py-4"
      >

        {mode === "body" && (
          <div className="space-y-6">

            <div className="flex justify-between">
              <span>AGE</span>
              <span className="text-purple-400">{age}</span>
            </div>

            <Adjustable label="WEIGHT (kg)" value={weight} setValue={setWeight}/>
            <Adjustable label="HEIGHT (cm)" value={height} setValue={setHeight}/>

          </div>
        )}

        {mode === "looks" && (
          <div className="grid grid-cols-2 gap-5">

            {Object.entries(looks).map(([key,value])=>(
              <ProgressBar
                key={key}
                label={key.toUpperCase()}
                value={value}
                setValue={(v)=>updateLooks(key,v)}
              />
            ))}

          </div>
        )}

        {mode === "finance" && (
  <div className="space-y-6 h-full flex flex-col overflow-scroll">

    {/* Balance */}
    <div className="text-3xl text-purple-400">
      ₹ {money.toLocaleString("en-IN")}
    </div>

    {/* Add Transaction */}
    <div className="flex gap-4 items-center">

      <input
        type="number"
        placeholder="Amount"
        value={amountInput}
        onChange={(e)=>setAmountInput(e.target.value)}
        className="bg-[#1a1f26] px-3 py-2 rounded-lg outline-none w-32"
      />

      <select
        value={type}
        onChange={(e)=>setType(e.target.value)}
        className="bg-[#1a1f26] px-3 py-2 rounded-lg outline-none"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        className="bg-[#1a1f26] px-3 py-2 rounded-lg outline-none"
      >
        <option value="general">General</option>
        <option value="food">Food</option>
        <option value="rent">Rent</option>
        <option value="investment">Investment</option>
        <option value="salary">Salary</option>
      </select>

      <button
        onClick={()=>{
          if(!amountInput) return
          setTransactions([
            ...transactions,
            {
              amount: parseFloat(amountInput),
              type,
              category,
              date: new Date().toISOString()
            }
          ])
          setAmountInput("")
        }}
        className="px-4 py-2 border border-purple-500/40 rounded-lg"
      >
        Add
      </button>
    </div>
  </div>
)}
      </motion.div>

    </div>
  )
}

function calculateTax(income) {

  if (income <= 250000) return 0
  if (income <= 500000) return (income - 250000) * 0.05
  if (income <= 1000000)
    return 12500 + (income - 500000) * 0.20

  return 112500 + (income - 1000000) * 0.30
}

function RoundIcon({active, onClick, children}) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded-full border flex items-center justify-center transition
      ${active
        ? "border-purple-500 bg-purple-500/10 text-purple-400"
        : "border-purple-500/20 text-gray-400"}
      `}
    >
      {children}
    </button>
  )
}

function Adjustable({label,value,setValue}) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={()=>setValue(value-1)}
          className="px-3 border border-purple-500/30 rounded">-</button>
        <span className="text-purple-400 w-12 text-center">{value}</span>
        <button onClick={()=>setValue(value+1)}
          className="px-3 border border-purple-500/30 rounded">+</button>
      </div>
    </div>
  )
}

function ProgressBar({ label, value, setValue }) {
  const handleChange = (e) => {
    setValue(parseInt(e.target.value))
  }

  return (
    <div>
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span className="text-purple-400">{value}%</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-full appearance-none h-2 bg-[#1a1f26] rounded-lg cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-purple-500
        [&::-webkit-slider-thumb]:shadow-md
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-purple-500"
      />
    </div>
  )
}

function convertTime(seconds, unit) {
  switch (unit) {
    case "milliseconds":
      return (seconds * 1000).toLocaleString()

    case "seconds":
      return seconds.toLocaleString()

    case "minutes":
      return (seconds / 60).toFixed(2)

    case "hours":
      return (seconds / 3600).toFixed(2)

    case "days":
      return (seconds / 86400).toFixed(2)

    case "months":
      return (seconds / (30 * 86400)).toFixed(2)

    case "years":
      return (seconds / (365 * 86400)).toFixed(2)

    default:
      return seconds
  }
}