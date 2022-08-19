import React from "react"
import { Image } from "@fluentui/react-northstar"
import { Box, Typography } from "@mui/material"
import {format, formatISO, getDate, isToday} from "date-fns"
import ja from "date-fns/locale/ja"
import { DayScheduleStatus, getNextStatus, useDaySchedulesStore } from "./useDaySchedulesStore"

const getBackgroundColor = (status: DayScheduleStatus) => {
  switch (status) {
    case "available":
      return "rgba(40, 167, 69, 0.3)"
    case "notAvailable":
      return "rgba(220, 53, 69, 0.3)"
    case "toBeDetermined":
      return "rgba(255, 193, 7, 0.3)"
  }
}

const DayScheduleStatusDisplay = (props: {status: DayScheduleStatus}) => {
  return <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", "&>img": {width: "60%"}}}>
    {props.status === "available" &&  <img src="circle.png" />}
    {props.status === "notAvailable" && <img src="cross.png" />}
    {props.status === "toBeDetermined" && <img src="triangle.png" />}
  </Box>
}

export const Day = (props: {day: Date, showMonth?: boolean}) => {
  const dayString = React.useMemo(() => formatISO(props.day), [props.day])
  const {status, update} = useDaySchedulesStore(state => ({status: state.daySchedules[dayString], update: state.updateDaySchedule}))
  const rotateStatus = () => {
    update(dayString, getNextStatus(status))
  }
  const isStartOfMonth = getDate(props.day) === 1
  return <Box sx={{width: "13vw", maxWidth: 100, height: "13vw", maxHeight: 100, backgroundColor: getBackgroundColor(status), aspectRatio: "1 / 1"}} onClick={rotateStatus}>
    <Box sx={{textAlign: "center", color: isToday(props.day)? "green": "black", fontWeight: isToday(props.day)? "bold": "normal", position: "absolute"}}>
      <Typography variant="body2">{format(props.day, isStartOfMonth || props.showMonth? "M/d (E)": "d (E)", {locale: ja})}</Typography>
    </Box>
    <DayScheduleStatusDisplay status={status}/>
  </Box>
}