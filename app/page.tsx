'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'

const days = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE']

const purpleDaysDefault = new Set(['LUNDI', 'MERCREDI', 'VENDREDI', 'DIMANCHE'])

const trainingData = {
  LUNDI: [
    { id: 1, name: 'Bench Press', rep: '3x10', video: 'bench.mp4' },
    { id: 2, name: 'Rowing Bucheron', rep: '3x10', video: 'rowing.mp4' },
    { id: 3, name: 'Fentes', rep: '3x08', video: 'fente.mp4' },
    { id: 4, name: 'Soulevé de Terre', rep: '3x10', video: 'sdt.mp4' },
  ],
  MERCREDI: [
    { id: 1, name: 'Bench Press', rep: '3x10', video: 'bench.mp4' },
    { id: 2, name: 'Rowing Bucheron', rep: '3x10', video: 'rowing.mp4' },
    { id: 3, name: 'Fentes', rep: '3x08', video: 'fente.mp4' },
    { id: 4, name: 'Soulevé de Terre', rep: '3x10', video: 'sdt.mp4' },
  ],
  VENDREDI: [
    { id: 1, name: 'Bench Press', rep: '3x10', video: 'bench.mp4' },
    { id: 2, name: 'Rowing Bucheron', rep: '3x10', video: 'rowing.mp4' },
    { id: 3, name: 'Fentes', rep: '3x08', video: 'fente.mp4' },
    { id: 4, name: 'Soulevé de Terre', rep: '3x10', video: 'sdt.mp4' },
  ],
}

export default function MuscuProgram() {
  const [activeDay, setActiveDay] = useState<string | null>(null)
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null)
  const [restDays, setRestDays] = useState<Set<string>>(new Set())
  const [toggledColors, setToggledColors] = useState<Set<string>>(new Set())

 const toggleDay = (day: string) => {
  const isRest = !trainingData[day]

  if (isRest) {
    setRestDays(prev => {
      const newSet = new Set(prev)
      if (newSet.has(day)) {
        newSet.delete(day)
      } else {
        newSet.add(day)
      }
      return newSet
    })
  } else {
    setActiveVideoId(null)
    setActiveDay(prev => (prev === day ? null : day))
  }

  setToggledColors(prev => {
    const newSet = new Set(prev)
    if (newSet.has(day)) {
      newSet.delete(day)
    } else {
      newSet.add(day)
    }
    return newSet
  })
}


  const getCardColor = (day: string) => {
    const isDefaultPurple = purpleDaysDefault.has(day)
    const isToggled = toggledColors.has(day)

    // Si par défaut violet et pas inversé → violet
    if (isDefaultPurple && !isToggled) return 'bg-purple-800 text-white'
    // Si pas violet par défaut mais toggled → violet
    if (!isDefaultPurple && isToggled) return 'bg-purple-800 text-white'
    // Sinon → blanc
    return 'bg-white text-black'
  }

  return (
    <div className="grid gap-4 p-4">
      {days.map(day => {
        const isRestDay = !trainingData[day]
        const isRestActive = restDays.has(day)
        const cardColor = getCardColor(day)

        return (
          <div key={day}>
           <Card className={`shadow-md rounded-none ${cardColor}`}>
<div
  className={`flex justify-center items-center cursor-pointer relative py-4 ${
    activeDay === day
      ? 'bg-purple-800 text-white'
      : ['LUNDI', 'MERCREDI', 'VENDREDI'].includes(day)
        ? ''
        : 'bg-[color:var(--color-custom-purple)] text-white'
  }`}
  onClick={() => toggleDay(day)}
>


    <h2 className="text-xl font-bold text-center">
      {isRestDay && isRestActive ? 'REPOS' : day}
    </h2>
    {!isRestDay && (
      <div className="absolute right-4">
        {activeDay === day ? <ChevronUp /> : <ChevronDown />}
      </div>
    )}
  </div>
</Card>


            {activeDay === day && trainingData[day] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-100 border p-4 rounded-none">
                  {trainingData[day].map((exo) => (
                    <div key={exo.id} className="border-b last:border-b-0 py-2">
                      <div
                        className="cursor-pointer flex justify-between items-center font-medium text-gray-800 hover:text-black"
                        onClick={() => toggleVideo(exo.id)}
                      >
                        <span>{exo.name}</span>
                        <span className="text-sm text-gray-600">{exo.rep}</span>
                      </div>

                      {activeVideoId === exo.id && (
                        <div className="mt-2">
                          <iframe
                            className="w-full aspect-video border"
                            src={exo.video}
                            title={exo.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}
