import { atom } from 'jotai'

export const projectsAtom = atom([])
export const currentTaskAtom = atom(null)
export const userAtom = atom({
  FirstName: "Tim",
  LastName: "Babbitt",
  UserId: "4367ff6f-c94a-4bb8-88d1-2fcba2570ee8",
  BadgeNumber: "69876"
})