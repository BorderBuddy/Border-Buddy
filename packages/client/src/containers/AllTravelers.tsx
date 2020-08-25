import React, { useState, useEffect } from 'react'
import { AllTravelers as RenderAllTravelers } from '../components/Admin/AllTravelers'
import { AllTravelersMobile } from '../components/Admin/AllTravelersMobile'
import api from '../api/api'

export const AllTravelers = () => {
  const [travelers, setTravelers] = useState([])
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => {
      const width = window.innerWidth
      setWidth(width)
    })
    fetchTravelers()
  }, [])

  const fetchTravelers = async () => {
    try {
      const res = await api.getTravelers()
      setTravelers(res)
    } catch (err) {
      alert('Error fetching travelers')
    }
  }

  const mobileOrDesktop = (travelers: any) => {
    if (width > 800) {
      return <RenderAllTravelers travelers={travelers} />
    } else {
      return <AllTravelersMobile travelers={travelers}/>
    }
  }

  return <div>{mobileOrDesktop(travelers)}</div>
}

