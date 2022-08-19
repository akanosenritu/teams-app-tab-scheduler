import React from "react"
import {Box, Typography} from "@mui/material"
import {TeamsFx, UserInfo} from "@microsoft/teamsfx"
import {Calendar} from "./calendar/Calendar"

const teamsfx = new TeamsFx()

export default function Tab() {
  const [info, setInfo] = React.useState<UserInfo|null>(null)
  React.useEffect(() => {
    teamsfx.getUserInfo()
      .then(info => setInfo(info))
  }, [])

  /**
  if (!info) {
    return <Box>
      <Typography variant="body1">ユーザー情報を読込中...</Typography>
    </Box>
  }
  **/
  return <Box>
    <Calendar />
  </Box>
}
