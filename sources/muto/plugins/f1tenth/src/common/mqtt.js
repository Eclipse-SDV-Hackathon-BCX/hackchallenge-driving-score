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
import mqtt from 'mqtt/dist/mqtt'

const SANDBOX_URL = 'wss://sandbox.composiv.ai:443/ws'

export function connect ({ thingId, uuid, onConnect, onFailed, onMessage }) {
  const client = mqtt.connect(SANDBOX_URL, { protocolVersion: 5 })
  client.on('connect', (a) => {
    console.log(a)
    onConnect()
    client.subscribe(`db-${thingId}/agent/${uuid}`, (err) => {
      onFailed(err)
    })
  })
  client.on('message', (topic, payload, packet) => {
    onMessage(topic, payload, packet)
  })
  return client
}
