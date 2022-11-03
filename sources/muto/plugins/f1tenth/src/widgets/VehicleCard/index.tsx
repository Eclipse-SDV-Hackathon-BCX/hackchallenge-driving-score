//
//  Copyright (c) 2022 Composiv.ai, Eteration A.S. and others
//
// All rights reserved. This program and the accompanying materials
// are made available under the terms of the Eclipse Public License v2.0
// and Eclipse Distribution License v1.0 which accompany this distribution.
//
// The Eclipse Public License is available at
//    http://www.eclipse.org/legal/epl-v10.html
//    and the Eclipse Distribution License is available at
//    http://www.eclipse.org/org/documents/edl-v10.php.
//
// Contributors:
//    Composiv.ai, Eteration A.S. - initial API and implementation
//
//
import React, { useEffect, useState } from 'react'
import { Joystick } from 'react-joystick-component'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'
import { v4 as uuidv4 } from 'uuid'
import { connect } from '../../common/mqtt'

import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  ToggleGroup, ToggleGroupItem
} from '@patternfly/react-core'

const VehicleCard = ({ vehicle }) => {
  const [joyeevent, setJoyEvent] = useState<IJoystickUpdateEvent>()

  const [myuuid] = useState(uuidv4())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_connectionStatus, setConnectionStatus] = useState(false)
  const [mux, setMux] = useState<any>('reset')
  const [client, setClient] = useState<any>()
  const [targetTopic] = useState(`db-${vehicle.thingId}/agent/${myuuid}`)

  useEffect(() => {
    const cl = connect({
      thingId: vehicle.thingId,
      uuid: myuuid,
      onConnect: () => setConnectionStatus(true),
      onFailed: (err) => !!err && setConnectionStatus(false),
      onMessage: (_topic, _payload, _packet) => { }
    })
    setClient(cl)
    doRemoteControl(cl, { control: 'reset', type: 'stop', direction: 'forward' })
    return () => {
      doRemoteControl(cl, { control: 'reset', type: 'stop', direction: 'forward' })
      !!cl && cl.end(true)
    }
  }, [])

  const doRemoteControl = (c, event) => {
    if (c && event) {
      c.publish(
        `${vehicle.thingId}/agent/commands/bcx/rc`,
        JSON.stringify({
          control: event?.control || 'reset',
          type: event?.type,
          direction: event?.direction,
          x: event?.x || 0,
          y: event?.y || 0
        }),
        {
          properties: {
            responseTopic: targetTopic,
            correlationData: myuuid
          }
        }
      )
    }
  }
  const handleMove = (event: IJoystickUpdateEvent) => {
    // if (joyeevent?.type !== event.type || joyeevent?.direction !== event.direction) {
    setJoyEvent(event)
    doRemoteControl(client, { control: mux, ...event })
    // }
  }
  const handleStop = (event: IJoystickUpdateEvent) => {
    // if (joyeevent?.type !== event.type || joyeevent?.direction !== event.direction) {
    console.log(event)
    setJoyEvent(event)
    doRemoteControl(client, event)
    // }
  }

  const handlMuxToggle = (isSelected, event) => {
    const id = event.currentTarget.id
    console.log(isSelected, id)
    doRemoteControl(client, {
      control: id,
      type: 'stop',
      direction: 'none',
      x: 0,
      y: 0
    })
    setMux(id)
  }

  return (
    <div>
      <Card
        style={{
          textAlign: 'center'
        }}
        component="div"
      >
        <CardTitle
          style={{
            textAlign: 'start',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          Vehicle Detail
        </CardTitle>
      </Card>
      <Card
        style={{
          textAlign: 'center',
          margin: 20
        }}
        component="div"
      >
        <CardTitle
          style={{
            textAlign: 'start',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            fontWeight: 500,
            fontSize: 20
          }}
        >
          {vehicle?.attributes?.serial}
        </CardTitle>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img
              style={{
                aspectRatio: 1,
                width: 200,
                height: 200,
                resize: 'both'
              }}
              src={
                'https://5.imimg.com/data5/MN/ES/ZU/SELLER-19322498/bluetooth-controlled-robotic-car-kit-1000x1000.jpg'
              }
              alt="Logo"
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Joystick size={200} stickSize={50} sticky={false} baseColor="#cabdfe" stickColor="#781c76" move={handleMove} stop={handleStop}></Joystick>
              <br/>
              <ToggleGroup aria-label="Default with multiple selectable">
                <ToggleGroupItem text="Joystick" key={1} buttonId="joystick" isSelected={ mux === 'joystick'} onChange={handlMuxToggle} />
                <ToggleGroupItem text="Autopilot" key={2} buttonId="navigator" isSelected={ mux === 'navigator'} onChange={handlMuxToggle} />
                <ToggleGroupItem text="Fullstop" key={3} buttonId="reset" isSelected={ mux === 'reset'} onChange={handlMuxToggle} />
             </ToggleGroup>
            </div>
          </div>

        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}

export default VehicleCard
