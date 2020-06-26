import React, { Component } from "react"
import {
  Button,
  Card,
  CardActions,
  Typography,
  CardContent,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { setStatusColor } from "./styles"

const AllTravelersMobile = ({ travelers }) => {
  const history = useHistory()
  return (
    <div>
      {travelers.map((traveler, i) => {
        const {
          id,
          name,
          phone,
          email,
          nationality,
          status: travelerStatus,
          countryCode,
        } = traveler
        const { airlineCode, flightNum, arrivalTime, status: flightStatus } =
          traveler.flight || {}
        const timeString = new Date(arrivalTime).toLocaleString()
        const color = setStatusColor(travelerStatus)
        const style = {
          passengerStatus: {
            color,
            fontWeight: "bold",
          },
        }
        return (
          <Card key={i} style={{ margin: "2em" }}>
            <CardContent>
              <Typography variant="h5">{name}</Typography>
              <Typography variant="subtitle1">Traveler ID: {id}</Typography>
              <CardContent className="">
                <Typography variant="h5">Traveler Information</Typography>
                <Typography variant="body2" style={style.passengerStatus}>
                  Traveler Status: {travelerStatus}
                </Typography>
                <Typography variant="body2">
                  Country Code: +{countryCode}
                </Typography>
                <Typography variant="body2">Phone: {phone}</Typography>
                <Typography variant="body2">Email: {email}</Typography>
                <Typography variant="body2">
                  Nationality: {nationality}
                </Typography>
              </CardContent>
              <CardContent className="">
								<Typography variant="h5">Flight Information </Typography>
                <Typography variant="body2">
                  Airline Code: {airlineCode}
                </Typography>
                <Typography variant="body2">Flight #: {flightNum}</Typography>
                <Typography variant="body2">
                  ArrivalTime: {timeString}
                </Typography>
                <Typography variant="body2">
                  Flight Status: {flightStatus}
                </Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  history.push(`/travelers/${traveler.id}`)
                }
              >
                View/Edit Traveler
              </Button>
            </CardActions>
          </Card>
        )
      })}
    </div>
  )
}

export default AllTravelersMobile
