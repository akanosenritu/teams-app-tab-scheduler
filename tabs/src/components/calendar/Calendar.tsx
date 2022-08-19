import {Box, Button, Container, Typography} from "@mui/material"
import {formatISO} from "date-fns"
import { TeamsFx } from "@microsoft/teamsfx"
import {Week} from "./Week"
import {datesToBeDrawn} from "./useDaySchedulesStore"

const teamsfx = new TeamsFx()

export const Calendar = (props: {}) => {
  return <Box sx={{"&>.MuiBox-root": {my: 1}, mx: 1}}>
    <Box>
      <Typography variant="body2">カレンダー上をクリックすることで、その日の予定を設定できます。編集が終わったら保存を押してください。</Typography>
    </Box>
    <Box>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", "&>.MuiBox-root": {borderBottom: "1px solid darkgray"}, "&>.MuiBox-root:first-child": {borderTop: "1px solid darkgray"}, width: "100%"}}>
        {datesToBeDrawn.weeks.map(week => <Week key={formatISO(week.start)} start={week.start} />)}
      </Box>
    </Box>
    <Box sx={{display: "flex", justifyContent: "center"}}>
      <Button variant="contained" color="success" size="small">保存</Button>
    </Box>
  </Box>
}