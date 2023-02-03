import { ReactElement } from 'react'

import styles from './Stepper.module.css'

type StepperPros = Readonly<{
  step: number
}>

export default function Stepper({ step }: StepperPros): ReactElement {
  return (
    <div
      className={styles.stepper}
      data-current-step={step}
      data-steps="2"
    />
  )
}
