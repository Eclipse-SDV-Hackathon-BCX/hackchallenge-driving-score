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
import React from 'react'
import {
  PageSection,
  Banner,
  PageSectionVariants,
  TextContent,
  Text
} from '@patternfly/react-core'

const CustomHeader = ({ title, description, extras, banner }) => {
  return (
    <>
      <Banner isSticky>
        {banner}
      </Banner>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">{title}</Text>
          <Text component="p">
            {description}
          </Text>
          {extras}
        </TextContent>
      </PageSection>
    </>
  )
}

export default CustomHeader
