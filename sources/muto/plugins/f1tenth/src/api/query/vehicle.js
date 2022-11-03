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
import { gql } from '@apollo/client'

export const GETVEHICLES = gql`

query GETVEHICLES { 
    vehicle(filter: $filter) @rest (
        method: "GET"
        path: "/search/things?{args}"
        bodyKey: "body"
      ) {
        items
      }
  }
`

export const GETTHINGS = gql`

query GETTHINGS { 
  things(filter: $filter) @rest (
      method: "GET"
      path: "/search/things?{args}"
      bodyKey: "body"
    ) {
      items
    }
}
`
