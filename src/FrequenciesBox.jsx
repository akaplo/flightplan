import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import './Plan.css'
import TextField from './TextField'

export const boxKeys = {
  DEP_WX: 'departureWx',
  DEP_GND: 'departureGnd',
  DEP_CTAF: 'departureCTAF',
  ENR_1: 'enroute1',
  ENR_2: 'enroute2',
  DEST_WX: 'destinationWx',
  DEST_CTAF: 'destinationCTAF',
  DEST_GND: 'destinationGnd',
  OTHER: 'other'
}

const FrequenciesBox = ({ frequencies, setFrequencies }) => {
  const [focusedBox, setFocusedBox] = useState('')
  return (
    <Fragment>
      <div className={ 'normalHeader thickBorder centerText boldText' } style={ { gridRow: 2, gridColumn: 'span 3 / 16' } }>
                Frequencies
      </div>
      {
        Object.values(boxKeys).filter((i, a) => a !== -1).map((box, idx) =>
          <TextField
            defaultValue={ frequencies[box] }
            onClickAway={ (t) => {
              setFocusedBox('')
              frequencies[box] = t
              setFrequencies(frequencies)
            } }
            onEnterPressed={ (t) => {
              setFocusedBox('')
              frequencies[box] = t
              setFrequencies(frequencies)
            } }
            unfocusedWrapperClass={ 'topLeftText thickBorder thickCell' }
            focused={ focusedBox === box }
            editableFieldStyle={ { gridRow: idx + 3, gridColumn: 'span 3 / 16' } }
            unfocusedWrapperStyle={ { gridRow: idx + 3, gridColumn: 'span 3 / 16' } }
            onFocus={ () => setFocusedBox(box) }
            unfocusedContent={
              <Fragment>
                { box }
                <span className={ 'centerText normalText' }>{ frequencies[box] || '-----' }</span>
              </Fragment>
            }
          />
        )
      }
    </Fragment>
  )
}

FrequenciesBox.propTypes = {
  frequencies: PropTypes.shape({
    departureWx: PropTypes.string,
    departureGnd: PropTypes.string,
    departureCTAF: PropTypes.string,
    enroute1: PropTypes.string,
    enroute2: PropTypes.string,
    destinationWx: PropTypes.string,
    destinationCTAF: PropTypes.string,
    destinationGnd: PropTypes.string,
    other: PropTypes.string
  })
}

export default FrequenciesBox
