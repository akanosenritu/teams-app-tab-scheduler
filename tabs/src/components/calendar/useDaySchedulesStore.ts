import create from "zustand"
import produce from "immer"
import {addDays, addWeeks, formatISO, startOfWeek, endOfWeek, eachDayOfInterval} from "date-fns"

const NUMBER_OF_WEEKS_TO_BE_DRAWN = 7

const getDatesToBeDrawn = (): {start: Date, end: Date, weeks: {start: Date}[]} => {
  const today = new Date()
  const dayAtStartOfThisWeek = startOfWeek(today)
  const dayAtStartOfTheLastWeekToBeDrawn = addWeeks(dayAtStartOfThisWeek, NUMBER_OF_WEEKS_TO_BE_DRAWN - 1)
  const lastDayToBeDrawn = endOfWeek(dayAtStartOfTheLastWeekToBeDrawn)

  const weeks: {start: Date}[] = []
  for (let i=0; i < NUMBER_OF_WEEKS_TO_BE_DRAWN; i++) {
    weeks.push({start: addDays(dayAtStartOfThisWeek, 7 * i)})
  }

  return {
    start: dayAtStartOfThisWeek,
    end: lastDayToBeDrawn,
    weeks
  }
}

export const datesToBeDrawn = getDatesToBeDrawn()

export const DayScheduleStatuses = ["available", "notAvailable", "toBeDetermined", "notSet"]
export type DayScheduleStatus = typeof DayScheduleStatuses[number]

const nextDict = Object.fromEntries(DayScheduleStatuses.map((status, index) => [status, DayScheduleStatuses[(index+1)%DayScheduleStatuses.length]]))
export const getNextStatus = (status: DayScheduleStatus): DayScheduleStatus => {
  return nextDict[status] as DayScheduleStatus
}

type DaySchedules = {
  [dateString: string]: DayScheduleStatus
}

type DaySchedulesState = {
  daySchedules: DaySchedules,
  updateDaySchedule: (dayString: string, newStatus: DayScheduleStatus) => void,
}

export const useDaySchedulesStore = create<DaySchedulesState>((set) => ({
  daySchedules: Object.fromEntries(
    eachDayOfInterval({start: datesToBeDrawn.start, end: datesToBeDrawn.end})
    .map(date => [formatISO(date), "notSet"])
  ),
  updateDaySchedule: (dayString: string, newStatus: DayScheduleStatus) => set(state => produce(state, draft => {
    draft.daySchedules[dayString] = newStatus
  }))
}))