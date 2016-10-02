import React from 'react'

import * as common from 'test/specs/commonTests'
import FeedMeta from 'src/views/Feed/FeedMeta'
import FeedLike from 'src/views/Feed/FeedLike'

describe('FeedMeta', () => {
  common.isConformant(FeedMeta)
  common.rendersChildren(FeedMeta)
  common.implementsShorthandProp(FeedMeta, {
    propKey: 'like',
    ShorthandComponent: FeedLike,
    mapValueToProps: val => ({ content: val }),
  })

  it('renders text with meta prop', () => {
    shallow(<FeedMeta content='foo' />)
      .should.contain.text('foo')
  })
})
